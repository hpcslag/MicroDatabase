/*
* queueCode
* Use of time, the state, CPU speed to produce a sha1 hash code
* @return {string}SHA1 - code , xx
* @retrun pid stream 
*/
var osSpeed = require('os').cpus()[0].speed,
	date = new Date(),
	pid = process.pid,
	random = Math.floor((Math.random() * 100) + 1),
	possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

module.exports = { number: function(num){
		if(num == "random")num=random;
		return possible.charAt(Math.floor(Math.random() * possible.length)) + Math.abs(date.getDate()*random + (date.getHours()+random) - (date.getMinutes()*random) * (date.getMilliseconds() * random) + num) + (parseInt(pid)*random) + (num*1024+date.getMilliseconds())
	}
}