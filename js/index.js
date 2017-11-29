// Gets called when the document is ready.
$(document).ready(function() {

	$("#welcome").html("Welcome " + localStorage.getItem("user") + "!");

	// Assigns functionality to the log out button.
	$("#log-out").click(function() {

		console.log("Saving user data");

		var user = localStorage.getItem("user");

		var cart = retrieveCart();
		var fridge = retrieveFridge();
		var family = retrieveFamily();

		var data = {"cart": cart, "fridge": fridge, "family": family};
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

	$("#startShopping").click(function() {

		console.log("Start shopping button clicked...");

		var firstTime = localStorage.getItem("firstTime");

		if (firstTime === "1") {

			// Set firstTime to "0"
			localStorage.setItem("firstTime", "0");

			console.log("Sent event to Google Analytics");

			// Tracker code follows.
			// tracker = ga.getAll()[0];
			// tracker.send('event', 'startShopping', 'click');
		}
		else {
			console.log("Nothing was sent to Google Analytics though")
		}
	});

	// If it's the user's frst time
	var ft = JSON.parse(localStorage.getItem("firstTime"))

	if (ft === null) {
		console.log("First time accessing the page");
		localStorage.setItem("firstTime", "1");
	}
	else {
		console.log("Not first time accessing the page");
		localStorage.setItem("firstTime", "0");

		// For testing purposes, uncomment this to clear "firstTime" from localStorage or just enter it in the console
		localStorage.removeItem("firstTime");
	}
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

// Helper function that retrieves the family from localStorage.
function retrieveFamily() {

	var family = [];

	// Retrieves the family from localStorage.
	var localFamily = localStorage.getItem("family");

	// If there are members, parses the members retrieved.
	if (localFamily && localFamily!= "[]") {
		console.log("There are members in the family");
		family = JSON.parse(localFamily);
	}
	else {
		console.log("There are no members in the family");
	}

	return family;
}
