function singleVibro() {
	navigator.vibrate(2000);
}

function multiVibro() {
	navigator.vibrate([ 2000, 1000, 1000, 3000, 1500 ]);
}

function stopVibro() {
	navigator.vibrate(0);
}
function setBluetoothPowerState(state) {
	console.log("set bluetooth powered state ", state);
	if (adapter.powered == state)
		return;
	
	
	adapter.setPowered(state, function(s) {
		
	}, function(e) {
		
	});

}

function setUIState(){
	var state = adapter.powered;
		console.log("set ui powered state ", state);

		$("#bluetoothSlider").val(state? "on" : "off").slider("refresh");
	
}
function onBluetoothUIChange(){
	setBluetoothPowerState($("#bluetoothSlider").val() === "on"? true : false);
}

var adapter = null;
(function () {
	console.log("set bluetooth adapter");

	try {
		console.log("set bluetooth adapter");

		if (tizen.bluetooth === undefined)
			alert("No bluetooth detected");
		else {
			adapter = tizen.bluetooth.getDefaultAdapter();
			console.log("set bluetooth adapter ", adapter);

			window.setInterval(setUIState,1000);
		}
	} catch (e) {
		alert(e);
	}
})();
