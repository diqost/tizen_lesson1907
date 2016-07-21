$(function() {
	 
		var theme = localStorage.getItem("theme");
		theme = (theme!==null)?theme : "a";
		setTheme(theme);
		
		function setTheme(theme){
			console.log("setting theme", theme);

			localStorage.setItem("theme", theme);
			
			$("[data-theme]").removeClass(
			"ui-page-theme-a ui-page-theme-b ui-page-theme-c").addClass(
			"ui-page-theme-" + theme);	

			$("#myselect").val(theme);

		}
		
		$("#myselect").change(function(event, ui) {
			var theme = $(this).val();
			console.log(theme);
			// $("#settings").buttonMarkup({"theme": theme});
			
			setTheme(theme);

		});
				
});

function sendQuery(){
	var request = $("#jjj").val();
	console.log("sending request" + request);
	rssWebSQL.search(request, function(result){
		console.log("result get", result);
		$("#searchresult").html("");
		for (var i = 0; i < result.rows.length; i++){
			$("#searchresult").append($("<li>"+ result.rows[i].title + "</li>"));
		}

	});
}