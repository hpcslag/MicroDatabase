var fs = require('fs');
var md = require('./lib');

var ms = md('./Database','Test','Users');
ms.init();

//md.init('./Database','Test');