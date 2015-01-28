/**
* WriteStream
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
* @param {object}override_object
*/
function writeFile(relpath,object){

}