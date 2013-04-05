var dialog=[
'<img src="images/ui/tipLc.png" / >X1 = 攻击！<br><img src="images/ui/tipRc.png" / >X1 = 移动！<br>',
'如果浏览器安装了鼠标手势之类的扩展，可以<img src="images/ui/tipRc.png" / >X2 = 移动！',
'<div class="start" onclick="gameStart();">start</div>'
];
var i=0,
    len=dialog.length-1;
$("#dialog .next,.words").click(function(){
if(i<len) i++;
$(".words").html(dialog[i]);
});
$("#dialog .prev").click(function(){
if(i>0) i--;
$(".words").html(dialog[i]);
});