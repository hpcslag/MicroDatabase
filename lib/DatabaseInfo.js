var fs = require('fs'),
	path = require('path');

/**
* getPath
* 
* Get "dbpath.txt file path"
* @return {string}
*/
function getPath(){
	if(!fs.existsSync('./dbpath')){
		throw new Error('dbpath file is not found! ,please initialization.');
	}else{
		return fs.readFileSync('./dbpath').toString();
	}
}

/**
* getDataStruct
*
* get all database struct
* @return {object}
*/
function getDataStruct(){
	if(!fs.existsSync(path.join(getPath(),'./DB_INDEX'))){
		throw new Error('DB_Index file is not found! ,please initialization.');
	}else{
		return JSON.parse(fs.readFileSync(path.join(getPath(),'./DB_INDEX')));
	}
}

module.exports = {
	getPath:getPath(),
	getDataStruct:getDataStruct()
};