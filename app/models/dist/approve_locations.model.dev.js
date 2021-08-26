"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var sql = require("./db");

var ApproveLocations = function ApproveLocations(approveLocations) {
  this.id = approveLocations.id, this.property_id = approveLocations.property_id;
  this.city = approveLocations.city;
  this.street = approveLocations.street;
};

ApproveLocations.create = function (newApproveLocations, result) {
  sql.query("INSERT INTO approve_locations SET ?", newApproveLocations, function (err, res) {
    if (err) {
      console.log(err);
      result(err, null);
      return;
    }

    console.log("created approveLocations");
    result(null, _objectSpread({
      id: res.insertId
    }, newApproveLocations));
  });
};

ApproveLocations.findById = function (approveLocationsId, result) {
  sql.query("SELECT * FROM approve_locations WHERE id = ?", approveLocationsId, function (err, res) {
    if (err) {
      console.log(err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found approveLocation " + res[0]);
      result(null, res[0]);
    } //NOT FOUND


    result({
      kind: "not_found"
    }, null);
  });
};

ApproveLocations.getAll = function (result) {
  sql.query("SELECT * FROM approve_locations", function (err, res) {
    if (err) {
      console.log(err);
      result(err, null);
      return;
    }

    result(null, res);
  });
};

ApproveLocations.updateById = function (approveLocationsId, newApproveLocations, result) {
  sql.query("UPDATE approve_locations SET id = ? , property_id = ?, city = ? , street = ?  WHERE id = ", [newApproveLocations.id, newApproveLocations.property_id, newApproveLocations.city, newApproveLocations.street, approveLocationsId], function (err, res) {
    if (err) {
      console.log(err);
      result(err, null);
      return;
    } //NOT FOUND


    if (res.affectedRows == 0) {
      result({
        kind: "not_found"
      }, null);
      return;
    }

    console.log("ApproveLocations " + approveLocationsId + " has been updated");
    result(null, _objectSpread({
      id: approveLocationsId
    }, newApproveLocations));
  });
};

ApproveLocations.remove = function (id, result) {
  console.log("ENTER DELETE LOCATION ");
  sql.query("DELETE FROM approve_locations WHERE id = ?", id, function (err, res) {
    if (err) {
      console.log(err);
      result(err, null);
      return;
    } //NOT FOUND


    if (res.affectedRows == 0) {
      result({
        kind: "not_found"
      }, null);
      return;
    }

    console.log("deleted ApproveLocation with id = ", id);
    result(null, res);
  });
};

ApproveLocations.removeAll = function (result) {
  sql.query("DELETE FROM approve_locations", function (err, res) {
    if (err) {
      console.log(err);
      result(err, null);
      return;
    }

    console.log("Deleted " + res.affectedRows + " ApproveLocations");
    result(null, res);
  });
};

ApproveLocations.findByPropertyId = function (propertyId, result) {
  sql.query("SELECT * FROM approve_locations WHERE property_id = ?", propertyId, function (err, res) {
    if (err) {
      console.log(err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found ApproveLocations " + res);
      result(null, res);
    } //NOT FOUND


    result({
      kind: "not_found"
    }, null);
  });
};

module.exports = ApproveLocations;