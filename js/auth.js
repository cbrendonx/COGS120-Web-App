console.log("Authenticating");

// If the user is not logged in, redirects them to the log in page.
if (!localStorage.getItem("loggedIn")) {
	window.location = "login.html"
	console.log("Not logged in");
}

else {
	console.log("Logged in");
}
