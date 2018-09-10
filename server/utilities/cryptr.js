const Cryptr = require('cryptr');
const cryptr = new Cryptr('GadulaMDF');

module.exports = {
    encrypted: (password) => {
        return cryptr.encrypt(`${password}`);
    },
    decrypted: (encryptedPass) => {
        return cryptr.decrypt(`${encryptedPass}`);
    }
}