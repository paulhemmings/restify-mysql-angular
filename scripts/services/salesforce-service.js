'use strict';

/* https://www.npmjs.com/package/node-salesforce */

(function(exports) {

    var sf = require('node-salesforce');
    var Promise = require('node-promise').Promise;
    var conn = new sf.Connection({
      // you can change loginUrl to connect to sandbox or prerelease env.
      loginUrl : 'https://test.salesforce.com'
    });

    exports.name = 'SalesforceService';

    exports.initialize = function() {
    };

    exports.login = function(username, password) {
        var promise = new Promise();
        conn.login(username, password, function(err, userInfo) {
          if (err) {
              promise.reject ('invalid token: ' + err);
              return promise;
          }
          promise.resolve ({
            accessToken : conn.accessToken,
            instanceUrl : conn.instanceUrl,
            userId : userInfo.id,
            organizationId : userInfo.organizationId
          });
        });
        return promise;
    };

})(exports);
