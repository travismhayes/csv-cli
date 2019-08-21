module.exports = (args) => {
	const path = require('path');
	const helper = require('../../helpers/csv-helpers');
	const path1 = path.join(__dirname, '../../in/categories.csv');
	const path2 = path.join(__dirname, '../../in/product.csv');

	let csv1 = helper.parseCsvToArray(path1);
	let csv2 = helper.parseCsvToArray(path2);

	Promise.all([csv1,csv2]).then(function(values) {
			// Write Your Custom Code Here
	});

}