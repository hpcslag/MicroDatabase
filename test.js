var aa = require('./');

var gg = aa('Test2','Users');

gg.find('any string or tag',function(row){
	console.log(row);
});