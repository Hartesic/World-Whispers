
var core = require('core');

// back button
$.back.addEventListener('click', function(e) {
	$.detail.close();
});

// set the info to display
var args = arguments[0];
$.sentence.text = args.sentence;
$.language.text = args.language;
$.translation.text = args.translation;