const express = require('express');
const config = require('./config/config');
const app = express();

// #db 
require('./config/database')(config);

// #middleware
require('./config/express')(app);
require('./config/routes')(app);

// #server
app.listen(config.PORT, () => {
    console.log(`Running on port ${config.PORT}...`);
});