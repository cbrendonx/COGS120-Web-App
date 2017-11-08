var family = [
	{"name": "Brendon", "entry": ["Milk", "Water", "Juice"], "index": 0},
	{"name": "Brendon", "entry": ["Milk", "Water", "Juice"], "index": 1},
	{"name": "Brendon", "entry": ["Milk", "Water", "Juice"], "index": 2},
	{"name": "Brendon", "entry": ["Milk", "Water", "Juice"], "index": 3},
	{"name": "Brendon", "entry": ["Milk", "Water", "Juice"], "index": 4},
];

$(document).ready(function() {
	  // compile the template
  var source   = $("#list-template").html();
  var template = Handlebars.compile(source);

  var parentDiv = $("#family-list");

  // now iterate through the complexData list and keep appending:
  for (var i = 0; i < family.length; i++) {
    var curData = family[i];
    var curHtml = template(curData);
    parentDiv.append(curHtml);

    $("#list" + i).hide();
    $("#input" + i).hide();
    $("#cancel" + i).hide();

    $("#name" + i).click(function() {
    	var id = this.getAttribute("id");
    	var index = id.substr(4);
    	var list = $("#list" + index);
    	var input = $("#input" + index);
    	var cancel = $("#cancel" + index);

    	if (!list.is(":visible")) {
	    	list.show(500);
    	}

    	else {
	    	list.hide(500);
	    	input.hide(500);
	    	cancel.hide(500);
	    }
    });

    $("#add" + i).click(function() {
    	var id = this.getAttribute("id");
    	var index = id.substr(3);
    	var input = $("#input" + index);
    	var cancel = $("#cancel" + index);

    	if (!input.is(":visible")) {
	    	input.show(500);
	    	cancel.show(500);
    	}
    });

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

    $("#input" + i).keypress(function(event) {
    	if (event.which == 13) {
	    	console.log("Enter!");
	    	var id = this.getAttribute("id");
	    	var index = id.substr(5);
	    	console.log(index);
	    	var content = $("#content" + index);
	    	var subIndex = $("#content" + index + " p").length;

	    	console.log(document.getElementById("input" + index));
	    	var text = document.getElementById("input" + index).value;

	    	text = text.trim();

	    	if (text === "") {
				alert("Please enter something valid");
	    	}

	    	else {
		    	content.append("<p id='p" + index + subIndex + "''><button id='rm" + index + subIndex + "''>&times</button> " + text + "</p>");

                // Clears the input field.
		    	$("#input" + index).val("");

                // Attaches a click handler to the remove button.
                $("#rm" + index + subIndex).click(function() {
                    console.log(this);
                    $(this).parent().remove();
                });
		    }
    	}
    });

    var content = $("#content" + i + " p");
    for (var j = 0; j < content.length; j++) {
	    $("#rm" + i + j).click(function() {
	    	console.log(this);
	    	$(this).parent().remove();
	    });
    }
  }
});