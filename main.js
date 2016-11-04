
var theShop = {
	getURL: 'http://localhost:8000/theShop/GETorders',
	postURL: 'http://localhost:8000/theShop/POSTorder',
	getOrders: function() {

		$('#order').remove();

		$.getJSON( this.getURL, function( resp ) {
			
			if ( resp.result ) {

				for ( var i in resp.data ) {

					$("#Myorders").append("<div id='order' class='col-md-12 col-xs-12'>"+
						"Name: " + resp.data[i].customer +
						"<br />"+
						" Drink: " + resp.data[i].drink +
					"</div>");
				}

			}
			else {
				alert('No orders made :(');
			}
		});
	},
	postOrder: function( customer, drink ) {

		if ( customer.length !== 0 && drink.length !== 0 ) {
			
			$.ajax({
			  type: 'POST',
			  url: this.postURL + '?customer='+ customer +'&drink='+ drink,
			  success: function( resp ) {

			  	console.log( resp );
			  }

			});	
		}
		// ?customer=Andre Garvin&drink=Coffee


	}
};




$('document').ready(function() {

	$('#get').click(function(){
		theShop.getOrders();
	});

	$('#post').click(function() {
		// console.log( $('#name').val().toLowerCase() );
		theShop.postOrder( $('#name').val().toLowerCase(), $('#drink').val().toLowerCase() );
		$('input').val('');
	});

});