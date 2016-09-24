// Context variables
var canvas = document.getElementById('gameCanvas'),
ctx = canvas.getContext('2d'),
count = 0,
pauseEvent = false,
gameOver = false,
levelComplete = false;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Layer variables
var a1 = false,
b1 = false,
a2 = false,
b2 = false,
a3 = false, 
b3 = false,
lock1 = false,
lock2 = false,
lock3 = false;

// Asset variables
var tapSound = document.createElement('AUDIO'),
winSound = document.createElement('AUDIO'),
gameOverSound = document.createElement('AUDIO');

tapSound.src = "assets/attack.mp3";
winSound.src = "assets/levelup.mp3";
gameOverSound.src = "assets/gameover.mp3";

// Disables anti-aliasing for sharp sprites.
ctx.imageSmoothingEnabled = false;

var ball = {
	x: window.innerWidth / 2,
	y: window.innerHeight / 2
};

function drawCircle(radiusLevel) {

	var centerX = canvas.width / 2,
	centerY = canvas.height / 2,
	radius = centerY / radiusLevel;

	// Detects if player pressed the spacebar button.
	addEventListener('keydown', function(e) {
		if(e.keyCode == 32 && pauseEvent === false) {
			if(lock1 === false) {
				tapSound.play();
				lock1 = true;
				pauseEvent = true;
				setTimeout(function() {
					pauseEvent = false;
				}, 300);
			} else if(lock2 === false && lock1 === true && pauseEvent === false) {
				tapSound.play();
				lock2 = true;
				pauseEvent = true;
				setTimeout(function() {
					pauseEvent = false;
				}, 300);
			} else if (lock2 === true && lock1 === true && lock3 === false && pauseEvent === false) {
				tapSound.play();
				lock3 = true;
				pauseEvent = true;
				setTimeout(function() {
					pauseEvent = false;
				}, 300);
			}
		}
	}, false);

	function genLayer1(startPoint, endPoint, onOff) {
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

		if(lock1 === false) {
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
	}

	function genLayer2(startPoint, endPoint, onOff) {
		ctx.beginPath();
		ctx.arc(centerX, centerY, radius / 1.5, startPoint * Math.PI, endPoint * Math.PI, false);
		if(onOff === false) {
			ctx.fillStyle = "rgb(0, 0, 0)";
		} else {
			ctx.fillStyle = "rgb(153, 255, 51)";
		}
		ctx.fill();
		ctx.lineWidth = 3;
		ctx.strokeStyle = 'green';
		ctx.stroke();

		if(lock2 === false) {
			ctx.beginPath();
			ctx.arc(centerX, centerY, radius / 2.5, startPoint * Math.PI, endPoint * Math.PI, false);
			ctx.fillStyle = "rgb(0, 0, 0)";
			ctx.fill();
			ctx.lineWidth = 3;
			ctx.strokeStyle = 'green';
			ctx.stroke();
		}
	}

	function genLayer3(startPoint, endPoint, onOff) {
		ctx.beginPath();
		ctx.arc(centerX, centerY, radius / 2.5, startPoint * Math.PI, endPoint * Math.PI, false);
		if(onOff === false) {
			ctx.fillStyle = "rgb(0, 0, 0)";
		} else {
			ctx.fillStyle = "rgb(153, 255, 51)";
		}
		ctx.fill();
		ctx.lineWidth = 3;
		ctx.strokeStyle = 'green';
		ctx.stroke();
	}

	// Layer 1 draw
	if(lock1 === false) {
		// Side A
		genLayer1(0.5, 1.5, a1);

		// Side B
		genLayer1(1.5, 0.5, b1);
	} else if(a1 === true) {
		genLayer1(1.5, 0.5, false);
		genLayer1(0.5, 1.5, true);
	} else {
		genLayer1(1.5, 0.5, true);
		genLayer1(0.5, 1.5, false);
	} 

	// Layer 2 draw
	if(lock1 === true && lock2 === false) {
		genLayer2(0.5, 1.5, a2);
		genLayer2(1.5, 0.5, b2);
	} else if(lock1 === true && a2 === true) {
		genLayer2(1.5, 0.5, false);
		genLayer2(0.5, 1.5, true);
	} else if(lock1 === true && b2 === true){
		genLayer2(1.5, 0.5, true);
		genLayer2(0.5, 1.5, false);
	}

	// Layer 3 draw
	if(lock1 === true && lock2 === true) {
		genLayer3(0.5, 1.5, a3);
		genLayer3(1.5, 0.5, b3);
	} else if(lock1 === true && a3 === true) {
		genLayer3(1.5, 0.5, false);
		genLayer3(0.5, 1.5, true);
	} else if(lock1 === true && b3 === true){
		genLayer3(1.5, 0.5, true);
		genLayer3(0.5, 1.5, false);
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
	ctx.arc(canvas.width/2, canvas.height/2, 60, 0, 2 * Math.PI, false);
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
		}

		if(lock2 === false && lock1 === true) {
			// Layer #2
			if(a2 === false) {
				b2 = false;
				a2 = true;
			} else {
				b2 = true;
				a2 = false;
			}
		}

		if(lock2 === true && lock1 === true && lock3 === false) {
			// Layer #3
			if(a3 === false) {
				b3 = false;
				a3 = true;
			} else {
				b3 = true;
				a3 = false;
			}
		}

		if(lock1 === false) {
			count = 5;
		} else if(lock2 === false) {
			count = 10;
		} else {
			count = 13;
		}
	}

	// Game-over rules
	if(
		a1 === true && b2 === true && lock2 === true || 
		a2 === true && b3 === true && lock3 === true || 
		a3 === true && b1 === true && lock3 === true ||
		b1 === true && a2 === true && lock2 === true
	) {
		gameOver = true;
	}

	// Game win rules
	if(
		(a1 === true && a2 === true && lock2 === true && 
		a2 === true && a3 === true && lock3 === true && 
		a3 === true && a1 === true && lock3 === true) ||
		(b1 === true && b2 === true && lock2 === true && 
		b2 === true && b3 === true && lock3 === true && 
		b3 === true && b1 === true && lock3 === true)
	) {
		levelComplete = true;
	} 

	if(levelComplete === false && gameOver === false) {
		requestAnimationFrame(runGame);
	} else if(levelComplete === true){
		winSound.play();
		ctx.fillStyle = "rgb(0, 255, 0)";
		ctx.font = "24px Helvetica";
		ctx.textAlign = "center";
		ctx.textBaseline = "top";
		ctx.fillText("LEVEL COMPLETE!", canvas.width / 2, 60);
		ctx.fillText("(Press spacebar to play again.)", canvas.width / 2, 90);
	} else {
		gameOverSound.play();
		ctx.fillStyle = "rgb(230, 0, 0)";
		ctx.font = "24px Helvetica";
		ctx.textAlign = "center";
		ctx.textBaseline = "top";
		ctx.fillText("Game Over!", canvas.width / 2, 60);
		ctx.font = "24px Helvetica";
		ctx.fillText("(Press spacebar to try again.)", canvas.width / 2, 90);
	}
}

addEventListener("keydown", function(e) {
	if(e.keyCode == 32 && gameOver === true || levelComplete === true) {
	 	// Clear the canvas
        ctx.fillStyle = "#000000";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

		gameOver = false;
		count = 0;
		pauseEvent = true;
		gameOver = false;
		levelComplete = false;

		// Layer variables
		a1 = false;
		b1 = false;
		a2 = false;
		b2 = false;
		a3 = false; 
		b3 = false;
		lock1 = false;
		lock2 = false;
		lock3 = false;
		pauseEvent = true;
		setTimeout(function() {
			pauseEvent = false;
		}, 300);
		runGame();
	}
});

runGame();