"use strict";

var express = require("express");
//var	cacOfficers = require("./test.js");
var	cacEvents = require("./test2.js");
var firebase = require("firebase");
firebase.initializeApp({
  databaseURL: "https://abcusdserver.firebaseio.com/",
  serviceAccount: {
  "type": "service_account",
  "project_id": "abcusdserver",
  "private_key_id": "de201c32c9d8bdc97c8cbfe409a59c0c82b45de9",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCPKvI6BMcZBcOB\n66ssmotfF2lY5F+U4jKEoueXouQHiqnWNg9GQVM5SCzYyll7NQppLGOmMLKpLKYi\nn4FteKpeSADWEvZuAV2qbNGcvpAgqi4jIeIpvGp6AMO6U0J4SKL2yodw5T6uKJ/i\n86cneQpgMlgOHmHjj3L49F/4xIMu1VYrZkqE2lUSJmS00JMMIRrXaVLyADRJciTt\nwSrELe6ZSbxhxiMsSSpp4iVXByYosvMPqe1xw2ID0SvsV7oqUDSFgc9B58GRGTgV\ngODjYiGTaPX8ACWnzjoSJFhskr4wTvByqU4tdaYclZVsEUtFsNFtVVJdypSzwD8T\nx1Y/aGC7AgMBAAECggEAAZjOCN2ixuGsk5doWmAC6/Wb5DTv5/456AbVJHjZqEfg\nqxYBR5xU7E+kyGpBY0FtM00ec20ZoQ9xbvNugyUUaWbOM5UUkJeNTuhV0jTB8MtV\nJmkrV6HVYjT9+ecR17ufrbcGmbjE4TZsyiBDngoYlogZOVcXam1gL+yx4Vl3yR7t\nvu/olZDJPLXmHDNoPU7f+tfCwvA1QZXDyfyqG3YTTU/zIWxFsQCwGJh2hzreugiH\nJR39JCXQ9mwZ4Co/2VhwcCPB0EVAoSkA3CJOPJVGY2chc9lpiUrjIIkWGDuaQmMg\nTdQo8YCb6B8VGpbLJShN1XSucyWU1WgY5LDGDqa3gQKBgQDa8Uczj06CshEo28yO\nbScTYT+3EeWUV5xiUayGqlkDgOVCGNxmtVGBWqvhlsl1oWVZPDPPlzqwMNGPApcL\nHggAsEJWakTruoTRbBgMrnPWuENKCuEHGm0RJmaDdH699Br5OZRqP79bODA/mzuV\nOJjZ07Onr+lvVQvatREHwXOh+wKBgQCnZl5LUuvY2vUT47Ddf2sLaaVeseM5aDJu\n/2FNjmLVmNRjZBaFvIaCcAXkmkeCr3zQ7rsEPagsqaboHTBk8kQTaVD/qWLIYspT\nWjSEv8h68m3dU+1BU3KF7Wr2ehw7xgyAK0LY1xsCJNZfYugD0FnPD3hgJUndO1uv\nY2GlMbDAQQKBgQCBHdNIo9XAG7Uk7GK5B8QImMxTcTl7/yLZlKLzE9jEySnqjfDE\nnV+AsnE065DJTzIOqwM/BEd3CoM7HGLpCn/bsBafEbKtdeTIAEA6klL8KNR+AOZu\nIvZ5K7U/Bt+LtD6IBZ3x/sAh0oQZrrk3qhXyN/f2BzbaEkSYaTmu4jYIKwKBgA5g\nICDf0hkhVIKMvxeGZa7pN6ZWKGk5pXsau0RpwdsN8M9IPRbnBbYV4KutBA8Y+uMG\nXVET6mlLeGXee9VvaKEyHh6WcUE8Gpvl1zS/M3w7bWvgVTOS8vbFWLYp7lrDuzcW\nf/sXHd6lQzOVzs7lCZFahr/a8+jnvAvnwO7qwX8BAoGAfr9sNtbEjCj/Kn5XBj3+\nVQlPGOpyDLeEGEg3Y+e69RpBrxMt4i8VA1COH3pjcmQOc0jxQRK+hZDUcCbGzXNT\nFEsbiejnopRG1+HSMmRebSJBXYpwmAK1J8EXtLXL9itB1XC4Usg20VmRDU5+dTPP\neNIVA3Gif7TuoWC4CnBEGZg=\n-----END PRIVATE KEY-----\n",
  "client_email": "abcusd@abcusdserver.iam.gserviceaccount.com",
  "client_id": "110981819402347223212",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://accounts.google.com/o/oauth2/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/abcusd%40abcusdserver.iam.gserviceaccount.com"
  }
  
});

var app = express();
var port = process.env.PORT || 8080;

app.use("/static", express.static(__dirname + "/public"))
console.log(__dirname)
app.set("view engine", "jade");
app.set("views", __dirname + "/templates");

app.get("/", function(req, res){
	res.render("index");
});

app.get("/cac", function(req, res){
  firebase.database().ref("/CAC").once("value", function(snapshot){
    console.log(snapshot.val());
    var members = snapshot.val();
    res.render("cacTest", {members: members, events: cacEvents});
  })
});

app.get("/parentresources", function(req, res){
	res.render("parentResources");
});

app.get("/updateDashboard", function(req, res){
  res.render("updateDashboard")
})

app.listen(port, function(){
	console.log("Frontend server is running on " + port)
});