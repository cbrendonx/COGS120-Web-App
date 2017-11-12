// Global family array
var family = [];

// Gets called when the document is ready.
$(document).ready(function() {

	// Retrieves the family from localStorage.
	retrieveFamily();

	// Displays the family list.
	displayList();

	// Assigns functionality to the add new family member button.
	$("#new-name-btn").click(function() {

		var name = document.getElementById("new-name").value;
		var index = family.length;

		// Removes leading and trailing whitespaces.
		name = name.trim();

		// Clears the input field.
		$("#new-name").val("");

		if (name === "") {
			alert("Please enter something valid");
		}

		else {
			family.push({"name": name, "entry": [], "index": index})
			console.log(family);
			displayList();

			// Saves changes to the "database".
			saveFamily();
		}
	});
});

// Helper function that retrieves the family from localStorage.
function retrieveFamily() {

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
}

// Helper function that saves the family to localStorage.
function saveFamily() {

	console.log("Saving family to localStorage");
	
	localStorage.setItem("family", JSON.stringify(family));
}

// Helper function that displays the family list.
function displayList() {

	// compile the template
	var source   = $("#list-template").html();
	var template = Handlebars.compile(source);

	var parentDiv = $("#family-list");
	parentDiv.html("");

	// now iterate through the complexData list and keep appending:
	for (var i = 0; i < family.length; i++) {
		var curData = family[i];
		var curHtml = template(curData);
		parentDiv.append(curHtml);

		// Hides all of the information associated with a name.
		$("#list" + i).hide();
		$("#input" + i).hide();
		$("#cancel" + i).hide();

		// Assigns functionality to the name.
		$("#name" + i).click(function() {
			var id = this.getAttribute("id");
			var index = id.substr(4);
			var list = $("#list" + index);
			var input = $("#input" + index);
			var cancel = $("#cancel" + index);

			// Expands the list if it is hidden.
			if (!list.is(":visible")) {
				list.show(500);
			}

			// Otherwise hides everything.
			else {
				list.hide(500);
				input.hide(500);
				cancel.hide(500);
			}
		});

		// Assigns functionality to the disown button.
		$("#disown" + i).click(function() {
			if (confirm("Are you sure you want to disown this family member?")) {
				$(this).parent().hide(500, function() {
					var person = $(this).attr("id");
					var index = person.substr(6);
					family.splice(index, 1);
					reindex(family);
					displayList();

					// Saves changes to the "database".
					saveFamily();
				});
			}
		});

		// Assigns functionality to the add button.
		$("#add" + i).click(function() {
			var id = this.getAttribute("id");
			var index = id.substr(3);
			var input = $("#input" + index);
			var cancel = $("#cancel" + index);

			if (!input.is(":visible")) {
				input.show(500);
				cancel.show(500);
			} else if (input.is(":visible")) {
				console.log("Enter");
				var id = this.getAttribute("id");
				var index = id.substr(3);
				console.log(index);
				// var content = $("#content" + index);
				// var subIndex = $("#content" + index + " p").length;

				console.log(document.getElementById("input" + index));
				var text = document.getElementById("input" + index).value;

				text = text.trim();

				if (text === "") {
					alert("Please enter something valid");
				}

				else {
					family[index]["entry"].push(text);
					displayContent(index);

					// Clears the input field.
					$("#input" + index).val("");

					// Saves changes to the "database".
					saveFamily();
				}
			}
		});

		// Assigns functionality to the cancel button.
		$("#cancel" + i).click(function() {
			var id = this.getAttribute("id");
			var index = id.substr(6);
			var input = $("#input" + index);
			var cancel = $("#cancel" + index);

			if (input.is(":visible")) {
				input.hide(500);
				cancel.hide(500);
			}
		});

		// Enables enter-submission in the text input.
		$("#input" + i).keypress(function(event) {
			if (event.which == 13) {
				console.log("Enter");
				var id = this.getAttribute("id");
				var index = id.substr(5);
				console.log(index);
				// var content = $("#content" + index);
				// var subIndex = $("#content" + index + " p").length;

				console.log(document.getElementById("input" + index));
				var text = document.getElementById("input" + index).value;

				text = text.trim();

				if (text === "") {
					alert("Please enter something valid");
				}

				else {
					family[index]["entry"].push(text);
					displayContent(index);

					// Clears the input field.
					$("#input" + index).val("");

					// Saves changes to the "database".
					saveFamily();
				}
			}
		});

		// Assigns functionality to the remove buttons for each item.
		var content = $("#content" + i + " p");
		for (var j = 0; j < content.length; j++) {
			$("#rm" + i + j).click(removeHandler);
		}
	}
}

function displayContent(index) {

	var content = $("#content" + index);

	// Clears the div.
	content.html("");

	// Repopulates.
	var array = family[index]["entry"];
	for (var i = 0; i < array.length; i++) {
		content.append("<p id='p" + index + i + "'' class='card'><button id='rm" + index + i + "'' class='remove-btn'>&times</button> " + array[i] + "</p>");

		// Attaches a click handler to the remove button.
		$("#rm" + index + i).click(removeHandler);
			
	}
}

// Helper function that removes an item.
function removeHandler() {

	console.log(this);

	if (confirm("Are you sure you want to delete the item?")) {
	
		// Captures the id of the content div.
		var id = $(this).parent().parent().attr("id");
		console.log(id);

		// Calculates the indicies.
		var index = id.substr("content".length);
		var subIndex = $(this).attr("id").substr(("rm" + index).length);
		console.log(index);
		console.log(subIndex);

		// Removes the entry from the entry array.
		family[index]["entry"].splice(subIndex, 1);

		// Clears the div and repopulates.
		displayContent(index);

		// Saves changes to the "database".
		saveFamily();
	}
}

// Helper function that reindexes the family array.
function reindex(array) {
	for (var i = 0; i < array.length; i++) {
		array[i]["index"] = i;
	}
}
