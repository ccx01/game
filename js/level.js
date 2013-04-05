function info(){
  //$(".info").text("ochi:hp "+ochi.HP+" action "+ochi.action+" summon: hp "+node[0].HP+" angry "+node[0].angry+" mode "+node[0].mode);

  if(node[0].HP==0){
    alert("you win!");
    clearInterval(start);
  }
  if(ochi.HP==0){
    alert("you lose!");
    clearInterval(start);
  }
}

function update() {
  player.forEach(function(p){
    p.control();
    p.update();
  });

  enemies.forEach(function(enemy) {
    enemy.update();
  });

  handleCollisions();

}

function draw() {
  canvas.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  player.forEach(function(p){
    p.draw();
  });

  enemies.forEach(function(enemy) {
    enemy.draw();
  });

}

var handleCollisions = function (){

  enemies.forEach(function(enemy) {
    if (collides(enemy, ochi)) {
      if(ochi.action!="atk"){
        ochi.explode(enemy.x,enemy.y);
      }
    }
  });

  if (collides(node[weak], ochi)) {
    if(ochi.action=="atk"){
      node[0].HP-=1;

      animation(node[weak],60,2);
      animation(ochi,37,65,57,29);

      node[0].angry+=1;
      if(node[0].angry>3){
        node[0].mode="angry";
      }
      weak=Math.ceil(Math.random()*9);
      switch(true){
        case node[0].HP>6:
          animation(node[weak],103,38);
        break;
        case node[0].HP>3:
          animation(node[weak],61,38);
        break;
        case node[0].HP>0:
          animation(node[weak],17,38);
        break;
      }
      
      Sound.play("hit");
    }
  }

  if (collides(node[0], ochi)) {
    if(!ochi.buff.in_array("invincible")){
      Sound.play("beaten");
      node[0].angry-=1;
      ochi.HP-=1;
      ochi.hurt(node[0].x,node[0].y);
    }
  }

}

var player = [];
//Ochi 奥兹
  var ochi = entity();  
  player.push(ochi);
  ochi.sprite = Sprite("characters/ochi");
  ochi.action="manual";   //行为，主要控制移动 跳跃 反弹 恐惧后乱动 硬直
  ochi.HP=5;
  ochi.x=520;
  ochi.y=320;
  ochi.speed=ochi.initSpeed=5;
  ochi.skill=function(){   
    if(time-this.timer>1000){  //1000:cd
      this.timer = new Date().getTime();
      this.action = "atk";
      $(".cd").css("height","75px").animate({"height":0},1000);
      Sound.play("atk");
    }
  };    
  ochi.control=function(){
    switch(this.action){
      case "stiff":
        //do nothing
      break;
      case "atk":
          if(time-this.timer<200){

            animation(this,33,0,46,36);

            this.speed=30;
            this.angle=Math.atan2(mouseY-this.y,mouseX-this.x);
            this.xVelocity = Math.cos(this.angle)*this.speed;
            this.yVelocity = Math.sin(this.angle)*this.speed;
          }else if(time-this.timer<400){

            animation(this,34,36,61,30);

            this.x += this.xVelocity;
            this.y += this.yVelocity;
          }else{
            animation(this,0,0,32,32);

            this.speed=this.initSpeed;
            this.action="manual";
          }
      break;
      case "bounce":
          this.angle=Math.atan2(this.mouseY-this.y,this.mouseX-this.x);
          this.xVelocity = Math.cos(this.angle)*this.speed;
          this.yVelocity = Math.sin(this.angle)*this.speed;
        if(time-this.timer>200){
          this.speed=this.initSpeed;
          this.x = this.mouseX;
          this.y = this.mouseY;
          this.action="manual";
        }else{
          this.x += this.xVelocity;
          this.y += this.yVelocity;
        }
      break;
      default: //manual  if判断，可同时输入多指令

        animation(this,0,0,32,32);

        if (keydown.leftClick) {
          this.skill();
          this.move=false;
        }

        if (keydown.rightClick) {
          this.mouseY=mouseY;
          this.mouseX=mouseX;
          this.move=true;
          /* cursor */
/*          $(".moveCur").css({
            "position":"absolute",
            "left":curX,
            "top":curY,
            "width":22,
            "height":20,
            "background": "url(images/ui/cursor.png) -8px -5px no-repeat"
          });*/
        }
        if(this.move){
            if(this.count==8) this.count=0;
            this.count++;
            this.sprite.sourceY=this.height*Math.floor(this.count/3);

            this.angle=Math.atan2(this.mouseY-this.y,this.mouseX-this.x);
            this.xVelocity = Math.cos(this.angle)*this.speed;
            this.yVelocity = Math.sin(this.angle)*this.speed;

          if(Math.abs(this.mouseX-this.x)<Math.abs(this.xVelocity)){
            this.speed=this.initSpeed;
            this.x = this.mouseX;
            this.y = this.mouseY;
            this.move=false;
          }else{
            this.x += this.xVelocity;
            this.y += this.yVelocity;
          }
        }/*else{
          $(".moveCur").css({
            "background": "url(images/ui/cursor.png) 0px 15px no-repeat"
          });
        }*/

/*        if (keydown.q) {
          //可设置新技能
          this.skill=function(){   //冲刺前蓄力时间与距离相关
            if(time-this.timer>1000){  //1000:cd
              this.timer = new Date().getTime();
              this.action = "atk";
              $(".cd").css("height",0).animate({"height":"100px"},1000);
            }
          };       
        }

        if (keydown.a) {
          this.x -= this.speed;
          this.sprite.sourceY=this.height; 
        }
        if (keydown.d) {
          this.x += this.speed;
          this.sprite.sourceY=this.height*2;       
        } 
        if (keydown.w) {
          this.y -= this.speed;
          this.sprite.sourceY=this.height*3;
        }
        if (keydown.s) {
          this.y += this.speed;
          this.sprite.sourceY=0;
        }
        if(keydown.w||keydown.a||keydown.s||keydown.d){
          if(this.sprite.sourceX==this.width*2)
            this.sprite.sourceX=0;
          else
            this.sprite.sourceX+=this.width;          
        }*/
    }
  };
  ochi.explode=function(x,y){
    this.speed=10;
    this.mouseX=this.x*2-x;  //this.x-(x-this.x)
    this.mouseY=this.y*2-y;
    this.action="bounce";
    this.timer = new Date().getTime();
  };
  ochi.hurt=function(x,y){

    animation(this,95,2,32,32);

    $(".hp div").animate({"width":"-=20%"});

    this.speed=20;
    this.mouseX=this.x*3-x*2;  //this.x-(x-this.x)
    this.mouseY=this.y*3-y*2;
    this.action="bounce";
    this.timer = new Date().getTime();
    ochi.buff.push("invincible");  //防止受到连续伤害
    setTimeout(function(){
      ochi.buff.remove("invincible");
    },1000);
  };

//monster

  var enemies = [];

  var node=[],
      weak=3,
      len=12;
  //Ming's summon 冥的召唤兽 风氏
  //body
  for(var i=0;i<len;i++){
    node[i]=entity();
    enemies.push(node[i]);

    node[i].sprite=Sprite("characters/fs",60,2);
    node[i].id=i;
    node[i].width=30;
    node[i].height=31;
    node[i].update = function() {
      //save the last position
      this.langle=this.angle;
      this.lx=this.x;
      this.ly=this.y;

      switch(node[0].mode){
        case "swing":
          this.angle=node[this.id-1].langle;   //甩尾
        break;
        default:
          this.angle=Math.atan2(node[this.id-1].ly-this.y,node[this.id-1].lx-this.x);  //蛇行
      }
          this.x = node[this.id-1].lx-0.9*this.width*Math.cos(this.angle);  // 0.9*this.width 风妖身体间距
          this.y = node[this.id-1].ly-0.9*this.height*Math.sin(this.angle);  //this width should be same with this height
    };
  }

  node[weak].sprite = Sprite("characters/fs",103,38);; //17,61,103

  node[len-1].sprite = Sprite("characters/fs",0,0);
  node[len-1].width=52;
  node[len-1].height=35;
  node[len-1].update = function() {          
      this.angle=node[this.id-1].langle;  //for the spacial node (width is different with height)
      this.x = node[this.id-1].lx-0.3*this.width*Math.cos(this.angle);  
      this.y = node[this.id-1].ly-0.3*this.height*Math.sin(this.angle);  
  }

  //summon core
  node[0].mode="random";
  node[0].HP=10;
  node[0].angry=0;
  node[0].speed=5;
  node[0].x=0;
  node[0].y=200;
  node[0].sprite = Sprite("characters/fs",89,0);
  node[0].width=61;
  node[0].height=35;
  node[0].update=function(){
      this.langle=this.angle;
      this.lx=this.x;
      this.ly=this.y;

      if(this.angry>3&&this.mode!="angry"){
        this.mode="angry";
      }
      if(this.angry<0){
        this.angry=0;
        this.mode="random";
      }

      switch(this.mode){
        case "random":
          if(Math.random() < 0.05) {
            this.direction=Math.atan2(Math.random()*400-this.y,Math.random()*700-this.x);
          }
          if(!this.inBounds()){
            this.angle=this.direction;
          }
          this.aVelocity = this.direction<this.angle ? -Math.PI / 60 : Math.PI / 60;  // angular velocity
          this.angle = Math.abs(this.direction-this.angle)<0.1 ? this.direction:this.angle+this.aVelocity;
        break;
        case "angry":
          this.angle=Math.atan2(ochi.y-this.y,ochi.x-this.x);      //紧追
          this.angry-=1/FPS;
          if(this.angry<0){
            this.angry=0;
            this.mode="move";
          }
        break;
        case "control":
          this.angle=Math.atan2(mouseY-this.y,mouseX-this.x);     //鼠标操纵
        break;
        default:  //"move"
          /* 不完全追踪 */
          this.direction=Math.atan2(ochi.y-this.y,ochi.x-this.x);
          if(!this.inBounds()){
            this.angle=this.direction;
          }
          this.aVelocity = this.direction<this.angle ? -Math.PI / 60 : Math.PI / 60;
          this.angle = Math.abs(this.direction-this.angle)<0.1 ? this.direction:this.angle+this.aVelocity;
          /* 不完全追踪 end */
      }

      this.xVelocity=this.speed*Math.cos(this.angle);
      this.yVelocity=this.speed*Math.sin(this.angle);

      this.x += this.xVelocity;  
      this.y += this.yVelocity;

  }


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