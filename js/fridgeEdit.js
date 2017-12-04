// Global fridge array
var fridge = [];

// Gets called when the document is ready.
$(document).ready(function() {

	// Retrieves the fridge and displays it.
	retrieveFridge();

	// Assigns functionality to the add button.
	$("#fridgeAdd").click(addItemToFridge);
});

// Helper function that adds an item to the fridge.
function addItemToFridge() {

	console.log("Clicked");

	// var toAdd = prompt("Enter an item");
	var toAdd = document.getElementById("fridgeItemToAdd").value;
	var qty = Number(document.getElementById("fridgeAddNum").value);

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
		$("#fridgeAddNum").val("");
		return;
	}

	// Clears the input field.
	$("#fridgeItemToAdd").val("");
	$("#fridgeAddNum").val("");

	console.log(toAdd);

	// Adds to the fridge.
	if (!inArray(toAdd, fridge)) {

		console.log("Adding the item");

		fridge.push([qty, toAdd]);

		// Gets the html element with the id fridgeList.
		var fridgeList = $("#fridgeList");

		// Appends the new item to the list.
		var i = fridge.length - 1;

		fridgeList.append("<div class='row item' id='fridgeItem" + i + "'><div class='col-xs-4'><input class='changeQuant' type='text' id='fridgeQty" + i + "' onkeypress='return event.charCode >= 48 && event.charCode <= 57'></input></div><div class='col-xs-8'><p>" + toAdd + "</p></div></div>");
		$("#fridgeQty" + i).val(qty);
		$("#fridgeQty" + i).keypress(updateFridgeQty);
	}
	else {

		console.log("Incrementing item");

		var i = indexInArray(toAdd, fridge);

		qty = qty + fridge[indexInArray(toAdd, fridge)][0];
		fridge[indexInArray(toAdd, fridge)][0] = qty;

		$("#fridgeItem" + i).html("<div class='col-xs-4'><input class='changeQuant' type='text' id='fridgeQty" + i + "' onkeypress='return event.charCode >= 48 && event.charCode <= 57'></input></div><div class='col-xs-8'><p>" + toAdd + "</p></div>");
		$("#fridgeQty" + i).val(qty);
		$("#fridgeQty" + i).keypress(updateFridgeQty);
	}

	// Saves the updated fridge to local storage.
 	localStorage.setItem("fridge", JSON.stringify(fridge));
}

// Helper function that retrieves the fridge from localStorage.
function retrieveFridge() {

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

	displayFridge();
}

// Helper function that displays the fridge by injecting html.
function displayFridge() {

	// Gets the html element with the id fridgeList.
	var fridgeList = $("#fridgeList");
	fridgeList.html("");

	// Populates the html element; maybe Handlebars.js might be helpful here?
	for (var i = 0; i < fridge.length; i++) {

		var qty = fridge[i][0];
		var item = fridge[i][1];

		fridgeList.append("<div class='row item' id='fridgeItem" + i + "'><div class='col-xs-4'><input class='changeQuant' type='text' id='fridgeQty" + i + "' onkeypress='return event.charCode >= 48 && event.charCode <= 57'></input></div><div class='col-xs-8'><p>" + item + "</p></div></div>");
		$("#fridgeQty" + i).val(qty);
		$("#fridgeQty" + i).keypress(updateFridgeQty);
	}	
}

// Event handler that updates the quantity of an item.
function updateFridgeQty() {
	if (event.which === 13) {
		console.log("Enter pressed");
		console.log(this);

		var id = this.getAttribute("id");
		var index = id.substr("fridgeQty".length);

		var qty = Number(document.getElementById("fridgeQty" + index).value);

		// Removes the item from the page and from the fridge array.
		if (qty  <= 0) {
			console.log("Removing item");
			fridge.splice(index, 1)
			console.log($(this).parent().remove());

			displayFridge();
		}

		// Updates the quantity in the fridge array.
		else {
			console.log("Updating quantity");
			fridge[index][0] = qty;
		}

		// Saves the updated fridge to local storage.
	 	localStorage.setItem("fridge", JSON.stringify(fridge));
	}
}
