var isiPhone = navigator.userAgent.match(/iPhone/i) != null;
var isiPad = navigator.userAgent.match(/iPad/i) != null;


if (isiPhone === true) {
	console.log("iPhone test");
	$("#sList").click(function (){
		$("#mobileStaffList").slideToggle("slow");
	});
	$("#mobileStaffList").click(function (){
		$("#mobileStaffList").slideToggle("slow")
	});
} else if (isiPad === true) {
	console.log("iPad test");
	$("#sList").click(function (){
		$("#mobileStaffList").slideToggle("slow");
	});
	$("#mobileStaffList").click(function (){
		$("#mobileStaffList").slideToggle("slow")
	});
} else {
	console.log("Other test");
	$("#sList").after($("#mobileStaffList"));
	$("#sList").click(function (){
		$("#mobileStaffList").slideToggle("slow")
	});
	$("#mobileStaffList").click(function (){
		$("#mobileStaffList").slideToggle("slow")
	});
}