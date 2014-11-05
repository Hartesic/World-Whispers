/*
** Translator lib
*/
var Translator = {
	langs: {},
	getRandomIndex: function(list){
		return Math.floor(Math.random() * list.length);
	},
	getTranslation: function(sentence, origin_lang, target_lang){
		var translation;
		pass; // Get translation from API
		return translation;
	},
	getAllTranslations: function(sentence, lang, number){
		var list = Translator.langs;
		var origin_lang = lang;
		var target_lang = list.splice(getRandomIndex(list), 1);
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
exports.Translator = Translator;