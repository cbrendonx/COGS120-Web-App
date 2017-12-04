// The following are used when populating localStorage.
var cart = [];

var fridge = [
	[1, "Milk"],
	[1, "Water"],
	[1, "Juice"]
];

var family = [
	{"name": "Bulbasaur", "entry": ["Milk","Water","Juice"], "index": 0},
	{"name": "Charmander", "entry": ["Milk","Water","Juice"], "index": 1},
	{"name": "Squirtle", "entry": ["Milk","Water","Juice"], "index": 2},
	{"name": "Bonsly", "entry": ["Milk","Water","Juice"], "index": 3},
	{"name": "Sudowoodo", "entry": ["Milk","Water","Juice"], "index": 4}
];

var data = {
	"cart": cart,
	"fridge": fridge,
	"family": family
};

var userdb = {
	"Bulbasuar": "frenzyplant",
	"Charmander": "blastburn",
	"Squirtle": "hydrocannon",
	"Bonsly": "faketears",
	"Sudowoodo": "mimic"
};

// Gets called when the document is ready.
$(document).ready(function() {

	// Assigns functionality to the "[DEV] Clear" button.
	$("#clr").click(function() {
		localStorage.clear();
		alert("localStorage cleared; reloading page now")
		location.reload();
	});

	// Assigns functionality to the "[DEV] Populate" button.
	$("#populate").click(function() {
		localStorage.clear();

		for (var user in userdb) {
			localStorage.setItem(user, JSON.stringify(data));
		}

		localStorage.setItem("userdb", JSON.stringify(userdb));
		alert("localStorage populated; reloading page now")
		location.reload();
	});
});