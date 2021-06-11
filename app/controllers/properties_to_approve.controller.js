const PropertyToApprove = require('../models/properties_to_approve.model') ; 

exports.create = (req , res)=>{
    if (!req.body){
        res.status(400).send({
            message:"Content can't be empty ! "
        }) ; 
    }
    const property = new PropertyToApprove ({
        name : req.body.name , 
        user_id : req.body.user_id , 
        phone:req.body.phone , 
        description : req.body.description , 
    }) ; 

    PropertyToApprove.create(property , (err,data)=>{
        if (err){
            res.status(500).send({
                message : err.message || "Some error occured while creating a property"
            });
        }
        else 
            res.send(data) ; 
    }) ; 
} ; 

exports.findAll = (req,res)=>{
    PropertyToApprove.getAll((err,data)=>{
        if (err){
            res.status(500).send({
                message: err.message || "Some error occured while getting PropertyToApprove"
            });
        }
        else 
            res.send(data) ; 
    });
};

exports.findOne = (req,res)=>{
    PropertyToApprove.findById(req.params.id , (err,data)=>{
        if (err){
            if (err.kind == "not_found"){
                res.status(404).send({
                    message:"Not found PropertyToApprove with id = " + req.params.id
                }) ; 
            }
            else {
                res.status(500).send({
                    message: "Error retrieving PropertyToApprove with id = " + req.params.id
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

    PropertyToApprove.updateById(req.params.id, new PropertyToApprove(req.body) ,(err,data)=>{
        if (err){
            if (err.kind == "not_found"){
                res.status(404).send({
                    message : "Not found PropertyToApprove with id =" + req.params.id
                });
            }
            else{
                res.status(500).send({
                    message : "Error updating PropertyToApprove with id  =" + req.params.id
                });
            }
        }
        else 
            res.send(data) ; 
    });
};

exports.delete = (req,res)=>{
    PropertyToApprove.remove(req.params.id , (err,data)=>{
        if (err){
            if (err.kind == "not_found"){
                res.status(404).send({
                    message : "Not found PropertyToApprove with id =" + req.params.id
                });
            }
            else {
                res.status(500).send({
                    message:"Couldn't delete PropertyToApprove with id =" + req.params.id
                }); 
            }
        }
        else 
            res.send(data) ; 
    });
};


exports.deleteAll = (req,res)=>{
    PropertyToApprove.removeAll((err,data)=>{
        if (err){
            res.status(500).send({
                message : err.message||"Some error occured while deleting properties"
            });
        }
        else 
            res.send(data) ; 
    });
};