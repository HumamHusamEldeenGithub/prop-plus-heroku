"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var sql = require("./db");

require("dotenv").config();

var Property = function Property(property) {
  this.name = property.name, this.user_id = property.user_id, this.phone = property.phone, this.type = property.type, this.description = property.description, this.rating = property.rating;
};

Property.create = function (newProperty, result) {
  sql.query("INSERT INTO properties SET ?", newProperty, function (err, res) {
    if (err) {
      console.log(err);
      result(err, null);
      return;
    }

    console.log("created property !");
    result(null, _objectSpread({
      id: res.insertId
    }, newProperty));
  });
};

Property.findById = function (propertyId, result) {
  sql.query("SELECT * FROM properties WHERE id = " + propertyId, function (err, res) {
    if (err) {
      console.log(err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found property : ", res[0]);
      result(null, res[0]);
      return;
    }

    result({
      kind: "not_found"
    }, null);
  });
};

Property.getAll = function (result) {
  sql.query("SELECT * FROM properties", function (err, res) {
    if (err) {
      console.log(err);
      result(err, null);
      return;
    }

    console.log("properties:", res);
    result(null, res);
  });
};

Property.getAllByUserId = function (userId, result) {
  sql.query("SELECT p.id , p.name,p.user_id,p.phone,p.description,p.type,p.rating,locations.city,locations.street FROM properties p , locations WHERE p.user_id = ? AND locations.property_id = p.id", userId, function (err, res) {
    if (err) {
      console.log(err);
      result(err, null);
      return;
    }

    console.log("properties:", res);
    result(null, res);
  });
};

Property.getAllForType = function (type, pageIndex, result) {
  var itemsCount = parseInt(process.env.ITEM_PER_PAGE);
  var offset = parseInt(pageIndex) * parseInt(process.env.ITEM_PER_PAGE);

  if (type == 'top_rated') {
    sql.query("SELECT p.id,p.name,p.user_id,p.phone,p.description,p.rating,p.type, services.id as service_id  ,services.price_per_night,city,street,images.url FROM images INNER JOIN (locations INNER JOIN (properties p INNER JOIN services on p.id = services.property_id) on locations.property_id = p.id) on images.service_id = services.id AND images.is_main = 1 where p.rating > ? LIMIT ? OFFSET ?", ["4", itemsCount, offset], function (err, res) {
      if (err) {
        console.log(err);
        result(err, null);
        return;
      }

      console.log("properties:", res);
      result(null, res);
    });
  } else if (type == 'best_price') {
    sql.query("SELECT p.id,p.name,p.user_id,p.phone,p.description,p.rating,p.type, services.id as service_id  ,services.price_per_night,city,street,images.url FROM images INNER JOIN (locations INNER JOIN (properties p INNER JOIN services on p.id = services.property_id) on locations.property_id = p.id) on images.service_id = services.id AND images.is_main = 1 where services.price_per_night < 80 LIMIT ? OFFSET ?", [itemsCount, offset], function (err, res) {
      if (err) {
        console.log(err);
        result(err, null);
        return;
      }

      console.log("properties:", res);
      result(null, res);
    });
  } else {
    sql.query("SELECT p.id,p.name,p.user_id,p.phone,p.description,p.rating,p.type, services.id as service_id  ,services.price_per_night,city,street,images.url FROM images INNER JOIN (locations INNER JOIN (properties p INNER JOIN services on p.id = services.property_id) on locations.property_id = p.id) on images.service_id = services.id AND images.is_main = 1 WHERE p.type = ? LIMIT ? OFFSET ?", [type, itemsCount, offset], function (err, res) {
      if (err) {
        console.log(err);
        result(err, null);
        return;
      }

      console.log("properties:", res);
      result(null, res);
    });
  }
};

Property.getAllWithDetails = function (pageIndex, result) {
  var itemsCount = parseInt(process.env.ITEM_PER_PAGE);
  var offset = parseInt(pageIndex) * parseInt(process.env.ITEM_PER_PAGE);
  sql.query("SELECT p.id,p.name,p.user_id,p.phone,p.description,p.rating,p.type, services.id as service_id  ,services.price_per_night,city,street,images.url FROM images INNER JOIN (locations INNER JOIN (properties p INNER JOIN services on p.id = services.property_id) on locations.property_id = p.id) on images.service_id = services.id AND images.is_main = 1 where services.price_per_night = (select MIN(services.price_per_night) from services where services.property_id =p.id) LIMIT ? OFFSET ?", [itemsCount, offset], function (err, res) {
    if (err) {
      console.log(err);
      result(err, null);
      return;
    }

    console.log("properties:", res);
    result(null, res);
  });
};

Property.getSearchResults = function (searchText, result) {
  var queryText = "SELECT p.id,p.name,p.user_id,p.phone,p.description,p.rating,p.type, services.id as service_id  ,services.price_per_night,city,street,images.url FROM images INNER JOIN (locations INNER JOIN (properties p INNER JOIN services on p.id = services.property_id) on locations.property_id = p.id) on images.service_id = services.id AND images.is_main = 1 WHERE services.description LIKE '%" + searchText + "%' OR p.name LIKE '%" + searchText + "%' OR locations.street LIKE '%" + searchText + "%' OR locations.city LIKE '%" + searchText + "%'";
  sql.query(queryText, function (err, res) {
    if (err) {
      console.log(err);
      result(err, null);
      return;
    }

    console.log("properties:", res);
    result(null, res);
  });
};

Property.updateById = function (id, newProperty, result) {
  console.log(id);
  sql.query("UPDATE properties SET name= ? , phone = ? , description = ? , rating = ? WHERE id=?", [newProperty.name, newProperty.phone, newProperty.description, newProperty.rating, id], function (err, res) {
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

    console.log("updated property :" + id);
    result(null, _objectSpread({
      id: id
    }, newProperty));
  });
};

Property.updateRating = function (id, rating, result) {
  console.log(id);
  sql.query("UPDATE properties SET rating = (properties.rating + ?)/2 WHERE properties.id = ?", [rating, id], function (err, res) {
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

    console.log("updated property :" + id);
    result(null, {
      'message': 'done'
    });
  });
};

Property.remove = function (id, result) {
  sql.query("DELETE FROM properties WHERE id = ?", id, function (err, res) {
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

    console.log("deleted property with id =", id);
    result(null, res);
  });
};

Property.removeAll = function (result) {
  sql.query("DELETE FROM properties", function (err, res) {
    if (err) {
      console.log(err);
      result(err, null);
      return;
    }

    console.log("Deleted " + res.affectedRows + " property");
    result(null, res);
  });
};

module.exports = Property;