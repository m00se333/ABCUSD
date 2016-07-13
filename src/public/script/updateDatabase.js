var newMembersMockup = [];
var nameField = $("#name");
var phoneField = $("#phone");
var emailField = $("#email");
var $submitButton = $("#updateButton");
var $previewButton = $("#previewData");
var $previewWindow = $("#updatePreview");
var $deleteButton = $("#deleteButton");
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

// create/update funcitionality
function captureInput(node, eventHandler){
      
      node.on(eventHandler, function(event){
          event.preventDefault();
          var inputFields = {
            a_Name: nameField.val(),
            b_Phone: phoneField.val(),
            c_email: emailField.val()
          };

          for (key in inputFields){
            if (inputFields[key] === ""){
              delete inputFields[key];
            }
          }
          
          newMembersMockup.push(inputFields)
          var previewTemplate = $("#previewItem").html();
          var template = Handlebars.compile(previewTemplate);
          var previewTemplateHTML = template(inputFields);
          var $previewTemplateHTML = $(previewTemplateHTML);
          $("#updatePreview").append($previewTemplateHTML);
          console.log(newMembersMockup);
          //throwing jade handlebars templates.
          clearFields();
        });

}

// Updataing Database
function pushUpdates(node, eventHandler){
  node.on(eventHandler, function(event){
    event.preventDefault();
    firebase.database().ref("/CAC").set(newMembersMockup)
  })
}

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

function deleteCheck(node, eventHandler){
  node.on(eventHandler, function(event){
    event.preventDefault();
    firebase.database().ref("CAC").remove();
    $previewWindow.children().empty();
  });
};




captureInput($submitButton, "click");
pushUpdates($previewButton, "click");
deleteCheck($deleteButton, "click");





