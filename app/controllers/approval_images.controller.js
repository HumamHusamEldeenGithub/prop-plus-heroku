const approval_image = require('../models/approval_images.model') ; 

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

    approval_image.create(approval_image , (err,data)=>{
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
    approval_image.getAll((err,data)=>{
        if (err){
            res.status(500).send({
                message: err.message || "Some error occured while getting approval_images"
            });
        }
        else 
            res.send(data) ; 
    });
};

exports.findOne = (req,res)=>{
    approval_image.findById(req.params.id , (err,data)=>{
        if (err){
            if (err.kind == "not_found"){
                res.status(404).send({
                    message:"Not found approval_image with id = " + req.params.id
                }) ; 
            }
            else {
                res.status(500).send({
                    message: "Error retrieving approval_image with id = " + req.params.id
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

    approval_image.updateById(req.params.id, new approval_image(req.body) ,(err,data)=>{
        if (err){
            if (err.kind == "not_found"){
                res.status(404).send({
                    message : "Not found approval_image with id =" + req.params.id
                });
            }
            else{
                res.status(500).send({
                    message : "Error updating approval_image with id  =" + req.params.id
                });
            }
        }
        else 
            res.send(data) ; 
    });
};

exports.delete = (req,res)=>{
    approval_image.remove(req.params.id , (err,data)=>{
        if (err){
            if (err.kind == "not_found"){
                res.status(404).send({
                    message : "Not found approval_image with id =" + req.params.id
                });
            }
            else {
                res.status(500).send({
                    message:"Couldn't delete approval_image with id =" + req.params.id
                }); 
            }
        }
        else 
            res.send(data) ; 
    });
};


exports.deleteAll = (req,res)=>{
    approval_image.removeAll((err,data)=>{
        if (err){
            res.status(500).send({
                message : err.message||"Some error occured while deleting approval_images"
            });
        }
        else 
            res.send(data) ; 
    });
};