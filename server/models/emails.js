const mongoose = require('mongoose');

const emailsSchema = new mongoose.Schema({
    receivers: [{ type: mongoose.SchemaTypes.String, required: true }],
    html: { type: mongoose.SchemaTypes.String, required: true },
    subject: { type: mongoose.SchemaTypes.String, required: true },
    date: { type: mongoose.SchemaTypes.Date, default: Date.now }
});

const Email = mongoose.model('Emails', emailsSchema);

module.exports = Email;