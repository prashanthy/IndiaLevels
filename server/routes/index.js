var express = require('express');
var router = express.Router();
var fs = require('fs');
var cities = require('./fullCities.json');
var fullSalaryInformation = require('./newRecords.json');
var AWS = require("aws-sdk");
var uuid = require('uuid');
var https = require('https');

/* GET home page. */
router.get('/', function(req, res, next) {
  https.get('https://cgkbf6hmfc.execute-api.us-west-2.amazonaws.com/p', (resp) => {
    let data = '';
    resp.on('data', (chunk) => {
      data += chunk;
    });
    resp.on('end', () => {
      const finalData = data.toString('utf8');
      console.log((data.toString('utf8')));
      // res.setHeader('Content-Type', 'application/json');
      console.log(JSON.parse(finalData));
      res.json(JSON.parse(finalData));
    });
  }).on('error', (err) => {
    console.log('Error:' + err.message);
  });
});

router.post('/post-test', (req, res) => {
  console.log('Got body:', req.body);
  // res.json({ username: 'Prashanth123' });
  // res.sendStatus(200);
  // https.get('https://n7ftf3fjt7.execute-api.us-west-2.amazonaws.com/p/salary', (resp) => {
  https.get('https://cgkbf6hmfc.execute-api.us-west-2.amazonaws.com/p', (resp) => {
    let data = '';
    resp.on('data', (chunk) => {
      data += chunk;
    });
    resp.on('end', () => {
      const finalData = data.toString('utf8');
      console.log((data.toString('utf8')));
      // res.setHeader('Content-Type', 'application/json');
      console.log(JSON.parse(finalData));
      res.json(JSON.parse(finalData));
    });
  }).on('error', (err) => {
    console.log('Error:' + err.message);
  });
});

router.get('/salary', function (req, res, next) {
  https.get('https://n7ftf3fjt7.execute-api.us-west-2.amazonaws.com/p/salary', (resp) => {
    let data = '';
    resp.on('data', (chunk) => {
      data += chunk;
    });

    resp.on('end', () => {
      const finalData = data.toString('utf8');
      console.log((data.toString('utf8')));
      // res.setHeader('Content-Type', 'application/json');
      console.log(JSON.parse(finalData));
      res.json(JSON.parse(finalData));
    });
  }).on('error', (err) => {
    console.log('Error:' + err.message);
  });
});

router.get('/cities', function (req, res, next) {
  console.log(cities);
  res.json(cities);
});

router.get('/updatedb', function(req, res, next){
  AWS.config.update({
    region: "us-west-2",
    endpoint: "dynamodb.us-west-2.amazonaws.com"
  });
  
  let dynamodb = new AWS.DynamoDB({apiVersion: '2012-08-10'});
  let salaries = fullSalaryInformation;
  let timeStampBasedRandomNo = uuid.v1();

  let paramsFinal = {};
  let newObj = {"SalaryInformation": []};
  paramsFinal.RequestItems = newObj;

  salaries.forEach(function(salaryInfo) {
    var date1 = new Date();
    date1.setDate(date1.getDate() - Math.floor(Math.random() * 30));
    var tempObj = {
      PutRequest : {  
        Item : {
          "rowNumber": {'N': timeStampBasedRandomNo},
          "jobTitle": {'S': salaryInfo.title },
          "timestamp": {'S': date1.toString() },
          "company": {'S': salaryInfo.company },
          "level": {'S': salaryInfo.level },
          "totalyearlycompensation": {'S': salaryInfo.totalyearlycompensation },
          "location": {'S': salaryInfo.location },
          "yearsofexperience": {'S': salaryInfo.yearsofexperience },
          "yearsatcompany": {'S': salaryInfo.yearsatcompany },
          "tag": {'S': salaryInfo.tag },
          "basesalary": {'S': salaryInfo.basesalary },
          "stockgrantvalue": {'S': salaryInfo.stockgrantvalue },
          "bonus": {'S': salaryInfo.bonus },
          "gender": {'S': salaryInfo.gender },
          "otherdetails": {'S':salaryInfo.otherdetails },
          "cityid": {'S': ""}
        }
      }
    };
    paramsFinal.RequestItems.SalaryInformation.push(tempObj);
  });

  dynamodb.batchWriteItem(paramsFinal, function(err, data) {
    if (err) {
      console.log("Error", err);
    } else {
      console.log("Success", data);
    }
  });
    // dynamodb.put(params, function(err, responseData) {
    //    if (err) {
    //        console.error("Unable to add movie", responseData, ". Error JSON:", JSON.stringify(err, null, 2));
    //    } else {
    //        console.log("PutItem succeeded:", responseData);
    //    }
    // });
  
});


router.get('/publish', function(req, res, next){
  AWS.config.update({
    region: "us-west-2",
    endpoint: "dynamodb.us-west-2.amazonaws.com"
  });
  
  var dynamodb = new AWS.DynamoDB.DocumentClient();


  var salaries = fullSalaryInformation;
  const result = salaries;
  // const result = salaries.filter(function(salary){
  //   return salary.location.includes("India");
  // });

  var timeStampBasedRandomNo = uuid.v1();

  result.forEach(function(salaryInfo, index) {
    var date1 = new Date();
    date1.setDate(date1.getDate() - Math.floor(Math.random() * 30));
   
    var params = {
      TableName: "Salary",
      Item: {
        "rowNumber": salaryInfo.rowNumber,
        "jobTitle": salaryInfo.title ,
        "timestamp": date1.toString(),
        "company": salaryInfo.company ,
        "level": salaryInfo.level ,
        "totalyearlycompensation": salaryInfo.totalyearlycompensation ,
        "location": salaryInfo.location ,
        "yearsofexperience": salaryInfo.yearsofexperience ,
        "yearsatcompany": salaryInfo.yearsatcompany ,
        "tag": salaryInfo.tag ,
        "basesalary": salaryInfo.basesalary ,
        "stockgrantvalue": salaryInfo.stockgrantvalue ,
        "bonus": salaryInfo.bonus ,
        "gender": salaryInfo.gender ,
        "otherdetails": salaryInfo.otherdetails ,
        "cityid": ""
      }
    };

    console.log( "Index", index );
    var thinkTank = 0;

    dynamodb.put(params, function(err, responseData) {
      if (err) {
          console.error("Unable to add movie", responseData, ". Error JSON:", JSON.stringify(err, null, 2));
      } else {
          thinkTank += 1;
          console.log(thinkTank);
          console.log("PutItem succeeded:", responseData);
      }
    });
  });
});


router.get('/createitem', function(req, res, next){
  AWS.config.update({
    region: "us-west-2",
    endpoint: "dynamodb.us-west-2.amazonaws.com"
  });
  var documentClient = new AWS.DynamoDB.DocumentClient();
  var date1 = new Date();
  date1.setDate(date1.getDate() - 5);

  var timeStampBasedRandomNo = uuid.v1();
  var params = {
    TableName: "SalaryInformation",
    Item: {
        "title": "Software Engineer",
        "timestamp": date1.toString(),
        "company": "Microsoft",
        "level": "65",
        "totalyearlycompensation": "245",
        "location": "Redmond, WA",
        "yearsofexperience": "12",
        "yearsatcompany": "5",
        "tag": "Distributed Systems (Back-End)",
        "basesalary": "180",
        "stockgrantvalue": "30",
        "bonus": "35",
        "gender": "Male",
        "otherdetails": "Masters",
        "cityid": "",
        "rowNumber": timeStampBasedRandomNo
    }
};

  documentClient.put(params, function(err, data) {
    if (err){ 
      console.log(err);
    }
    else {
      console.log(data);
    }
  });
});

module.exports = router;