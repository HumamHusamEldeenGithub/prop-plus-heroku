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
  sql.query("SELECT * FROM properties WHERE properties.user_id = ?", userId, function (err, res) {
    if (err) {
      console.log(err);
      result(err, null);
      return;
    }

    console.log("properties:", res);
    result(null, res);
  });
};

Property.getAllForType = function (type, result) {
  sql.query("SELECT p.id,p.name,p.user_id,p.phone,p.description,p.rating,p.type, services.id as service_id  ,services.price_per_night,city,street,images.url FROM properties p ,services ,locations,images where services.price_per_night = (select MIN(services.price_per_night) from services where services.property_id =p.id) AND locations.property_id = p.id AND images.service_id=services.id AND images.is_main =1 AND p.type = ?", type, function (err, res) {
    if (err) {
      console.log(err);
      result(err, null);
      return;
    }

    console.log("properties:", res);
    result(null, res);
  });
};

Property.getAllWithDetails = function (result) {
  sql.query("SELECT p.id,p.name,p.user_id,p.phone,p.description,p.rating,p.type, services.id as service_id  ,services.price_per_night,city,street,images.url FROM properties p ,services ,locations,images where services.price_per_night = (select MIN(services.price_per_night) from services where services.property_id =p.id) AND locations.property_id = p.id AND images.service_id=services.id AND images.is_main =1", function (err, res) {
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
  var queryText = "SELECT properties.id,properties.name,properties.rating,properties.type,services.id as service_id , services.price_per_night , services.description,city,street,images.url FROM images INNER JOIN ((properties INNER JOIN services on services.property_id = properties.id) INNER JOIN locations on locations.property_id = properties.id) on images.service_id = services.id AND images.is_main = 1 WHERE services.description LIKE '%" + searchText + "%' OR properties.name LIKE '%" + searchText + "%' OR locations.street LIKE '%" + searchText + "%' OR locations.city LIKE '%" + searchText + "%'";
  sql.query(queryText, function (err, res) {
    if (err) {
      console.log(err);
      result(err, null);
      return;
    }

    console.log("properties:", res);
    result(null, res);
  });
}; //TODO : Create a query to get properties with full details using page_index (offset) parameter
// Property.getAllWithDetails = (page_index,result) => {
//   sql.query("SELECT * FROM properties LIMIT ? OFFSET ?",[parseInt(process.env.ITEM_PER_PAGE) , process.env.ITEM_PER_PAGE * page_index], (err, res) => {
//     if (err) {
//       console.log(err);
//       result(err, null);
//       return;
//     }
//     console.log("properties:", res);
//     result(null, res);
//   });
// };


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