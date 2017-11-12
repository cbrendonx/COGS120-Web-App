// Gets called when the document is ready.
$(document).ready(function() {

	$("#welcome").html("Welcome " + localStorage.getItem("user") + "!");

	// Assigns functionality to the log out button.
	$("#log-out").click(function() {

		console.log("Saving user data");

		var user = localStorage.getItem("user");

		var cart = retrieveCart();
		var fridge = retrieveFridge();

		var data = {"cart": cart, "fridge": fridge, "family": {}};
		localStorage.setItem(user, JSON.stringify(data));

		// Clears the local cart and fridge.
		localStorage.removeItem("cart");
		localStorage.removeItem("fridge");
		localStorage.removeItem("family");
		localStorage.removeItem("user");

		console.log("Logging out")
		localStorage.removeItem("loggedIn");
		window.location = "login.html"
	});

	// Assigns functionality to the localStorage.clear() button.
	$("#clr").click(function() {
		localStorage.clear();
	});
});

// Helper function that retrieves the cart from localStorage.
function retrieveCart() {

	var cart =[];

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

	return cart;
}

// Helper function that retrieves the fridge from localStorage.
function retrieveFridge() {

	var fridge = [];

	// Retrieves the fridge from localStorage.
	var localFridge = localStorage.getItem("fridge");

	// If there are items, parses the items retrieved.
	if (localFridge && localFridge != "[]") {
		console.log("There are items in the fridge");
		fridge = JSON.parse(localFridge);
	}
	else {
		console.log("There are no items in the fridge");
	}

	return fridge;
}
