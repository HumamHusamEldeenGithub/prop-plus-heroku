var VerifyToken = require('../../verifyToken.js');
module.exports = app => {
    const properties_to_approve = require('../controllers/properties_to_approve.controller');

    app.post('/properties_to_approve', VerifyToken, properties_to_approve.create);

    app.get('/properties_to_approve', VerifyToken, properties_to_approve.findAll);

    app.get('/properties_to_approve/:propertyId', VerifyToken, properties_to_approve.findOne);

    app.get('/properties_to_approve/accept_property/:propertyId', VerifyToken, properties_to_approve.acceptProperty);

    app.put('/properties_to_approve/:propertyId', VerifyToken, properties_to_approve.update);

    app.delete('/properties_to_approve/:propertyId', VerifyToken, properties_to_approve.delete);

    app.delete('/properties_to_approve', VerifyToken, properties_to_approve.deleteAll);
}