var fs = require('fs');
var md = require('./lib');

function DatabaseControl(db_name,db_colle){
	//use db_name and colle find db
	var db_path = './Database';
	return require('./lib')(db_path,db_name,db_colle);
}

module.exports = DatabaseControl;