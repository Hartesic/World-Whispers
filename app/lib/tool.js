
var obj = function(obm) {
	this.obm = obm;
	this.loaded = false;
	this.elem = [];
	this.loadAPI();
}

obj.prototype = {
	'isset':function(a) { return (typeof(a) !== 'undefined' && a !== null); },
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
	
		return (function(name) {
			if ( !this.isset(cache[name]) ) {
				cache[name] = new win(name);
			}
			return (cache[name]);
		});
	})(),
	'loadAPI':function() {
		var api = new this.obm.Engine(this.obm, '', '', 0), self = this;
		api.loadlang(function(res) {
			self.language = res;
			self.loaded = true;
			Ti.App.fireEvent('apiloaded');
		});
	},
	'langcode':function(lang) {
		for(var i in this.language) {
			if (this.language[i].name = lang) {
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