var isiPhone = navigator.userAgent.match(/iPhone/i) != null;
var isiPad = navigator.userAgent.match(/iPad/i) != null;

if (isiPhone === true || isiPad === true) {
	$("#socialBackground").css("display", "none");
	$("#twitter").attr("src", "/static/img/twitHandle.png");
	$("#facebook").attr("src", "/static/img/fbHandle.png")
}