const passport = require('passport');
const passportJwt = require('passport-jwt');
const JwtStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;
const User = require('../models/User');

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'Gadul'
};

module.exports = () => {
    passport.use(new JwtStrategy(options, (payload, next) => {
        User.findOne({ _id: payload.id }).then(user => {
            if (!user) {
                return next(null, false);
            }
    
            return next(null, user);
        });
    }));
};
