#Micro Database

This project is clone StaticDB, upgrade to Version 2.0

	npm install microdatabase -g
	MicroDatabase default

# Usage
!worning: The Database path must set before you use, Enter in Command line: "MicroDatabase" and enter "setpath [path]",then enter: "init", or not your path will be set in default directory(npm)
``` js
var md = require('MicroDatabase');
var db = md({String}Name,{String}Collection);
```
#### demo
``` js
var md = require('MicroDatabase');
var db = md('Test','UserTable');

//create database (simply add one time)
db.init()

//create collection in database (simply add one time)
db.colle_init()

//control data
db.insert({name:"Example",age:17,class:'TF201'});
....
```
#API

####Database
#####`db.init()` to create database directory
#####`db.colle_init()` to create collection in database
####Collection
#####`db.insert(Object)` - add one data
#####`db.insert([Object])` - add multiple data
#####`db.find([condition{Object}], [callback])`
``` js
//multiple condition
db.find([{age:16},{money:1700}],function(row){
	//{name:'test1',age:16,money:1700},{name:'test2',age:16,money:1700}.....
})

//no condition,just want all data
db.find('Any String or not array thing',function(row){
	console.log(row);//return Array Data
})
```
#####`db.findOne(target{Object}, [callback])` - return first find. 
#####`db.update(object,update)` - update some data,find first and change(Worning!)
#####`db.remove(target{Object})` - find first data and delete
#####`db.drop()` - drop all collection 

#Command Line Shell
####come in (Command Line): `MicroDatabase`
####show : 
```
start microdatabase CLI mode! (enter help get more)
>
```
####usage :
```
> version
2.0

> help
.....

> init here
ok, now change database path in here C:\MDB\...

> setpath C:\users\CODEMAN\Desktop\MDB
ok, now change database path in C:\users\CODEMAN\Desktop\MDB\...

Exit CLI Mode!
Enter Database Name: > Test
Is Test your select database name? (yes/no) y
Your select Test, Enter Collection Name: Studnet
Is Users your select collection name? (yes/no) y
Exit CLI Mode!


Press Ctrl+C exit out default mode or enter ".exit"
variable 'Class' now is control DBname: Test,Collection: Student
$> Class.find()
$> Class.insert({name:'Xiaomin',seat:'1-2'});
insert {name:'Xiaomin',seat:'1-2'} in Student Table 
```

All Shell:

`version`

`help`

`init [ path | 'here' ]`

`setpath [ topath | 'here' ]`

`class`

#TCP Remote Feature
####open online MicroDatabase
```
MicroDatabase online
//online on your ip:3526port
``` 
####other third party software client
```
send SHA-1 key...
```