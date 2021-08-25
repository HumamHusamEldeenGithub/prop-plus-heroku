const Favourite_property = require('../models/favourite_properties.model');

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can't be empty ! "
        });
    }
    const favourite_property = new Favourite_property({
        user_id: req.body.user_id,
        property_id: req.body.property_id,
    });

    Favourite_property.create(favourite_property, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occured while creating a Favourite"
            });
        } else
            res.send(data);
    });
};

exports.findAllWithDetails = (req, res) => {
    Favourite_property.getAllWithDetails(req.params.user_id, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occured while getting Favourites"
            });
        } else
            res.send(data);
    });
};

exports.findAll = (req, res) => {
    Favourite_property.getAll((err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occured while getting Favourites"
            });
        } else
            res.send(data);
    });
};

exports.findOne = (req, res) => {
    Favourite_property.findById(req.params.favourite_id, (err, data) => {
        if (err) {
            if (err.kind == "not_found") {
                res.status(404).send({
                    message: "Not found Favourite with id = " + req.params.favourite_id
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Favourite with id = " + req.params.favourite_id
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

    Favourite_property.updateById(req.params.favourite_id, new Favourite_property(req.body), (err, data) => {
        if (err) {
            if (err.kind == "not_found") {
                res.status(404).send({
                    message: "Not found Favourite with id =" + req.params.favourite_id
                });
            } else {
                res.status(500).send({
                    message: "Error updating Favourite with id  =" + req.params.favourite_id
                });
            }
        } else
            res.send(data);
    });
};

exports.delete = (req, res) => {
    Favourite_property.remove(req.params.favourite_id, (err, data) => {
        if (err) {
            if (err.kind == "not_found") {
                res.status(404).send({
                    message: "Not found Favourite with id =" + req.params.favourite_id
                });
            } else {
                res.status(500).send({
                    message: "Couldn't delete Favourite with id =" + req.params.favourite_id
                });
            }
        } else
            res.send(data);
    });
};

exports.deleteByUser_PropertyId = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can't be empty ! "
        });
    }
    const favourite_property = new Favourite_property({
        user_id: req.body.user_id,
        property_id: req.body.property_id,
    });
    Favourite_property.removeByUser_PropertyId(favourite_property, (err, data) => {
        if (err) {
            if (err.kind == "not_found") {
                res.status(404).send({
                    message: "Not found Favourite with user_id =" + favourite_property.user_id
                });
            } else {
                res.status(500).send({
                    message: "Couldn't delete Favourite with user_id =" + favourite_property.user_id
                });
            }
        } else
            res.send(data);
    });
};


exports.deleteAll = (req, res) => {
    Favourite_property.removeAll((err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occured while deleting Favourites"
            });
        } else
            res.send(data);
    });
};