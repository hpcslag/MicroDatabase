var fs = require('fs'),
	path = require('path'),
	Stream = require('./Stream.js'),
	util = require('util');

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
* @return {array}All Database
*/
function findDB(){
	var arr = [];
	for(var i = 0;i<Object.keys(getDataStruct()).length;i++){
		arr.push(Object.keys(getDataStruct())[i]);
	}
	return arr;
}

/**
* findCollections
* findAll Collections
* 
* @param {string}db_name
* @return {array}All Collections
*/
function findCollections(db_name){
	if(!!getDataStruct()[db_name]){
		var arr = [];
		for(var i = 0;i<getDataStruct()[db_name].length;i++){
			arr.push(getDataStruct()[db_name][i]);
		}
		return arr;	
	}else{
		return "Database is not found!";
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
* setINDEX
* new Database Indo In Index file. test.setINDEX("Test",'Users');
* 
* @param {string}db_name
* @param {string}db_colle
*/
function setINDEX(db_name,db_colle){
	//new Data INDEX
	/**
	{
		"DBName":[
			"ColectionName"
		]
	}
	**/
	if(fs.existsSync(path.join(getPath(),'./DB_Index'))){
		Stream.readFile(path.join(getPath(),'./DB_Index'),function(data){
			var translate = JSON.parse(data);
			if(util.isArray(translate[db_name])){
				translate[db_name].push(db_colle);
			}else{
				translate[db_name] = [];
				translate[db_name].push(db_colle);	
			}
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
function removeINDEX_colle(db_name,db_colle){
	//modify INDEX data
	if(fs.existsSync(path.join(getPath(),'./DB_Index'))){
		Stream.readFile(path.join(getPath(),'./DB_Index'),function(data){
			var translate = JSON.parse(data);
			for(var i = 0;i<translate[db_name].length;i++){
				if(translate[db_name][i] == db_colle){
					delete translate[db_name][i];
					for(var j = 0;j< translate[db_name].length;j++){
						if(translate[db_name][j] == null){
							translate[db_name].splice(j,1);
						}
					}
				}
			}
			var stringify = JSON.stringify(translate);
			Stream.writeFile(path.join(getPath(),'./DB_Index'),stringify);
		});
	}else{
		throw new Error("You need create 'DB_INDEX' file in Module directory child directory: 'Database', and enter: {} ,save!");
	}
}

module.exports = {
	getPath:getPath(),
	getDataStruct:getDataStruct(),
	setPath:function(str){setPath(str)},
	findDB:function(){return findDB()},
	setINDEX:function(db_name,db_colle){setINDEX(db_name,db_colle)},
	removeColle:function(db_name,db_colle){removeINDEX_colle(db_name,db_colle)},
	findCollections:function(db_name){return findCollections(db_name)}
};