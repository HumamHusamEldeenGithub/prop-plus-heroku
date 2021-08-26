"use strict";

require('dotenv').config();

var VerifyToken = require('./verifyToken');

var express = require("express");

var bodyParser = require("body-parser");

var port = process.env.PORT;

var cors = require('cors');

var app = express();
app.use(cors({
  origin: "*"
}));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.get("/", VerifyToken, function (req, res) {
  res.json({
    "message": "ok"
  });
});

require("./app/routes/tables.routes.js")(app);

require("./app/routes/user.routes.js")(app);

require('./app/routes/bookings.routes.js')(app);

require('./app/routes/services.routes.js')(app);

require('./app/routes/properties.routes.js')(app);

require('./app/routes/properties_to_approve.routes.js')(app);

require('./app/routes/payments.routes.js')(app);

require('./app/routes/locations.routes.js')(app);

require('./app/routes/images.routes.js')(app);

require('./app/routes/favourite_services.routes.js')(app);

require('./app/routes/approval_images.routes.js')(app);

require('./app/routes/approve_locations.routes.js')(app);

app.listen(port, function () {
  console.log("Server is running on port " + port);
});