const express = require("express");
const port = 5000;

var app = express();

app.use(express.static(__dirname));

app.use(function(req, res) {
  res.sendFile('index.html', {root: __dirname});
});

app.listen(port, function(err) {
    console.log("Listening on port", port);
});

