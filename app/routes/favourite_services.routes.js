var VerifyToken = require('../../verifyToken.js');
module.exports = app => {
    const favourite_services = require('../controllers/favourite_services.controller');

    app.post('/favourite_services', VerifyToken, favourite_services.create);

    app.get('/favourite_services/withDetails/:user_id', VerifyToken, favourite_services.findAllWithDetails);

    app.get('/favourite_services/ByUserId/:user_id', VerifyToken, favourite_services.findAllWithUserId);

    app.get('/favourite_services', VerifyToken, favourite_services.findAll);

    app.get('/favourite_services/:favourite_id', VerifyToken, favourite_services.findOne);

    app.put('/favourite_services/:favourite_id', VerifyToken, favourite_services.update);

    app.delete('/favourite_services/ByUser_ServiceId', VerifyToken, favourite_services.deleteByUser_ServiceId);

    app.delete('/favourite_services/:favourite_id', VerifyToken, favourite_services.delete);

    app.delete('/favourite_services', VerifyToken, favourite_services.deleteAll);
}