const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

var vector = []

function resize(width, height) {
	canvas.width = width;
	canvas.height = height;
}

function clearCanvas(canvas) {
	canvas.width = canvas.width;
}


const addXY = (event) => {
	vector.push([event.offsetX, event.offsetY])
	(vector)
}


const paintLines = () => {

	img = document.getElementById("div-img")
	width = img.offsetWidth
	height = img.offsetHeight
	resize(width, height)

	context.strokeStyle = "black";
	context.lineWidth = 20;

	context.beginPath();
	context.moveTo(vector[0][0], vector[0][1]);

	for (let i = 1; i < vector.length; i++) {
		context.lineTo(vector[i][0], vector[i][1]);
	}
	context.stroke();

	downloadImage()

}

function downloadImage() {

	document.getElementById("download").setAttribute("href", canvas.toDataURL('image/png'))
	document.getElementById("download").click()
}

addEventListener("keydown", (event) => {
	(event.key);
	if (event.code == "Enter" && vector.length > 1)
		paintLines();
	else if (event.code == "Delete") {
		vector = []
		context.clearRect(0, 0, canvas.width, canvas.height);
		canvas.width = 0;
		canvas.height = 0;
	}
});
