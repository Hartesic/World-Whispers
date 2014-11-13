
/*
	Notes:
		isset is in global scope it's used everywhere no point not to
		add any config in obj.Config
		
		this object is the base used everywhere
		this.obm and core is this object
*/

isset = function(a) { return ( (typeof(a) !== 'undefined')? true : false ); }

var obj = {};

obj.Engine = require('engine');
obj.Translatorlib = require('translatorlib');
obj.Config = {
	'baselang':'en',
}
obj.Current = null;
var tool = require('tool');
obj.Tool = new tool(obj);

module.exports = obj;