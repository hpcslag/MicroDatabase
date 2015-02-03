var fs = require('fs'),
	path = require('path'),
	Stream = require('./Stream.js');

/**
* getPath
* 
* Get "dbpath.txt file path"
* @return {string}
*/
function getPath(){
	if(!fs.existsSync(path.join(__dirname,'../dbpath'))){
		throw new Error('dbpath file is not found! ,please initialization.');
	}else{
		return fs.readFileSync(path.join(__dirname,'../dbpath')).toString();
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

/**
* setPath
* set database path file
* 
* @param {string}pathString
* @param {string}filePath
*/
function setPath(str){
	if(!fs.existsSync(path.join(__dirname,'../dbpath'))){
		throw new Error('dbpath file is not found ,please initialization.');
	}else{
		if(!fs.existsSync(str)){
			throw new Error('This path is not found!');
		}else{
			Stream.writeFile(path.join(__dirname,'../dbpath'),str);
		}
	}
}

/**
* findDB
* find db and return path string
* 
* @param 
*/

module.exports = {
	getPath:getPath(),
	getDataStruct:getDataStruct(),
	setPath:function(str){setPath(str)}
};