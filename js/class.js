function entity(I){
  I = I || {};

  I.timer= 0;  //计时用
  I.count=0; //计数用
  I.buff=[];
  I.x = 0;
  I.y = 0;
  I.angle=0;
  I.width = 32;
  I.height = 32;
  I.speed = 2;
  I.sprite = Sprite("model");
  I.draw = function() {
    canvas.save();
    canvas.translate(this.x,this.y);
    canvas.rotate(this.angle);
    this.sprite.draw(canvas, -this.width/2, -this.height/2, this.width, this.height);
    canvas.restore();
  };
  I.update = function(){
    this.x = this.x.clamp(0, CANVAS_WIDTH - this.width);
    this.y = this.y.clamp(0, CANVAS_HEIGHT - this.height);
    this.angle=Math.atan2(mouseY-this.y,mouseX-this.x);
  };
  I.inBounds = function() {
    return I.x >= -100 && I.x <= CANVAS_WIDTH+100 && I.y >= -100 && I.y <= CANVAS_HEIGHT+100;
  };
  return I;
};

/* collision detection */
function collides(a, b) {
    OBB1 = new OBB(new Vector2(a.x, a.y), a.width, a.height, a.angle);
    OBB2 = new OBB(new Vector2(b.x, b.y), b.width, b.height, b.angle);
    return CollisionDetector.detectorOBBvsOBB(OBB1, OBB2);
}

function animation(obj,sx,sy,w,h){
    obj.sprite.sourceX=sx;
    obj.sprite.sourceY=sy;
    obj.width=w||obj.width;
    obj.height=h||obj.height;
}
