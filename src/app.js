"use strict";

var express = require("express"),
	cacOfficers = require("./mock/test.json"),
	cacEvents = require("./mock/test2.json");

var app = express();
var port = process.env.PORT || 8080;

app.use("/static", express.static(__dirname + "/public"))

app.set("view engine", "jade");
app.set("views", __dirname + "/templates");

app.get("/", function(req, res){
	res.render("index");
});

app.get("/cac", function(req, res){
	res.render("cacTest", {terms: cacOfficers, events: cacEvents});
});

app.get("/parentresources", function(req, res){
	res.render("parentResources");
});

app.listen("abcusd.herokuapp.com", function(){
	console.log("Frontend server is running on port 5555.")
});