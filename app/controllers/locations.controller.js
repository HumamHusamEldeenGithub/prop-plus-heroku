const Location = require('../models/locations.model') ; 

exports.create = (req , res)=>{
    if (!req.body){
        res.status(400).send({
            message:"Content can't be empty ! "
        }) ; 
    }
    const location = new Location ({
        id : req.body.id , 
        property_id:req.body.property_id , 
        city : req.body.city , 
        street : req.body.street,
        map_url : req.body.map_url
    }) ; 

    Location.create(location , (err,data)=>{
        if (err){
            res.status(500).send({
                message : err.message || "Some error occured while creating a Location"
            });
        }
        else 
            res.send(data) ; 
    }) ; 
} ; 

exports.findAll = (req,res)=>{
    Location.getAll((err,data)=>{
        if (err){
            res.status(500).send({
                message: err.message || "Some error occured while getting Locations"
            });
        }
        else 
            res.send(data) ; 
    });
};

exports.findOne = (req,res)=>{
    Location.findById(req.params.location_id , (err,data)=>{
        if (err){
            if (err.kind == "not_found"){
                res.status(404).send({
                    message:"Not found Location with id = " + req.params.location_id
                }) ; 
            }
            else {
                res.status(500).send({
                    message: "Error retrieving Location with id = " + req.params.location_id
                }); 
            }
        }
        else
            res.send(data) ; 
    });
};

exports.update = (req,res)=>{
    if (!req.body){
        res.status(400).send({
            message:"Content can't be empty" 
        });
    }

    Location.updateById(req.params.location_id, new Location(req.body) ,(err,data)=>{
        if (err){
            if (err.kind == "not_found"){
                res.status(404).send({
                    message : "Not found Location with id =" + req.params.location_id
                });
            }
            else{
                res.status(500).send({
                    message : "Error updating Location with id  =" + req.params.location_id
                });
            }
        }
        else 
            res.send(data) ; 
    });
};

exports.delete = (req,res)=>{
    Location.remove(req.params.location_id , (err,data)=>{
        if (err){
            if (err.kind == "not_found"){
                res.status(404).send({
                    message : "Not found Location with id =" + req.params.location_id
                });
            }
            else {
                res.status(500).send({
                    message:"Couldn't delete Location with id =" + req.params.location_id
                }); 
            }
        }
        else 
            res.send(data) ; 
    });
};


exports.deleteAll = (req,res)=>{
    Location.removeAll((err,data)=>{
        if (err){
            res.status(500).send({
                message : err.message||"Some error occured while deleting Locations"
            });
        }
        else 
            res.send(data) ; 
    });
};