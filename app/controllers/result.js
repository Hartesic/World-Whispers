
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
var translate = new core.Engine(core, args.text, args.language, args.amount);
for (var i = 0; i < translate.elems.length; i++)
	$.scrollView.add(translate.elems[i]);

//$.scrollView.remove($.current);