
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
	var info = { 'lang':'Anglais', 'num':1 };
	(function(lang) {
		Ti.API.info(lang);
		for (var i in lang) {
			var elem1 = Ti.UI.createPickerRow({title:lang[i].name});
			$.col_lang.add(elem1);
			if (i != 0) {
				var elem2 = Ti.UI.createPickerRow({title:i});
				$.col_amount.add(elem2);
			}
		}
		
		$.picker.addEventListener('change', function(e) {
			info = { 'lang':e.selectedValue[0], 'num':e.selectedValue[1] };
		});
	})(core.Tool.language);

	$.runbutton.addEventListener('click', function(e) {
		var args = {
			text: $.textField.value,
			language: core.Tool.langcode(info['lang']),
			amount: info['num']
		};
		var win = core.Tool.win('result', args);
		win.open();
		
		for (var i in win.elem.children) {
			Ti.API.debug(win.children[i]);
		}
		
		/*var translate = new core.Engine(core, $.textField.value, info.lang, info.num);
		core.Current = translate;*/
	});

	$.index.open();
});