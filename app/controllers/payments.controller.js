const Payment = require('../models/payments.model') ; 

exports.create = (req , res)=>{
    if (!req.body){
        res.status(400).send({
            message:"Content can't be empty ! "
        }) ; 
    }
    const payment = new Payment ({
        id : req.body.id , 
        booking_id:req.body.booking_id , 
        amount : req.body.amount , 
        payment_type : req.body.payment_type,
        payment_date : req.body.payment_date
    }) ; 

    Payment.create(payment , (err,data)=>{
        if (err){
            res.status(500).send({
                message : err.message || "Some error occured while creating a Payment"
            });
        }
        else 
            res.send(data) ; 
    }) ; 
} ; 

exports.findAll = (req,res)=>{
    Payment.getAll((err,data)=>{
        if (err){
            res.status(500).send({
                message: err.message || "Some error occured while getting Payments"
            });
        }
        else 
            res.send(data) ; 
    });
};

exports.findOne = (req,res)=>{
    Payment.findById(req.params.userId , (err,data)=>{
        if (err){
            if (err.kind == "not_found"){
                res.status(404).send({
                    message:"Not found Payment with id = " + req.params.userId
                }) ; 
            }
            else {
                res.status(500).send({
                    message: "Error retrieving Payment with id = " + req.params.userId
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

    Payment.updateById(req.params.userId, new Payment(req.body) ,(err,data)=>{
        if (err){
            if (err.kind == "not_found"){
                res.status(404).send({
                    message : "Not found Payment with id =" + req.params.userId
                });
            }
            else{
                res.status(500).send({
                    message : "Error updating Payment with id  =" + req.params.userId
                });
            }
        }
        else 
            res.send(data) ; 
    });
};

exports.delete = (req,res)=>{
    Payment.remove(req.params.userId , (err,data)=>{
        if (err){
            if (err.kind == "not_found"){
                res.status(404).send({
                    message : "Not found Payment with id =" + req.params.userId
                });
            }
            else {
                res.status(500).send({
                    message:"Couldn't delete Payment with id =" + req.params.userId
                }); 
            }
        }
        else 
            res.send(data) ; 
    });
};


exports.deleteAll = (req,res)=>{
    Payment.removeAll((err,data)=>{
        if (err){
            res.status(500).send({
                message : err.message||"Some error occured while deleting Payments"
            });
        }
        else 
            res.send(data) ; 
    });
};