"use strict"
const AWS = require('aws-sdk');
AWS.config.update({region: 'us-west-2'});

exports.handler = async (event) => {
    const documentClient = new AWS.DynamoDB.DocumentClient({
        region: 'us-west-2'
    });

    const params = {
        TableName: "Salary",
        FilterExpression: 'contains(#mylocation, :platinum)',
        ExpressionAttributeValues: { 
            ':platinum': ', India'
        },
        ExpressionAttributeNames: {
            "#mylocation": "location"
        }
    }
    
    try {
        const data = await documentClient.scan(params).promise();
        console.log(data);/* code */
        
        if (data.LastEvaluatedKey) {
            console.log("Yay!!!");
            params.ExclusiveStartKey = data.LastEvaluatedKey;

        }
        
        const response = {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin':'http://localhost:3000',
                "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
                "Access-Control-Allow-Credentials": true
            },
            body: data
        };
        return response;
    } catch (err) {
        console.log(err);
    }
    // TODO implement
};
