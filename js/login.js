// Gets called when the document is ready.
$(document).ready(function() {

	// Assigns functionality to the log in button.
	$("#log-in").click(function() {
		console.log("Retrieving user data");

		// user database
		var userdb = {}; 
		var temp = localStorage.getItem("userdb");

		if(temp) {
			userdb = JSON.parse(temp);
		}
		else {
			userdb = {};
		}

		var user = document.getElementById("username").value;
		var pass = document.getElementById("password").value;

		//var user = prompt("Who are you?");
	
		// Returns if user cancelled.
		if(user == null && pass ==  null) {
			return;
		}

		// Removes leading and trailing whitespaces.
		user = user.trim();
		pass = pass.trim();

		// Returns if user did not enter any non-whitespace characters.
		if (user === "") {
			alert("Please enter something valid");
			return;
		}

		// Returns if user did not enter any non-whitespace characters.
		if (pass === "") {
			alert("Please enter something valid");
			return;
		}

		console.log(user);
		console.log(pass);

		if (user in userdb) {
			if(pass === userdb[user]) {
				console.log("Correct password");
			}

			else {
				console.log("Wrong password");
				alert("Incorrect password");
				return;
			}
		}

		else {
			console.log("Creating new user");
			alert("User doesn't exist! Creating new user with password");
			userdb[user] = pass;
			localStorage.setItem("userdb", JSON.stringify(userdb));
		}

		localStorage.setItem("user", user);

		// Retrieves user data.
		var localData = localStorage.getItem(user);

		var cart = [];
		var fridge = [];
		var family = [];

		if (localData) {
			var data = JSON.parse(localData);
			cart = data["cart"];
			fridge = data["fridge"];
			family = data["family"];
		}

		// Populates local storage with retrieved user data.
		localStorage.setItem("cart", JSON.stringify(cart));
		localStorage.setItem("fridge", JSON.stringify(fridge));
		localStorage.setItem("family", JSON.stringify(family));

		console.log("Logging in")
		localStorage.setItem("loggedIn", 0);
		window.location = "index.html"
	});
});
