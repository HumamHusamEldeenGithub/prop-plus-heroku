const PropertyToApprove = require('../models/properties_to_approve.model');
const Properties = require('../models/properties.model');
const Location = require('../models/locations.model');
const ApproveLocations = require('../models/approve_locations.model');

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can't be empty ! "
        });
    }
    const property = new PropertyToApprove({
        name: req.body.name,
        user_id: req.body.user_id,
        phone: req.body.phone,
        description: req.body.description,
        date_of_submition: new Date().toISOString().slice(0, 19).replace('T', ' ')
    });

    PropertyToApprove.create(property, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occured while creating a property"
            });
        } else
            res.send(data);
    });
};

exports.findAll = (req, res) => {
    PropertyToApprove.getAll((err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occured while getting PropertyToApprove"
            });
        } else
            res.send(data);
    });
};

exports.findOne = (req, res) => {
    PropertyToApprove.findById(req.params.propertyId, (err, data) => {
        if (err) {
            if (err.kind == "not_found") {
                res.status(404).send({
                    message: "Not found PropertyToApprove with id = " + req.params.propertyId
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving PropertyToApprove with id = " + req.params.propertyId
                });
            }
        } else
            res.send(data);
    });
};

exports.acceptProperty = (req, res) => {
    PropertyToApprove.findById(req.params.propertyId, (err, data) => {
        if (err) {
            if (err.kind == "not_found") {
                res.status(404).send({
                    message: "Not found PropertyToApprove with id = " + req.params.propertyId
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving PropertyToApprove with id = " + req.params.propertyId
                });
            }
        } else {
            console.log("GET PROPERTY TO APPROVE ");
            const property = new Properties({
                name: data.name,
                user_id: data.user_id,
                phone: data.phone ? data.phone : 0,
                description: data.description,
                rating: data.rating ? data.rating : 0,
            });
            Properties.create(property, (err, data) => {
                if (err) {
                    res.status(500).send({
                        message: err.message || "Some error occured while creating a property",
                    });
                } else {
                    console.log("CREATED PORP");
                    var newPropId = data.id;
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
                        } else {
                            console.log("GET APPROVE LOCATION ");
                            console.log(data);
                            var approve_location_id = data[0].id;
                            const location = new Location({
                                property_id: newPropId,
                                city: data[0].city,
                                street: data[0].street,
                                map_url: data[0].map_url
                            });
                            Location.create(location, (err, data) => {
                                if (err) {
                                    res.status(500).send({
                                        message: err.message || "Some error occured while creating a Location"
                                    });
                                } else {
                                    console.log("CREATE LOCATION");
                                    ApproveLocations.remove(approve_location_id, (err, data) => {
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
                                        } else {
                                            console.log("DELETE APPROVE LOCATION ");
                                            PropertyToApprove.remove(req.params.propertyId, (err, data) => {
                                                if (err) {
                                                    if (err.kind == "not_found") {
                                                        res.status(404).send({
                                                            message: "Not found PropertyToApprove with id =" + req.params.propertyId
                                                        });
                                                    } else {
                                                        res.status(500).send({
                                                            message: "Couldn't delete PropertyToApprove with id =" + req.params.propertyId
                                                        });
                                                    }
                                                } else {
                                                    console.log("DELETE APPROVE PROP");
                                                    res.send(data);
                                                }
                                            });
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            });
        }
    });
};

exports.update = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can't be empty"
        });
    }

    PropertyToApprove.updateById(req.params.propertyId, new PropertyToApprove(req.body), (err, data) => {
        if (err) {
            if (err.kind == "not_found") {
                res.status(404).send({
                    message: "Not found PropertyToApprove with id =" + req.params.propertyId
                });
            } else {
                res.status(500).send({
                    message: "Error updating PropertyToApprove with id  =" + req.params.propertyId
                });
            }
        } else
            res.send(data);
    });
};

exports.delete = (req, res) => {
    PropertyToApprove.remove(req.params.propertyId, (err, data) => {
        if (err) {
            if (err.kind == "not_found") {
                res.status(404).send({
                    message: "Not found PropertyToApprove with id =" + req.params.propertyId
                });
            } else {
                res.status(500).send({
                    message: "Couldn't delete PropertyToApprove with id =" + req.params.propertyId
                });
            }
        } else
            res.send(data);
    });
};


exports.deleteAll = (req, res) => {
    PropertyToApprove.removeAll((err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occured while deleting properties"
            });
        } else
            res.send(data);
    });
};