// Context variables
var canvas = document.getElementById('gameCanvas'),
ctx = canvas.getContext('2d'),
count = 0;

// Layer variables
var a1 = false,
	b1 = false,
	lock1 = false;

// Asset variables
var tapSound = document.createElement('AUDIO');

tapSound.src = "assets/attack.mp3";

// Disables anti-aliasing for sharp sprites.
ctx.imageSmoothingEnabled = false;

var ball = {
	x: window.innerWidth / 2,
	y: window.innerHeight / 2
};

function drawCircle(radiusLevel) {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	var centerX = canvas.width / 2,
		centerY = canvas.height / 2,
		radius = centerY / radiusLevel;

	// Detects if player pressed the spacebar button.
	addEventListener('keypress', function(e) {
		if(e.keyCode == 32) {
			if(lock1 === false) {
				tapSound.play();
				lock1 = true;
			}
		}
	}, false);

	function generateHalfCircle(startPoint, endPoint, onOff) {
		ctx.beginPath();
		ctx.arc(centerX, centerY, radius, startPoint * Math.PI, endPoint * Math.PI, false);
		if(onOff === false) {
			ctx.fillStyle = "rgb(0, 0, 0)";
		} else {
			ctx.fillStyle = "rgb(153, 255, 51)";
		}
		ctx.fill();
		ctx.lineWidth = 3;
		ctx.strokeStyle = 'green';
		ctx.stroke();

		ctx.beginPath();
		ctx.arc(centerX, centerY, radius / 1.5, startPoint * Math.PI, endPoint * Math.PI, false);
		ctx.fillStyle = "rgb(0, 0, 0)";
		ctx.fill();
		ctx.lineWidth = 3;
		ctx.strokeStyle = 'green';
		ctx.stroke();

		ctx.beginPath();
		ctx.arc(centerX, centerY, radius / 2.5, startPoint * Math.PI, endPoint * Math.PI, false);
		ctx.fillStyle = "rgb(0, 0, 0)";
		ctx.fill();
		ctx.lineWidth = 3;
		ctx.strokeStyle = 'green';
		ctx.stroke();
	}

	if(lock1 === false) {
		// Side A
		generateHalfCircle(0.5, 1.5, a1);

		// Side B
		generateHalfCircle(1.5, 0.5, b1);
	} else if(a1 === true) {
		generateHalfCircle(1.5, 0.5, false);
		generateHalfCircle(0.5, 1.5, true);
	} else {
		generateHalfCircle(1.5, 0.5, true);
		generateHalfCircle(0.5, 1.5, false);
	}

	// Center circle
	ctx.beginPath();
	ctx.strokeStyle = '#9536E0';
	ctx.moveTo(centerX, centerY / 3.05);
	ctx.lineTo(centerX, centerY * 1.67);
	ctx.stroke();
}

function center() {
	ctx.beginPath();
	ctx.arc(window.innerWidth/2, window.innerHeight/2, 60, 0, 2 * Math.PI, false);
	ctx.fillStyle = "rgb(98, 24, 154)";
	ctx.fill();
	ctx.lineWidth = 3;
	ctx.strokeStyle = '#9536E0';
	ctx.stroke();
}

function runGame() {
	drawCircle(1.5);
	center();
	count++;

	// Custom interval
	if(count == 20) {
		if(lock1 === false) {
			// Layer #1
			if(a1 === false) {
				b1 = false;
				a1 = true;
			} else {
				b1 = true;
				a1 = false;
			}
		count = 0;
		}
	}
	requestAnimationFrame(runGame);
}



runGame();