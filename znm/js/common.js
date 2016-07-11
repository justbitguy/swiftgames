var zhLocale = "zh"; 
var enLocale = "en"; 
var zhTitle = "旋轉方塊";
var enTitle = "Spin Squres";

var NativeMsg = {
	gameOver : 2
}

var MsgSeperator = "##";

// http://hostname/ontheline?lang=en
// http://hostname/ontheline?lang=zh
var QueryString = function() {
	// This function is anonymous, is executed immediately and 
	// the return value is assigned to QueryString!
	var query_string = {};
	var query = window.location.search.substring(1);
	var vars = query.split("&");
	for (var i = 0; i < vars.length; i++) {
		var pair = vars[i].split("=");
		// If first entry with this name
		if (typeof query_string[pair[0]] === "undefined") {
			query_string[pair[0]] = decodeURIComponent(pair[1]);
			// If second entry with this name
		} else if (typeof query_string[pair[0]] === "string") {
			var arr = [query_string[pair[0]], decodeURIComponent(pair[1])];
			query_string[pair[0]] = arr;
			// If third or later entry with this name
		} else {
			query_string[pair[0]].push(decodeURIComponent(pair[1]));
		}
	}
	return query_string;
}();

var GameLang = function() {
	var language = "en";
	var queryLang = QueryString["lang"];
	if (queryLang != ""){
		language = queryLang; 
	}
	return language;
}();

var isZhLocale = function(){
	return GameLang == zhLocale;
}

var isEnLocale = function(){
	return !isZhLocale();
}

document.title = function(){
	if (isZhLocale()){
		return zhTitle;
	} else {
		return enTitle;
	}
}();

var GAME_TEXT = {
	title   : isEnLocale() ? "Spin Squres" : "\u65cb\u8f6c\u65b9\u5757",
	start   : isEnLocale() ? "Start!" : "\u5f00\u59cb!",
	control : isEnLocale() ? "Control" :  "\u63a7\u5236",
	spin    : isEnLocale() ? "Spin:" : "\u65cb\u8f6c:", 
	left    : isEnLocale() ? "Left" : "\u5de6",
	right   : isEnLocale() ? "right" : "\u53f3",
	prompt  : isEnLocale() ? "Touch screen left/right side, spin the hexagon to left/right" : "\u70b9\u51fb\u5c4f\u5e55\u5de6\u53f3\u6d4b\uff0c\u5411\u5de6\u3001\u5411\u53f3\u65cb\u8f6c\u516d\u8fb9\u5f62\u3002",
	restart : isEnLocale() ? "Restart Game" : "\u91cd\u65b0\u5f00\u59cb"
};