module.exports = app => {
    const tables = require('../controllers/table.controller');
    app.get('/tables', tables.showTables);
}