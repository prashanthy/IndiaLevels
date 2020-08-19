'use strict';
var AWS = require('aws-sdk');
// Set the region
AWS.config.update({ region: 'us-west-2' });
var ddb = new AWS.DynamoDB({apiVersion: '2012-08-10'});
const fs = require('fs');

let params = {
    RequestItems: {
        "Salary": {
            PutRequest: {
                
            }
        }
    }
}

fs.readFile('salaryData-DynamoFormat.json', (err, data) => {
    if (err) throw err;
});

ddb.batchWriteItem(params, function(err, data) {
    if (err) {
      console.log("Error", err);
    } else {
      console.log("Success", data);
    }
});