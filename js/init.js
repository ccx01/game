var time=0;

var CANVAS_WIDTH = 900;
var CANVAS_HEIGHT = 600;

var canvasElement = $("<canvas width='" + CANVAS_WIDTH +"' height='" + CANVAS_HEIGHT + "' id='myCanvas' ></canvas>");
var canvas = canvasElement.get(0).getContext("2d");

canvasElement.appendTo('#stage');

var mouseX = 0,
    mouseY = 0;
$("#stage").mousemove(function(e){
    mouseX = e.pageX - this.offsetLeft,
    mouseY = e.pageY - this.offsetTop;

    curX = e.pageX,
    curY = e.pageY;    
});

var FPS = 30;
var start=setInterval(function() {
  info();
  update();
  draw();
  time = new Date().getTime();
}, Math.floor(1000 / FPS));


