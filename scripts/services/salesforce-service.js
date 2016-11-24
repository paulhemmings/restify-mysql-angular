'use strict';

/* https://www.npmjs.com/package/node-salesforce */

(function(exports) {

    var http = require('http');
    var request = require('request');
    var sf = require('node-salesforce');
    var Promise = require('node-promise').Promise;

    var conn = new sf.Connection({
      // you can change loginUrl to connect to sandbox or prerelease env.
      loginUrl : 'https://test.salesforce.com'
    });

    exports.name = 'SalesforceService';

    exports.initialize = function() {
    };

    // {
    //   "totalSize":40690,"done":false,"nextRecordsUrl":"/services/data/v29.0/query/01g4B00000EqFW6QAN-2000",
    //   "records":[
    //     {
    //       "attributes":
    //       {
    //          "type":"Account","url":"/services/data/v29.0/sobjects/Account/0014B000006il6dQAA"
    //       },
    //       "Id":"0014B000006il6dQAA",
    //       "Name":"John Smith"
    //     }
    //   ]
    // }

    exports.query = function(token, soql) {

        var promise = new Promise();
        var fullUrl = token.instanceUrl + '/services/data/v20.0/query/?q=' + encodeURIComponent(soql);
        var callback = function (error, response, body) {
            if (error) {
                console.log(error);
                return promise.reject(error);
            }
            promise.resolve(JSON.parse(body));
        }

        console.log('query: ' + fullUrl);
        request.get(fullUrl, callback).auth(null, null, true, token.accessToken);

        return promise;
    }

    // {
    // "accessToken":"00D4B0000009Jh3!AQEAQMWxSmnkYbsJC7T6VsyIBC1jIEpoLNXG0jaAmc2ZDy7qOAAIdHdhAO7vJuYnP59DfqTlTQ_yjWj3fqMj8ZK3ZEDy8kHj",
    // "instanceUrl":"https://restorationhardware--MDM2.cs51.my.salesforce.com",
    // "userId":"0054B000000Zzz6QAC",
    // "organizationId":"00D4B0000009Jh3UAE"
    // }

    exports.login = function(username, password, securityToken) {
        var promise = new Promise();

        conn.login(username, password + securityToken, function(err, userInfo) {
          if (err) {
              promise.reject ('invalid token: ' + err);
              return promise;
          }

          promise.resolve ({
            'username' : username,
            'accessToken' : conn.accessToken,
            'authenticationService' : 'salesforce',
            'instanceUrl' : conn.instanceUrl,
            'userId' : userInfo.id,
            'organizationId' : userInfo.organizationId
          });
        });
        return promise;
    };

})(exports);
