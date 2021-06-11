module.exports = app => {
    const images = require('../controllers/images.controller') ; 

    app.post('/images' , images.create) ; 

    app.get('/images' , images.findAll) ; 

    app.get('/images/:userId' , images.findOne) ; 

    app.put('/images/:userId' , images.update) ; 

    app.delete('/booking/:userId' , images.delete) ; 

    app.delete('/images' , images.deleteAll) ; 
}