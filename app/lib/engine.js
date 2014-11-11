
var obj = function(obm, text, lang, num) {
	this.obm = obm;
	this.translate = [];
	this.usedlang = [];
	this.elems = [];
	
	if (num != 0) {
		this.obm.Tool.reset();
		this.run(text, lang, num);
	}
}

obj.prototype = {
	'lang':null,
	'run':function(text, lang, num) {
		this.translate[this.translate.length] = {
			'text':text,
			'lang':lang
		}
		this.gendisplay(this.translate[this.translate.length - 1]);
		var lang = this.randlang();
		if (num < 0 && lang != null) {
			this.translate(text, lang, function(res) {
				this.run(res, lang, num - 1);
			});
		}
	},
	'translate':function(text, lang, callback) {
		this.usedlang[this.usedlang.length] = this.usedlang;
		this.send(this.url, {
			'key':this.key,
			'source':this.translate[this.translate.length - 1].lang,
			'target':lang,
			'q':text,
			'prettyprint':false,
		}, function(res) {
			callback(res.data.translations[0].translatedText);
		});
	},
	
	'gendisplay':function(obj) {
		var top = (this.translate.length * 20);
		this.obm.elem = [];
		
		var elem = Ti.UI.createImageView({
			image:'/images/myimage.png',
			top:top, left:0,
			width:'70%', height:20
		});
		this.elems.push(elem);
		this.obm.elem[this.obm.elem.length] = elem;
	
		var elem = Ti.UI.createLabel({
			text:obj.text,
			textAlign:Ti.UI.TEXT_ALIGNMENT_LEFT,
			top:top, left:'10%',
			width:'70%', height:20
		});
		this.elems.push(elem);
		this.obm.elem[this.obm.elem.length] = elem;
		
		var elem = Ti.UI.createButton({
			title:'Info >',
			top:top, left:'80%',
			width:'20%', height:20
		});
		this.elems.push(elem);
		this.obm.elem[this.obm.elem.length] = elem;
	},
	'loadlang':function(callback) {
		if (this.lang == null) {
			this.send(
				this.url + '/languages', {
					'key':this.key,
					'source':this.obm.Config.baselang,
					'target':this.obm.Config.baselang,
					'prettyprint':false,
				}, function(res) {
					this.lang = res.data.languages
					callback(this.lang);
				}
			);
		} else {
			callback(this.lang);
		}
	},
	'randlang':function() {
		var found = false, rand = null;
		while (!found) {
			if (this.lang == null)
				this.lang = [];
			rand = this.lang[ Math.floor(Math.random() * this.lang.length) ];
			for(var i in this.usedlang) {
				if (this.usedlang[i] != rand.language) {
					found = true;
					break;
				}
			}
		}
		return (rand);
	},
	
	'url':'https://www.googleapis.com/language/translate/v2',
	'key':'AIzaSyAq9sFTT5tNOfwxj48XRJy5INyTH92CME0',
	'send':function(url, parm, callback) {
		var client = Ti.Network.createHTTPClient({
			'onload':function(e) {
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