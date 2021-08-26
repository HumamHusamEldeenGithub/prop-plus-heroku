var VerifyToken = require('../../verifyToken.js');
module.exports = app => {
    const approval_images = require('../controllers/approval_images.controller');

    app.post('/approval_images', VerifyToken, approval_images.create);

    app.get('/approval_images', VerifyToken, approval_images.findAll);

    app.get('/approval_images/:property_id', VerifyToken, approval_images.findOne);

    app.put('/approval_images/:imgId', VerifyToken, approval_images.update);

    app.delete('/approval_images/:imgId', VerifyToken, approval_images.delete);

    app.delete('/approval_images', VerifyToken, approval_images.deleteAll);
}