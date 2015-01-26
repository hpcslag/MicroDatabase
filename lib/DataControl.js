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
* @param {}
*/
function md_colle_add(){}
,db_collection
!!db_collection ? null : new Error("Initialization Database Collection can't be undefined or empty!");

/**
* insert
* 
* insert new data in the collection
*/
function insert(db_name,db_colle,data){
	
}
module.exports = {
	md_init:md_init
}