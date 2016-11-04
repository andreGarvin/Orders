// start express server
var express = require('express');

// using express app
var app = express();

// parsers object inot json to send through 
var bodyParser = require('body-parser');

// connects to mongoDB
var mongo = require('mongodb');

// error handling
var assert = require('assert');




// time stamp
var datetime = require('node-datetime');
var dt = datetime.create('2015-04-30 09:52:00');
var formattedDate = dt.format('m/d/y H:M');




app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



// database connect url
var url = 'mongodb://localhost:27017/CoffeeShopDB';
var feedback;

// port for address for the API
var port = process.env.PORT || 8000;

app.get('/theShop/GETorders', function( req, resp ) {
	var listedOrders = [];

	mongo.connect(url, function( err, db ) {
		
			// error handling
			assert.equal( null, err);

			// getting database table events
			var collect = db.collection('drinks').find();

			collect.forEach(function( order, err ) {
				
				
				// feedback.data.push( events );
				assert.equal(null, err);

				listedOrders.push( order );
			
			}, function() {

				feedback = {
					result: true,
					data: listedOrders,
					dataLength: listedOrders.length
				}

				resp.json( feedback );

			});
			
		});

});

// http://localhost:8000/theShop/POSTorder?name=Andre Garvin&drink=Coffee

app.post('/theShop/POSTorder', function( req, resp ) {
	
	var newOrder = {
		customer: req.param('customer'),
		drink: req.param('drink'),
		date: formattedDate
	};

	mongo.connect( url, function( err, db ) {
		// error checking
		assert.equal(null, err);

		// if no error it connects to db
		db.collection('drinks').insertOne( newOrder , function() {
			
			assert.equal(null, err);
			
			resp.json( {result: true, errorMessage: 'order posted.', neworder: newOrder} );

			// close db connect
			db.close();
		});

	});
	
});



app.listen(port, function( req, resp ) {
	console.log('API running on : http://localhost:' + port);
});
