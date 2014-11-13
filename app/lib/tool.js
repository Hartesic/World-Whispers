
var obj = function(obm) {
	this.obm = obm;
	this.loaded = false;
	this.elem = [];
	this.loadAPI();
}

obj.prototype = {
	/*
		Function win( arg {} )
		
			a level of abstraction on controllers
			can still get to them by obj.elem
			
			has a cache system no need to init 
			multiple controllers more than once for the same args
		
		return obj win
	*/
	'win':(function() {
		var cache = {};
		var win = function(n, args) {
			this.elem = ( (isset(args))? Alloy.createController(n, args) : Alloy.createController(n) );
		}
		
		win.prototype = {
			'open':function() {
				this.elem.getView().open();
				return (this);
			}
		}
		
		var name = function(n, args) {
			var a = n;
			for(var i in args) {
				a += args[i];
			}
			return (a);
		}
		return (function(n, args) {
			var key = name(n, args);
			if ( !isset(cache[key]) ) {
				cache[key] = new win(n, args);
			}
			return (cache[key]);
		});
	})(),
	
	/*
		loadAPI()
			
			init Engine and call the api for the languages
			fires event 'apiloaded' so index.js can open
			
		return void
	*/
	'loadAPI':function() {
		var api = new this.obm.Engine(this.obm, null, '', '', 0), self = this;
		api.loadlang(function(res) {
			self.language = res;
			self.loaded = true;
			Ti.App.fireEvent('apiloaded');
		});
	},
	
	/*
		langcode(string)
		
			get the language code from a name
		
		return (string)
	*/
	'langcode':function(lang) {
		for(var i in this.language) {
			if (this.language[i].name == lang) {
				return (this.language[i].language);
			}
		}
	},
		
	/*
		codelang(string)
		
			get a name from a language code
		
		return (string)
	*/
	'codelang':function(lang) {
		for(var i in this.language) {
			if (this.language[i].language == lang) {
				return (this.language[i].name);
			}
		}
	},
	
	/*
		reset(string)
		
			deletes all the elements that have been added on to result.js page
		
		return void
	*/
	'reset':function() {
		for(var i in this.elem) {
			var elem = this.elem[i].getParent();
			elem.remove(elem);
		}
	},
}

module.exports = obj;