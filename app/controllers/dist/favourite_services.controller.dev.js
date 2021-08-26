"use strict";

var Favourite_services = require('../models/favourite_services.model');

exports.create = function (req, res) {
  if (!req.body) {
    res.status(400).send({
      message: "Content can't be empty ! "
    });
  }

  var favourite_service = new Favourite_services({
    user_id: req.body.user_id,
    service_id: req.body.service_id
  });
  Favourite_services.create(favourite_service, function (err, data) {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occured while creating a Favourite"
      });
    } else res.send(data);
  });
};

exports.findAllWithDetails = function (req, res) {
  Favourite_services.getAllWithDetails(req.params.user_id, function (err, data) {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occured while getting Favourites"
      });
    } else res.send(data);
  });
};

exports.findAll = function (req, res) {
  Favourite_services.getAll(function (err, data) {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occured while getting Favourites"
      });
    } else res.send(data);
  });
};

exports.findAllWithUserId = function (req, res) {
  Favourite_services.getAllByUserId(req.params.user_id, function (err, data) {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occured while getting Favourites"
      });
    } else res.send(data);
  });
};

exports.findOne = function (req, res) {
  Favourite_services.findById(req.params.favourite_id, function (err, data) {
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
    } else res.send(data);
  });
};

exports.update = function (req, res) {
  if (!req.body) {
    res.status(400).send({
      message: "Content can't be empty"
    });
  }

  Favourite_services.updateById(req.params.favourite_id, new Favourite_service(req.body), function (err, data) {
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
    } else res.send(data);
  });
};

exports["delete"] = function (req, res) {
  Favourite_services.remove(req.params.favourite_id, function (err, data) {
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
    } else res.send(data);
  });
};

exports.deleteByUser_ServiceId = function (req, res) {
  if (!req.body) {
    res.status(400).send({
      message: "Content can't be empty ! "
    });
  }

  var favourite_service = new Favourite_services({
    user_id: req.body.user_id,
    service_id: req.body.service_id
  });
  Favourite_services.removeByUser_PropertyId(favourite_service, function (err, data) {
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
    } else res.send(data);
  });
};

exports.deleteAll = function (req, res) {
  Favourite_services.removeAll(function (err, data) {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occured while deleting Favourites"
      });
    } else res.send(data);
  });
};