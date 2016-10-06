'use strict';

var crypto = require('crypto'),
    algorithm = 'aes-256-ctr',
    password = 'd6F3Efeq';

/*
 * Encrypt and Decrypt text
 * TODO: Shouldn't use the same hex for everything.
 * TODO: Should change hex from example given on the site
 * https://github.com/chris-rock/node-crypto-examples/blob/master/crypto-ctr.js
 */

exports.name = 'CryptoService';

exports.initialize = function() {
};

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
