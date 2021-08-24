var VerifyToken = require('../../verifyToken.js');
module.exports = app => {
    const images = require('../controllers/images.controller');

    app.post('/images', VerifyToken, images.create);

    app.get('/images', VerifyToken, images.findAll);

    app.get('/images/ByServiceId/:serviceId', VerifyToken, images.findAllByServiceId);

    app.get('/images/:imgId', VerifyToken, images.findOne);

    app.put('/images/:imgId', VerifyToken, images.update);

    app.delete('/images/:imgId', VerifyToken, images.delete);

    app.delete('/images', VerifyToken, images.deleteAll);
}