const tables = require('../models/table.model') ; 

exports.showTables = (req,res)=>{
    tables.showTables((err,data)=>{
        if (err){
            res.status(500).send({
                message : err.message || "Error while getting the tables"
            }) ; 
        }
        else 
            res.send(data) ; 
    });
};