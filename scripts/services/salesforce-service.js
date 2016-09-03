'use strict';

/* https://www.npmjs.com/package/node-salesforce */

(function(exports) {

    var sf = require('node-salesforce');
    var sfApi = require("salesforce-api");
    var Promise = require('node-promise').Promise;
    var conn = new sf.Connection({
      // you can change loginUrl to connect to sandbox or prerelease env.
      loginUrl : 'https://test.salesforce.com'
    });

    var buildSessionInfo = function(accessToken, instanceUrl) {
        return {
          	instanceUrl : instanceUrl,
          	accessToken : accessToken
        };
    };

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

    exports.query = function(token, query) {
        var promise = new Promise();
        var records = [];
        conn.query("SELECT Id, Name, Total_Lifetime_Value__pc FROM Account LIMIT 100", function(err, result) {
            if (err) {
                promise.reject ('invalid query: ' + err);
                return promise;
            }
            // console.log("total : " + result.totalSize);
            // console.log("fetched : " + result.records.length);
            promise.resolve (result);
        });
        return promise;

        var query = {
            credentials : buildSessionInfo(token.accessToken, token.instanceUrl),
            SOSQL: query
        };
        var promise = new Promise();
        var api = new sfApi();
        api.Query(query, function(err, result) {
            if (err) {
                promise.reject ('invalid query: ' + err);
                return promise;
            }
            promise.resolve (result);
        });
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
            username : username,
            accessToken : conn.accessToken,
            instanceUrl : conn.instanceUrl,
            userId : userInfo.id,
            organizationId : userInfo.organizationId
          });
        });
        return promise;
    };

})(exports);
