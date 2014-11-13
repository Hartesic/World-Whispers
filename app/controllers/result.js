
var core = require('core');

// back button
$.back.addEventListener('click', function(e) {
	$.result.close();
});

// start the translations
var args = arguments[0];
var translate = new core.Engine(core, $.scrollView, args.text, args.language, args.amount);
