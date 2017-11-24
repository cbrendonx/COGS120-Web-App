// Global cart array
var cart = [];

// Gets called when the document is ready.
$(document).ready(function() {

	// Retrieves the cart and displays it.
	retrieveCart();
});

// Helper function that retrieves the cart from localStorage.
function retrieveCart() {

	// Retrieves the cart from localStorage.
	var localCart = localStorage.getItem("cart");

	// If there are items, parses the items retrieved.
	if (localCart && localCart != "[]") {
		console.log("There are items in the cart");
		cart = JSON.parse(localCart);
	}

	// Otherwise, fill localStorage with the dummy list.
	else {
		console.log("There are no items in the cart");
		// var items = genCart();
		// localStorage.setItem("cart", JSON.stringify(items));
		// cart = items;
	}

	displayCart();
}

// Helper function that displays the cart by injecting html.
function displayCart() {

	// Gets the html element with the id cartList.
	var cartList = $("#cartList");

	// Populates the html element; maybe Handlebars.js might be helpful here?
	for (var i = 0; i < cart.length; i++) {

		var qty = cart[i][0];
		var item = cart[i][1];

		cartList.append("<li class = 'items' id=cartItem" + i + ">" + qty + " " + item + "</li>");
		
		var heightNum = $("#cartItem" + i).height();
	}	
}

// Generates dummy list.
function genCart() {

	var items = [];

	for (var i = 0; i < 10; i++) {
		items.push([i, "Cart Item " + i]);
	}

	return items;
}
