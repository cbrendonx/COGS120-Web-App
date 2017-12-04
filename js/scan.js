// Barcode database.
var db = {"0477459943552": "Ralphs Card",
		  "989362464798": "Bread",
		  "832527816296": "Cheese",
		  "108076795104": "Egg",
		  "743058936865": "Milk",
		  "966124133230": "Noodles"
		 };

// Gets called when the document is ready.
$(document).ready(function() {

	var _scannerIsRunning = false;
	var done = false;

	Quagga.init({
		inputStream: {
			name: "Live",
			type: "LiveStream",
			target: document.querySelector('#scanner-container'),
			constraints: {
				//width: window.innerWidth,
				width: 640,
				height: 480,
				facingMode: "environment"
			},
		},
		decoder: {
			readers: [
				"code_128_reader",
				"ean_reader",
				"ean_8_reader",
				"code_39_reader",
				"code_39_vin_reader",
				"codabar_reader",
				"upc_reader",
				"upc_e_reader",
				"i2of5_reader"
			],
			debug: {
				showCanvas: true,
				showPatches: true,
				showFoundPatches: true,
				showSkeleton: true,
				showLabels: true,
				showPatchLabels: true,
				showRemainingPatchLabels: true,
				boxFromPatches: {
					showTransformed: true,
					showTransformedBox: true,
					showBB: true
				}
			}
		},
	}, function (err) {
		if (err) {
			console.log(err);
			return
		}
		console.log("Initialization finished. Ready to start");
		Quagga.start();
		// Set flag to is running
		_scannerIsRunning = true;
	});

	Quagga.onProcessed(function (result) {
		var drawingCtx = Quagga.canvas.ctx.overlay,
		drawingCanvas = Quagga.canvas.dom.overlay;
		if (result) {
			if (result.boxes) {
				drawingCtx.clearRect(0, 0, parseInt(drawingCanvas.getAttribute("width")), parseInt(drawingCanvas.getAttribute("height")));
				result.boxes.filter(function (box) {
					return box !== result.box;
				}).forEach(function (box) {
					Quagga.ImageDebug.drawPath(box, { x: 0, y: 1 }, drawingCtx, { color: "green", lineWidth: 2 });
				});
			}
			if (result.box) {
				Quagga.ImageDebug.drawPath(result.box, { x: 0, y: 1 }, drawingCtx, { color: "#00F", lineWidth: 2 });
			}
			if (result.codeResult && result.codeResult.code) {
				Quagga.ImageDebug.drawPath(result.line, { x: 'x', y: 'y' }, drawingCtx, { color: 'red', lineWidth: 3 });
			}
		}
	});

	Quagga.onDetected(function (result) {

		if (done) {
			return;
		}

		console.log("Barcode detected and processed : [" + result.codeResult.code + "]", result);

		var barcode = result.codeResult.code;
		var item = "fail";

		if (barcode in db) {

			item = db[result.codeResult.code];
			console.log(item);
			addToCart(item);

			done = true;

			window.location.replace("cart.html");
		}

		else {
			console.log("Item not found!");
		}
	});
});

// Helper function that adds a scanned item to the cart.
function addToCart(toAdd) {

	var cart = [];

	// Retrieves the cart from localStorage.
	var localCart = localStorage.getItem("cart");

	// If there are items, parses the items retrieved.
	if (localCart && localCart != "[]") {
		console.log("There are items in the cart!");
		cart = JSON.parse(localCart);
	}
	else {
		console.log("There are no items in the cart!");
	}

	// Add to the cart
	if (!inArray(toAdd, cart)) {
		cart.push([1, toAdd]);
	}
	else {
		cart[indexInArray(toAdd, cart)][0]++;
	}

	// Write to localStorage
	localStorage.setItem("cart", JSON.stringify(cart));
}
