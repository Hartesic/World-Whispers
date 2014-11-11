
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

var translate = new core.Engine(core, arguments[0], arguments[1], arguments[2]);
for (var i = 0; i < translate.elems.length; i++)
	$.scrollView.add(translate.elems[i]);

//$.scrollView.remove($.current);