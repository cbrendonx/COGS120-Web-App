$(document).ready(function(){
	"use strict";
	
	$("form, #cancelButton1").hide();
	
	$("#addItem1").click(function(){
		$("form, #cancelButton1").slideDown();
		
	});
	
	$("#cancelButton1").click(function(){
		$("form").slideUp();
		$("#cancelButton1").hide();
	});
	
	$("#textInput1").keyup(function (enter) {
		if (enter.keyCode === 13) {
			var id1 = this.getAttribute("id");
			var index1 = id1.substr(9);
			var index2 = document.getElementById("actualList" + index1).getElementsByTagName("p").length;
			var inputVal = document.getElementById("textInput" + index1).value;
			if ( inputVal === "" ) {
				console.log("Nothing entered in input field.");
				alert('Please enter an item description or click "Cancel Add".');
			} else {
				console.log("Item entered");
				/*var addNewItem = '<p><button class = "removeItem" id = "removeButton11">&times</button>' + inputVal + '</p>';
				document.getElementById("panel-body" + index + p.length.value).appendChild(addListItem);
				inputVal = "";
				var getActualList = document.getElementById("actualList" + index);
				var description = document.getElementById("textInput" + index);
				var newItem = document.createElement("p");
				newItem.setAttribute('id', description.value);*/
				var addNewItem = '<p class = "item" id = "i' + index1 + index2 + '"><button class = "removeItem" id = "removeButton' + index1 + index2 + '">&times</button>' + inputVal + '</p>';
				$("#actualList" + index1).appendChild(addNewItem);
			} <!--dd-->
		}
	});
});
