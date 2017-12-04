// Checks if a particular item is an array.
function inArray(item, arr) {
	for (var i = 0; i < arr.length; i++) {
		if (arr[i][1] === item) {
			return true;
		}
	}
	return false;
}

// Retrieves the index of a particular item in an array.
function indexInArray(item, arr) {
	for (var i = 0; i< arr.length; i++) {
		if (arr[i][1] === item) {
			return i;
		}
	}
	return -1;
}
