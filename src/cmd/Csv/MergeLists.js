module.exports = (args) => {
  const fs = require('fs');
  const csv = require('csv-parser');
  const createCsvWriter = require('csv-writer').createObjectCsvWriter;
  console.log(args);
  /**
  * Write output to csv
  */
  const csvWriter = createCsvWriter({
    path: './csv/Magento_Orders.csv',
    header: [
        {id: 'name', title: 'Name'},
        {id: 'command', title: 'Command'},
        {id: 'magentoOrderID', title: 'Magento Order ID'},
    ]
  });


  /**
  * Read file 1 data and store into an array
  */
  let rawPromise = new Promise(function(resolve, reject){
    let csvOneData = [];

    fs.createReadStream('./csv_input/exel-like-product-export1.csv')
    .pipe(csv({separator: ','}))
    .on('data', function(data){
      csvOneData.push(data);
    })
    .on('end', function(){
      resolve(csvOneData);
    });
  });

  /**
  * Read file 2 data and store into an array
  */
  let shopifyPromise = new Promise(function(resolve, reject) {
    let csvTwoData = [];

    fs.createReadStream('./csv_input/Magento_orders.csv')
    .pipe(csv({separator: ','}))
    .on('data', function(data){
      csvTwoData.push(data);
    })
    .on('end', function(){
      resolve(csvTwoData);
    });
  });

  Promise.all([shopifyPromise,rawPromise]).then(function(values){

      mergedCsv = [];
      mergedCsv1 = [];
      for(var i = 0; i < values[0].length; i++) {
        let hasMatch = false;
        for(var j = 0; j < values[1].length; j++) {
          if(
            values[1][j]['Variant SKU'] === values[0][i]['Line: SKU']
            && values[1][j]['Variant SKU'] !== ''
            && values[0][i]['Line: SKU'] !== ''
          ) {
            hasMatch = true;
            break;
          }
        }
        if(hasMatch) {
          mergedCsv.push(values[1][j])
        } else {
          mergedCsv1.push(values[0][i])
        }
      }
      console.log(mergedCsv);
      csvWriter.writeRecords(mergedCsv).then(() => {
         console.log('...Matches Done!');
      });

  });
}
