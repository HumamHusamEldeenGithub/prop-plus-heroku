const Image = require('../models/images.model') ; 

exports.create = (req , res)=>{
    if (!req.body){
        res.status(400).send({
            message:"Content can't be empty ! "
        }) ; 
    }
    const image = new Image ({
        service_id:req.body.service_id , 
        url : req.body.url 
    }) ; 

    Image.create(image , (err,data)=>{
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
    Image.getAll((err,data)=>{
        if (err){
            res.status(500).send({
                message: err.message || "Some error occured while getting Images"
            });
        }
        else 
            res.send(data) ; 
    });
};

exports.findOne = (req,res)=>{
    Image.findById(req.params.id , (err,data)=>{
        if (err){
            if (err.kind == "not_found"){
                res.status(404).send({
                    message:"Not found Image with id = " + req.params.id
                }) ; 
            }
            else {
                res.status(500).send({
                    message: "Error retrieving Image with id = " + req.params.id
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

    Image.updateById(req.params.id, new Image(req.body) ,(err,data)=>{
        if (err){
            if (err.kind == "not_found"){
                res.status(404).send({
                    message : "Not found Image with id =" + req.params.id
                });
            }
            else{
                res.status(500).send({
                    message : "Error updating Image with id  =" + req.params.id
                });
            }
        }
        else 
            res.send(data) ; 
    });
};

exports.delete = (req,res)=>{
    Image.remove(req.params.id , (err,data)=>{
        if (err){
            if (err.kind == "not_found"){
                res.status(404).send({
                    message : "Not found Image with id =" + req.params.id
                });
            }
            else {
                res.status(500).send({
                    message:"Couldn't delete Image with id =" + req.params.id
                }); 
            }
        }
        else 
            res.send(data) ; 
    });
};


exports.deleteAll = (req,res)=>{
    Image.removeAll((err,data)=>{
        if (err){
            res.status(500).send({
                message : err.message||"Some error occured while deleting Images"
            });
        }
        else 
            res.send(data) ; 
    });
};