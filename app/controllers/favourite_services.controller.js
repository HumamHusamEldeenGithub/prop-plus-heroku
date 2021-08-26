const Favourite_services = require('../models/favourite_services.model');

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can't be empty ! "
        });
    }
    const favourite_service = new Favourite_services({
        user_id: req.body.user_id,
        service_id: req.body.service_id,
    });

    Favourite_services.create(favourite_service, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occured while creating a Favourite"
            });
        } else
            res.send(data);
    });
};

exports.findAllWithDetails = (req, res) => {
    Favourite_services.getAllWithDetails(req.params.user_id, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occured while getting Favourites"
            });
        } else
            res.send(data);
    });
};

exports.findAll = (req, res) => {
    Favourite_services.getAll((err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occured while getting Favourites"
            });
        } else
            res.send(data);
    });
};

exports.findAllWithUserId = (req, res) => {
    Favourite_services.getAllByUserId(req.params.user_id, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occured while getting Favourites"
            });
        } else
            res.send(data);
    });
};

exports.findOne = (req, res) => {
    Favourite_services.findById(req.params.favourite_id, (err, data) => {
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

    Favourite_services.updateById(req.params.favourite_id, new Favourite_service(req.body), (err, data) => {
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
    Favourite_services.remove(req.params.favourite_id, (err, data) => {
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

exports.deleteByUser_ServiceId = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can't be empty ! "
        });
    }
    const favourite_service = new Favourite_services({
        user_id: req.body.user_id,
        service_id: req.body.service_id,
    });
    Favourite_services.removeByUser_PropertyId(favourite_service, (err, data) => {
        if (err) {
            if (err.kind == "not_found") {
                res.status(404).send({
                    message: "Not found Favourite with user_id =" + favourite_service.user_id
                });
            } else {
                res.status(500).send({
                    message: "Couldn't delete Favourite with user_id =" + favourite_service.user_id
                });
            }
        } else
            res.send(data);
    });
};


exports.deleteAll = (req, res) => {
    Favourite_services.removeAll((err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occured while deleting Favourites"
            });
        } else
            res.send(data);
    });
};