var fs = require('fs');
var md = require('./lib');

console.time('timer');
var ms = md('./Database','Test','Users');
var d2 = md('./Database','Test2','Users');

/*ms.insert({'name':'tessst'});
d2.insert([{"test":'testtoo'}]);
ms.insert({'name':'tessst'});
d2.insert([{"test":'testtoo'}]);*/

ms.find([{money:1700}],function(row){
	console.log(row);
});
console.timeEnd('timer');