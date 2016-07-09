var zhLocale = "zh"; 
var enLocale = "en"; 
var zhTitle = "一個都不能死";
var enTitle = "Nobody Can Die";

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

var GameConfig = window.GameConfig || {}; 

var GAME_TEXT = {
	startGame : isEnLocale() ? "Start Game" : "開始遊戲",
	more      : isEnLocale() ? "" : "",
	returnGame: isEnLocale() ? "Return" : "返回",
	myScore   : isEnLocale() ? "Score"  : "我的成績",
	bestScore : isEnLocale() ? "Best: "   : "最佳: ",
	seconds   : isEnLocale() ? "s" : "秒",
	newRecord : isEnLocale() ? "New Record" : "新紀錄",
	nightmare : isEnLocale() ? "Nightmare"  : "噩夢模式",
	hellMode  : isEnLocale() ? "Hell Mode"  : "地獄模式",
	purgatory : isEnLocale() ? "Purgatory Mode" : "煉獄模式",
	showoff   : isEnLocale() ? "" : ""
};

var POS_OFFSET = {
	startButton : {
		yOffset : 100
	},
	returnButton : {
		xOffset : 70
	}
}; 

var SIZE_DELTA = {
	returnButton : {
		widthDelta : 50
	}
};

// send message to webiew.
var sendToNative = function(msgType, jsonObj){
	var msg = msgType.toString(); 
	if (jsonObj != "" && typeof jsonObj != "undefined" && jsonObj != null){
		msg += MsgSeperator + JSON.stringify(jsonObj); 
	}
	console.log("msg:" + msg);
	alert(msg);
}


var sendGameOverToNative = function(jsonObj){
	sendToNative(NativeMsg.gameOver, jsonObj);
}

var gameObserver = {
	onGameStart : function(f, v){
		f(v);
	}, 
	onGameOver : function(f, v){
		f(v);
	}
};

var imageSrc = {
	logo : isZhLocale() ? "ygdbnsZh.jpg" : "ygdbnsEn.jpg" 
}

document.title = function(){
	if (isZhLocale()){
		return zhTitle;
	} else {
		return enTitle;
	}
}();