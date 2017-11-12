// Global fridge array
var fridge = [];

// Gets called when the document is ready.
$(document).ready(function() {

	// Retrieves the fridge and displays it.
	retrieveFridge();

	// Assigns functionality to the add button.
	$("#add").click(function() {

		console.log("Clicked!");

		// var toAdd = prompt("Enter an item");
		var toAdd = document.getElementById("item").value;

		// Returns if user cancelled.
		if (toAdd == null) {
			return;
		}

		// Removes leading and trailing whitespaces.
		toAdd = toAdd.trim();

		// Clears the input field.
		$("#item").val("");

		// Returns if user did not enter any non-whitespace characters.
		if (toAdd === "") {
			alert("Please enter something valid");
			return;
		}

		console.log(toAdd);

		// Adds to the fridge.
		if (!inArray(toAdd, fridge)) {

			console.log("Adding the item!");

			fridge.push([1, toAdd]);

			// Gets the html element with the id fridgeList.
			var fridgeList = $("#fridgeList");

			// Appends the new item to the list.
			var i = fridge.length - 1;
			fridgeList.append("<li id=fridgeItem" + i + "><button id='inc" + i + "'>+</button><button id='dec" + i + "'>-</button> 1 " + toAdd + "</li>");
			$("#inc" + i).click(incQty);
			$("#dec" + i).click(decQty);
		}
		else {

			console.log("Incrementing item!");

			var i = indexInArray(toAdd, fridge);
			var qty = ++fridge[indexInArray(toAdd, fridge)][0];
			$("#fridgeItem" + i).html("<button id='inc" + i + "'>+</button><button id='dec" + i + "'>-</button> " + qty + " "+ toAdd);
			$("#inc" + i).click(incQty);
			$("#dec" + i).click(decQty);
		}
	});

	// Assigns functionality to the save button.
	$("#save").click(function() {
		localStorage.setItem("fridge", JSON.stringify(fridge));
	});
});

// Helper function that retrieves the fridge from localStorage.
function retrieveFridge() {

	// Retrieves the fridge from localStorage.
	var localFridge = localStorage.getItem("fridge");

	// If there are items, parses the items retrieved.
	if (localFridge && localFridge != "[]") {
		console.log("There are items in the fridge!");
		fridge = JSON.parse(localFridge);
	}
	else {
		console.log("There are no items in the fridge!");
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

		fridgeList.append("<li id=fridgeItem" + i + "><button id='inc" + i + "'>+</button><button id='dec" + i + "'>-</button> " + qty + " " + item + "</li>");
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
	var count = --fridge[index][0];

	// Removes the item from the list when the quantity is 0 or less.
	if (count <= 0) {
		fridge.splice(index, 1)
		console.log($(this).parent().remove());
	}

	displayFridge();
}

// Event handler that increases the quantity of an item.
function incQty() {
	console.log("Increasing quantity");
	console.log(this);

	var id = this.getAttribute("id");
	var index = id.substr(3);
	fridge[index][0]++;

	displayFridge();
}

function inArray(item, arr) {
	for (var i = 0; i < arr.length; i++) {
		if (arr[i][1] === item) {
			return true;
		}
	}
	return false;
}

function indexInArray(item, arr) {
	for (var i = 0; i< arr.length; i++) {
		if (arr[i][1] === item) {
			return i;
		}
	}
	return -1;
}