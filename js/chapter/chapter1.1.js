/* preload images and audio */
var resource = [
	['characters/ochi.png', 'characters/cross.png'],
	['atk', 'beaten', 'hit']
];

/*********map init*********/
$("#stage").css({
	'background':'url("images/map/bg1.png")',
	'background-position': '0px 0px',
	'background-repeat': 'no-repeat'
});
var map = {
	'width':1900,
	'height':1000
}

var CGwidth,CGheight,CGstep=1;
var CGcontent = function(w,h,time,auto){
	$("#cg").animate({
		"width": w,
		"height": h,
		"top": "50%",
		"left": "50%",
		"margin-left": -w/2,
		"margin-top": -h/2
	},time,function() {
		if(auto){
			CGstep++;
			CG(CGstep);
		}
    });	
}
var CG = function(step){
	switch(step){	
		case 1:
			CGstep=1;
			$(".tip").off().hide();
			$("#cg .content").html("");
			$(".shadow,#cg").fadeIn();
			CGwidth=200;
			CGheight=80;
			CGcontent(CGwidth,CGheight,1000,true);
		break;
		case 2:
			$("#cg .content").html("喂!");
			$("#cg").css({
				"-webkit-animation":"wobble 2s 1"
			});
			CGcontent(CGwidth,CGheight,2000,true);
		break;
		case 3:
			$("#cg .content").html("喂!奥兹!");
			CGcontent(CGwidth,CGheight,1000,true);	
		break;
		case 4:
			$("#cg .content").html("奥兹？");
			$("#cg").css({
				"-webkit-animation":"wobble 1s 1"
			});
			CGcontent(CGwidth,CGheight,3000,true);
		break;
		case 5:
			$("#cg .content").html("……");
			CGcontent(CGwidth,CGheight,2000,true);
		break;
		case 6:
			$("#cg .content").html("……睡着了？");
			CGcontent(CGwidth,CGheight,3000,true);
		break;
		case 7:
			$("#cg .content").html("…………………………");
			CGcontent(CGwidth,CGheight,1000,true);
		break;
		case 8:
			$("#cg .content").html("");
			CGcontent(CGwidth,CGheight,2000,true);
		break;
		case 9:
			CGwidth=900;
			CGheight=600;
			$("#cg .content").html("");
			$("#cg .content").css({
				"background-image":"url(images/chapter/chapter1/op1_3.png)",
				"background-position":"0px 0px",
				"background-color":"#fff"
			});
			$("#cg").css({
				"-webkit-animation":"shake .5s 1"
			});
			CGcontent(CGwidth,CGheight,100);

			$(".tip").show().click(function(){
					CGstep++;
			    	CG(CGstep);
			});
		break;
		case 10:
			$("#cg .content").css({
				"background-image":"url(images/chapter/chapter1/op1_4.png)"
			});
		break;
		case 11:
			$("#cg .content").css({
				"background-image":"url(images/chapter/chapter1/op1_5.png)"
			});
		break;
		case 12:
			$("#cg .content").css({
				"background-image":"url(images/chapter/chapter1/op1_6.png)"
			});
		break;
		case 13:
			$("#cg .content").css({
				"background-image":"url(images/chapter/chapter1/op1_7.png)"
			});
		break;
		case 14:
			$("#cg .content").css({
				"background-image":"url(images/chapter/chapter1/op1_8.png)"
			});
		break;
		default:
			$(".tip").hide();
			$("#cg").animate({
				"width": 300,
				"height": 95,
				"top": 150,
				"left": "0%",
				"margin-left": 0,
				"margin-top": 0
			},500);
			$("#cg .content").css({
				"background":"none"
			}).html("揍它身上发光的地方<br>不要被它咬到");
			chapterInit();
	}
}

var WIN = function(step){
	switch(step){	
		case 1:
			CGwidth=900;
			CGheight=600;
			$(".shadow,#cg").fadeIn();
			$("#cg .content").css({
				"background-image":"url(images/chapter/chapter1/win1.png)",
				"background-color":"#fff"
			});
			CGcontent(CGwidth,CGheight,500);
		break;
		default:
			CGwidth=0;
			CGheight=0;
			$("#cg .content").css({
				"background":"none"
			});
			$(".shadow,#cg").fadeOut(1000);
			menu();
			$(".chapter2").removeClass("locked");
	}
}

var LOSE = function(step){
	switch(step){	
		case 1:
			CGwidth=900;
			CGheight=600;
			$(".shadow,#cg").fadeIn();
			$("#cg .content").css({
				"background-image":"url(images/chapter/chapter1/lose1.png)",
				"background-color":"#fff"
			});
			CGcontent(CGwidth,CGheight,1000);
		break;
		default:
			CGwidth=0;
			CGheight=0;
			$("#cg .content").css({
				"background":"none"
			});
			$(".shadow,#cg").fadeOut(1000);
			menu();
	}
}

$.when(
$.ajax({
	url: "js/characters/ochi.js",
	async: false,
	dataType: "script"
}),
$.ajax({
	url: "js/characters/cos.js",
	async: false,
	dataType: "script"
})).done(function() {

});

var chapterInit = function(){
	/* load object */
	object.push(ochi);
	$("#player").addClass("ochi");
	for (var i = 0; i < len; i++) {
	    object.push(node[i]);
	}
	$("#enemy").addClass("cos");
	node[0].target=ochi;

	$(".ochi .avatar img").attr("src","images/avatar/ochi/p1.png")
	$(".ochi .hp div").animate({
	    "width": "100%"
	});
	$(".cos .avatar img").attr("src","images/avatar/cos/p1.png")
	$(".cos .hp div").animate({
	    "width": "100%"
	});


	start();
}

handleCollisions = function() {

	node.forEach(function(enemy) {
		if (collides(enemy, ochi)) {
			if (ochi.action != "atk") {
				ochi.bounce.speed = 5;
				ochi.bounce.angle = Math.atan2(ochi.y - node[0].y, ochi.x - node[0].x);
				ochi.bounce.timer = time;
				ochi.bounce.cd = 50;
				ochi.action = "bounce";
			}
		}
	});

	ochi.areaAtk.forEach(function(atk) {
		if (collides(node[weak], atk)) {
			node[0].hurt(ochi.damage);
		}
		node.forEach(function(enemy) {
			if (collides(enemy, atk)) {
				if(ochi.skillName=="uppercut"){
					node[0].shake(1000);
					atk.col=true;
					atk.count=0;
				}else{
					node[0].shake(200);
				}
				enemy.coll();
			}
		});		
	});

	if (collides(node[0], ochi)) {
		// Sound.play("beaten");
		node[0].bite=true;

		ochi.bounce.speed = 10;
		ochi.bounce.angle = Math.atan2(ochi.y - node[0].y, ochi.x - node[0].x);
		ochi.bounce.timer = time;
		ochi.bounce.cd = 200;
		ochi.action = "bounce";

		node[0].angry -= 1;
		ochi.hurt(1);
	}

	if(ochi.HP<=0){
		CGstep=1;
		setTimeout('LOSE(CGstep)',1000);
		$(".tip").off().click(function(){
			CGstep++;
	    	LOSE(CGstep);
		}).show();
		stop();
	}

	if(node[0].HP<=0){
		CGstep=1;
		setTimeout('WIN(CGstep)',1000);
		$(".tip").off().click(function(){
			CGstep++;
	    	WIN(CGstep);
		}).show();
		stop();
	}

}

CG(CGstep);
// chapterInit();