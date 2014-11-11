
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