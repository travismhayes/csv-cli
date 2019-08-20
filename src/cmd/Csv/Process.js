module.exports = (args) => {
  const fs = require('fs');
  const createCsvWriter = require('csv-writer').createObjectCsvWriter;
  const helper = require('../../Helper/csv-helpers');
  const csvOnePath = '../in/categories.csv';

  let csv1 = helper.parseCsvToArray(csvOnePath);
  let csvArr = csv1.then(function(value) {
    console.log(value);
  });
  console.log(csvArr);


}
