/**
* Stream
* Control Data Read and Write Task.
*/
var fs = require('fs'),
	path = require('path');

/*
* readFile
* read data file and callback
* @param {string}relpath
* @param {function}callback
*/
function readFile(relpath,callback){
	var rs = fs.createReadStream(relpath);
	rs.on('data',function(data){
		callback(data);
	});
}

/*
* update
* override add new object
* @param {string}relpath
* @param {string}override_object
*/
function writeFile(relpath,write){
	console.time('time')
	var ws = fs.createWriteStream(relpath);
        ws.write(write);
        ws.end();
    console.timeEnd('time')
}

function createJSONfile(relpath){
	fs.writeFile(relpath,'{}',function(err){if(err){console.log('create error!')}});
}

module.exports = {
	readFile: readFile,
	writeFile: writeFile,
	create:createJSONfile
}