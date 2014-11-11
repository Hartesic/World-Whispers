
var obj = function(obm) {
	this.obm = obm;
	this.loaded = false;
	this.elem = [];
	this.loadAPI();
}

obj.prototype = {
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
	'loadAPI':function() {
		var api = new this.obm.Engine(this.obm, null, '', '', 0), self = this;
		api.loadlang(function(res) {
			self.language = res;
			self.loaded = true;
			Ti.App.fireEvent('apiloaded');
		});
	},
	'langcode':function(lang) {
		for(var i in this.language) {
			if (this.language[i].name == lang) {
				return (this.language[i].language);
			}
		}
	},
	'reset':function() {
		for(var i in this.elem) {
			var elem = this.elem[i].getParent();
			elem.remove(elem);
		}
	},
}

module.exports = obj;