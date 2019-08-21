module.exports = (args) => {
	const path = require('path');
	const helper = require('../../Helper/csv-helpers');
	const path1 = path.join(__dirname, '../../in/categories.csv');
	const path2 = path.join(__dirname, '../../in/product.csv');

	let csv1 = helper.parseCsvToArray(path1);
	let csv2 = helper.parseCsvToArray(path2);

	let csvArr1 = csv1.then(function(value){ 
		//write callback
	});
	let csvArr2 = csv2.then(function(value){ 
		//write callback
	});

	/**
	* Write Your Custom Code Here
	*/

}