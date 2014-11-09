/*
** Translator lib
*/
var obj = {
	langs: [
		{
			"language":"af",
			"name":"Afrikaans"
		},
		{
			"language":"sq",
			"name":"Albanais"
		},
		{
			"language":"de",
			"name":"Allemand"
		},
		{
			"language":"en",
			"name":"Anglais"
		},
		{
			"language":"ar",
			"name":"Arabe"
		},
		{
			"language":"hy",
			"name":"Arménien"
		},
		{
			"language":"az",
			"name":"Azéri"
		},
		{
			"language":"eu",
			"name":"Basque"
		},
		{
			"language":"bn",
			"name":"Bengali"
		},
		{
			"language":"be",
			"name":"Biélorusse"
		},
		{
			"language":"bs",
			"name":"Bosniaque"
		},
		{
			"language":"bg",
			"name":"Bulgare"
		},
		{
			"language":"ca",
			"name":"Catalan"
		},
		{
			"language":"ceb",
			"name":"Cebuano"
		},
		{
			"language":"zh",
			"name":"Chinois (simplifié)"
		},
		{
			"language":"zh-TW",
			"name":"Chinois (traditionnel)"
		},
		{
			"language":"ko",
			"name":"Coréen"
		},
		{
			"language":"ht",
			"name":"Créole haïtien"
		},
		{
			"language":"hr",
			"name":"Croate"
		},
		{
			"language":"da",
			"name":"Danois"
		},
		{
			"language":"es",
			"name":"Espagnol"
		},
		{
			"language":"eo",
			"name":"Espéranto"
		},
		{
			"language":"et",
			"name":"Estonien"
		},
		{
			"language":"fi",
			"name":"Finnois"
		},
		{
			"language":"fr",
			"name":"Français"
		},
		{
			"language":"gl",
			"name":"Galicien"
		},
		{
			"language":"cy",
			"name":"Gallois"
		},
		{
			"language":"ka",
			"name":"Géorgien"
		},
		{
			"language":"el",
			"name":"Grec"
		},
		{
			"language":"gu",
			"name":"Gujarati"
		},
		{
			"language":"ha",
			"name":"Haoussa"
		},
		{
			"language":"iw",
			"name":"Hébreu"
		},
		{
			"language":"hi",
			"name":"Hindi"
		},
		{
			"language":"hmn",
			"name":"Hmong"
		},
		{
			"language":"hu",
			"name":"Hongrois"
		},
		{
			"language":"ig",
			"name":"Igbo"
		},
		{
			"language":"id",
			"name":"Indonésien"
		},
		{
			"language":"ga",
			"name":"Irlandais"
		},
		{
			"language":"is",
			"name":"Islandais"
		},
		{
			"language":"it",
			"name":"Italien"
		},
		{
			"language":"ja",
			"name":"Japonais"
		},
		{
			"language":"jw",
			"name":"Javanais"
		},
		{
			"language":"kn",
			"name":"Kannada"
		},
		{
			"language":"km",
			"name":"Khmer"
		},
		{
			"language":"lo",
			"name":"Laotien"
		},
		{
			"language":"la",
			"name":"Latin"
		},
		{
			"language":"lv",
			"name":"Letton"
		},
		{
			"language":"lt",
			"name":"Lituanien"
		},
		{
			"language":"mk",
			"name":"Macédonien"
		},
		{
			"language":"ms",
			"name":"Malaisien"
		},
		{
			"language":"mt",
			"name":"Maltais"
		},
		{
			"language":"mi",
			"name":"Maori"
		},
		{
			"language":"mr",
			"name":"Marathi"
		},
		{
			"language":"mn",
			"name":"Mongol"
		},
		{
			"language":"nl",
			"name":"Néerlandais"
		},
		{
			"language":"ne",
			"name":"Népalais"
		},
		{
			"language":"no",
			"name":"Norvégien"
		},
		{
			"language":"pa",
			"name":"Panjabi"
		},
		{
			"language":"fa",
			"name":"Persan"
		},
		{
			"language":"pl",
			"name":"Polonais"
		},
		{
			"language":"pt",
			"name":"Portugais"
		},
		{
			"language":"ro",
			"name":"Roumain"
		},
		{
			"language":"ru",
			"name":"Russe"
		},
		{
			"language":"sr",
			"name":"Serbe"
		},
		{
			"language":"sk",
			"name":"Slovaque"
		},
		{
			"language":"sl",
			"name":"Slovène"
		},
		{
			"language":"so",
			"name":"Somali"
		},
		{
			"language":"sv",
			"name":"Suédois"
		},
		{
			"language":"sw",
			"name":"Swahili"
		},
		{
			"language":"tl",
			"name":"Tagalog"
		},
		{
			"language":"ta",
			"name":"Tamoul"
		},
		{
			"language":"cs",
			"name":"Tchèque"
		},
		{
			"language":"te",
			"name":"Telugu"
		},
		{
			"language":"th",
			"name":"Thaï"
		},
		{
			"language":"tr",
			"name":"Turc"
		},
		{
			"language":"uk",
			"name":"Ukrainien"
		},
		{
			"language":"ur",
			"name":"Urdu"
		},
		{
			"language":"vi",
			"name":"Vietnamien"
		},
		{
			"language":"yi",
			"name":"Yiddish"
		},
		{
			"language":"yo",
			"name":"Yorouba"
		},
		{
			"language":"zu",
			"name":"Zoulou"
		}
	],
	url: "https://www.googleapis.com/language/translate/v2",
	key: "?key=AIzaSyAq9sFTT5tNOfwxj48XRJy5INyTH92CME0",
	client: Ti.Network.createHTTPClient({
		/*
		** These two callbacks are for testing only, we have no use for them but they are mandatory.
		*/
		onload : function(e) {
			Ti.API.info("Received text: " + this.responseText);
			alert('success');
		},
		onerror : function(e) {
			Ti.API.debug(e.error);
			alert('error');
		},
		timeout : 5000  // in milliseconds
	}),
	getRandomIndex: function(list){
		return Math.floor(Math.random() * list.length);
	},
	getTranslation: function(sentence, origin_lang, target_lang){
		var translation;
		var url = obj.url + obj.key + '&prettyprint=false' + '&source=' + origin_lang + '&target=' + target_lang + '&q=' + encodeURI(sentence);
		obj.client.open('GET', url, false);
		obj.client.send();
		translation = JSON.parse(obj.client.getResponseText()).data.translations[0].translatedText;
		return translation;
	},
	getAllTranslations: function(sentence, lang, number){
		var url = obj.url + '/languages' + obj.key + '&target=' + lang + '&prettyprint=false';
		obj.client.open('GET', url, false);
		obj.client.send();
		var list = JSON.parse(obj.client.getResponseText()).data.languages;
		var origin_lang = lang;
		do {
			var target_lang = list.splice(getRandomIndex(list), 1).language;
		} while (target_lang == lang);
		var translations = [sentence];
		while(number > 0){
			translations.push({
				"sentence": getTranslation(sentence, origin_lang, target_lang),
				"lang": target_lang,
				"actual_state": getTranslation(sentence, target_lang, lang)
			});
			origin_lang = target_lang;
			target_lang = list.splice(getRandomIndex(list), 1);
			number--;
		}
		translations.push(getTranslation(sentence, origin_lang, lang));
		return translations;
	}
};

module.exports = obj;
