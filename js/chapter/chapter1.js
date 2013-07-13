/* preload images and audio */
var resource = [
	['characters/ochi.png', 'characters/dolls.png','effect/effect1.png'],
	[]
];

/*********map init*********/
$("#stage").css({
	'background':'url("images/map/bg1_0.jpg")',
	'background-position': '0px 0px',
	'background-repeat': 'no-repeat'
});
var map = {
	'width':900,
	'height':600
}

var CGwidth,CGheight,CGstep=1;
var CGcontent = function(w,h,time){
	$("#cg").animate({
		"width": w,
		"height": h,
		"top": "50%",
		"left": "50%",
		"margin-left": -w/2,
		"margin-top": -h/2
	},time);	
}
var CG = function(step){
	switch(step){	
		case 1:
			$(".tip").off();
			$(".tip").hide();
			$(".shadow,#cg").fadeIn();
			CGwidth=900;
			CGheight=600;
			$("#cg .content").html("");
			$("#cg .content").css({
				"background-image":"url(images/chapter/chapter1/lesson1.png)",
				"background-position":"0px 0px",
				"background-color":"#fff"
			});
			CGcontent(CGwidth,CGheight,1000);

			$("#cg").append('<span class="tip">Click<span id="indicator"></span></span>');
			$(".tip").click(function(){
			    	CG(2);
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
			}).html("鼠标左键移动，按键Q W E攻击<br>干掉那个红色的家伙");
			chapterInit();
			$(".tip").off();
	}
}
var WIN = function(){
	stop();
	$("#info").fadeOut();
	$("#stage").fadeOut(1000,function(){
		init(1.1);
	});
}

$.when(
$.ajax({
	url: "js/characters/ochi.js",
	async: false,
	dataType: "script"
}),
$.ajax({
	url: "js/characters/dolls.js",
	async: false,
	dataType: "script"
})
);

var chapterInit = function(){
	/* load object */
	object.push(ochi);
	object.push(dolls);
	$("#player").addClass("ochi");
	    $(".ochi .avatar img").attr("src","images/avatar/ochi/p1.png")
		$(".ochi .hp div").animate({
	            "width": "10%"
	    });
	ochi.x=120;
	ochi.y=300;
	dolls.HP=5;
	dolls.x=720;
	dolls.y=300;
	$("#enemy").addClass("dolls");
	    $(".dolls .avatar img").attr("src","images/avatar/dolls.png")
	var tHP=dolls.HP / dolls.init.HP * 100;
        $(".dolls .hp div").animate({
            "width": tHP + "%"
        });
	start();	
}

handleCollisions = function() {
	ochi.areaAtk.forEach(function(atk) {
		if (collides(dolls, atk)) {
			if (ochi.action == "atk") {
				if(ochi.skillName=="uppercut"){
					atk.col=true;
					atk.count=0;
				}
				if (time - dolls.bounce.timer > 100) {
					dolls.bounce.angle = Math.atan2(dolls.y - ochi.y, dolls.x - ochi.x);
					dolls.bounce.timer = time;	
					dolls.action = "bounce";
					dolls.coll();
				}
				dolls.hurt(1);
			}
		}
	});
	if (collides(dolls, ochi)) {
		if (ochi.action != "atk") {
			ochi.bounce.speed = 1;
			ochi.bounce.angle = Math.atan2(ochi.y - dolls.y, ochi.x - dolls.x);
			ochi.bounce.timer = time;
			ochi.bounce.cd = 50;
			ochi.action = "bounce";
		}
	}
	if(dolls.HP<1){
		CGstep=1;
	    WIN(CGstep);
	}
}

CG(1);