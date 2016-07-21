$(function() {
	var
		CHECK_INTERVAL = 10000, 
		CPU_KEY = "CPU";
	function getCpuInfo(){
		
	}
	function init() {

		if (checkCapacity()) {
			getWifiInfo();
			window.setInterval(getCpuInfo, CHECK_INTERVAL);
		} else {
			window.alert('This device doesn\'t support Wi-Fi networks.');
			try {
				tizen.application.getCurrentApplication().exit();
			} catch (e) {
				console.error('Exception', e.message);
			}
		}
	}

	init();

})();