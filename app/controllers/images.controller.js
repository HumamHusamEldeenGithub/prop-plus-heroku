const Image = require('../models/images.model');

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can't be empty ! "
        });
    }
    var images_list = [];
    if (req.body.main_url) {
        var main_img = "(" +
            req.body.service_id + "\,'" + req.body.main_url + "',1)";
        images_list.push(main_img);
    }
    if (req.body.url) {
        var images_urls = req.body.url.split(',');
        for (var i = 0; i < images_urls.length; i++) {
            var image = "(" + req.body.service_id + ",'" + images_urls[i] + "',0)";
            images_list.push(image);
        }
    }
    Image.create(images_list.toString(), (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occured while creating a booking"
            });
        } else
            res.send(data);
    });
};

exports.findAll = (req, res) => {
    Image.getAll((err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occured while getting Images"
            });
        } else
            res.send(data);
    });
};

exports.findAllByServiceId = (req, res) => {
    Image.getAllByServiceId(req.params.serviceId, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occured while getting Images"
            });
        } else
            res.send(data);
    });
};

exports.findOne = (req, res) => {
    Image.findByServiceId(req.params.imgId, (err, data) => {
        if (err) {
            if (err.kind == "not_found") {
                res.status(404).send({
                    message: "Not found Image with id = " + req.params.imgId
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Image with id = " + req.params.imgId
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

    Image.updateById(req.params.imgId, new Image(req.body), (err, data) => {
        if (err) {
            if (err.kind == "not_found") {
                res.status(404).send({
                    message: "Not found Image with id =" + req.params.imgId
                });
            } else {
                res.status(500).send({
                    message: "Error updating Image with id  =" + req.params.imgId
                });
            }
        } else
            res.send(data);
    });
};

exports.delete = (req, res) => {
    Image.remove(req.params.imgId, (err, data) => {
        if (err) {
            if (err.kind == "not_found") {
                res.status(404).send({
                    message: "Not found Image with id =" + req.params.imgId
                });
            } else {
                res.status(500).send({
                    message: "Couldn't delete Image with id =" + req.params.imgId
                });
            }
        } else
            res.send(data);
    });
};


exports.deleteAll = (req, res) => {
    Image.removeAll((err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occured while deleting Images"
            });
        } else
            res.send(data);
    });
};