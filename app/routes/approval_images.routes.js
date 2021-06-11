module.exports = app => {
    const approval_images = require('../controllers/approval_images.controller') ; 

    app.post('/approval_images' , approval_images.create) ; 

    app.get('/approval_images' , approval_images.findAll) ; 

    app.get('/approval_images/:userId' , approval_images.findOne) ; 

    app.put('/approval_images/:userId' , approval_images.update) ; 

    app.delete('/booking/:userId' , approval_images.delete) ; 

    app.delete('/approval_images' , approval_images.deleteAll) ; 
}