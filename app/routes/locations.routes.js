var VerifyToken = require('../../verifyToken.js');
module.exports = app => {
    const locations = require('../controllers/locations.controller');

    app.post('/locations', VerifyToken, locations.create);

    app.get('/locations', VerifyToken, locations.findAll);

    app.get('/locations/:property_id', VerifyToken, locations.findOne);

    app.put('/locations/:location_id', VerifyToken, locations.update);

    app.delete('/booking/:location_id', VerifyToken, locations.delete);

    app.delete('/locations', VerifyToken, locations.deleteAll);
}