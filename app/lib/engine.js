	
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
	'lang':[],
	'run':function(text, lang, num) {
		var translation = {'text':text, 'lang':lang, 'color':( (this.startint == num)? 'green' : 'white')}, self = this;
		this.gendisplay(translation);
		this.translation[this.translation.length] = translation;
		this.usedlang[this.usedlang.length] = translation.lang;

		var nextlang = this.randlang();
		if (num > 0) {
			this.translate(text, nextlang, function(res) {
				Ti.API.info(res +' to '+ nextlang +' left '+ num);
				self.run(res, nextlang, num - 1);
			});
		} else {
			this.translate(text, this.baselang, function(res) {
				var translation = {'text':res, 'lang':self.baselang, 'color':'green'}
				self.gendisplay(translation);
				self.translation[self.translation.length] = translation;
				self.usedlang[self.usedlang.length] = translation.lang;
			});
		}
	},
	'translate':function(text, lang, callback) {
		this.usedlang[this.usedlang.length] = this.usedlang;
		this.send(this.url, {
			'key':this.key,
			'source':this.translation[this.translation.length - 1].lang,
			'target':lang,
			'q':text,
			'prettyprint':false,
		}, function(res) {
			callback(res.data.translations[0].translatedText);
		});
	},
	
	'gendisplay':function(obj) {
		var height = 30, top = (this.translation.length * height);
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
		this.view.add(elem);
	},
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