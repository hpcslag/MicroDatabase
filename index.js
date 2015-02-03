var fs = require('fs'),
	md = require('./lib'),
	info = require('./lib/DatabaseInfo.js');

function DatabaseControl(db_name,db_colle){
	//use db_name and colle find db
	var db_path = info.getPath;//parse and get database path.
	return require('./lib')(db_path,db_name,db_colle);
}

module.exports = DatabaseControl;