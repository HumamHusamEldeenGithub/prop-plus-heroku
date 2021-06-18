module.exports = app => {
    const users = require('../controllers/user.controller');

    app.post('/users', users.create);

    app.get('/users', users.findAll);

    app.get('/users/:userId', users.findOne);

    app.get('/users/ByFirebase/:userId', users.findOneByFirebase);

    app.put('/users/:userId', users.update);

    app.delete('/users/:userId', users.delete);

    app.delete('/users', users.deleteAll);
}