$(function() {


	
function listDir(fileroot) {
	try {
		tizen.filesystem.resolve(fileroot, function(dir) {

		}, function(err) {
			throw err;
		}, "r");

	}

	catch (err) {
		console.warn("FS : " + err);
		return false;
	}
}

logger = function(filename) {
	console.log("logger init b4");
	this.logFileName = filename;
	this.init();
}

logger.prototype.init = function() {
	console.log("logger init");
	this.dir = "documents";
	
	this.log = null;
	var self = this;

	tizen.filesystem.resolve(this.dir, function(dir){
		console.log("in dir, tr", self.logFileName);
		
		try 
		{
			self.log = dir.createFile(self.logFileName);
			
		} catch (e) 
		{
			tizen.filesystem.resolve(self.dir + "/" + self.logFileName, function(file){
			self.log = file; 
			}, function(err){
				console.err("FS ERROR " + err.message);
			} );
		}
		
		console.log("file got " + self.logFileName);
	}, function(err)
		{
			console.err("FS ERROR " + err.message);
		});
	
	setTimeout(function(){this.log = self.log;}, 200);
}

logger.prototype.logEvent = function(message)
{
	var data = new Date();
	
	this.log.openStream("a", function(stream) {
		console.log("WRITING " + message);
		stream.write(data + " " + message + "\n");
		stream.close();
	}, 
	function(err) {
		console.warn("FS ERROR " + err);
	});
	

}

/*
 * var documentsDir; function onsuccess(files) { for (var i = 0; i <
 * files.length; i++) { console.log("File Name is " + files[i].name); //
 * displays file name }
 * 
 * var testFile = documentsDir.createFile("test.txt");
 * 
 * if (testFile != null) { testFile.openStream("w", function(fs) {
 * fs.write("HelloWorld"); fs.close(); }, function(e) { console.log("Error " +
 * e.message); }, "UTF-8"); } }
 * 
 * function onerror(error) { console.log("The error " + error.message + "
 * occurred when listing the files in the selected folder"); }
 * 
 * tizen.filesystem.resolve('documents', function(dir) { documentsDir = dir;
 * dir.listFiles(onsuccess, onerror); }, function(e) { console.log("Error" +
 * e.message); }, "rw");
 * 
 */
});