var newMembersMockup = [];
var nameField = $("#name");
var phoneField = $("#phone");
var emailField = $("#email");
var $submitButton = $("#updateButton");
var $previewButton = $("#sendData");
var $previewWindow = $("#updatePreview");
var $deletePreviewButton = $("#deletePreview");
var $deleteDatabaseButton = $("#deleteExistingDatabase")
var $pageChoice = $(".choice");
var config = {
    apiKey: "AIzaSyBRgj_iW46CU6Ur2X0u6_nu5FEqDRlzwPQ",
    authDomain: "abcusdserver.firebaseapp.com",
    databaseURL: "https://abcusdserver.firebaseio.com",
    storageBucket: "",
  };
firebase.initializeApp(config);

function clearFields(){
  $("#updateItem input[type=text], textarea").val("");
}


function removeEmptyFields(object) {
  for (key in object){
    if (object[key] === "" || object[key] === "x"){
      delete object[key];
    }
  }
}

// create/update funcitionality
// THIS IS THE SUBMIT BUTTON
// Depending on the selected endpoint you want to edit
// you will be given a different prompt/interface
// when you click the submit button it makes a preview
// of the type of data you're entering as well as populating
// the object newMembersMockUp you will be sending to Firebase
function captureInput(node){

    node.on("click", function(event){
          event.preventDefault();
          
          if ($("#updateChoice").html() === "CAC Officers"){
              
              console.log("officers");
              var inputFields = {
              a_Name: $("#name").val(),
              b_Phone: $("#phone").val(),
              c_email: $("#email").val()
              };

              removeEmptyFields(inputFields);
              newMembersMockup.push(inputFields)
              selectFormTemplate($("#previewMember"), inputFields, $("#updatePreview"))
              
              clearFields();

          } else if ($("#updateChoice").html() === "CAC Events"){
              
              console.log("events");
              var inputFields = {
                a_Date: $("#eventDate").val(),
                b_Title: $("#eventTitle").val(),
                c_SubHeading: $("#eventSubheading").val(),
                d_Location: $("#eventLocation").val()
              };

              removeEmptyFields(inputFields);
              newMembersMockup.push(inputFields);
              selectFormTemplate($("#previewEvent"), inputFields, $("#updatePreview"))
              
              clearFields();

          } else if ($("#updateChoice").html() === "Staff List") {
              console.log("staff list");
              var inputFields = {
                a_AgentName: $("#agentName").val(),
                b_AgentTitle: $("#agentTitle").val(),
                c_AgentExtension: "x" +$("#agentExtension").val(),
                d_Secretary: $("#secretary").val(),
                e_SecretaryExtension: "x" + $("#secretaryExtension").val()
              };

              //Makes sure no null values are sent eliminating
              //unnecessary blank fields on the database
              removeEmptyFields(inputFields);

              if (newMembersMockup.length === 0){
                
              } else {
                newMembersMockup.push(inputFields);
              }
              
              selectFormTemplate("#previewStaff", inputFields, $("#updatePreview"));

              clearFields();
          };
    });

}

// Updataing Database
function pushUpdates(node){
    node.on("click", function(event){
        
        event.preventDefault();

        if ($("#updateChoice").html() === "CAC Officers"){

          firebase.database().ref("/CAC_Members").set(newMembersMockup);
        
        } else if ($("#updateChoice").html() === "CAC Events") {
          
          firebase.database().ref("/CAC_Events").set(newMembersMockup);
        
        } else if ($("#updateChoice").html() === "Staff List"){
          
          firebase.database().ref("/Staff").set(newMembersMockup);
        }
    });
};

// Retrieving Data but this is done on the backend when the page is loaded.

/*$previewButton.on("click", function(event){
  event.preventDefault();
  firebase.database().ref("CAC").once("value", function(snapshot){
    var databaseLength = snapshot.val().length;
    for (var x = 0; x < databaseLength; x++){
      console.log(snapshot.child(x).val());
    }
  });
});
*/

function deleteDatabaseData(node){
    node.on("click", function(event){
      event.preventDefault();
        
      if (confirm("This will delete the database for " + $("#updateChoice").html() + " and put the page in update mode.")){


        if ($("#updateChoice").html() === "CAC Officers"){

          firebase.database().ref("/CAC_Members").remove();
        
        } else if ($("#updateChoice").html() === "CAC Events") {
          
          firebase.database().ref("/CAC_Events").remove();
        
        } else if ($("#updateChoice").html() === "Staff List"){
          
          firebase.database().ref("/Staff").remove();
        }
      } else {

      }

    });
};


function deletePreview(node){
  node.on("click", function(event){
    event.preventDefault();
    $previewWindow.children().empty();
    newMembersMockup = [];
  });
};

function clearForm(node){
  $("#updateItem").children().remove();
}

function selectFormTemplate(template, object, destination){
  var editTextTemplate = $(template).html();
  var template = Handlebars.compile(editTextTemplate);
  var editTextHTML = template(object);
  var $editTextHTML = $(editTextHTML);
  $(destination).append($editTextHTML);
}


function switchCheck(node){
    node.on("click", function(event){
      event.preventDefault();

      if (confirm("You're about to edit another field. Doing this will delete your current work.")){
       
     
      $("#editField").empty();
      $(this).css("background", "yellow");
      $(this).css("color", "black");
      $(this).attr("id", "selected")
      $(this).siblings().css("background", "#4682b4");
      $(this).siblings().css("color", "white");
      $(this).siblings().removeAttr("id");

      // $("#selected") is a dynamically created class on line 98
      var editChoice = {text: $("#selected span").html()};
      //Handlebars
      selectFormTemplate($("#previewText"), editChoice, $("#editField"))
      
      if(editChoice.text === "CAC Officers"){

          clearForm($("#updateItem"))
          selectFormTemplate($("#updateCACMembers"), editChoice, $("#updateItem"));

        } else if (editChoice.text === "CAC Events") {

          clearForm($("#updateItem"));
          selectFormTemplate($("#updateCACEvents"), editChoice, $("#updateItem"));

        } else if (editChoice.text === "Staff List") {
          
          clearForm($("#updateItem"))
          selectFormTemplate($("#updateStaffList"), editChoice, $("#updateItem"))

        }
          $(".previewBox").empty()
          newMembersMockup = [];

      } else {

      };

    });
}



captureInput($submitButton);
pushUpdates($previewButton);
switchCheck($pageChoice);
deletePreview($deletePreviewButton);
deleteDatabaseData($deleteDatabaseButton)





