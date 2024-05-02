const canvas = document.querySelector("#mainCanvas");
const context = canvas.getContext("2d");

const lineWidth = 8;


function resize(width, height) {
	canvas.width = width;
	canvas.height = height;
}

function clearCanvas(canvas) {
	canvas.width = canvas.width;
}

vector = []
const addXY = (event) => {
	vector.push([event.offsetX, event.offsetY + lineWidth])
	console.log(vector)
}
// let deg = 0
// function rotate(e) {
// 	e.preventDefault()

// 	var delta = e.deltaX || e.detail || e.wheelDelta;

// 	if (delta > 0 && deg < 180) deg += 1;
// 	else if (delta < 0 && deg > 0) deg -= 1;
// 	else
// 		return


// 	document.querySelector("img").style.transform = "rotate(" + deg + "deg)"
// 	document.querySelector("svg").style.transform = "rotate(" + deg + "deg)"
// }


function moveHelper(event) {
	hr = document.querySelector('#hr-helper');
	hr.style.top = event.offsetY + 'px';

	hr_ver = document.querySelector('#hr-helper-vertical')
	hr_ver.style.left = event.offsetX + 'px';
}


const paintLines = () => {

	img = document.getElementById("div-img")
	width = img.offsetWidth
	height = img.offsetHeight
	resize(width, height)

	context.strokeStyle = "black";
	context.lineWidth = lineWidth;
	context.lineCap = "round"
	context.lineJoin = "round"

	context.beginPath();
	context.moveTo(vector[0][0], vector[0][1]);

	for (let i = 1; i < vector.length; i++) {
		A = Math.abs(vector[i][0] - vector[i - 1][0])
		B = Math.abs(vector[i][1] - vector[i - 1][1])


		if (A <= B)
			context.lineTo(vector[i - 1][0], vector[i][1]);

		else
			context.lineTo(vector[i][0], vector[i - 1][1]);
	}
	context.stroke();

	downloadImage()

}




function downloadImage() {
	document.getElementById("download").setAttribute("href", canvas.toDataURL('image/png'))
	document.getElementById("download").click()
}

addEventListener("keydown", (event) => {
	console.log(event.key);
	if (event.code == "Enter" && vector.length > 1)
		paintLines();
	else if (event.code == "Delete") {
		vector = []
		context.clearRect(0, 0, canvas.width, canvas.height);
		canvas.width = 0;
		canvas.height = 0;
	}
});
