"use strict";

var User = require('../models/user.model');

var currentDate = new Date();

exports.create = function (req, res) {
  if (!req.body) {
    res.status(400).send({
      message: "Content can't be empty ! "
    });
  }

  var user = new User({
    id: req.body.id,
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    avatarURL: req.body.avatarURL,
    firebase_id: req.body.firebase_id,
    date_of_reg: currentDate.toJSON()
  });
  console.log(req.body);
  User.create(user, function (err, data) {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occured while creating a user"
      });
    } else res.send(data);
  });
};

exports.findAll = function (req, res) {
  User.getAll(function (err, data) {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occured while getting users"
      });
    } else res.send(data);
  });
};

exports.findOne = function (req, res) {
  User.findById(req.params.userId, function (err, data) {
    if (err) {
      if (err.kind == "not_found") {
        res.status(404).send({
          message: "Not found user with id = " + req.params.userId
        });
      } else {
        res.status(500).send({
          message: "Error retrieving user with id = " + req.params.userId
        });
      }
    } else res.send(data);
  });
};

exports.findOneByFirebase = function (req, res) {
  User.findByFirebaseId(req.params.userId, function (err, data) {
    if (err) {
      if (err.kind == "not_found") {
        res.status(404).send({
          message: "Not found user with firebase_id = " + req.params.userId
        });
      } else {
        res.status(500).send({
          message: "Error retrieving user with firebase_id = " + req.params.userId
        });
      }
    } else res.send(data);
  });
};

exports.findOneByPropertyId = function (req, res) {
  User.findByPropertyId(req.params.propertyId, function (err, data) {
    if (err) {
      if (err.kind == "not_found") {
        res.status(404).send({
          message: "Not found user with property_id = " + req.params.propertyId
        });
      } else {
        res.status(500).send({
          message: "Error retrieving user with property_id = " + req.params.propertyId
        });
      }
    } else res.send(data);
  });
};

exports.update = function (req, res) {
  console.log("ENTER UPDATE");

  if (!req.body) {
    res.status(400).send({
      message: "Content can't be empty"
    });
  }

  User.updateById(req.params.userId, new User(req.body), function (err, data) {
    if (err) {
      if (err.kind == "not_found") {
        res.status(404).send({
          message: "Not found user with id =" + req.params.userId
        });
      } else {
        res.status(500).send({
          message: "Error updating user with id  =" + req.params.userId
        });
      }
    } else res.send(data);
  });
};

exports.updateAvatarURL = function (req, res) {
  if (!req.body) {
    res.status(400).send({
      message: "Content can't be empty"
    });
  }

  User.updateAvatarURL(req.params.userId, req.body.avatarURL, function (err, data) {
    if (err) {
      if (err.kind == "not_found") {
        res.status(404).send({
          message: "Not found user with id =" + req.params.userId
        });
      } else {
        res.status(500).send({
          message: "Error updating user with id  =" + req.params.userId
        });
      }
    } else res.send(data);
  });
};

exports.updateUserName = function (req, res) {
  if (!req.body) {
    res.status(400).send({
      message: "Content can't be empty"
    });
  }

  User.updateUserName(req.params.userId, req.body.name, function (err, data) {
    if (err) {
      if (err.kind == "not_found") {
        res.status(404).send({
          message: "Not found user with id =" + req.params.userId
        });
      } else {
        res.status(500).send({
          message: "Error updating user with id  =" + req.params.userId
        });
      }
    } else res.send(data);
  });
};

exports.updatePhone = function (req, res) {
  if (!req.body) {
    res.status(400).send({
      message: "Content can't be empty"
    });
  }

  User.updatePhone(req.params.userId, req.body.phone, function (err, data) {
    if (err) {
      if (err.kind == "not_found") {
        res.status(404).send({
          message: "Not found user with id =" + req.params.userId
        });
      } else {
        res.status(500).send({
          message: "Error updating user with id  =" + req.params.userId
        });
      }
    } else res.send(data);
  });
};

exports["delete"] = function (req, res) {
  User.remove(req.params.userId, function (err, data) {
    if (err) {
      if (err.kind == "not_found") {
        res.status(404).send({
          message: "Not found user with id =" + req.params.userId
        });
      } else {
        res.status(500).send({
          message: "Couldn't delete user with id =" + req.params.userId
        });
      }
    } else res.send(data);
  });
};

exports.deleteAll = function (req, res) {
  User.removeAll(function (err, data) {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occured while deleting users"
      });
    } else res.send(data);
  });
};