const Booking = require('../models/bookings.model');

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can't be empty ! "
        });
    }
    const booking = new Booking({
        user_id: req.body.user_id,
        service_id: req.body.service_id,
        start_date: req.body.start_date,
        end_date: req.body.end_date
    });

    Booking.create(booking, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occured while creating a booking"
            });
        } else
            res.send(data);
    });
};

exports.findAll = (req, res) => {
    Booking.getAll((err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occured while getting bookings"
            });
        } else
            res.send(data);
    });
};

exports.findAllBookingForService = (req, res) => {
    Booking.findAllByServiceId(req.params.service_id, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occured while getting bookings"
            });
        } else
            res.send(data);
    });
};

exports.findAllBookingForUser = (req, res) => {
    Booking.findAllByUserId(req.params.user_id, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occured while getting bookings"
            });
        } else
            res.send(data);
    });
};

exports.findOne = (req, res) => {
    Booking.findById(req.params.booking_id, (err, data) => {
        if (err) {
            if (err.kind == "not_found") {
                res.status(404).send({
                    message: "Not found booking with id = " + req.params.booking_id
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving booking with id = " + req.params.booking_id
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

    Booking.updateById(req.params.booking_id, new Booking(req.body), (err, data) => {
        if (err) {
            if (err.kind == "not_found") {
                res.status(404).send({
                    message: "Not found booking with id =" + req.params.booking_id
                });
            } else {
                res.status(500).send({
                    message: "Error updating booking with id  =" + req.params.booking_id
                });
            }
        } else
            res.send(data);
    });
};

exports.delete = (req, res) => {
    Booking.remove(req.params.booking_id, (err, data) => {
        if (err) {
            if (err.kind == "not_found") {
                res.status(404).send({
                    message: "Not found booking with id =" + req.params.booking_id
                });
            } else {
                res.status(500).send({
                    message: "Couldn't delete booking with id =" + req.params.booking_id
                });
            }
        } else
            res.send(data);
    });
};


exports.deleteAll = (req, res) => {
    Booking.removeAll((err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occured while deleting bookings"
            });
        } else
            res.send(data);
    });
};