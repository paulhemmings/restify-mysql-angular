'use strict';

(function(exports) {

    /*
     * nabbed from: https://code.ciphertrick.com/2016/01/18/salt-hash-passwords-using-nodejs-crypto/
     */

    var crypto = require('crypto'),
        algorithm = 'aes-256-ctr',
        password = 'd6F3Efeq';

    /*
     * Generated random string for the seed.
     * This will be different for every stored password
     */

    var generateRandomString = function(length) {
        return crypto.randomBytes(Math.ceil(length/2))
                .toString('hex') /** convert to hexadecimal format */
                .slice(0,length);   /** return required number of characters */
    };

    /**
     * hash password with sha512.
     * @function
     * @param {string} password - List of required fields.
     * @param {string} salt - Data to be validated.
     */

    var sha512 = function(password, salt) {
        var hash = crypto.createHmac('sha512', salt); /** Hashing algorithm sha512 */
        hash.update(password);
        var value = hash.digest('hex');
        return {
            salt:salt,
            passwordHash:value
        };
    };

    /*
     * Encrypt and Decrypt text
     * TODO: Shouldn't use the same hex for everything.
     * TODO: Should change hex from example given on the site
     * https://github.com/chris-rock/node-crypto-examples/blob/master/crypto-ctr.js
     */

    exports.name = 'CryptoService';

    exports.initialize = function() {
    };

    exports.encryptWithSalt = function(password, salt) {
        // generate a salt if none provided
        var salting = salt || generateRandomString(16);
        // hash it
        var hash = crypto.createHmac('sha512', salting);
        hash.update(password);
        // return
        return {
            salt: salting,
            passwordHash: hash.digest('hex')
        };
    }

    exports.encrypt = function(text) {
        var cipher = crypto.createCipher(algorithm, password);
        var crypted = cipher.update(text,'utf8','hex');
        crypted += cipher.final('hex');
        return crypted;
    };

    exports.decrypt = function(text) {
        var decipher = crypto.createDecipher(algorithm, password);
        var dec = decipher.update(text,'hex','utf8');
        dec += decipher.final('utf8');
        return dec;
    };

})(exports);
