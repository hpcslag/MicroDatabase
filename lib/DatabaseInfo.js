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
			moveINDEX(path.join(str,'./DB_INDEX'));
			Stream.writeFile(path.join(__dirname,'../dbpath'),str);
		}
	}
}

/**
* findDB
* find db and return path string
* 
* @param {string}db_name
* can't be use! have bug!
*/
function findDB(db_name,db_colle){
	if(!!getDataStruct()[db_name].Collections[db_colle]){
		return getDataStruct()[db_name].Collections[db_colle].path;
	}else{
		return "Database Not Found!";
	}
}

/**
* moveINDEX
* moveOldPathINDEXfile to new Path 
*
* @param {string}pathString
*/
function moveINDEX(pathString){
	//move INDEX file to new Setpath
	if(fs.existsSync(path.join(getPath(),'./DB_Index'))){
		fs.createReadStream(path.join(getPath(),'./DB_INDEX')).pipe(fs.createWriteStream(path.join(pathString)));	
	}else{
		throw new Error("You need create 'DB_INDEX' file in Module directory child directory: 'Database', and enter: {} ,save!");
	}
}

/**
* moveAllPathINDEX
* if move INDEX file, need change INDEX file path!
* 
* @param {string}pathString
*/
function moveAllPathINDEX(pathString){
	//copy and change 
}


/**
* setINDEX
* new Database Indo In Index file.
* 
* @param {string}pathString
* @param {object}object
*/
function setINDEX(object){
	//new Data INDEX
	/**
	{
		"DBName":{
			"Collections":{
				"CollectionName1": {
					"path": "TO/FILE/PATH",
					"description": "xxx"
				},
				"CollectionName2": {
					"path": "TO/FILE/PATH",
					"description": "xxx"
				}
			}
		}
	}
	**/
	if(fs.existsSync(path.join(getPath(),'./DB_Index'))){
		Stream.readFile(path.join(getPath(),'./DB_Index'),function(data){
			var translate = JSON.parse(data);
			translate.push(object);
			var stringify = JSON.stringify(translate);
			Stream.writeFile(path.join(getPath(),'./DB_Index'),stringify);
		});
	}else{
		throw new Error("You need create 'DB_INDEX' file in Module directory child directory: 'Database', and enter: {} ,save!");
	}
}

/**
* modifyINDEX
* find Object and modify INDEX file.
*
* @param {object}oldObject
* @param {object}newObject
*/
function modifyINDEX(oldObject,newObject){
	//modify INDEX data
}

module.exports = {
	getPath:getPath(),
	getDataStruct:getDataStruct(),
	setPath:function(str){setPath(str)},
	findDB:function(str,colle){return findDB(str,colle)},
	setINDEX:function(object){setINDEX(object)}
};