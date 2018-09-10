const controllers = require('../controllers');
const passport = require('passport');
require('./passport')();

module.exports = (app) => {
    app.post('/api/register', controllers.user.registerPost);
    app.post('/api/login', controllers.user.loginPost);
    app.post('/api/mails/send',passport.authenticate('jwt', { session: false }),  controllers.emails.sendEmail);
    app.get('/api/getEmails',passport.authenticate('jwt', { session: false }), controllers.emails.getEmails);
    app.post('/api/gmail/credentials', passport.authenticate('jwt', { session: false }), controllers.user.gmailCredentials);
};
