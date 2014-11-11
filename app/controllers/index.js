
var core = require('core');
/*
$.win1.addEventListener('click', function(e) {
	if (core.TOOL.isset('cat')) {
		var result = Alloy.createController('result').getView();
		result.open();
	}
});
*/

//$.textField.addEventListener('singletap',function(){ $.textField.focus(); });
Ti.App.addEventListener('apiloaded', function(e){
	var info = { 'lang':null, 'num':1 }, langindex = 0;
	(function(lang) {
		Ti.API.info(lang);
		for (var i in lang) {
			var elem1 = Ti.UI.createPickerRow({title:lang[i].name});
			$.col_lang.add(elem1);
			if (i != 0) {
				var elem2 = Ti.UI.createPickerRow({title:i});
				$.col_amount.add(elem2);
			} else {
				info.lang = lang[i].name;
			}
			
			/*if (core.Config.baselang == lang[i].language) {
				info.lang = lang[i].name;
				langindex = i;
			}*/
		}
		//$.picker.setSelectedRow(langindex, langindex, false);
		
		$.picker.addEventListener('change', function(e) {
			info = { 'lang':e.selectedValue[0], 'num':e.selectedValue[1] };
		});
	})(core.Tool.language);

	$.runbutton.addEventListener('click', function(e) {
		core.Tool.win('result', {
			text: $.textField.value,
			language: core.Tool.langcode(info['lang']),
			amount: info['num']
		}).open();
	});

	$.index.open();
});