const User = require('../models/user.model') ; 
const currentDate = new Date() ; 


exports.create = (req , res)=>{
    if (!req.body){
        res.status(400).send({
            message:"Content can't be empty ! "
        }) ; 
    }
    const user = new User ({
        id:req.body.id,
        name : req.body.name , 
        email:req.body.email , 
        phone : req.body.phone , 
        firebase_id : req.body.firebase_id , 
        date_of_reg : currentDate.toJSON()
    }) ; 
    console.log(req.body) ;

    User.create(user , (err,data)=>{
        if (err){
            res.status(500).send({
                message : err.message || "Some error occured while creating a user"
            });
        }
        else 
            res.send(data) ; 
    }) ; 
} ; 

exports.findAll = (req,res)=>{
    User.getAll((err,data)=>{
        if (err){
            res.status(500).send({
                message: err.message || "Some error occured while getting users"
            });
        }
        else 
            res.send(data) ; 
    });
};


exports.findOne = (req,res)=>{
    User.findById(req.params.userId , (err,data)=>{
        if (err){
            if (err.kind == "not_found"){
                res.status(404).send({
                    message:"Not found user with id = " + req.params.userId
                }) ; 
            }
            else {
                res.status(500).send({
                    message: "Error retrieving user with id = " + req.params.userId
                }); 
            }
        }
        else
            res.send(data) ; 
    });
};


exports.findOneByFirebase = (req,res)=>{
    User.findByFirebaseId(req.params.userId , (err,data)=>{
        if (err){
            if (err.kind == "not_found"){
                res.status(404).send({
                    message:"Not found user with firebase_id = " + req.params.userId
                }) ; 
            }
            else {
                res.status(500).send({
                    message: "Error retrieving user with firebase_id = " + req.params.userId
                }); 
            }
        }
        else
            res.send(data) ; 
    });
};


exports.update = (req,res)=>{
    console.log("ENTER UPDATE") ; 
    if (!req.body){
        res.status(400).send({
            message:"Content can't be empty" 
        });
    }

    User.updateById(req.params.userId, new User(req.body) ,(err,data)=>{
        if (err){
            if (err.kind == "not_found"){
                res.status(404).send({
                    message : "Not found user with id =" + req.params.userId
                });
            }
            else{
                res.status(500).send({
                    message : "Error updating user with id  =" + req.params.userId
                });
            }
        }
        else 
            res.send(data) ; 
    });
};

exports.delete = (req,res)=>{
    User.remove(req.params.userId , (err,data)=>{
        if (err){
            if (err.kind == "not_found"){
                res.status(404).send({
                    message : "Not found user with id =" + req.params.userId
                });
            }
            else {
                res.status(500).send({
                    message:"Couldn't delete user with id =" + req.params.userId
                }); 
            }
        }
        else 
            res.send(data) ; 
    });
};


exports.deleteAll = (req,res)=>{
    User.removeAll((err,data)=>{
        if (err){
            res.status(500).send({
                message : err.message||"Some error occured while deleting users"
            });
        }
        else 
            res.send(data) ; 
    });
};

