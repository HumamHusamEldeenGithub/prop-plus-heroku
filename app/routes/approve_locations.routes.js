var VerifyToken = require('../../verifyToken.js');
module.exports = app => {
    const approve_locations = require('../controllers/approve_locations.controller');

    app.post('/approve_locations', VerifyToken, approve_locations.create);

    app.get('/approve_locations', VerifyToken, approve_locations.findAll);

    app.get('/approve_locations/ByPropertyId/:propertyId', VerifyToken, approve_locations.findOneByPropertyId);

    app.get('/approve_locations/:locationId', VerifyToken, approve_locations.findOne);

    app.put('/approve_locations/:locationId', VerifyToken, approve_locations.update);

    app.delete('/approve_locations/:locationId', VerifyToken, approve_locations.delete);

    app.delete('/approve_locations', VerifyToken, approve_locations.deleteAll);
}