/* init */
var handleCollisions = function (){}
var player = [];
var enemies = [];
var game;
var loaded = 0;
var totalLen = 0;
/* level setting */
function init(chapter){
	chapter = "chapter"+chapter || "chapter"+1;
	$.ajax({
	  type: "GET",
	  url: "js/chapter/"+chapter+".js",
	  async:false, 
	  dataType: "script"
	}).done(function(){
		/* resource */
		var imgLen = resource[0].length,
			audioLen = resource[1].length;
		totalLen = imgLen+audioLen;
		for(var m=0;m<imgLen;m++){
			Sprite(resource[0][m],0,0,preloading);
		}
		for(var n=0;n<audioLen;n++){
			Sound.load(resource[1][n],preloading);
		}

		/* begin dialog*/
		words(dialog["begin"]);

	});
}

function preloading(){
	loaded++;
	$("#loading div").stop().animate({width:loaded/totalLen*100+"%"});
}
function words(word){	//对白处理
	var i=0,
	    len=word.length-1;

	$(word[i].position+" img").attr("src","images/avatar/"+word[i].avatar);
	$(".words").html(word[i].words);

	$("#dialog .next,.words").click(function(){
		if(i<len) i++;
		$(word[i].position+" img").attr("src","images/avatar/"+word[i].avatar);
		$(".words").html(word[i].words);
	});
	$("#dialog .prev").click(function(){
		if(i>0) i--;
		$(word[i].position+" img").attr("src","images/avatar/"+word[i].avatar);
		$(".words").html(word[i].words);
	});
}
function start(){
	if(loaded==totalLen){
		clearInterval(game);  //防止在网络延迟下多次发送ajax请求触发多个setinterval
		game=setInterval(function() {
		  update();
		  draw();
		  time = new Date().getTime();
		}, Math.floor(1000 / FPS));
		$("#dialog").hide();
		$("#info").show();
		$("#loading").hide();
	}else{
		$("#loading").show();
		setTimeout(start,500);
	}
}