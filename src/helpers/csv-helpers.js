/* Load Required modules */
const fs = require('fs');
const csv = require('csv-parser');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

/**
* Method for parsing csv to a array.
*/
function parseCsvToArray(path, delimeter = ',') {
  //check that there is a file in the path provided
  let rawPromise = new Promise(function(resolve, reject){
    let csvData = [];

    fs.createReadStream(path)
    .pipe(csv({separator: delimeter}))
    .on('data', function(data){
      csvData.push(data);
    })
    .on('end', function(){
      resolve(csvData);
    });
  });
  return rawPromise;
}


module.exports = {
  parseCsvToArray : parseCsvToArray
}
