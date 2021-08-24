var VerifyToken = require('../../verifyToken.js');
module.exports = app => {
    const properties = require('../controllers/properties.controller');

    app.post('/properties', VerifyToken, properties.create);

    app.get('/properties', VerifyToken, properties.findAll);

    app.get('/properties/ByUserId/:userId', VerifyToken, properties.findAllByUserId);

    app.get('/properties/home', VerifyToken, properties.findAllWithDetails);

    app.get('/properties/:propertyId', VerifyToken, properties.findOne);

    app.put('/properties/:propertyId', VerifyToken, properties.update);

    app.delete('/properties/:propertyId', VerifyToken, properties.delete);

    app.delete('/properties', VerifyToken, properties.deleteAll);
}