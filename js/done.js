// Gets called when the document is ready.
$(document).ready(function() {
	$("#done").click(function() {
		cartToFridge();
	});
});

function cartToFridge() {

	var cart = [];
	var fridge = [];

	// Retrieves the cart from localStorage.
	var localCart = localStorage.getItem("cart");

	// If there are items, parses the items retrieved.
	if (localCart && localCart != "[]") {
		console.log("There are items in the cart");
		cart = JSON.parse(localCart);

		console.log("Moving items from the cart to the fridge");
		console.log(cart);

		// Retrieves the fridge from localStorage.
		var localFridge = localStorage.getItem("fridge");

		// If there are items, parses the items retrieved.
		if (localFridge && localFridge !== "[]") {
			console.log("There are items in the fridge");
			fridge = JSON.parse(localFridge);
		}	

		// Iterates through the cart.
		for (var i = 0; i < cart.length; i++) {

			var item = cart[i][1];

			// If the item exists in the fridge, increments the quantity.
			if (inArray(item, fridge)) {
				fridge[indexInArray(item, fridge)][0] = fridge[indexInArray(item, fridge)][0] + cart[i][0];
			}

			// Otherwise, pushes the tiem to the fridge.
			else {
				fridge.push(cart[i]);
			}
		}

		// fridge = fridge.concat(cart);

		// Saves everything back out to localStorage.
		localStorage.setItem("cart", JSON.stringify([]));
		localStorage.setItem("fridge", JSON.stringify(fridge));
	}
	
	else {
		console.log("There are no items in the cart");
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
