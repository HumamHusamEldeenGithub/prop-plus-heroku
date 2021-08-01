const ApprovalImage = require('../models/approval_images.model');

exports.create = async(req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can't be empty ! "
        });
    }

    var images_urls = req.body.url.split(',');
    var images_list = [];
    for (var i = 0; i < images_urls.length; i++) {
        var approval_image = "(" +
            req.body.property_id + "\,0,'" + images_urls[i] + "')";
        images_list.push(approval_image);
    }
    console.log(images_list.toString());
    ApprovalImage.create(images_list.toString(), (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occured while creating a booking"
            });
        } else
            res.send(data);
    });
};

exports.findAll = (req, res) => {
    ApprovalImage.getAll((err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occured while getting ApprovalImages"
            });
        } else
            res.send(data);
    });
};

exports.findOne = (req, res) => {
    ApprovalImage.findByPropertyId(req.params.property_id, (err, data) => {
        if (err) {
            if (err.kind == "not_found") {
                res.status(404).send({
                    message: "Not found ApprovalImage with id = " + req.params.property_id
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving ApprovalImage with id = " + req.params.property_id
                });
            }
        } else
            res.send(data);
    });
};

exports.update = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can't be empty"
        });
    }

    ApprovalImage.updateById(req.params.imgId, new ApprovalImage(req.body), (err, data) => {
        if (err) {
            if (err.kind == "not_found") {
                res.status(404).send({
                    message: "Not found ApprovalImage with id =" + req.params.imgId
                });
            } else {
                res.status(500).send({
                    message: "Error updating ApprovalImage with id  =" + req.params.imgId
                });
            }
        } else
            res.send(data);
    });
};

exports.delete = (req, res) => {
    ApprovalImage.remove(req.params.imgId, (err, data) => {
        if (err) {
            if (err.kind == "not_found") {
                res.status(404).send({
                    message: "Not found ApprovalImage with id =" + req.params.imgId
                });
            } else {
                res.status(500).send({
                    message: "Couldn't delete ApprovalImage with id =" + req.params.imgId
                });
            }
        } else
            res.send(data);
    });
};


exports.deleteAll = (req, res) => {
    ApprovalImage.removeAll((err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occured while deleting ApprovalImages"
            });
        } else
            res.send(data);
    });
};