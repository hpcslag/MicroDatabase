var fs = require('fs');
var md = require('./lib');


var ms = md('./Database','Test','Users');
var d2 = md('./Database','Test2','Users');

/*ms.insert({'name':'tessst'});
d2.insert([{"test":'testtoo'}]);
ms.insert({'name':'tessst'});
d2.insert([{"test":'testtoo'}]);*/
console.time('timer');
/*ms.find([{age:16}],function(row){
	console.log(row);
});*/
/*ms.findOne({age:16},function(match){
	console.log(match);
});*/
//ms.update({age:16},{age:18});
//ms.remove({age:16});
console.timeEnd('timer');