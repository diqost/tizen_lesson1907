var rssWebSQL = {}
rssWebSQL.db = null;

function getDataUri(url, callback) {
   /* var image = new Image();
    image.src = url;
    
    image.onload = function () {
        var canvas = document.createElement('canvas');
        canvas.width = this.naturalWidth; // or 'width' if you want a special/scaled size
        canvas.height = this.naturalHeight; // or 'height' if you want a special/scaled size

        canvas.getContext('2d').drawImage(this, 0, 0);

        // Get raw image data
     //   callback(canvas.toDataURL('image/png').replace(/^data:image\/(png|jpg);base64,/, ''));

        // ... or get as Data URI
        callback(canvas.toDataURL('image/png'));
       
    };
*/
	 var xmlHTTP = new XMLHttpRequest();
	    xmlHTTP.open('GET',url,true);

	    // Must include this line - specifies the response type we want
	    xmlHTTP.responseType = 'arraybuffer';

	    xmlHTTP.onload = function(e)
	    {
	    	
	        var arr = new Uint8Array(this.response);
	        var raw = '';
	        var i,j,subArray,chunk = 5000;
	        for (i=0,j=arr.length; i<j; i+=chunk) {
	           subArray = arr.subarray(i,i+chunk);
	           raw += String.fromCharCode.apply(null, subArray);
	        }

	        // This works!!!
	        var b64=btoa(raw);
	        var dataURL="data:image/jpeg;base64,"+b64;
	       //console.log(dataURL);
	        callback(dataURL);
	    };

	    xmlHTTP.send();
	
}
rssWebSQL.search = function(request, callback){
	var database = rssWebSQL.db;
	database.transaction(function(tx) {
				console.log("sending transaction", tx);

				tx.executeSql( "SELECT title FROM rsstable WHERE title LIKE '%" + request + "%';", [], function(tx,result){
					console.log(result);
					callback(result);
				});
					 
 
			});
}
// Для удобства помещаем функцию в глобальную переменную
rssWebSQL.open = function() {
	rssWebSQL.db = openDatabase("rssdb", "1.0", "rss saved",
			1024 * 1024 * 5);
	// название БД, версия, описание, размер
}

// Создаем таблицу
rssWebSQL.createTable = function() {
	var database = rssWebSQL.db;
	database
			.transaction(function(tx) {
				tx.executeSql(
								"CREATE TABLE IF NOT EXISTS rsstable (_ID INTEGER PRIMARY KEY AUTOINCREMENT,image TEXT,title TEXT, description TEXT)");
			});
}

// функция добавления записи
rssWebSQL.addRssItem = function(item) {
	var database = rssWebSQL.db;
	database.transaction(function(tx) {
				//console.log("inserting item", item);
				tx.executeSql("INSERT INTO rsstable (image, title, description) VALUES (?,?,?)",
								[ item.image, item.title, item.description ]);
			});
}

// получение данных из БД
rssWebSQL.getRssItems = function(callback) {
	console.log("get rss items starting")
	var database = rssWebSQL.db;
	var items = [];
	database.transaction(function(tx) {
		tx.executeSql("SELECT * FROM rsstable", [], function(tx, result) {
			//console.log("entering database transaction");
			for (var i = 0; i < result.rows.length; i++) {
				image = result.rows.item(i).image;
				title = result.rows.item(i).title;
				description = result.rows.item(i).description;
				items.push({
					"image" : image,
					"title" : title,
					"description" : description
				});
			}
			return callback(items);
		});

	});
 }

// удаление записей из таблицы
rssWebSQL.deleteAllFromTable = function() {
	var database = rssWebSQL.db;
	database.transaction(function(tx) {
		tx.executeSql("DELETE FROM rsstable");
	});
}

var FEED_URL = "http://www.3dnews.ru/news/rss/";
var width = screen.width;
var i = 0;
var arr = [];

function getRSSFeed() {
 	$.ajax({
		type : "GET",
		url : FEED_URL,
		dataType : "xml"}).done( function (data, status) {
			xmlParser(data);	
			console.log("success");
		})
		 .fail( function (data, status) {
			 getStorage(function(items) {
					console.log("dsadsa", items.length);
					$("#rssContent").text("");
					for (var i = 0; i < items.length; i++) {
						console.log(items[i]);
						$("#rssContent").append(
								'<div class="feed">	<div class="images">' + '<img src='
										+ items[i].image + ' width=' + width
										+ 'px /></div>' + '<div class="title">'
										+ items[i].title + '</div>'
										+ '<div class="description">'
										+ items[i].description + '</div></div>');
					}
			 });
				console.log("error");

 		 });
}

function getStorage(f) {
	 rssWebSQL.getRssItems(f);
}

function xmlParser(xml) {

	rssWebSQL.deleteAllFromTable();
	console.log("xmlparser");
	$(xml).find("item").each(
			function() {
				var url_img = $(this).find("enclosure").attr('url');
				$("#rssContent").append(
						'<div class="feed">	<div class="images">' + '<img src='
								+ url_img + ' width=' + width + 'px /></div>'
								+ '<div class="title">'
								+ $(this).find("title").text() + '</div>'
								+ '<div class="description">'
								+ $(this).find("description").text()
								+ '</div></div>');
				var self = this;
				getDataUri($(this).find("enclosure").attr('url'),function(result){
				//	console.log(result);
					var item = {
							"image" : result,
							"title" : $(self).find("title").text(),
							"description" : $(self).find("description").text()
						};
					//console.log("add item", item);
					rssWebSQL.addRssItem(item);
				});
				
				
			});

}

function initDBIfNeeded() {
	if (typeof (openDatabase) !== 'undefined') {
		rssWebSQL.open();
		rssWebSQL.createTable();
	} else
		console.log("WEBSQL IS NOT SUPPORTED");

}
initDBIfNeeded();
