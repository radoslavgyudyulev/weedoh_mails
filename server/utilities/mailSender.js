const nodemailer = require('nodemailer');

function sendMail(receivers, subject, html, gmail, gmailPass, res ) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: `${gmail}`,
            pass: `${gmailPass}`

            // user: '4TestingTurposes',
            // pass: '@4TestingTurposes'
        }
    });
    const mailOptions = {
        from: 'radoslav.gyudyulev@gmail.com', // sender address
        to: receivers, // list of receivers
        subject: subject, // Subject line
        html: html // plain text body
    };
    transporter.sendMail(mailOptions, function (err, info) {
        if(err)
            res.json({
                message : `There is an ERROR : ${err}!`
            });
        else
            res.json({
                message : 'Your email was successfuly sended!'
            });
    });
}

module.exports = sendMail;