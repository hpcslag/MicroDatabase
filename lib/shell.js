//all shell in function
function here(){ return process.cwd(); }

function setVariable(str,value){ return eval('var '+str+'='+value); }

function connectDB(){ /* parse and control set (DB)*/ }

function evalShell(){  }

function getArgv(){ return process.argv.slice(2)[0]; }

function getChildArgv(){ return process.argv.slice(2)[1]; }

