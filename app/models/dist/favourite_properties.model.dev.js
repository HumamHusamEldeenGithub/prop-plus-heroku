"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var sql = require("./db");

var Favourite_service = function Favourite_service(favourite_service) {
  this.user_id = favourite_service.user_id;
  this.service_id = favourite_service.service_id;
};

Favourite_property.create = function (newFavourite, result) {
  sql.query("INSERT INTO favourite_services SET ?", newFavourite, function (err, res) {
    if (err) {
      console.log(err);
      result(err, null);
      return;
    }

    console.log("created Favourite");
    result(null, _objectSpread({
      id: res.insertId
    }, newFavourite));
  });
};

Favourite_property.findById = function (FavouriteId, result) {
  sql.query("SELECT * FROM favourite_services WHERE id = ?", FavouriteId, function (err, res) {
    if (err) {
      console.log(err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found Favourite " + res[0]);
      result(null, res[0]);
    } //NOT FOUND


    result({
      kind: "not_found"
    }, null);
  });
};

Favourite_property.getAll = function (result) {
  sql.query("SELECT * FROM favourite_services", function (err, res) {
    if (err) {
      console.log(err);
      result(err, null);
      return;
    }

    result(null, res);
  });
};

Favourite_property.getAllWithDetails = function (user_id, result) {
  sql.query("SELECT p.id,p.name,p.user_id,p.phone,p.description,p.rating, services.id as service_id  ,services.price_per_night,city,street,favourite_services.user_id as fav_user_id,images.url FROM properties p ,services ,locations,images,favourite_services where services.price_per_night = (select MIN(services.price_per_night) from services where services.property_id =p.id) AND locations.property_id = p.id AND images.service_id=services.id AND images.is_main =1 AND favourite_services.property_id =p.id AND favourite_services.user_id = " + user_id, function (err, res) {
    if (err) {
      console.log(err);
      result(err, null);
      return;
    }

    result(null, res);
  });
};

Favourite_property.updateById = function (favourite_Id, newFavourite, result) {
  sql.query("UPDATE favourite_services SET user_id = ? , service_id = ? WHERE id = ", [newFavourite.user_id, newFavourite.service_id, favourite_Id], function (err, res) {
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

    console.log("Favourite " + favourite_Id + " has been updated");
    result(null, _objectSpread({
      id: favourite_Id
    }, newFavourite));
  });
};

Favourite_property.remove = function (id, result) {
  sql.query("DELETE FROM favourite_services WHERE id = ?", id, function (err, res) {
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

    console.log("deleted favourite with id = ", id);
    result(null, res);
  });
};

Favourite_property.removeByUser_PropertyId = function (currentFavourite, result) {
  sql.query("DELETE FROM favourite_services WHERE user_id = ? AND service_id = ?", [currentFavourite.user_id, currentFavourite.service_id], function (err, res) {
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

    console.log("deleted favourite with user_id = ", currentFavourite.user_id);
    result(null, res);
  });
};

Favourite_property.removeAll = function (result) {
  sql.query("DELETE FROM favourite_services", function (err, res) {
    if (err) {
      console.log(err);
      result(err, null);
      return;
    }

    console.log("Deleted " + res.affectedRows + " favourite_propertie");
    result(null, res);
  });
};

module.exports = Favourite_property;