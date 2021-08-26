const ApproveLocations = require('../models/approve_locations.model');

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can't be empty ! "
        });
    }
    const approveLocation = new ApproveLocations({
        property_id: req.body.property_id,
        city: req.body.city,
        street: req.body.street,
    });

    ApproveLocations.create(approveLocation, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occured while creating a ApproveLocations"
            });
        } else
            res.send(data);
    });
};

exports.findAll = (req, res) => {
    ApproveLocations.getAll((err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occured while getting ApproveLocations"
            });
        } else
            res.send(data);
    });
};

exports.findOne = (req, res) => {
    ApproveLocations.findById(req.params.locationId, (err, data) => {
        if (err) {
            if (err.kind == "not_found") {
                res.status(404).send({
                    message: "Not found ApproveLocations with id = " + req.params.locationId
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving ApproveLocations with id = " + req.params.locationId
                });
            }
        } else
            res.send(data);
    });
};
exports.findOneByPropertyId = (req, res) => {
    ApproveLocations.findByPropertyId(req.params.propertyId, (err, data) => {
        if (err) {
            if (err.kind == "not_found") {
                res.status(404).send({
                    message: "Not found ApproveLocations with prop_id = " + req.params.propertyId
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving ApproveLocations with prop_id = " + req.params.propertyId
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

    ApproveLocations.updateById(req.params.locationId, new ApproveLocations(req.body), (err, data) => {
        if (err) {
            if (err.kind == "not_found") {
                res.status(404).send({
                    message: "Not found ApproveLocations with id =" + req.params.locationId
                });
            } else {
                res.status(500).send({
                    message: "Error updating ApproveLocations with id  =" + req.params.locationId
                });
            }
        } else
            res.send(data);
    });
};

exports.delete = (req, res) => {
    ApproveLocations.remove(req.params.locationId, (err, data) => {
        if (err) {
            if (err.kind == "not_found") {
                res.status(404).send({
                    message: "Not found ApproveLocations with id =" + req.params.locationId
                });
            } else {
                res.status(500).send({
                    message: "Couldn't delete ApproveLocations with id =" + req.params.locationId
                });
            }
        } else
            res.send(data);
    });
};


exports.deleteAll = (req, res) => {
    ApproveLocations.removeAll((err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occured while deleting ApproveLocations"
            });
        } else
            res.send(data);
    });
};