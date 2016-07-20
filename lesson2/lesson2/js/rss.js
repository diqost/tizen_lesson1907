/*function getDataUri(url, callback) {
    var image = new Image();

    image.onload = function () {
        var canvas = document.createElement('canvas');
        canvas.width = this.naturalWidth; // or 'width' if you want a special/scaled size
        canvas.height = this.naturalHeight; // or 'height' if you want a special/scaled size

        canvas.getContext('2d').drawImage(this, 0, 0);

        // Get raw image data
        callback(canvas.toDataURL('image/png').replace(/^data:image\/(png|jpg);base64,/, ''));

        // ... or get as Data URI
        callback(canvas.toDataURL('image/png'));
    };

    image.src = url;
}


function getFeed(){
		
	
}



var indexedDB 	  = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB,
IDBTransaction  = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction,
baseName 	  = "filesBase",
storeName 	  = "filesStore";




function logerr(err){
	console.log(err);
}

function connectDB(f){
	var request = indexedDB.open(baseName, 1);
	request.onerror = logerr;
	request.onsuccess = function(){
		f(request.result);
	}
	request.onupgradeneeded = function(e){
		var objectStore = e.currentTarget.result.createObjectStore(storeName, { autoIncrement: true });
		connectDB(f);
	}
}

function getData(key, f){
	connectDB(function(db){
		var request = db.transaction([storeName], "readonly").objectStore(storeName).get(key);
		request.onerror = logerr;
		request.onsuccess = function(){
			f(request.result ? request.result : -1);
		}
	});
}

function getStorage(f){
	connectDB(function(db){
		var rows = [],
			store = db.transaction([storeName], "readonly").objectStore(storeName);

		if(store.mozGetAll)
			store.mozGetAll().onsuccess = function(e){
				f(e.target.result);
			};
		else
			store.openCursor().onsuccess = function(e) {
				var cursor = e.target.result;
				if(cursor){
					rows.push(cursor.value);
					cursor.continue();
				}
				else {
					f(rows);
				}
			};
	});
}

function setData(obj){
	connectDB(function(db){
		var request = db.transaction([storeName], "readwrite").objectStore(storeName).add(obj);
		request.onerror = logerr;
		request.onsuccess = function(){
			return request.result;
		}
	});
}

function delData(key){
	connectDB(function(db){
		var request = db.transaction([storeName], "readwrite").objectStore(storeName).delete(key);
		request.onerror = logerr;
		request.onsuccess = function(){
			console.log("File delete from DB:", file);
		}
	});
}

function clearStorage(){
	connectDB(function(db){
		var request = db.transaction([storeName], "readwrite").objectStore(storeName).clear();
		request.onerror = logerr;
		request.onsuccess = function(){
			console.log("Clear");
		}
	});
}

*/