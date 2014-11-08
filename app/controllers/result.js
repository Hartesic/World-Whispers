
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

//$.scrollView.remove($.current);