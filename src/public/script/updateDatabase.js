var newDataArray = [];
var nameField = $("#name");
var phoneField = $("#phone");
var emailField = $("#email");
var $submitButton = $("#updateButton");
var $sendData = $("#sendData");
var $previewWindow = $("#updatePreview");
var $deletePreviewButton = $("#deletePreview");
var $deleteDatabaseButton = $("#deleteExistingDatabase")
var $retrieveButton = $("#retrieveDatabase");
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

// tests for the selected endpoint being chosen
function testFor(option){
  if ($("#updateChoice").html() === option){
    return true
  } else {
    return false
  }
}

// create/update funcitionality
// THIS IS THE SUBMIT BUTTON
// Depending on the selected endpoint you want to edit
// you will be given a different prompt/interface
// when you click the submit button it makes a preview
// of the type of data you're entering as well as populating
// the object newDataArray you will be sending to Firebase
function captureInput(node){

    node.on("click", function(event){
          event.preventDefault();
          
          if (testFor("CAC Officers")){
              
              console.log("officers");
              var inputFields = {
              a_Name: $("#name").val(),
              b_Phone: $("#phone").val(),
              c_email: $("#email").val()
              };

              removeEmptyFields(inputFields);
              newDataArray.push(inputFields)
              selectFormTemplate($("#previewMember"), inputFields, $("#updatePreview"))
              
              clearFields();

          } else if (testFor("CAC Events")){
              
              console.log("events");
              var inputFields = {
                a_Date: $("#eventDate").val(),
                b_Title: $("#eventTitle").val(),
                c_SubHeading: $("#eventSubheading").val(),
                d_Location: $("#eventLocation").val()
              };

              removeEmptyFields(inputFields);
              newDataArray.push(inputFields);
              selectFormTemplate($("#previewEvent"), inputFields, $("#updatePreview"))
              
              clearFields();

          } else if (testFor("Staff List")) {
              console.log("staff list");
              var inputFields = {
                a_AgentName: $("#agentName").val(),
                b_AgentTitle: $("#agentTitle").val(),
                c_AgentExtension: "x" +$("#agentExtension").val(),
                d_Secretary: $("#secretary").val(),
                e_SecretaryExtension: "x" + $("#secretaryExtension").val()
              };

              removeEmptyFields(inputFields);
              newDataArray.push(inputFields);
              selectFormTemplate("#previewStaff", inputFields, $("#updatePreview"));

              clearFields();
          };
    });

}

// Updataing Database
// When clicking the "push updates button"
// this function gathers all the information from the object
// that populates the preview and then pushes that object
// up to Firebase depending on the endpoint represented
// buy the selected box in yellow.
function pushUpdates(node){
    node.on("click", function(event){
        
        event.preventDefault();

        if (testFor("CAC Officers")){

          firebase.database().ref("/CAC_Members").set(newDataArray);
        
        } else if (testFor("CAC Events")) {
          
          firebase.database().ref("/CAC_Events").set(newDataArray);
        
        } else if (testFor("Staff List")){
          
          firebase.database().ref("/Staff").set(newDataArray);
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


function retrieveEndpoint(node){
  node.on("click", function(event){
    event.preventDefault();


        function retrieveEndpointData(endpoint, template){
          firebase.database().ref(endpoint).once("value", function(snapshot){
                  var databaseLength = snapshot.val().length;
                    for (var x = 0; x < databaseLength; x++){
                      //newDataArray.push(snapshot.child(x).val());
                      var item = snapshot.child(x).val();

                      selectFormTemplate(template, item, $("#updatePreview"))
                    }
                });
          }


              if (testFor("CAC Officers")){

                retrieveEndpointData("CAC_Members", $("#previewMember"));

              } else if (testFor("CAC Events")){
                retrieveEndpointData("CAC_Events", $("#previewEvent"));

              } else if (testFor("Staff List")){
                retrieveEndpointData("Staff", $("#previewStaff"));
              }
      })

}


// After confirming moving forward this will delete all data
// at the selected endpoint (yellow box) and cause the page
// that depends on the data to render the "updating" message.
function deleteDatabaseData(node){
    node.on("click", function(event){
      event.preventDefault();
        
      if (confirm("This will delete the database for " + $("#updateChoice").html() + " and put the page in update mode.")){

            if (testFor("CAC Officers")){

              firebase.database().ref("/CAC_Members").remove();
            
            } else if (testFor("CAC Events")) {
              
              firebase.database().ref("/CAC_Events").remove();
            
            } else if (testFor("Staff List")){
              
              firebase.database().ref("/Staff").remove();
            } 
        } 

    });
};

// delets the preview and empties the data object you're currently populating.
function deletePreview(node){
  node.on("click", function(event){
    event.preventDefault();
    $previewWindow.children().empty();
    newDataArray = [];
  });
};

// clear the form when submitting a new item to the preview
function clearForm(node){
  $("#updateItem").children().remove();
}

// get the template you want, the object you want to pass, and the node you want to append it to.
function selectFormTemplate(template, object, destination){
  var editTextTemplate = $(template).html();
  var template = Handlebars.compile(editTextTemplate);
  var editTextHTML = template(object);
  var $editTextHTML = $(editTextHTML);
  $(destination).append($editTextHTML);
}

// switching endpoints clears out the current form and replaces it with the correct endpoint interface.
// (forms you enter the data into)
function switchAndDelete(){
    $("#updatePreview .previewBox").remove()
    clearForm($("#updateItem"))
  }

// Switching endpoints to edit/update/delete prompts a confirmation from the user.
// Becuase doing so will erase the preview, empty the object that will be sent to Firebase
// at the end of the session, and render the correct form for the new endpoint.
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
              $("#updatePreview .previewBox").remove()
              clearForm($("#updateItem"))
              selectFormTemplate($("#updateCACMembers"), editChoice, $("#updateItem"));

            } else if (editChoice.text === "CAC Events") {
              $("#updatePreview .previewBox").remove()
              clearForm($("#updateItem"));
              selectFormTemplate($("#updateCACEvents"), editChoice, $("#updateItem"));

            } else if (editChoice.text === "Staff List") {
              $("#updatePreview .previewBox").remove()
              clearForm($("#updateItem"))
              selectFormTemplate($("#updateStaffList"), editChoice, $("#updateItem"))

            }
              $(".previewBox").empty()
              newDataArray = [];

        } 

    });
}






captureInput($submitButton);
pushUpdates($sendData);
switchCheck($pageChoice);
deletePreview($deletePreviewButton);
deletePreview($sendData);
deleteDatabaseData($deleteDatabaseButton);
retrieveEndpoint($retrieveButton);




