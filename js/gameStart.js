var time = 0;

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
});

var FPS = 30;

init(1);


/* for checking image position */
/*var testIMG = entity();
testIMG.sprite = Sprite("characters/ochi");
player.push(testIMG);
  testIMG.control=function(){
        if (keydown.q) {
          console.log(this.sprite.sourceX+" "+this.sprite.sourceY+" "+this.width+" "+this.height);
        }

        if (keydown.a) {
          this.sprite.sourceX--;
        }
        if (keydown.d) {
          this.sprite.sourceX++;       
        } 
        if (keydown.w) {
          this.sprite.sourceY++;
        }
        if (keydown.s) {
          this.sprite.sourceY--;
        }

        if (keydown.up) {
          this.height++; 
        }
        if (keydown.down) {
          this.height--;       
        } 
        if (keydown.left) {
          this.width--;
        }
        if (keydown.right) {
          this.width++;
        }

  };
  testIMG.draw = function() {
    canvas.fillStyle = "#998";
    canvas.fillRect(this.x, this.y, this.width, this.height);
    this.sprite.draw(canvas, this.x, this.y, this.width, this.height);
  };*/