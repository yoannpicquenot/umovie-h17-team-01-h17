const express = require("express");
const port = 4242;

var app = express();

app.use(express.static(__dirname));

app.get('/', function (req, res) {
    res.sendFile("./index.html");
});

app.listen(port, function (err) {
    console.log("Listening on port", port);
});
