var app = angular.module('ShoppingApp', []);

app.controller('ProductController', function($http) {
	
	var me = this;
		
	me.mvProducts = [];
	me.mpProducts = [];
	me.searchProducts = [];
	
	me.fetchProducts = function() {
		
		
		$http.get('/onlineshopping/json/data/mv/products')
			.then(function(response) {
				me.mvProducts = response.data;
		});
			
			
		$http.get('/onlineshopping/json/data/mp/products')
		.then(function(response) {
			me.mpProducts = response.data;
		});
			
		/*$http.get('/onlineshopping/json/data/search')
		.then(function(response) {
			me.searchProducts = response.data;
	});*/
	
	}
	
});