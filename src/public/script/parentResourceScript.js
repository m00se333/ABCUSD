var $brochureSelect = $("#docs");
var brochure = $("#docs option:selected").text();
var $languageSelect = $(".language");
var isiPhone = navigator.userAgent.match(/iPhone/i) != null;
var isiPad = navigator.userAgent.match(/iPad/i) != null;
var pdfMessage = "/static/img/pdfFiller.png";



$(function(){
  var map = {
    "eng" : "English",
    "esp" : "Español",
    "kor" : "한국어",
    "viet" : "Tiếng Việt",
    "chin" : "中文"
  }
  $brochureSelect.on("change", function(){

    $(".language").html("");
    

    var selected = $("option:selected", this).attr("class");

    var arr = selected.split(" ");

    arr.forEach(function(k){
     
    $(".language").append("<option id="+k+">"+map[k]+"</option>");
    });
  });
});

        

    if (isiPhone === true){
          $("#langSelectBox").after($("#preview"));
          $brochureSelect.on("change", function(){
            var buttonFile = "/static/pdf/ABCUSDpdfs/" + $("#docs option:selected").attr("id") + "/selpaeng.pdf";
            var file = "./public/pdf/ABCUSDpdfs/" + $("#docs option:selected").attr("id") + "/engSELPA.jpg";
            $("#pdfButton").remove();
              if ($("#docs option:selected").text().match("^-")){
                $("#langSelectBox .language").hide();
                $("#preview img").attr("src", pdfMessage);
                $("#preview a").attr("href", "")
                $("#preview a").attr("target", "")
                
                } else {
                  $("#langSelectBox .language").show();
                  $("#langSelectBox .language").css("display", "block");
                  $("#preview img").attr("src", file)
                  $("#preview a").attr("href", "/static/pdf/ABCUSDpdfs/" + $("#docs option:selected").attr("id") + "/selpaeng.pdf");
                  $("#preview a").attr("target", "_blank");
                  }
            });

            $languageSelect.on("change", function(){
             $("#preview img").attr("src","./public/pdf/ABCUSDpdfs/" + $("#docs option:selected").attr("id") + "/" + $(".language option:selected").attr("id") + "SELPA.jpg");
             $("#preview a").attr("href", "/static/pdf/ABCUSDpdfs/" + $("#docs option:selected").attr("id") + "/selpa" + $(".language option:selected").attr("id") + ".pdf");
             $("#pdfButton").attr("href", "/static/pdf/ABCUSDpdfs/" + $("#docs option:selected").attr("id") + "/selpa" + $(".language option:selected").attr("id") + ".pdf");
             $("#preview a").attr("target", "_blank");
              //console.log(file);
            });
        } else if (isiPad === true) {
          
              $("#langSelectBox").after($("#preview"))
              $brochureSelect.on("change", function(){
              var file = "/static/pdf/ABCUSDpdfs/" + $("#docs option:selected").attr("id") + "/engSELPA.jpg";
              
              if ($("#docs option:selected").text().match("^-")){
                    $("#langSelectBox .language").hide();
                    $("#preview img").attr("src", pdfMessage);
                    $("#preview a").attr("href", "")
                    $("#preview a").attr("target", "")

                    } else {
                    $("#langSelectBox .language").show();
                    $("#preview img").attr("src", file)
                    $("#preview a").attr("href", "pdf/ABCUSDpdfs/" + $("#docs option:selected").attr("id") + "/selpaeng.pdf");
                    $("#preview a").attr("target", "_blank");
                    }

            });

            $languageSelect.on("change", function() {
             $("#preview img").attr("src","/static/pdf/ABCUSDpdfs/" + $("#docs option:selected").attr("id") + "/" + $(".language option:selected").attr("id") + "SELPA.jpg")
             $("#preview a").attr("href", "/static/pdf/ABCUSDpdfs/" + $("#docs option:selected").attr("id") + "/selpa" + $(".language option:selected").attr("id") + ".pdf");
             $("#preview a").attr("target", "_blank");
           });
        //end else if
          } else {

        $brochureSelect.on("change", function(){
         
          var file = "./public/pdf/ABCUSDpdfs/" + $("#docs option:selected").attr("id") + "/engSELPA.jpg";
          
        	
          if ($("#docs option:selected").text().match("^-")){
        	 	$("#langSelectBox .language").hide();
            $("#preview img").attr("src", pdfMessage);
            $("#preview a").attr("href", "")
            $("#preview a").attr("target", "")
            
        	} else {
        		$("#langSelectBox .language").show();
        	  $("#preview img").attr("src", file)
            $("#preview a").attr("href", "/static/pdf/ABCUSDpdfs/" + $("#docs option:selected").attr("id") + "/selpaeng.pdf");
            $("#preview a").attr("target", "_blank")
          }
            
        });

        $languageSelect.on("change", function() {
         $("#preview img").attr("src","./public/pdf/ABCUSDpdfs/" + $("#docs option:selected").attr("id") + "/" + $(".language option:selected").attr("id") + "SELPA.jpg");
         $("#preview a").attr("href", "/static/pdf/ABCUSDpdfs/" + $("#docs option:selected").attr("id") + "/selpa" + $(".language option:selected").attr("id") + ".pdf");
         $("#preview a").attr("target", "_blank");
       });
          
      }

      
