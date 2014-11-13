
var core = require('core');

// hook to wait for the api to load mostly just the language to get from it
Ti.App.addEventListener('apiloaded', function(e){
	var info = { 'lang':null, 'num':1 }, langindex = 0;
	(function(lang) {
		for (var i in lang) {
			var elem1 = Ti.UI.createPickerRow({title:lang[i].name});
			$.col_lang.add(elem1);
			if (i != 0) {
				var elem2 = Ti.UI.createPickerRow({title:i});
				$.col_amount.add(elem2);
			} else {
				info.lang = lang[i].name;
			}
		}
		
		// hook to the picker to know what it is set to
		$.picker.addEventListener('change', function(e) {
			info = { 'lang':e.selectedValue[0], 'num':e.selectedValue[1] };
		});
	})(core.Tool.language);

	// submit button opens the result page and starts the translations
	$.runbutton.addEventListener('click', function(e) {
		core.Tool.win('result', {
			text: $.textField.value,
			language: core.Tool.langcode(info['lang']),
			amount: info['num']
		}).open();
	});

	$.index.open();
});