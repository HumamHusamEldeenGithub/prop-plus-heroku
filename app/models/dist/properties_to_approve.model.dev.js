"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var sql = require("./db");

var PropertyToApprove = function PropertyToApprove(propertyToApprove) {
  this.name = propertyToApprove.name, this.user_id = propertyToApprove.user_id, this.phone = propertyToApprove.phone, this.type = propertyToApprove.type, this.description = propertyToApprove.description, this.date_of_submition = propertyToApprove.date_of_submition;
};

PropertyToApprove.create = function (newPropertyToApprove, result) {
  console.log(newPropertyToApprove);
  sql.query("INSERT INTO properties_to_approve SET ?", newPropertyToApprove, function (err, res) {
    if (err) {
      console.log(err);
      result(err, null);
      return;
    }

    console.log("created PropertyToApprove !");
    result(null, _objectSpread({
      id: res.insertId
    }, newPropertyToApprove));
  });
};

PropertyToApprove.findById = function (PropertyToApproveId, result) {
  sql.query("SELECT * FROM properties_to_approve WHERE id = " + PropertyToApproveId, function (err, res) {
    if (err) {
      console.log(err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found PropertyToApprove : ", res[0]);
      result(null, res[0]);
      return;
    }

    result({
      kind: "not_found"
    }, null);
  });
};

PropertyToApprove.getAll = function (result) {
  sql.query("SELECT * FROM properties_to_approve", function (err, res) {
    if (err) {
      console.log(err);
      result(err, null);
      return;
    }

    console.log("properties_to_approve:", res);
    result(null, res);
  });
};

PropertyToApprove.updateById = function (id, newPropertyToApprove, result) {
  console.log(id);
  sql.query("UPDATE properties_to_approve SET name= ? , phone = ? , description = ?,type= ?  WHERE id=?", [newPropertyToApprove.name, newPropertyToApprove.phone, newPropertyToApprove.type, newPropertyToApprove.description, id], function (err, res) {
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

    console.log("updated PropertyToApprove :" + id);
    result(null, _objectSpread({
      id: id
    }, newPropertyToApprove));
  });
};

PropertyToApprove.remove = function (id, result) {
  sql.query("DELETE FROM properties_to_approve WHERE id = ?", id, function (err, res) {
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

    console.log("deleted PropertyToApprove with id =", id);
    result(null, res);
  });
};

PropertyToApprove.removeAll = function (result) {
  sql.query("DELETE FROM properties_to_approve", function (err, res) {
    if (err) {
      console.log(err);
      result(err, null);
      return;
    }

    console.log("Deleted " + res.affectedRows + " PropertyToApprove");
    result(null, res);
  });
};

module.exports = PropertyToApprove;