$(function(){
	var l = new logger();
	var now = new Date();
	setTimeout(function(){
		l.logEvent("app started");
	}, 400);
	console.log("creating file", "mes-"+now.getMonth()+ "-"+now.getDay()+ ".txt");
	var messageLogger = new logger("mes-"+now.getMonth()+ "-"+now.getDay() + ".txt");
	
	function sendButtonWasTapped(){
		l.logEvent("contact button pressed");
		messageLogger.logEvent("name: "+ $("#name").val() + " thought: " + $("#thought").val());
	}
});