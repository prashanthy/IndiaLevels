var fs = require('fs');

fs.readFile('companyInformation.json', 'utf8', function (err, contents) {
    if (err) {
        console.error(err)
        return
    }
    let company = JSON.parse(contents)
    console.log(Object.keys(company));

    fs.writeFile('onlyCompanyName.json', Object.keys(company), function(err) {
        if(err) {
            return console.log(err);
        }
        console.log("The file was saved!");
    }); 
});