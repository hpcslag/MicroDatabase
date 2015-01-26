var fs = require('fs'),
	path = require('path');
/**
* DataControl
* 
* all MicroDatabase data control method are in here.
* (C.R.U.D)
*/

/**
* md_init
* initialization assets and data.
* @param {string}db_path
* @param {string}db_name
*/
function md_init(db_path,db_name){
	!!db_name ? null : new Error("Initialization Database Name can't be undefined or empty!");
	!fs.existsSync(db_path) ? null : new Error("Initialization path is not found!");

	//check file exists!
	var relpath = path.join(db_path,db_name);
	fs.exists(relpath,function(exist){
		if(!exist){
			fs.mkdir(relpath);
			fs.mkdir(path.join(relpath,'Collections'));
		}else{
			console.log("Control Failed: Target already exists!");
		}
	})
}

/**
* md_colle_add
* 
* initialaztion collection assets in database.
* @param {string}db_path
* @param {string}db_name
* @param {string}colle_name
*/
function md_colle_add(db_path,db_name,colle_name){
	!!colle_name ? null : new Error("Initialization Database Collection can't be undefined or empty!");
}


/**
* insert
* 
* insert new data in the collection
* @param {string}db_name
* @param {string}db_colle
* @param {object}data
*/
function insert(db_name,db_colle,data){

}

/**
* findOne
*
* query object
* @feature: Find specific conditions (retrun index first or best paired)
* @param {object}target
* @param {object}... (multiple parameters)
*/
function findOne(){
	for (var i = 0; i < arguments.length; i++) {
    	console.log(arguments[i]);
  	}
}

/**
* find
*
* Find all data, it can find specific conditions or all
* @param {object}exclusion_condition ...(multiple parameters)
*/
function find(){

}


/*
* valueSearch
*
* use value to search all keys
*/
//x

/**
* update
* find object to control(delete,unshift,push,add) and override
*/

module.exports = {
	md_init:md_init
}