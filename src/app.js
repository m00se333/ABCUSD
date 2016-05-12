"use strict";

var express = require("express");

var app = express();

app.use("/static", express.static(__dirname + "/public"))

app.set("view engine", "jade");
app.set("views", __dirname + "/templates");

app.get("/", function(req, res){
	res.render("index");
});

app.get("/cac", function(req, res){
	res.render("cacInfo");
});

app.get("/parentresources", function(req, res){
	res.render("parentResources");
});

app.listen(5555, function(){
	console.log("Frontend server is running on port 5555.")
});