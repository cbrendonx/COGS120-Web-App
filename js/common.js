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
