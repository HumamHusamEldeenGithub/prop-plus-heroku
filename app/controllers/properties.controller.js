const Property = require("../models/properties.model");

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can't be empty ! ",
        });
    }
    const property = new Property({
        name: req.body.name,
        user_id: req.body.user_id,
        phone: req.body.phone,
        description: req.body.description,
        type: req.body.type,
        rating: req.body.rating,
    });

    Property.create(property, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occured while creating a property",
            });
        } else res.send(data);
    });
};

exports.findAll = (req, res) => {
    Property.getAll((err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occured while getting property",
            });
        } else res.send(data);
    });
};


exports.findAllByUserId = (req, res) => {
    Property.getAllByUserId(req.params.userId, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occured while getting property",
            });
        } else res.send(data);
    });
};

exports.findAllWithDetails = (req, res) => {
    Property.getAllWithDetails(req.params.pageIndex, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occured while getting property",
            });
        } else res.send(data);
    });
};

exports.findAllForType = (req, res) => {
    Property.getAllForType(req.params.type, req.params.pageIndex, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occured while getting property",
            });
        } else res.send(data);
    });
};

exports.getSearchResults = (req, res) => {
    Property.getSearchResults(req.body.searchText, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occured while getting property",
            });
        } else res.send(data);
    });
};

exports.findOne = (req, res) => {
    Property.findById(req.params.propertyId, (err, data) => {
        if (err) {
            if (err.kind == "not_found") {
                res.status(404).send({
                    message: "Not found property with id = " + req.params.propertyId,
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving property with id = " + req.params.propertyId,
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

    Property.updateById(
        req.params.propertyId,
        new Property(req.body),
        (err, data) => {
            if (err) {
                if (err.kind == "not_found") {
                    res.status(404).send({
                        message: "Not found property with id =" + req.params.propertyId,
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating property with id  =" + req.params.propertyId,
                    });
                }
            } else res.send(data);
        }
    );
};

exports.updateRating = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can't be empty",
        });
    }
    Property.updateRating(
        req.params.propertyId,
        req.body.rating,
        (err, data) => {
            if (err) {
                if (err.kind == "not_found") {
                    res.status(404).send({
                        message: "Not found property with id =" + req.params.propertyId,
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating property with id  =" + req.params.propertyId,
                    });
                }
            } else res.send(data);
        }
    );

};

exports.delete = (req, res) => {
    Property.remove(req.params.propertyId, (err, data) => {
        if (err) {
            if (err.kind == "not_found") {
                res.status(404).send({
                    message: "Not found property with id =" + req.params.propertyId,
                });
            } else {
                res.status(500).send({
                    message: "Couldn't delete property with id =" + req.params.propertyId,
                });
            }
        } else res.send(data);
    });
};

exports.deleteAll = (req, res) => {
    Property.removeAll((err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occured while deleting properties",
            });
        } else res.send(data);
    });
};