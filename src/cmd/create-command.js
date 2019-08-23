const fs = require('fs');
const path = require('path');
const inputDirectoryPath = path.join(__dirname, '../in');
let csvFiles = [];

//TODO: finish functionailty to build file name from arg passed.
function generateFile(args) {
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
        + '\t' + '\t' + "//" + " Write Your Custom Code Here" + '\n'
        + '\t' + "});" + '\n'
        + '\n'
        + "}";

      // create the file and generate the bolier plate code then display a message to the user
      fs.writeFile('src/cmd/csv/process.js', codeGenerator, function(err) {
        if (err) return console.log(err);
        console.log('finished generating code!');
      });
  });
}

//TODO: pass through new command name and add it to the command var.
//TODO: add function to verify that the new command being generated doesn't already exist. if it does stop excuction and tell user.
function generateCommand(args) {
  let idx = 0;
  let data = fs.readFileSync('src/index.js').toString().split('\n');
  for(let i = 0; i < data.length; i++) {
      let currentLine = data[i];
      if(currentLine.indexOf('default:') !== -1 ) {
          idx = i;
      }
  }

  let command = '\t' + '\t' + '\t' + '\t' + "case 'test':" + '\n'
    + '\t' + '\t' + '\t' + '\t' + '\t' + "require('./cmd/help')(args)" + '\n'
    + '\t' + '\t' + '\t' + '\t' + '\t' + "break;" + '\n';

  data.splice(idx, 0, command);
  let text = data.join('\n');

  fs.writeFile('src/index.js', text, function (err) {
    if (err) return console.log(err);
  });

}

function run(args) {
  generateFile(args);
  generateCommand(args);
}

module.exports = (args) => {
  run: run(args)
}
