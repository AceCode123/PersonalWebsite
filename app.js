var express = require("express");
var app = express();
var bodyparser = require("body-parser");
var nodemailer = require("nodemailer");
var saves = [{sender: "test@gmail.com", message: "TestMessage"}];

function check(spamMessage) {
   if(spamMessage != "" || spamMessage != undefined) {
      return true;
   }
   return false;
}

var prefix = "Anthony's Website >> ";
var emailKey = "SuperSecretKey";

var to = "anthonylekan25@gmail.com";
var from = "BigBear3555@gmail.com";
app.use(express.static(__dirname + '/public'));
app.use(bodyparser.urlencoded({extended: true}));
app.set("view engine", "ejs");

var d = new Date();
   var year = d.getFullYear();

app.get("/", function(req, res) {
   res.render("home", {Year: year});
});

app.post("/contact", function(req, res) {
   console.log("Received");
   if(check(req.body.spam) && req.body.email != " " && req.body.message != " ") {


    saves.push({sender: req.body.email, message: req.body.message});
    console.log("Saved!");
    res.redirect("/");
   } else {
      res.redirect("/");
   }
});

app.get("/viewEmails/:key", function(req, res) {
   var key = req.params.key;
   console.log(key);
   if(emailKey == key) {
    res.render("viewEmails", {valid: true, emails: saves});   
   } else {
       res.redirect("/");
   }
});

app.get("*", function(req, res) {
   res.render("home", {Year: year});
});

app.listen(process.env.PORT, process.env.IP, function() {
   console.log(prefix + "Server Running!");
});
