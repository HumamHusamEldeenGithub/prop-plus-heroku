var VerifyToken = require('../../verifyToken.js');
module.exports = app => {
    const services = require('../controllers/services.controllers');

    app.post('/services', VerifyToken, services.create);

    app.get('/services', VerifyToken, services.findAll);

    app.get('/services/ByPropertyId/:id', VerifyToken, services.findAllByPropertyId);

    app.get('/services/ByCity/:city', VerifyToken, services.findAllByCity);

    app.get('/services/ByRating', VerifyToken, services.findAllByRating);

    app.get('/services/:serviceId', VerifyToken, services.findOne);

    app.put('/services/:serviceId', VerifyToken, services.update);

    app.delete('/services/:serviceId', VerifyToken, services.delete);

    app.delete('/services', VerifyToken, services.deleteAll);
}