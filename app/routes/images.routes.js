module.exports = app => {
    const images = require('../controllers/images.controller');

    app.post('/images', images.create);

    app.get('/images', images.findAll);

    app.get('/images/ByServiceId/:serviceId', images.findAllByServiceId);

    app.get('/images/:imgId', images.findOne);

    app.put('/images/:imgId', images.update);

    app.delete('/images/:imgId', images.delete);

    app.delete('/images', images.deleteAll);
}