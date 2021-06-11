require('dotenv').config();
const express = require("express") ; 
const bodyParser = require("body-parser") ; 
const port = process.env.PORT ; 



const app = express() ; 

app.use(bodyParser.json()) ; 

app.use(bodyParser.urlencoded({extended:true})); 

app.get("/" , (req,res)=>{
    res.json({"message": "ok"}) ; 
}); 

require("./app/routes/tables.routes.js")(app);
require("./app/routes/user.routes.js")(app);
require('./app/routes/bookings.routes.js')(app) ; 
require('./app/routes/services.routes.js')(app) ; 
require('./app/routes/properties.routes.js')(app) ; 
require('./app/routes/payments.routes.js')(app) ; 

app.listen(port , ()=>{
    console.log("Server is running on port " + port) ; 
}) ; 