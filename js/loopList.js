//This code was adapted and inspired by Brendon Chen. Without him, much of the interactions of this page, and my knowledge of how the template would have functioned, would have been very much lost.

var familyList = [
	{"listName": "My Personal List", "itemList": ["Milk", "Water", "Juice"], "index": 0},
	{"listName": "My Wife", "itemList": ["Milk", "Water", "Juice"], "index": 1}
];

$(document).ready(function(){
	"use strict";
	
	var source     = $("#listTemplate").html();
  	var template   = Handlebars.compile(source);
	var parentDiv     = $(".famList");
	
	for (var i = 0; i < familyList.length; i++){
		var dbFamList = familyList[i];
		var db2Temp = template(dbFamList);
		parentDiv.append(db2Temp);
		
		var panelDefault  = $("#list" + i);
		var listName      = $("#title" + i);
		var actualList    = $("#actualList" + i);
		var listFooter    = $("#listFooter" + i);
		var addItemButton = $("#addItem" + i);
		var cancelButton  = $("#cancelButton" + i);
		var form          = $("#descriptForm" + i);
		var textField     = $("#textInput" + i);
		var transition    = 250;
		
		if (i === 0) {
			panelDefault.css("margin-top", "8em");
		}
		
		actualList.hide();
		listFooter.hide();
		addItemButton.hide();
		cancelButton.hide();
		form.hide();
		
		listName.click(function(){
			var idIndex = this.getAttribute("id").substr(5);
			$("#actualList" + idIndex).slideToggle(transition);
			$("#listFooter" + idIndex).slideToggle(transition);
			$("#addItem" + idIndex).slideToggle(transition);
			if (listName.is(":visible")){
				$("#cancelButton" + idIndex).hide(transition);
				$("#descriptForm" + idIndex).hide(transition);
				$("#textInput" + idIndex).value("");
			}
		});
		
		addItemButton.click(function(){
			var idIndex = this.getAttribute("id").substr(7);
			$("#cancelButton" + idIndex).slideDown(transition);
			$("#descriptForm" + idIndex).slideDown(transition);
		});
		
		cancelButton.click(function(){
			var idIndex = this.getAttribute("id").substr(12);
			$("#cancelButton" + idIndex).slideUp(transition);
			$("#descriptForm" + idIndex).slideUp(transition);
			$("#textField" + idIndex).slideUp(transition);
			$("#textInput" + idIndex).value("");
		});
		
	}
});