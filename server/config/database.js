// mongoose configuration file
const mongoose = require('mongoose');
require('../models/emails');

mongoose.Promise = global.Promise;
// Setting up the Database
module.exports = (settings) => {
    mongoose.connect(settings.DB);
    let db = mongoose.connection;
    db.once('open', err => {
        if (err) {
            throw err;
        }
        console.log('Mongo ran without errors (happy)!');
    });
    db.on('error', err => console.log(`Database error: ${err}`));

    require('../models/User').AdminUser();
};