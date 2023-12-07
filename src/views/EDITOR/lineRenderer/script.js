const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");


function resize(width, height) {
	canvas.width = width;
	canvas.height = height;
}

function clearCanvas(canvas) {
	canvas.width = canvas.width;
}

let vector = []

const addXY = (event) => {
	vector.push([event.offsetX, event.offsetY])
}


const paintLines = () => {

	img = document.querySelector("img")
	width = img.offsetWidth
	height = img.offsetHeight
	resize(width, height)

	context.strokeStyle = "white";
	context.lineWidth = 1;
	context.beginPath();
	context.moveTo(vector[0][0], vector[0][1]);

	for (let i = 1; i < vector.length; i++) {
		if (i + 1 == vector.length)
			break

		context.lineTo(vector[i + 1][0], vector[i + 1][1]);
	}
	context.stroke();

	document.getElementById("download").setAttribute("href", canvas.toDataURL('image/png'))
	document.getElementById("download").click()

	vector = []
	context.clearRect(0, 0, canvas.width, canvas.height);
}
