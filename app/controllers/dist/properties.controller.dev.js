"use strict";

var Property = require("../models/properties.model");

exports.create = function (req, res) {
  if (!req.body) {
    res.status(400).send({
      message: "Content can't be empty ! "
    });
  }

  var property = new Property({
    name: req.body.name,
    user_id: req.body.user_id,
    phone: req.body.phone,
    description: req.body.description,
    type: req.body.type,
    rating: req.body.rating
  });
  Property.create(property, function (err, data) {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occured while creating a property"
      });
    } else res.send(data);
  });
};

exports.findAll = function (req, res) {
  Property.getAll(function (err, data) {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occured while getting property"
      });
    } else res.send(data);
  });
};

exports.findAllByUserId = function (req, res) {
  Property.getAllByUserId(req.params.userId, function (err, data) {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occured while getting property"
      });
    } else res.send(data);
  });
};

exports.findAllWithDetails = function (req, res) {
  Property.getAllWithDetails(function (err, data) {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occured while getting property"
      });
    } else res.send(data);
  });
};

exports.findAllForType = function (req, res) {
  Property.getAllForType(req.params.type, function (err, data) {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occured while getting property"
      });
    } else res.send(data);
  });
};

exports.getSearchResults = function (req, res) {
  Property.getSearchResults(req.body.searchText, function (err, data) {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occured while getting property"
      });
    } else res.send(data);
  });
};

exports.findOne = function (req, res) {
  Property.findById(req.params.propertyId, function (err, data) {
    if (err) {
      if (err.kind == "not_found") {
        res.status(404).send({
          message: "Not found property with id = " + req.params.propertyId
        });
      } else {
        res.status(500).send({
          message: "Error retrieving property with id = " + req.params.propertyId
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

  Property.updateById(req.params.propertyId, new Property(req.body), function (err, data) {
    if (err) {
      if (err.kind == "not_found") {
        res.status(404).send({
          message: "Not found property with id =" + req.params.propertyId
        });
      } else {
        res.status(500).send({
          message: "Error updating property with id  =" + req.params.propertyId
        });
      }
    } else res.send(data);
  });
};

exports["delete"] = function (req, res) {
  Property.remove(req.params.propertyId, function (err, data) {
    if (err) {
      if (err.kind == "not_found") {
        res.status(404).send({
          message: "Not found property with id =" + req.params.propertyId
        });
      } else {
        res.status(500).send({
          message: "Couldn't delete property with id =" + req.params.propertyId
        });
      }
    } else res.send(data);
  });
};

exports.deleteAll = function (req, res) {
  Property.removeAll(function (err, data) {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occured while deleting properties"
      });
    } else res.send(data);
  });
};