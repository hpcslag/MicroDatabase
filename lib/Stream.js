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
	process.stdout.write('write out file ');
	console.time('time');//write speed test timer
	var ws = fs.createWriteStream(relpath);
        ws.write(write);
        ws.end();
    console.timeEnd('time');//as above
}

/**
* crateJSONfile
* put string in data and create
* 
* @param relpath
* @param data
*/
function createJSONfile(relpath,data){
	fs.writeFile(relpath,data,function(err){if(err)console.log('create error!')});
}


/**
* override
* data override (update data)
*
* @param relpath
* @param new_obj
*/
function override(relpath,new_obj){
	var translate = JSON.stringify(new_obj);
	var rs = fs.createReadStream(relpath);
    rs.on('data',function(data){
    	var ws = fs.createWriteStream(relpath);
        ws.write(translate);
        ws.end();
    });
}

/**
* override_push
* data override (push data)
*
* @param collection_path
* @param new_obj
*/
function override_push(collection_path,new_obj){
	readFile(collection_path,function(blob){
		var translate = JSON.parse(blob);
		translate['spkeys'].push(new_obj);
		override(collection_path,translate);
	});
}

/**
* override_unshift
* data override (unshift)
*
* @param collection_path
* @param new_obj
*/
function override_unshift(collection_path,new_obj){
	readFile(collection_path,function(blob){
		var translate = JSON.parse(blob);
		translate['spkeys'].unshift(new_obj);
		override(collection_path,translate);
	});
}

/**
* checkFile
* check file exists be simple
* 
* @param {string}relpath
* @return thorw new Error
*/
function checkFile(relpath){
	if(fs.existsSync(relpath)){
		return null;
	}else{
		throw new Error('The file is not alive!');
	}
}

/**
* Duplex Stream
* one process can do read and write sync
*/

module.exports = {
	readFile: readFile,
	writeFile: writeFile,
	create:createJSONfile,
	override_push:override_push,
	override_unshift:override_unshift,
	override:override,
	checkFile:checkFile
}