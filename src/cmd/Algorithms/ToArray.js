module.exports = (args) => {
  const fs = require('fs');
  const csv = require('csv-parser');
  const util = require('util')

  /**
  * Read file 1 data and store into an array
  */
  let rawPromise = new Promise(function(resolve, reject){
    let csvOneData = [];

    fs.createReadStream('./csv_input/configurable_product_update.csv')
    .pipe(csv({separator: ','}))
    .on('data', function(data){
      //console.log(Object.values(data))
      csvOneData.push(Object.values(data));
    })
    .on('end', function(){
      let output = csvOneData.join().toString().split(",");
      console.log(util.inspect(output, { maxArrayLength: null }))

      resolve(csvOneData);
    });
  });

}
