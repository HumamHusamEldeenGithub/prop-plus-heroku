var VerifyToken = require('../../verifyToken.js');
module.exports = app => {
    const users = require('../controllers/user.controller');

    app.post('/users', VerifyToken, users.create);

    app.get('/users', VerifyToken, users.findAll);

    app.get('/users/:userId', VerifyToken, users.findOne);

    app.get('/users/ByFirebase/:userId', VerifyToken, users.findOneByFirebase);

    app.put('/users/avatarURL/:userId', VerifyToken, users.updateAvatarURL);

    app.put('/users/name/:userId', VerifyToken, users.updateUserName);

    app.put('/users/phone/:userId', VerifyToken, users.updatePhone);

    app.put('/users/:userId', VerifyToken, users.update);

    app.delete('/users/:userId', VerifyToken, users.delete);

    app.delete('/users', VerifyToken, users.deleteAll);
}