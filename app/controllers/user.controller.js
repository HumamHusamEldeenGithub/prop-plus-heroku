const User = require('../models/user.model') ; 
const currentDate = new Date() ; 
 
exports.create = (req , res)=>{
    if (!req.body){
        res.status(400).send({
            message:"Content can't be empty ! "
        }) ; 
    }
    const user = new User ({
        name : req.body.name , 
        email:req.body.email , 
        phone : req.body.phone , 
        date_of_reg : currentDate 
    }) ; 

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
    console.log("ENTER");
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


exports.showTables = (req,res)=>{
    User.showTables((err,data)=>{
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
                    message:"Not found user with id" + req.params.userId
                }) ; 
            }
            else {
                res.status(500).send({
                    message: "Error retrieving user with id" + req.params.userId
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

    User.updateById(req.params.userId, new User(req.body) ,(err,data)=>{
        if (err){
            if (err.kind == "not_found"){
                res.status(404).send({
                    message : "Not found user with id " + req.params.userId
                });
            }
            else{
                res.status(500).send({
                    message : "Error updating user with id " + req.params.userId
                });
            }
        }
        else 
            res.send(data) ; 
    });
};

exports.delete = (req,res)=>{
    User.remove(res.params.userId , (err,data)=>{
        if (err){
            if (err.kind == "not_found"){
                res.status(404).send({
                    message : "Not found user with id " + req.params.userId
                });
            }
            else {
                res.status(500).send({
                    message:"Couldn't delete user with id " + req.params.userId
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

