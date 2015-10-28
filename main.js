var parentDivSizeModifier = 0.98;
var parentDiv = document.getElementById("parent");
parentDiv.style.width = window.innerWidth * parentDivSizeModifier + "px";
parentDiv.style.height = window.innerHeight * parentDivSizeModifier + "px";

var canvas = document.getElementById("mainCanvas");
var context = canvas.getContext("2d");

//resize div based on the size of the window
window.addEventListener('resize', function() {
	parentDiv.style.width = window.innerWidth * parentDivSizeModifier + "px";
	parentDiv.style.height = window.innerHeight * parentDivSizeModifier + "px";
	canvas.width = parseFloat(parentDiv.style.width);
	canvas.height = parseFloat(parentDiv.style.height);
}, false);

canvas.width = parseFloat(parentDiv.style.width);
canvas.height = parseFloat(parentDiv.style.height);

var canvasWidth = canvas.width;
var canvasHeight = canvas.height;

var startFrameMillis = Date.now();
var endFrameMillis = Date.now();
function getDeltaTime()
{
	endFrameMillis = startFrameMillis;
	
	//returns time in milliseconds
	startFrameMillis = Date.now();
	
	//convert up to seconds -> multiply by 1 / 1000
	var deltaTime = (startFrameMillis - endFrameMillis) * 0.001;
	if (deltaTime > 1)
	{
		deltaTime = 1;
	}
	return deltaTime;
}

function mouseMove(event) {
	var x = 0, y = 0;
	if (event.layerX || event.layerX == 0) {
		x = event.layerX;
		y = event.layerY;
	}
	
	x -= canvas.offsetLeft;
	y -= canvas.offsetTop;
	
	var changeCursor = false;
	for (var i = 0; i < clickableObjects.length; ++i) {
		if (clickableObjects[i].withinRange(x, y)) {
			changeCursor = true;
			clickableObjects[i].highlighted = true;
		} else {
			clickableObjects[i].highlighted = false;
		}
	}
	
	if (changeCursor) {
		document.body.style.cursor = "pointer";
	} else {
		document.body.style.cursor = "";
	}
}

function clicked(event) {
	var x = 0, y = 0;
	if (event.layerX || event.layerX == 0) {
		x = event.layerX;
		y = event.layerY;
	}
	
	x -= canvas.offsetLeft;
	y -= canvas.offsetTop;
	
	for (var i = 0; i < clickableObjects.length; ++i)
	{
		if (clickableObjects[i].withinRange(x, y))
		{
			window.open(clickableObjects[i].linkName, "_blank");
		}
	}
}

canvas.addEventListener("mousemove", mouseMove, false);
canvas.addEventListener("click", clicked, false);

var linkNames = 
[
	"http://wp.me/p39A1n-2j", //room generator
	"http://wp.me/p39A1n-1Z", //project echo + nervous night
	"http://wp.me/p39A1n-21", //music shader + project echo - just images
	"http://wp.me/p39A1n-1w", //project echo
	"http://wp.me/p39A1n-2i", //openGL practice project
	"http://wp.me/p39A1n-1u", //report, music visualisation
];

var displayedNames = 
[
	"Room generator project - C#/Monogame",
	"Project echo and Nervous Night - Unity3D",
	"Images: Music shader and Project Echo",
	"Project echo setup file",
	"OpenGL scene management and shaders",
	"Theory: Music visualisation"
];

var clickableObjects = [];
var heightModifier = 0.75;
var clickableDimensions = new Vector2(50, 50);

//"undefined" != undefined
//to pass undefined as argument, do unquoted undefined
var numLines = 6;
var height = 0;
var heightChange = 100;
var xOffset = canvasWidth * 0.35;
var yOffset = canvasHeight * 0.35;

for (var i = 0; i < numLines; ++i)
{
	var temp = new ClickableObject(xOffset, yOffset + i * heightChange, clickableDimensions.x, clickableDimensions.y);
	clickableObjects.push(temp);
}

for (var i = 0; i < clickableObjects.length; ++i)
{
	clickableObjects[i].setLinkName(linkNames[i]);
}

for (var i = 0; i < clickableObjects.length; ++i)
{
	clickableObjects[i].setDisplayedName(displayedNames[i]);
}

var onScreenSquares = [];
var numLeftSquares = 40;
for (var i = 0; i < numLeftSquares; ++i)
{
	var minDim = 10;
	var maxDim = 30;
	var randDimX = minDim + Math.random() * (maxDim - minDim);
	var randDimY = minDim + Math.random() * (maxDim - minDim);
	
	var minPosX = canvasWidth * 0.05;
	var maxPosX = canvasWidth * 0.25;
	var randPosX = minPosX + Math.random() * (maxPosX - minPosX);
	var randPosY = randDimY + Math.random() * (canvasHeight - randDimY);
	var temp = new BackgroundSquare(randPosX, randPosY, randDimX, randDimY);
	onScreenSquares.push(temp);
}

var numRightSquares = 40;
for (var i = 0; i < numRightSquares; ++i)
{
	var minDim = 10;
	var maxDim = 30;
	var randDimX = minDim + Math.random() * (maxDim - minDim);
	var randDimY = minDim + Math.random() * (maxDim - minDim);
	
	var minPosX = canvasWidth * 0.75;
	var maxPosX = canvasWidth * 0.95
	var randPosX = minPosX + Math.random() * (maxPosX - minPosX);
	var randPosY = randDimY + Math.random() * (canvasHeight - randDimY);
	var temp = new BackgroundSquare(randPosX, randPosY, randDimX, randDimY);
	onScreenSquares.push(temp);
}

function run()
{
	var deltaTime = getDeltaTime();
	update(deltaTime);
	draw();
}

function update(deltaTime)
{
	for (var i = 0; i < clickableObjects.length; ++i)
	{
		clickableObjects[i].update(deltaTime);
	}
	
	for (var i = 0; i < onScreenSquares.length; ++i)
	{
		onScreenSquares[i].update(deltaTime);
	}
}

function draw()
{
	//draw background
	context.fillStyle = "#002E4C";
	context.fillRect(0, 0, canvas.width, canvas.height);
	
	context.font = "72px Verdana";
	context.fillStyle = "#7EC997";
	context.fillText("Raymond Vea", canvasWidth * 0.35, canvasHeight * 0.15);
	
	context.fillRect(canvasWidth * 0.35, canvasHeight * 0.17, context.measureText("Raymond Vea").width, 5);
	
	context.font = "36px Verdana";
	context.fillStyle = "#6AC187";
	context.fillText("Selected work", canvasWidth * 0.4, canvasHeight * 0.25);
	
	for (var i = 0; i < onScreenSquares.length; ++i)
	{
		onScreenSquares[i].draw();
	}
	
	for (var i = 0; i < clickableObjects.length; ++i)
	{
		clickableObjects[i].draw();
	}
}

(function() {
	var onEachFrame;
	if (window.requestAnimationFrame) {
		onEachFrame = function(cb) {
			var _cb = function() {
				cb();
				window.requestAnimationFrame(_cb);
			}
			_cb();
		};
	} else if (window.mozRequestAnimationFrame) {
		onEachFrame = function(cb) {
			var _cb = function() {
				cb();
				window.mozRequestAnimationFrame(_cb);
			}
			_cb();
		};
	} else {
		onEachFrame = function(cb) {
			setInterval(cb, 1000 / 60);
		}
	}
	window.onEachFrame = onEachFrame;
})();
window.onEachFrame(run);
