var zhLocale = "zh"; 
var enLocale = "en"; 
var zhTitle = "街頭籃球";
var enTitle = "Basketball";


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

var imageSrc = {
	splash :  isEnLocale() ? "splash.jpg" : "splash_zh.jpg"
};