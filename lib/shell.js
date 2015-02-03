//all shell in function
function here(){ return process.cwd(); }

function getArgv(){ return process.argv.slice(2)[0]; }

function getChildArgv(){ return process.argv.slice(2)[1]; }

module.exports = {
	here:function(){return here()},
	getArgv:function(){return getArgv()},
	getChildArgv:function(){return getChildArgv()}
}