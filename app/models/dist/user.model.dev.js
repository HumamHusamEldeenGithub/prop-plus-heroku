"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var sql = require('./db');

var User = function User(user) {
  this.id = user.id;
  this.name = user.name;
  this.phone = user.phone;
  this.email = user.email;
  this.avatarURL = user.avatarURL;
  this.firebase_id = user.firebase_id;
  this.date_of_reg = user.date_of_reg;
};

User.create = function (newUser, result) {
  sql.query("INSERT INTO users SET ?", newUser, function (err, res) {
    if (err) {
      console.log(err);
      result(err, null);
      return;
    }

    console.log("created user !");
    newUser.id = res.insertId;
    result(null, newUser);
  });
};

User.findById = function (userId, result) {
  sql.query('SELECT * FROM users WHERE id = ' + userId, function (err, res) {
    if (err) {
      console.log(err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found user : ", res[0]);
      result(null, res[0]);
      return;
    }

    result({
      kind: "not_found"
    }, null);
  });
};

User.findByFirebaseId = function (userId, result) {
  console.log(userId);
  sql.query("SELECT * FROM users WHERE firebase_id = '" + userId + "'", function (err, res) {
    if (err) {
      console.log(err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found user : ", res[0]);
      result(null, res[0]);
      return;
    }

    result({
      kind: "not_found"
    }, null);
  });
};

User.findByPropertyId = function (propertyId, result) {
  sql.query("SELECT users.* FROM properties INNER JOIN users ON users.id = properties.user_id AND properties.id =  ? LIMIT 1", propertyId, function (err, res) {
    if (err) {
      console.log(err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found user : ", res[0]);
      result(null, res[0]);
      return;
    }

    result({
      kind: "not_found"
    }, null);
  });
};

User.getAll = function (result) {
  sql.query("SELECT * FROM users", function (err, res) {
    if (err) {
      console.log(err);
      result(err, null);
      return;
    }

    console.log("users:", res);
    result(null, res);
  });
};

User.updateById = function (id, user, result) {
  console.log("ENTER UPDATE Model");
  sql.query("UPDATE users SET name= ? , email= ? , phone = ? , firebase_id = ? WHERE id=?", [user.name, user.email, user.phone, user.firebase_id, id], function (err, res) {
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

    console.log("updated user :" + id);
    result(null, _objectSpread({
      id: id
    }, user));
  });
};

User.updateAvatarURL = function (id, avatarURL, result) {
  sql.query("UPDATE users SET avatarURL= ? WHERE id=?", [avatarURL, id], function (err, res) {
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

    console.log("updated user :" + id);
    result(null, {
      id: id,
      avatarURL: avatarURL
    });
  });
};

User.updateUserName = function (id, name, result) {
  sql.query("UPDATE users SET name= ? WHERE id=?", [name, id], function (err, res) {
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

    console.log("updated user :" + id);
    result(null, {
      id: id,
      name: name
    });
  });
};

User.updatePhone = function (id, phone, result) {
  sql.query("UPDATE users SET phone= ? WHERE id=?", [phone, id], function (err, res) {
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

    console.log("updated user :" + id);
    result(null, {
      id: id,
      phone: phone
    });
  });
};

User.remove = function (id, result) {
  sql.query("DELETE FROM users WHERE id = ?", id, function (err, res) {
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

    console.log("deleted user with id =", id);
    result(null, res);
  });
};

User.removeAll = function (result) {
  sql.query("DELETE FROM users", function (err, res) {
    if (err) {
      console.log(err);
      result(err, null);
      return;
    }

    console.log("Deleted " + res.affectedRows + " user");
    result(null, res);
  });
};

module.exports = User;