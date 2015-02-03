var fs = require('fs'),
	path = require('path'),
	util = require('util'),
	Stream = require('./Stream.js'),
	queueCode = require('./queueCode.js');
/**
* DataControl
* 
* all MicroDatabase data control method are in here.
* (C.R.U.D)
*/

//constructor
function md(db_path,db_name,db_colle){
	if(!!db_path && !!db_name && !!db_colle){
		return {
			init:function(){md_init(db_path,db_name)},
			colle_init:function(){md_colle_add(db_path,db_name,db_colle)},
			insert:function(data){insert(db_path,db_name,db_colle,data)},
			find:function(condition,callback){find(db_path,db_name,db_colle,condition,callback)},
			findOne:function(target,callback){findOne(db_path,db_name,db_colle,target,callback)},
			update:function(old,newObj){update(db_path,db_name,db_colle,old,newObj)},
			remove:function(object){remove(db_path,db_name,db_colle,object)}

		}
	}else{
		new Error("Initialization need all parameters. please enter all!");
	}
}


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
	if(!!db_path && !!db_name && !!colle_name){
		Stream.create(path.join(db_path,db_name,'Collections',colle_name+'.json'),'{}');
	}else{
		new Error("Initialization Collection need all parameters!");
	}

}


/**
* insert
* 
* insert new data in the collection
* @param {string}db_path
* @param {string}db_name
* @param {string}db_colle
* @param {object}data
* @param {callback}(err)
* @return callback or (true,false)
*/
function insert(db_path,db_name,db_colle,data){
	var collection = path.join(db_path,db_name,'Collections',db_colle+'.json');
	if(util.isArray(data)){
		if(fs.existsSync(collection)){
			for(var i = 0;i<data.length;i++){
				typeof data[i] !=  "object" ? new Error("Your send must be object type!") : null;
				data[i]['_queue'] = queueCode.number(i);
				Stream.override_push(collection,data[i]);
			}
		}else{
			var init = {"spkeys":[]};
			for(var i = 0;i<data.length;i++){
				typeof data[i] !=  "object" ? new Error("Your send must be object type!") : null;
				data[i]['_queue'] = queueCode.number(i);
				init.spkeys.push(data[i]);
			}
			var translate = JSON.stringify(init);
			Stream.create(collection,translate);
		}
	}else{
		typeof data !=  "object" ? new Error("Your send must be object type!") : null;
		//demo: {"spkeys":[{"_queue":"0"}]}
		data['_queue'] = queueCode.number( data.toString().charCodeAt(2)||"random" );
		if(fs.existsSync(collection)){
			Stream.override_push(collection,data);
		}else{
			var init = {"spkeys":[]};
			init.spkeys.push(data);
			var translate = JSON.stringify(init);
			Stream.create(collection,translate);
		}
	}
}

/**
* findOne
*
* query object
* @feature: Find specific conditions (retrun index first or best paired)
* @param {string}db_path
* @param {string}db_name
* @param {string}db_colle
* @param {object}target
* @param {function}callback
* @return {callback}(err,object)
*/
function findOne(db_path,db_name,db_colle,target,callback){
	var relpath = path.join(db_path,db_name,'Collections',db_colle+'.json');
	Stream.checkFile(relpath);
	Stream.readFile(relpath,function(data){
		var translate = JSON.parse(data).spkeys;
		var keys = Object.keys(target)[0];
		for(var i = 0;i<translate.length;i++){
			if(translate[i][keys] == target[keys]){
				callback(translate[i]);
				break;
			}
			if(i == translate.length-1 && translate[i][keys] != target[keys]){
				callback('Nothing match!');

			}
		}
	});
}

/**
* find
*
* Find all data, it can find specific conditions or all
* @param {string}db_path
* @param {string}db_name
* @param {string}db_colle
* @param {array}condition {object}exclusion_condition ...(multiple parameters)
* @param {function}callback
* @return {callback}(err,objects in row)
*/
function find(db_path,db_name,db_colle,condition,callback){
	var relpath = path.join(db_path,db_name,'Collections',db_colle+'.json');
	Stream.checkFile(relpath);
	if(util.isArray(condition)){
		//if muiltple condition, do for loop
		Stream.readFile(relpath,function(data){
			var translate = JSON.parse(data).spkeys;
			var isthat = 0;
			for(var i = 0;i < translate.length;i++){
				isthat = 0;//restart
				for(var j = 0;j < condition.length;j++){
					var keys = Object.keys(condition[j])[0];
					if(translate[i][ keys ] == condition[j][keys]){
						isthat ++;
						if(isthat == condition.length){
							callback(translate[i]);
							break;
						}
					}
				}
			}
			if(isthat != condition.length)callback("Nothing match!");
		});
	}else{
		Stream.readFile(relpath,function(data){
			var translate = JSON.parse(data);
			callback(translate.spkeys);
		});
	}
}


/*
* valueSearch
*
* use value to search all keys in row
*/
//x
function valueSearch(db_path,db_name,db_colle,value,callback){
}

/**
* update
* find object to control(delete,unshift,push,add) and override
* 
* @param {string}db_path
* @param {string}db_name
* @param {string}db_colle
* @param {object}old
* @param {object}new
* @return {boolean}status
*/
function update(db_path,db_name,db_colle,old,newobj){
	var relpath = path.join(db_path,db_name,'Collections',db_colle+'.json');
	Stream.checkFile(relpath);
	Stream.readFile(relpath,function(row){
		var translate = JSON.parse(row);
		var key = Object.keys(old)[0];
		var value = old[key];
		var newKey = Object.keys(newobj)[0];
		var newValue = newobj[newKey];
		for(var i = 0;i<translate.spkeys.length;i++){
			var sp = translate.spkeys[i];
			if(sp[key] == value){
				translate.spkeys[i][newKey] = newValue;
				Stream.override(relpath,translate);
				break;
			}
			if(sp[key] != value && i == translate.spkeys.length-1){
				console.log('Can\'t find this object!');
			}
		}
	});
}

/**
* remove
* remove all match object
* 
* @param {string}db_path
* @param {string}db_name
* @param {string}db_colle
* @param {string}object
*/
function remove(db_path,db_name,db_colle,object){
	var relpath = path.join(db_path,db_name,'Collections',db_colle+'.json');
	Stream.checkFile(relpath);
	Stream.readFile(relpath,function(row){
		var translate = JSON.parse(row);
		var key = Object.keys(object)[0];
		var value = object[key];
		for(var i = 0;i<translate.spkeys.length;i++){
			var sp = translate.spkeys[i];
			if(sp[key] == value){
				delete translate.spkeys[i];
				translate.spkeys.splice(i,1);
				Stream.override(relpath,translate);
				break;
			}
			if(sp[key] != value && i == translate.spkeys.length-1){
				console.log('Can\'t find this object!');
			}
		}
	});
}

/**
* Drop
* Drop all collection and Database
*/
function drop(db_path){
	fs.unlinkSync(db_path);
}


module.exports = md;
