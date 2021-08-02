const Service = require("../models/services.model");

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can't be empty ! ",
        });
    }
    const service = new Service({
        property_id: req.body.property_id,
        description: req.body.description,
        price_per_night: req.body.price_per_night,
    });
    console.log(service);
    Service.create(service, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occured while creating a service",
            });
        } else res.send(data);
    });
};

exports.findAll = (req, res) => {
    if (req.query.full_details != undefined) {
        var page_index = isNaN(parseInt(req.query.page_index)) ?
            0 :
            req.query.page_index;
        Service.getAllWithDetails(page_index, (err, data) => {
            if (err) {
                res.status(500).send({
                    message: err.message || "Some error occured while getting property",
                });
            } else res.send(data);
        });
    } else {
        Service.getAll((err, data) => {
            if (err) {
                res.status(500).send({
                    message: err.message || "Some error occured while getting services",
                });
            } else res.send(data);
        });
    }
};
exports.findAllByCity = (req, res) => {
    var city = req.params.city;
    var page_index = isNaN(parseInt(req.query.page_index)) ?
        0 :
        req.query.page_index;
    Service.findAllByCity(city, page_index, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occured while getting services",
            });
        } else res.send(data);
    });

};
exports.findAllByRating = (req, res) => {
    var page_index = isNaN(parseInt(req.query.page_index)) ?
        0 :
        req.query.page_index;
    Service.findAllByRating(page_index, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occured while getting services",
            });
        } else res.send(data);
    });

};


exports.findOne = (req, res) => {
    Service.findById(req.params.serviceId, (err, data) => {
        if (err) {
            if (err.kind == "not_found") {
                res.status(404).send({
                    message: "Not found service with id = " + req.params.serviceId,
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving service with id = " + req.params.serviceId,
                });
            }
        } else res.send(data);
    });
};

exports.update = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can't be empty",
        });
    }

    Service.updateById(
        req.params.serviceId,
        new Service(req.body),
        (err, data) => {
            if (err) {
                if (err.kind == "not_found") {
                    res.status(404).send({
                        message: "Not found service with id =" + req.params.serviceId,
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating service with id  =" + req.params.serviceId,
                    });
                }
            } else res.send(data);
        }
    );
};

exports.delete = (req, res) => {
    Service.remove(req.params.serviceId, (err, data) => {
        if (err) {
            if (err.kind == "not_found") {
                res.status(404).send({
                    message: "Not found service with id =" + req.params.serviceId,
                });
            } else {
                res.status(500).send({
                    message: "Couldn't delete service with id =" + req.params.serviceId,
                });
            }
        } else res.send(data);
    });
};

exports.deleteAll = (req, res) => {
    Service.removeAll((err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occured while deleting services",
            });
        } else res.send(data);
    });
};