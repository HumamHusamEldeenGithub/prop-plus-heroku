module.exports = app => {
    const properties = require('../controllers/properties.controller');

    app.post('/properties', properties.create);

    app.get('/properties', properties.findAll);

    app.get('/properties/ByUserId/:userId', properties.findAllByUserId);

    app.get('/properties/home', properties.findAllWithDetails);

    app.get('/properties/:propertyId', properties.findOne);

    app.put('/properties/:propertyId', properties.update);

    app.delete('/properties/:propertyId', properties.delete);

    app.delete('/properties', properties.deleteAll);
}