const Service = require('../models/services.model') ; 

exports.create = (req , res)=>{
    if (!req.body){
        res.status(400).send({
            message:"Content can't be empty ! "
        }) ; 
    }
    const service = new Service ({
        property_id : req.body.propertyId , 
        description:req.body.serviceId , 
        price_per_night : req.body.start_date 
    }) ; 

    Service.create(service , (err,data)=>{
        if (err){
            res.status(500).send({
                message : err.message || "Some error occured while creating a service"
            });
        }
        else 
            res.send(data) ; 
    }) ; 
} ; 

exports.findAll = (req,res)=>{
    Service.getAll((err,data)=>{
        if (err){
            res.status(500).send({
                message: err.message || "Some error occured while getting services"
            });
        }
        else 
            res.send(data) ; 
    });
};

exports.findOne = (req,res)=>{
    Service.findById(req.params.serviceId , (err,data)=>{
        if (err){
            if (err.kind == "not_found"){
                res.status(404).send({
                    message:"Not found service with id = " + req.params.serviceId
                }) ; 
            }
            else {
                res.status(500).send({
                    message: "Error retrieving service with id = " + req.params.serviceId
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

    Service.updateById(req.params.serviceId, new Service(req.body) ,(err,data)=>{
        if (err){
            if (err.kind == "not_found"){
                res.status(404).send({
                    message : "Not found service with id =" + req.params.serviceId
                });
            }
            else{
                res.status(500).send({
                    message : "Error updating service with id  =" + req.params.serviceId
                });
            }
        }
        else 
            res.send(data) ; 
    });
};

exports.delete = (req,res)=>{
    Service.remove(res.params.serviceId , (err,data)=>{
        if (err){
            if (err.kind == "not_found"){
                res.status(404).send({
                    message : "Not found service with id =" + req.params.serviceId
                });
            }
            else {
                res.status(500).send({
                    message:"Couldn't delete service with id =" + req.params.serviceId
                }); 
            }
        }
        else 
            res.send(data) ; 
    });
};


exports.deleteAll = (req,res)=>{
    Service.removeAll((err,data)=>{
        if (err){
            res.status(500).send({
                message : err.message||"Some error occured while deleting services"
            });
        }
        else 
            res.send(data) ; 
    });
};