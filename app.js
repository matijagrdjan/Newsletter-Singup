// jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/singup.html");
});

app.post("/", function(req, res) {

  var firstName = req.body.fName;
  var lastName = req.body.lName;
  var email = req.body.eMail;

  var data = {
    members: [{
      email_adress: email,
      status: "subscribed",
      merge_fields: {
        FNAME: firstName,
        LNAME: lastName

      }
    }]
  };
  var jsonData = JSON.stringify(data);


  var option = {
    url: "https://us7.api.mailchimp.com/3.0/lists/21768e5098",
    method: "POST",
    headers: {
      "Authorization": "matija 62d486c27cb799139a9458b1e961560e-us7"
    },
    body: jsonData
  };

  //console.log(firstName, lastName, eMail);
  request(option, function(error, response, body) {
    if (error) {
      console.error();
    } else {
      console.log(response.statusCode);
    }

  });

});




app.listen(3000, function() {
  console.log("server starts on port 3000");
});


//62d486c27cb799139a9458b1e961560e-us7
//90cb0f69e2
