const ApprovalImage = require('../models/approval_images.model') ; 

exports.create = (req , res)=>{
    if (!req.body){
        res.status(400).send({
            message:"Content can't be empty ! "
        }) ; 
    }
    const approval_image = new ApprovalImage ({
        property_id:req.body.property_id , 
        url : req.body.url 
    }) ; 

    ApprovalImage.create(approval_image , (err,data)=>{
        if (err){
            res.status(500).send({
                message : err.message || "Some error occured while creating a booking"
            });
        }
        else 
            res.send(data) ; 
    }) ; 
} ; 

exports.findAll = (req,res)=>{
    ApprovalImage.getAll((err,data)=>{
        if (err){
            res.status(500).send({
                message: err.message || "Some error occured while getting ApprovalImages"
            });
        }
        else 
            res.send(data) ; 
    });
};

exports.findOne = (req,res)=>{
    ApprovalImage.findById(req.params.id , (err,data)=>{
        if (err){
            if (err.kind == "not_found"){
                res.status(404).send({
                    message:"Not found ApprovalImage with id = " + req.params.id
                }) ; 
            }
            else {
                res.status(500).send({
                    message: "Error retrieving ApprovalImage with id = " + req.params.id
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

    ApprovalImage.updateById(req.params.id, new ApprovalImage(req.body) ,(err,data)=>{
        if (err){
            if (err.kind == "not_found"){
                res.status(404).send({
                    message : "Not found ApprovalImage with id =" + req.params.id
                });
            }
            else{
                res.status(500).send({
                    message : "Error updating ApprovalImage with id  =" + req.params.id
                });
            }
        }
        else 
            res.send(data) ; 
    });
};

exports.delete = (req,res)=>{
    ApprovalImage.remove(req.params.id , (err,data)=>{
        if (err){
            if (err.kind == "not_found"){
                res.status(404).send({
                    message : "Not found ApprovalImage with id =" + req.params.id
                });
            }
            else {
                res.status(500).send({
                    message:"Couldn't delete ApprovalImage with id =" + req.params.id
                }); 
            }
        }
        else 
            res.send(data) ; 
    });
};


exports.deleteAll = (req,res)=>{
    ApprovalImage.removeAll((err,data)=>{
        if (err){
            res.status(500).send({
                message : err.message||"Some error occured while deleting ApprovalImages"
            });
        }
        else 
            res.send(data) ; 
    });
};