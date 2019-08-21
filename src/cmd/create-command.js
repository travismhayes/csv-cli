module.exports = (args) => {
    const fs = require('fs');
    const path = require('path');
    const inputDirectoryPath = path.join(__dirname, '../in');
    let csvFiles = [];

    //loop through csv files and get the names and paths
    fs.readdir(inputDirectoryPath, function (err, files) {
        //handling error
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        }
        //listing all files using forEach
        files.forEach(function (file) {
            csvFiles.push(file);
        });

        let createCsvPath = "";
        let createCsvObj = "";
        let promises = [];
        let count = 1;
        for(let i = 0; i < csvFiles.length; i++) {
          createCsvPath += "\t" + "const " + "path" + count + " = path.join(__dirname, '../../in/" + csvFiles[i] + "');" + "\n";
          createCsvObj += "\t" + "let " + "csv" + count + " = helper.parseCsvToArray(" + "path" + count + ");" + "\n";
          promises.push("csv" + count);
          count++;
        }

        //build out the code that will be used as boiler plate
        let codeGenerator = "module.exports = (args) => {" + '\n'
        + '\t' + "const path = require('path');" + '\n'
        + '\t' + "const helper = require('../../helpers/csv-helpers');" + '\n'
        + createCsvPath + '\n'
        + createCsvObj + '\n'
        + '\t' + "Promise.all([" + promises + "]).then(function(values) {" + '\n'
        + '\t' + '\t' + '\t' + "//" + " Write Your Custom Code Here" + '\n'
        + '\t' + "});" + '\n'
        + '\n'
        + "}";

        // create the file and generate the bolier plate code then display a message to the user
        fs.writeFile('src/cmd/Csv/process.js', codeGenerator, function(val) {
          console.log('finished generating code!');
        });
    });
}
