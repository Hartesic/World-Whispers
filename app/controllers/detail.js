
var core = require('core');

$.back.addEventListener('click', function(e) {
	$.detail.close();
});

var args = arguments[0];
$.sentence.text = args.sentence;
$.language.text = args.language;
$.translation.text = args.translation;