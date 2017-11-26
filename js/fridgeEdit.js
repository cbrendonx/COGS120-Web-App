// Global fridge array
var fridge = [];

// Gets called when the document is ready.
$(document).ready(function() {

	// Retrieves the fridge and displays it.
	retrieveFridge();

	// Assigns functionality to the add button.
	$("#fridgeAdd").click(addItemToFridge);

	// Assigns functionality to the save button.
	// $("#save").click(function() {
	// 	localStorage.setItem("fridge", JSON.stringify(fridge));
	// });
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

		// OLD: Uncomment if reverting back to the increment-decrement functionality.
		// fridgeList.append("<li id=fridgeItem" + i + "><button class='btn btn-default' id='inc" + i + "'>+</button><button class='btn btn-default' id='dec" + i + "'>-</button> 1 " + toAdd + "</li>");
		// $("#inc" + i).click(incFridgeQty);
		// $("#dec" + i).click(decFridgeQty);

		fridgeList.append("<li id=fridgeItem" + i + "><input type='text' id='fridgeQty" + i + "' onkeypress='return event.charCode >= 48 && event.charCode <= 57'></input>" + toAdd + "</li>");
		$("#fridgeQty" + i).val(qty);
		$("#fridgeQty" + i).keypress(updateFridgeQty);
	}
	else {

		console.log("Incrementing item");

		var i = indexInArray(toAdd, fridge);

		// OLD: Uncomment if reverting back to the increment-decrement functionality.
		// var qty = ++fridge[indexInArray(toAdd, fridge)][0];
		// $("#fridgeItem" + i).html("<button class='btn btn-default' id='inc" + i + "'>+</button><button class='btn btn-default' id='dec" + i + "'>-</button> " + fridgeQty + " " + toAdd);
		// $("#inc" + i).click(incFridgeQty);
		// $("#dec" + i).click(decFridgeQty);

		qty = qty + fridge[indexInArray(toAdd, fridge)][0];
		fridge[indexInArray(toAdd, fridge)][0] = qty;
		$("#fridgeItem" + i).html("<input type='text' id='fridgeQty" + i + "' onkeypress='return event.charCode >= 48 && event.charCode <= 57'></input>" + toAdd);
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

		// OLD: Uncomment if reverting back to the increment-decrement functionality.
		// fridgeList.append("<li id=fridgeItem" + i + "><button class='btn btn-default' id='inc" + i + "'>+</button><button class='btn btn-default' id='dec" + i + "'>-</button> " + fridgeQty + " " + item + "</li>");
		// $("#inc" + i).click(incFridgeQty);
		// $("#dec" + i).click(decFridgeQty);

		fridgeList.append("<li id=fridgeItem" + i + "><input type='text' id='fridgeQty" + i + "' onkeypress='return event.charCode >= 48 && event.charCode <= 57'></input>" + item + "</li>");
		$("#fridgeQty" + i).val(qty);
		$("#fridgeQty" + i).keypress(updateFridgeQty);
	}	
}

// Event handler that decreases the quantity of an item.
// function decFridgeQty() {
// 	console.log("Decreasing quantity");
// 	console.log(this);

// 	var id = this.getAttribute("id");
// 	var index = id.substr("inc".length);
// 	var count = --fridge[index][0];

// 	// Removes the item from the list when the quantity is 0 or less.
// 	if (count <= 0) {
// 		fridge.splice(index, 1)
// 		console.log($(this).parent().remove());
// 	}

// 	displayFridge();
// }

// Event handler that increases the quantity of an item.
// function incFridgeQty() {
// 	console.log("Increasing quantity");
// 	console.log(this);

// 	var id = this.getAttribute("id");
// 	var index = id.substr("dec".length);
// 	fridge[index][0]++;

// 	displayFridge();
// }

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
