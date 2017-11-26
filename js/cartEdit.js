// Global cart array
var cart = [];

// Gets called when the document is ready.
$(document).ready(function() {

	// Retrieves the cart and displays it.
	retrieveCart();

	// Assigns functionality to the add button.
	$("#cartAdd").click(addItemToCart);

	// Assigns functionality to the save button.
	// $("#save").click(function() {
	// 	localStorage.setItem("cart", JSON.stringify(cart));
	// });
});

// Helper function that adds an item to the cart.
function addItemToCart() {

	console.log("Clicked");

	// var toAdd = prompt("Enter an item");
	var toAdd = document.getElementById("cartItemToAdd").value;
	var qty = Number(document.getElementById("cartAddNum").value);

	// Returns if user cancelled.
	if (toAdd == null) {
		return;
	}

	// Removes leading and trailing whitespaces.
	toAdd = toAdd.trim();

	// Returns if user did not enter any non-whitespace characters.
	if (toAdd === "") {
		alert("Please enter a valid item name");
		return;
	}

	if (qty <= 0) {
		alert("Please enter a valid quantity");
		$("#cartAddNum").val("");
		return;
	}

	// Clears the input field.
	$("#cartItemToAdd").val("");
	$("#cartAddNum").val("");

	console.log(toAdd);

	// Adds to the cart.
	if (!inArray(toAdd, cart)) {

		console.log("Adding the item");

		cart.push([qty, toAdd]);

		// Gets the html element with the id cartList.
		var cartList = $("#cartList");

		// Appends the new item to the list.
		var i = cart.length - 1;

		// OLD: Uncomment if reverting back to the increment-decrement functionality.
		// cartList.append("<li id=cartItem" + i + "><button class='btn btn-default' id='inc" + i + "'>+</button><button class='btn btn-default' id='dec" + i + "'>-</button> 1 " + toAdd + "</li>");
		// $("#inc" + i).click(incCartQty);
		// $("#dec" + i).click(decCartQty);

		cartList.append("<li id=cartItem" + i + "><input type='text' id='cartQty" + i + "' onkeypress='return event.charCode >= 48 && event.charCode <= 57'></input>" + toAdd + "</li>");
		$("#cartQty" + i).val(qty);
		$("#cartQty" + i).keypress(updateCartQty);
	}
	else {

		console.log("Incrementing item");

		var i = indexInArray(toAdd, cart);

		// OLD: Uncomment if reverting back to the increment-decrement functionality.
		// var qty = ++cart[indexInArray(toAdd, cart)][0];
		// $("#cartItem" + i).html("<button class='btn btn-default' id='inc" + i + "'>+</button><button class='btn btn-default' id='dec" + i + "'>-</button> " + cartQty + " " + toAdd);
		// $("#inc" + i).click(incCartQty);
		// $("#dec" + i).click(decCartQty);

		qty = qty + cart[indexInArray(toAdd, cart)][0];
		cart[indexInArray(toAdd, cart)][0] = qty;
		$("#cartItem" + i).html("<input type='text' id='cartQty" + i + "' onkeypress='return event.charCode >= 48 && event.charCode <= 57'></input>" + toAdd);
		$("#cartQty" + i).val(qty);
		$("#cartQty" + i).keypress(updateCartQty);
	}

	// Saves the updated cart to local storage.
 	localStorage.setItem("cart", JSON.stringify(cart));
}

// Helper function that retrieves the cart from localStorage.
function retrieveCart() {

	// Retrieves the cart from localStorage.
	var localCart = localStorage.getItem("cart");

	// If there are items, parses the items retrieved.
	if (localCart && localCart != "[]") {
		console.log("There are items in the cart");
		cart = JSON.parse(localCart);
	}
	else {
		console.log("There are no items in the cart");
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

		// OLD: Uncomment if reverting back to the increment-decrement functionality.
		// cartList.append("<li id=cartItem" + i + "><button class='btn btn-default' id='inc" + i + "'>+</button><button class='btn btn-default' id='dec" + i + "'>-</button> " + cartQty + " " + item + "</li>");
		// $("#inc" + i).click(incCartQty);
		// $("#dec" + i).click(decCartQty);

		cartList.append("<li id=cartItem" + i + "><input type='text' id='cartQty" + i + "' onkeypress='return event.charCode >= 48 && event.charCode <= 57'></input>" + item + "</li>");
		$("#cartQty" + i).val(qty);
		$("#cartQty" + i).keypress(updateCartQty);
	}	
}

// Event handler that decreases the quantity of an item.
// function decCartQty() {
// 	console.log("Decreasing quantity");
// 	console.log(this);

// 	var id = this.getAttribute("id");
// 	var index = id.substr("inc".length);
// 	var count = --cart[index][0];

// 	// Removes the item from the list when the quantity is 0 or less.
// 	if (count <= 0) {
// 		cart.splice(index, 1)
// 		console.log($(this).parent().remove());
// 	}

// 	displayCart();
// }

// Event handler that increases the quantity of an item.
// function incCartQty() {
// 	console.log("Increasing quantity");
// 	console.log(this);

// 	var id = this.getAttribute("id");
// 	var index = id.substr("dec".length);
// 	cart[index][0]++;

// 	displayCart();
// }

// Event handler that updates the quantity of an item.
function updateCartQty() {
	if (event.which === 13) {
		console.log("Enter pressed");
		console.log(this);

		var id = this.getAttribute("id");
		var index = id.substr("cartQty".length);

		var qty = Number(document.getElementById("cartQty" + index).value);

		// Removes the item from the page and from the cart array.
		if (qty  <= 0) {
			console.log("Removing item");
			cart.splice(index, 1)
			console.log($(this).parent().remove());

			displayCart();
		}

		// Updates the quantity in the cart array.
		else {
			console.log("Updating quantity");
			cart[index][0] = qty;
		}

		// Saves the updated cart to local storage.
	 	localStorage.setItem("cart", JSON.stringify(cart));
	}
}

// These helper functions are now found in common.js.
// function inArray(item, arr) {
// 	for (var i = 0; i < arr.length; i++) {
// 		if (arr[i][1] === item) {
// 			return true;
// 		}
// 	}
// 	return false;
// }

// function indexInArray(item, arr) {
// 	for (var i = 0; i< arr.length; i++) {
// 		if (arr[i][1] === item) {
// 			return i;
// 		}
// 	}
// 	return -1;
// }
