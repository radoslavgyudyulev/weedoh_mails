const mongoose = require('mongoose');
const encryption = require('../utilities/encryption');

const UserSchema = new mongoose.Schema({
    email: { type: mongoose.SchemaTypes.String, required: true, unique: true },
    sendedEmail: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Emails' }],
    password: { type: mongoose.SchemaTypes.String, required: true },
    salt: {type: mongoose.SchemaTypes.String, required: true },
    gmail: { type: mongoose.SchemaTypes.String, default: '' },
    gmailPass: { type: mongoose.SchemaTypes.String, default: '',  },
    date: { type: mongoose.SchemaTypes.Date, default: Date.now }
});

UserSchema.method({
    authenticate: function (password) {
        let hashedPassword = encryption.generateHashedPassword(this.salt, password);

        if (hashedPassword === this.password) {
            return true;
        }

        return false;
    }
});


const User = mongoose.model('User', UserSchema);

module.exports = User;

module.exports.AdminUser = () => {
    User.find({ email: 'noEmail'}).then(users => {
        if (users.length === 0) {
            let salt = encryption.generateSalt();
            let hashedPass = encryption.generateHashedPassword(salt, 'Admin2394');
    
            User.create({
                email: 'noEmail',
                firstName: 'RD',
                lastName: 'GG',
                age: 30,
                phoneNumber: '0888892321',
                about: 'Admin',
                image: '',
                password: hashedPass,
                salt: salt,
                town: 'New York'
            });
        }
    });
};