
var core = require('core');
/*
$.win2.addEventListener('click', function(e) {
	var index = Alloy.createController('index').getView();
	index.open();
});

$.result.open();
*/

$.back.addEventListener('click', function(e) {
	$.result.close();
});

var args = arguments[0];
var translate = new core.Engine(core, $.scrollView, args.text, args.language, args.amount);

/*var win = Alloy.createController('detail', {sentence: 'Hello world!', language: 'Anglais', translation: 'Salut tout le monde !'}).getView();
win.open();*/

//$.scrollView.remove($.current);