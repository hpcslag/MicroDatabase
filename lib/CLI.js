//TODO require implements shell.js to do something

var path = require('path'),
	fs = require('fs'),
	shell = require('./shell.js'),
	db_info = require('./DatabaseInfo.js'),
	Stream = require('../lib/Stream.js'),
	colors = require('colors'),
	readline = require('readline'),
	repl = require('repl'),
	md = require('../index.js');

function main(){
	switch (shell.getArgv()){
		case 'default': 
			db_info.setPath(path.join(__dirname,'../Database'));
			break;

		case 'init':
			init(shell.getChildArgv());
			break;

		case '--version':
			version();
			break;

		case '-v':
			version();
			break;

		case '-help':
			help();
			break;
		default: 
			console.log("start MicroDatabase CLI mode".red);
			readLine();
			
	}
}

/**
* version
* get now version
*
* @return {string}v
*/
function version(){
	Stream.readFile(path.join(__dirname,'../package.json'),function(data){
		var translate = JSON.parse(data);
		console.log('v'+translate.version);
	});
}

/**
* init
* initialization database path!
*
* @param {string} parameter
*/
function init(parameter){
	if(parameter == 'here'){
		db_info.setPath(path.join(process.cwd()));
	}else{
		db_info.setPath(path.join(parameter));
	}
}

/**
* readLine
* read Global Command Line Shell
*/
function readLine(){
	console.log("["+"success".green+"] now listen shell!");
	var rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout
	});
	process.stdout.write("> ");
	//Read Line Enter:
	rl.on('line',function(cmd){
		switch(cmd){
			case 'help':
				console.log('\n\n    Options:\n      exit        exit\n      v,version   output version\n      class       start control database\n\n');
				break;
			case 'exit':
				rl.close();
				process.exit();
				break;
			case 'v':
				version();
				break;
			case 'version':
				version();
				break;
			case 'class':
				select_db(rl);
				break;
			default:
				console.log('enter help see more');
		}
		process.stdout.write("> ");
	})

	//Line pause:
	rl.on('pause', function() {
		console.log('Exit CLI Mode!');
	});
}

/**
* select_db
* call node_shell
*/
function select_db(rl){
	rl.close();
	var rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout
	});
	var count = 0;
	var db_name = '';
	var db_colle = '';
	process.stdout.write("Enter Database Name: ");
	//Read Line Enter:
	rl.on('line',function(cmd){
		if(count == 0){
			db_name = cmd;
			process.stdout.write("Is "+db_name+ " your select database name? (yes/no) ");
			count++;	
		}else if(count == 1){
			if(cmd == 'yes' || cmd == 'y'){
				process.stdout.write("Your select "+db_name+", Enter Collection Name: ");
				count++;
			}else{
				process.stdout.write("Enter Database Name: ");
				db_name = '';
				count--;
			}
		}else if(count == 2){
			db_colle = cmd;
			process.stdout.write("Is "+db_colle+ " your select collection name? (yes/no) ");
			count++;
		}else if(count == 3){
			if(cmd == 'yes' || cmd == 'y'){
				node_Shell(rl,'class',db_name,db_colle);
			}else{
				process.stdout.write("Enter Collection Name: ");
				db_colle = '';
				count--;
			}
		}
		
	})

	//Line pause:
	rl.on('pause', function() {
		console.log('Exit CLI Mode!');
	});
}


/**
* node_Shell
* Start Shell Mode! and set variable in shell
* 
* @param {reference}rl
* @param {string}Class
* @param {string}db_name
* @param {string}db_colle
*/
function node_Shell(rl,Class,db_name,db_colle){
	rl.close();

	global.Class = DBControl(db_name,db_colle);
	global.help = function(){process.stdout.write("There's API write in Document!, please RTFM!")}
	/*global.__defineGetter__('help',function(){ 
		process.stdout.write("There's API write in Document!, please RTFM!");
	});*/
	

	console.log("\n\nPress Ctrl+C exit out default mode or enter \".exit\"".yellow);
	console.log("variable 'Class' now is control DBname: "+db_name+",Collection: "+db_colle);
	var context = repl.start("$> ").on('exit', function () {
	  console.log('Exit node shell mode\n');
	  readLine();
	});
}

/**
* help
* output help message
*/
function help(){
	console.log("  Hello, This is MicroDatabase Helper".yellow + "\n\n  Options:\n\n      default                    default set your database path(npm directory!)\n      -v,--version               output the version number\n      [init] [here | path ]      initialization database path\n\n  Don't input anything, can go to CLI mode!");
}

/**
* DBControl
* override DBControl Method
*
* @param {string}db_name
* @paran {string}db_colle
* @retrun {object}newFunction
*/
function DBControl(db_name,db_colle){
	var db = md(db_name,db_colle);
	return {
		init:function(count){if(!!count){db.init();db.init_colle();}else{db.init_colle()}},
		find:function(){db.find('findAll',function(data){console.log(data)})},
		findOne:function(object){db.findOne(object,function(data){console.log(data)})},
		insert:function(object){db.insert(object)},
		remove:function(object){db.remove(object)},
		update:function(ole,news){db.update(old,news)}
	};
}
module.exports = main();