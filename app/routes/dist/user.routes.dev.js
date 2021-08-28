"use strict";

var VerifyToken = require('../../verifyToken.js');

module.exports = function (app) {
  var users = require('../controllers/user.controller');

  app.post('/users', VerifyToken, users.create);
  app.get('/users', VerifyToken, users.findAll);
  app.get('/users/:userId', VerifyToken, users.findOne);
  app.get('/users/ByFirebase/:userId', VerifyToken, users.findOneByFirebase);
  app.get('/users/ByPropertyId/:propertyId', VerifyToken, users.findOneByPropertyId);
  app.put('/users/avatarURL/:userId', VerifyToken, users.updateAvatarURL);
  app.put('/users/name/:userId', VerifyToken, users.updateUserName);
  app.put('/users/phone/:userId', VerifyToken, users.updatePhone);
  app.put('/users/:userId', VerifyToken, users.update);
  app["delete"]('/users/:userId', VerifyToken, users["delete"]);
  app["delete"]('/users', VerifyToken, users.deleteAll);
};