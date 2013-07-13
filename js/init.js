/* init */
var handleCollisions = function() {}
var time; //current time
var loaded;
var totalLen;
var fps;
var pause = false;
var requestId = 0;
var lastAnimationFrameTime = 0;
var lastFpsUpdateTime = 0;
/* level setting */

function init(chapter) {
	object = []; //empty the objects
	loaded = 0;
	chapter = "chapter" + chapter;
	$.ajax({
		type: "GET",
		url: "js/chapter/" + chapter + ".js",
		async: false,
		dataType: "script"
	}).done(function() {
		/* resource */
		var imgLen = resource[0].length,
			audioLen = resource[1].length;
		totalLen = imgLen + audioLen;
		for (var m = 0; m < imgLen; m++) {
			Sprite(resource[0][m], 0, 0, preloading);
		}
		for (var n = 0; n < audioLen; n++) {
			Sound.load(resource[1][n], preloading);
		}

		/* begin dialog*/
		// words(dialog["begin"]);

		$("#chapter").hide();
	});
}

function preloading() {
	loaded++;
	$("#loading div").stop().animate({
		width: loaded / totalLen * 100 + "%"
	});
}

/* collision detection */

function collides(a, b) {
	OBB1 = new OBB(new Vector2(a.x, a.y), a.width, a.height, a.angle);
	OBB2 = new OBB(new Vector2(b.x, b.y), b.width, b.height, b.angle);
	return CollisionDetector.detectorOBBvsOBB(OBB1, OBB2);
}

/* canvas update */

function clear() {
	canvas.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}

function draw() {
	sign.forEach(function(s) {
		s.draw();
	});
	object.forEach(function(o) {
		o.draw();
	});
	effect.forEach(function(ef) {
		ef.draw();
	});

	handleCollisions();
}

function animate(now) {
	if (!pause) {
		fps = calculateFps(now);
		clear();
		draw();
		time = new Date().getTime();
		requestId = requestAnimationFrame(animate);
	}
}

function calculateFps(now) {
	var fps = 1000 / (now - lastAnimationFrameTime);
	lastAnimationFrameTime = now;

	if (now - lastFpsUpdateTime > 1000) {
		lastFpsUpdateTime = now;
		$("#fps").text(fps.toFixed(0));
	}

	return fps;
}

requestId = requestAnimationFrame(animate);
function start() {
	if (loaded == totalLen) {
		pause = false;
		cancelAnimationFrame(requestId);
		requestId = requestAnimationFrame(animate);
		$("#dialog").fadeOut();
		$("#loading").hide();
		$("#info").fadeIn();
		$("#stage").fadeIn();
	} else {
		$("#loading").show();
		setTimeout(start, 500);
	}
}

function stop(delay) {
	if(delay){
		setTimeout("start()",delay);
	}
	pause = true;
	cancelAnimationFrame(requestId);
}

function menu() {
	$("#stage").fadeOut();
	$("#info").fadeOut();
	$("#dialog").fadeOut();
	$("#chapter").show();
}

$("#chapter").fadeIn();

/* for checking image position */
// var testIMG = entity();
// testIMG.sprite = Sprite("effect/effect1.png");
// object.push(testIMG);
// testIMG.update = function() {
// 		if (keydown.q) {
// 		  console.log(this.sprite.sourceX+","+this.sprite.sourceY+","+this.width+","+this.height);
// 		}

// 		if (keydown.a) {
// 		  this.sprite.sourceX--;
// 		}
// 		if (keydown.d) {
// 		  this.sprite.sourceX++;       
// 		} 
// 		if (keydown.w) {
// 		  this.sprite.sourceY++;
// 		}
// 		if (keydown.s) {
// 		  this.sprite.sourceY--;
// 		}

// 		if (keydown.up) {
// 		  this.height++; 
// 		}
// 		if (keydown.down) {
// 		  this.height--;       
// 		} 
// 		if (keydown.left) {
// 		  this.width--;
// 		}
// 		if (keydown.right) {
// 		  this.width++;
// 		}

//   };
//   testIMG.draw = function() {
// 	canvas.fillStyle = "#998";
// 	canvas.fillRect(this.x, this.y, this.width, this.height);
// 	this.sprite.draw(canvas, this.x, this.y, this.width, this.height);
// 	this.update();
//   };