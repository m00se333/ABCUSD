var newMembersMockup = {}
var nameField = $("#name");
var phoneField = $("#phone");
var emailField = $("#email");
var $submitButton = $("#updateButton");
var $previewButton = $("#previewData");
var $previewWindow = $("#updatePreview");

var config = {
    apiKey: "AIzaSyBRgj_iW46CU6Ur2X0u6_nu5FEqDRlzwPQ",
    authDomain: "abcusdserver.firebaseapp.com",
    databaseURL: "https://abcusdserver.firebaseio.com",
    storageBucket: "",
  };
firebase.initializeApp(config);


function captureInput(node, eventHandler){
      node.on(eventHandler, function(event){
          event.preventDefault();

          var inputFields = {
            name: nameField.val(),
            phone: phoneField.val(),
            email: emailField.val()
          };
          
          newMembersMockup.push(inputFields);
          var previewTemplate = $("#previewItem").html();
          var template = Handlebars.compile(previewTemplate);
          var previewTemplateHTML = template(inputFields);
          var $previewTemplateHTML = $(previewTemplateHTML);
          $("#updatePreview").append($previewTemplateHTML);
          console.log(newMembersMockup);
          //throwing jade handlebars templates.

          firebase.database().ref("/CAC").push(inputFields);
        });

}

function pushUpdates(node, eventHandler){
  node.on(eventHandler, function(event){
    event.preventDefault();
    firebase.database().ref("/CAC").set(newMembersMockup)
  })
}




captureInput($submitButton, "click");
pushUpdates($previewButton, "click");





