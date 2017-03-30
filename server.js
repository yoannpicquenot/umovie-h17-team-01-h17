const express = require("express");
const port = 80;

var app = express();

app.use(express.static(__dirname));

app.use(function(req, res) {
  res.sendfile('./index.html');
});

app.listen(port, function(err) {
    console.log("Listening on port", port);
});

