const User = require('../models/User');
const cryptr = require('../utilities/cryptr');
const encryption = require('../utilities/encryption');
const jwt = require('jsonwebtoken');
const validator = require("email-validator");

module.exports.registerPost = (req, res) => {
    let userData = req.body.body.registrationData;
    //let userData = req.body;
   
    let userEmail = userData.email;
    if(!validator.validate(userEmail)) {
        return res.json({
            message: 'Email validator failed!'
        });
    }

    if (userData.password && userData.password !== userData.confirmedPassword) {
        res.json({
            message: "Password don't match!"
        });
        return;
    }

    let salt = encryption.generateSalt();
    userData.salt = salt;

    if (userData.password) {
        let hashedPassword = encryption.generateHashedPassword(salt, userData.password);
        userData.password = hashedPassword;
    }
    let userToSave = {
        email : userData.email,
        password : userData.password,
        salt : userData.salt
    }

    User.create(userData).then(user => {
        const payload = { id: user._id };
        const token = jwt.sign(payload, 'Gadul');
        res.json({
            message: "Success",
            token
        });
    }).catch(error => {
        console.log(error)
        return res.send('Email already exist!');
    });
};

module.exports.loginPost = (req, res) => {
    let userToLogin = req.body.body.body;
    //let userToLogin = req.body;
    
    User.findOne({ email: userToLogin.email }).then(user => {
        if (!user || !user.authenticate(userToLogin.password)) {
            res.status(403);
        } else {
            const payload = { id: user._id };
            const token = jwt.sign(payload, 'Gadul');
            res.json({
                message: 'Success',
                token
            });
        }
    }).catch(err => {
        return console.log(err);
    });
};

module.exports.gmailCredentials = (req, res) => { 
    let { gmail, password } = req.body.body;
    password = cryptr.encrypted(password);
    User.findById(req.user.id)
        .then(user => {
            user.gmail = gmail;
            user.gmailPass = password;
            user.save()
                .then(() => {
                    res.json({
                        message: 'Credentials successfully saved!'
                    });
                });
        }).catch(err => {
            console.log(err);
        });
}