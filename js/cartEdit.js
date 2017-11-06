// Global cart array
var cart = [];

// Gets called when the document is ready.
$(document).ready(function() {

	// Retrieves the cart and displays it.
	retrieveCart();

	// Assigns functionality to the add button.
	$("#add").click(function() {

		console.log("Clicked!");

		var toAdd = prompt("Enter an item");
		if (toAdd != null && toAdd != "") {
			console.log(toAdd);

			cart.push([1, toAdd]);

			// Gets the html element with the id cartList.
			var cartList = $("#cartList");

			// Appends the new item to the list.
			var i = cart.length - 1;
			cartList.append("<li id=cartItem" + i + "><button id='inc" + i + "'>+</button><button id='dec" + i + "'>-</button> 1 " + toAdd + "</li>");
			$("#inc" + i).click(incQty);
			$("#dec" + i).click(decQty);
		}
		else if (toAdd != null) {
			alert("Please enter something valid");
		}
	});

	// Assigns functionality to the save button.
	$("#save").click(function() {
		localStorage.setItem("cart", JSON.stringify(cart));
	});
});

// Helper function that retrieves the cart from localStorage.
function retrieveCart() {

	// Retrieves the cart from localStorage.
	var localCart = localStorage.getItem("cart");

	// If there are items, parses the items retrieved.
	if (localCart && localCart != "[]") {
		console.log("There are items in the cart!");
		cart = JSON.parse(localCart);
	}
	else {
		console.log("There are no items in the cart!");
	}

	displayCart();
}

// Helper function that displays the cart by injecting html.
function displayCart() {

	// Gets the html element with the id cartList.
	var cartList = $("#cartList");
	cartList.html("");

	// Populates the html element; maybe Handlebars.js might be helpful here?
	for (var i = 0; i < cart.length; i++) {

		var qty = cart[i][0];
		var item = cart[i][1];

		cartList.append("<li id=cartItem" + i + "><button id='inc" + i + "'>+</button><button id='dec" + i + "'>-</button> " + qty + " " + item + "</li>");
		$("#inc" + i).click(incQty);
		$("#dec" + i).click(decQty);
	}	
}

// Event handler that decreases the quantity of an item.
function decQty() {
	console.log("Decreasing quantity");
	console.log(this);

	var id = this.getAttribute("id");
	var index = id.substr(3);
	var count = --cart[index][0];

	// Removes the item from the list when the quantity is 0 or less.
	if (count <= 0) {
		cart.splice(index, 1)
		console.log($(this).parent().remove());
	}

	displayCart();
}

// Event handler that increases the quantity of an item.
function incQty() {
	console.log("Increasing quantity");
	console.log(this);

	var id = this.getAttribute("id");
	var index = id.substr(3);
	cart[index][0]++;

	displayCart();
}
