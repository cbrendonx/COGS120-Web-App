// Global fridge array
var fridge = [];

// Gets called when the document is ready.
$(document).ready(function() {

	// Retrieves the fridge and displays it.
	retrieveFridge();
});

// Helper function that retrieves the fridge from localStorage.
function retrieveFridge() {

	// Retrieves the fridge from localStorage.
	var localFridge = localStorage.getItem("fridge");

	// If there are items, parses the items retrieved.
	if (localFridge && localFridge != "[]") {
		console.log("There are items in the fridge");
		fridge = JSON.parse(localFridge);
	}

	// Otherwise, fill localStorage with the dummy list.
	else {
		console.log("There are no items in the frige");
		// var items = genFridge();
		// localStorage.setItem("fridge", JSON.stringify(items));
		// fridge = items;
	}

	displayFridge();
}

// Helper function that displays the fridge by injecting html.
function displayFridge() {

	// Gets the html element with the id fridgeList.
	var fridgeList = $("#fridgeList");

	// Populates the html element; maybe Handlebars.js might be helpful here?
	for (var i = 0; i < fridge.length; i++) {

		var qty = fridge[i][0];
		var item = fridge[i][1];

		fridgeList.append("<li id=fridgeItem" + i + ">" + qty + " " + item + "</li>");
	}	
}

// Generates dummy list.
function genFridge() {

	var items = [];

	for (var i = 0; i < 10; i++) {
		items.push([i, "Fridge Item " + i]);
	}

	return items;
}
