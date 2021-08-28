"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var sql = require("./db");

var ApprovalImage = function ApprovalImage(approvalImage) {
  this.property_to_approve_id = approvalImage.property_to_approve_id;
  this.property_id = null;
  this.url = approvalImage.url;
};

ApprovalImage.create = function (newApprovalImage, result) {
  sql.query("INSERT INTO approval_images (property_to_approve_id,property_id,url) VALUES" + newApprovalImage, function (err, res) {
    if (err) {
      console.log("[mysql error]", err);
      result(err, null);
      return;
    }

    console.log("created ApprovalImage");
    result(null, _objectSpread({
      id: res.insertId
    }, newApprovalImage));
  });
};

ApprovalImage.findByPropertyId = function (property_id, result) {
  sql.query("SELECT * FROM approval_images WHERE approval_images.property_to_approve_id = ?", property_id, function (err, res) {
    if (err) {
      console.log(err);
      result(err, null);
      return;
    }

    result(null, res);
  });
};

ApprovalImage.getAll = function (result) {
  sql.query("SELECT * FROM approval_images", function (err, res) {
    if (err) {
      console.log(err);
      result(err, null);
      return;
    }

    result(null, res);
  });
};

ApprovalImage.updateById = function (ApprovalImageId, newApprovalImage, result) {
  sql.query("UPDATE approval_images SET  property_id = ? , url = ? WHERE approval_images.id = ", [newApprovalImage.property_id, newApprovalImage.url, ApprovalImageId], function (err, res) {
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

    console.log("ApprovalImage " + ApprovalImageId + " has been updated");
    result(null, _objectSpread({
      id: ApprovalImageId
    }, newApprovalImage));
  });
};

ApprovalImage.remove = function (id, result) {
  sql.query("DELETE FROM approval_images WHERE id = ?", id, function (err, res) {
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

    console.log("deleted approval_image with id = ", id);
    result(null, res);
  });
};

ApprovalImage.removeAll = function (result) {
  sql.query("DELETE FROM approval_images", function (err, res) {
    if (err) {
      console.log(err);
      result(err, null);
      return;
    }

    console.log("Deleted " + res.affectedRows + " ApprovalImages");
    result(null, res);
  });
};

module.exports = ApprovalImage;