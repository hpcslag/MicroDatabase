var aa = require('./');

var test = require('./lib/DatabaseInfo.js');

var gg = aa('Test2','Users');

//console.log(test.getDataStruct)


gg.find('any string or tag',function(row){
	console.log(row);
});