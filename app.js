var express = require("express");
var app = express();
var bodyparser = require("body-parser");
var nodemailer = require("nodemailer");

function check(spamMessage) {
   if(spamMessage != "" || spamMessage != undefined) {
      return true;
   }
   return false;
}

var prefix = "Anthony's Website >> ";

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
         var smtpTransport = nodemailer.createTransport("SMTP",{
             service: "Gmail",
             auth: {
                 user: "BigBear3555@gmail.com",
                 pass: "stuff123"
             }
         });
   var mailOptions={
        to : to,
        subject : req.body.email,
        text : req.body.message
    }
    console.log(mailOptions);
    smtpTransport.sendMail(mailOptions, function(error, response){
     if(error){
            console.log(error);
        res.send(error);
     }else{
            console.log("Message sent: " + response.message);
            res.redirect("/");
        res.end("sent");
         }
    });
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