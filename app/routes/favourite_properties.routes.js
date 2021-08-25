var VerifyToken = require('../../verifyToken.js');
module.exports = app => {
    const favourite_properties = require('../controllers/favourite_properties.controller');

    app.post('/favourite_properties', VerifyToken, favourite_properties.create);

    app.get('/favourite_properties/withDetails/:user_id', VerifyToken, favourite_properties.findAllWithDetails);

    app.get('/favourite_properties', VerifyToken, favourite_properties.findAll);

    app.get('/favourite_properties/:favourite_id', VerifyToken, favourite_properties.findOne);

    app.put('/favourite_properties/:favourite_id', VerifyToken, favourite_properties.update);

    app.delete('/favourite_properties/ByUser_PropertyId', VerifyToken, favourite_properties.deleteByUser_PropertyId);

    app.delete('/favourite_properties/:favourite_id', VerifyToken, favourite_properties.delete);

    app.delete('/favourite_properties', VerifyToken, favourite_properties.deleteAll);
}