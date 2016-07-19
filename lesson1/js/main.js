(function () {
    var infoElem;
    var imgElem;

    var init = function () {
    	
    	window.addEventListener( 'tizenhwkey', function( ev ) {
            if( ev.keyName === "back" ) {
                var activePopup = document.querySelector( '.ui-popup-active' ),
                    page = document.getElementsByClassName( 'ui-page-active' )[0],
                    pageid = page ? page.id : "";

                if( pageid === "one" && !activePopup ) {
                    try {
                        tizen.application.getCurrentApplication().exit();
                    } catch (ignore) {
                    }
                } else {
                    window.history.back();
                }
            }
        } );
    	
    	// TODO:: Do your initialization job
    	console.log("init() called");

    	// add eventListener for tizenhwkey
    	document.addEventListener('tizenhwkey', function(e) {
    		if(e.keyName == "back") {
    			try {
    				tizen.application.getCurrentApplication().exit();
    			} catch (error) {
    				console.error("getCurrentApplication(): " + error.message);
    			}
    		}
    		
    	});
    	/*infoElem = document.getElementById('text1');
        imgElem = document.getElementById('image1');

    	infoElem.innerHTML = screen.width + ":" + screen.height;*/
    	

    };
    // window.onload can work without <body onload="">
    window.onload = init;
    var state = false;

    function changeImageVisibility() {
    	state = ! state;
    	
    	imgElem.style.visibility = state ? 'hidden': 'visible';
    	infoElem.style.visibility = state ? 'hidden': 'visible';

    }
} () );
