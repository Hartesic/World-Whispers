	
var obj = function(obm, view, text, lang, num) {
	this.obm = obm;
	this.translation = [];
	this.usedlang = [];
	this.elem = [];
	this.baselang = lang;
	this.view = view;
	this.startint = num;
	
	if (num != 0) {
		this.obm.Tool.reset();
		this.run(text, lang, num);
	}
}

obj.prototype = {
	'lang':[], // static so it can be used in all instances of engine.js
	/*
		run(string, string, int)
		
			calls itself untill int is less then or equal to 0
			arg1 is the text to translate arg2 is it's language
		
		return void
	*/
	'run':function(text, lang, num) {
		var translation = this.savedata({'text':text, 'lang':lang, 'color':( (this.startint == num)? 'green' : 'white')}), self = this;

		var nextlang = this.randlang();
		if (num > 0) {
			this.translate(text, nextlang, translation.lang, function(res) {
				Ti.API.info(res +' to '+ nextlang +' left '+ num);
				self.run(res, nextlang, num - 1);
			});
		} else {
			this.translate(text, this.baselang, translation.lang, function(res) {
				self.savedata({'text':res, 'lang':self.baselang, 'color':'green'});
			});
		}
	},
	
	/*
		savedata(obj)
		
			save the translations and the used language
			then return it so it can be read
		
		return obj;
	*/
	'savedata':function(obj) {
		var id = this.translation.length;
		this.gendisplay(obj);
		this.translation[id] = obj;
		this.usedlang[this.usedlang.length] = obj.lang;
		return (this.translation[id]);
	},
	
	/*
		translate(string, string, string, func)
		
			sends out a request to the api to get a translation
			arg1 is the text, arg2 is the language to translate to, arg3 is the source language, arg4 is the callback
		
		return void
	*/
	'translate':function(text, target, source, callback) {
		this.usedlang[this.usedlang.length] = this.usedlang;
		this.send(this.url, {
			'key':this.key,
			'source':source,
			'target':target,
			'q':text,
			'prettyprint':false,
		}, function(res) {
			callback(res.data.translations[0].translatedText);
		});
	},
	
	/*
		gendisplay(obj)
		
			generates the elements to add to the result.js page
		
		return void
	*/
	'gendisplay':function(obj) {
		var height = 30, top = (this.translation.length * height), self = this;
		this.obm.elem = [];
		
		var elem = Ti.UI.createImageView({
			'image':'./flags/' + obj.lang + '.png',
			'top':top + ((height - 20) / 2), 'left':0,
			'width':24, 'height':20
		});
		this.elem[this.elem.length] = elem;
		this.obm.elem[this.obm.elem.length] = elem;
		this.view.add(elem);
	
		var elem = Ti.UI.createLabel({
			'text':obj.text, 'color':obj.color,
			'textAlign':Ti.UI.TEXT_ALIGNMENT_LEFT,
			'top':top + ((height - 20) / 2), left:30,
			'width':'70%', 'height':20
		});
		this.elem[this.elem.length] = elem;
		this.obm.elem[this.obm.elem.length] = elem;
		this.view.add(elem);
		
		var pageinfo;
		if (this.baselang != obj.lang) {
			this.translate(obj.text, this.baselang, obj.lang, function(res) { 
				pageinfo = {
					sentence: obj.text, 
					language: self.obm.Tool.codelang(obj.lang), 
					translation: res
				}
			});
		} else {
			pageinfo = {
				sentence: obj.text, 
				language: self.obm.Tool.codelang(obj.lang), 
				translation: obj.text,
			}
		}
		
		var elem = Ti.UI.createButton({
			'title':'Info >',
			'top':top, 'left':'80%',
			'width':'20%', 'height':30,
			'font':{'fontSize':10},
			'borderRadius':1,
			//'backgroundColor':'transparent'	
		});
		this.elem[this.elem.length] = elem;
		this.obm.elem[this.obm.elem.length] = elem;
		elem.addEventListener('click', function(e) {
			if (isset(pageinfo)) {
				self.obm.Tool.win('detail', pageinfo).open();
			}
		});
		this.view.add(elem);
	},
	
	/*
		loadlang(func)
		
			load up the language based on the core.Config
			called in Core.Tool main part to init the api
		
		return void
	*/
	'loadlang':function(callback) {
		var self = this;
		this.send(this.url + '/languages', {
			'key':this.key,
			'source':this.obm.Config.baselang,
			'target':this.obm.Config.baselang,
			'prettyprint':false,
		}, function(res) {
			var data = res.data.languages;
			for (var i in data) {
				self.lang[self.lang.length] = data[i];
			}
			callback(self.lang);
		});
	},
	
	/*
		randlang()
		
			get a random language that has not been used to translate to
		
		return string
	*/
	'randlang':function() {
		var found = false, rand = null;
		while (!found) {
			if (this.lang == null) {
				this.lang = [];
			}
			
			rand = this.lang[ Math.floor(Math.random() * this.lang.length) ];
			var valid = true;
			for(var i in this.usedlang) {
				if (this.usedlang[i] == rand.language) {
					valid = false;
					break;
				}
			}
			if (valid) {
				found = true;
			}
		}
		return (rand.language);
	},
	
	/*
		API
		
		this is the core used to send request to the api to get translations
	*/
	'url':'https://www.googleapis.com/language/translate/v2',
	'key':'AIzaSyAq9sFTT5tNOfwxj48XRJy5INyTH92CME0',
	'send':function(url, parm, callback) {
		Ti.API.debug(url);
		for(var i in parm) {
			Ti.API.debug(i + ' : ' + parm[i]);
		}
		
		var client = Ti.Network.createHTTPClient({
			'onload':function(e) {
				Ti.API.info(this.responseText);
				callback(JSON.parse(this.responseText));
			},
			'onerror':function(e) {
				Ti.API.debug(e.error);
			},
			'timeout':5000
		})
		
		client.setRequestHeader("Content-Type", "application/json");
		client.open('GET', url, false);
		client.send(parm);
	},
}

module.exports = obj;