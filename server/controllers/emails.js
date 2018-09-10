const Emails = require('mongoose').model('Emails');
const User = require('mongoose').model('User');
const mailSender = require('../utilities/mailSender');
const cryptr = require('../utilities/cryptr');

module.exports = {
    sendEmail: (req, res) => {
        let { receivers, subject, html } = req.body.body;
        let userId = req.user.id;
        User.findById(userId)
            .then(user => {
                Emails.create({
                    receivers,
                    subject,
                    html
                }).then(email => {
                    user.sendedEmail.push(email);
                    let gmail = user.gmail;
                    let gmailPass = cryptr.decrypted(user.gmailPass);
                    user.save()
                        .then(() => {
                            mailSender(receivers, subject, html, gmail, gmailPass, res);
                        });
                }).catch(err => { 
                    console.log(err);
                });
            });
    },
    getEmails: (req, res) => {
        let userId = req.user.id;
        User.findById(userId)
            .populate('sendedEmail')
            .then(user => { 
                let allEmails = user.sendedEmail;
                res.json({
                    allEmails
                });
            }).catch(err => {
                console.log(err);
            });
    }
};