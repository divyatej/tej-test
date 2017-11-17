var port = 8080;
var serverUrl = "https://tej-test.herokuapp.com/";
var http = require("http");
var path = require("path");
var fs = require("fs");
console.log('start');
http.createServer( function(req, res) {
	console.log('server');
	var filename = req.url;
	var params = filename.substring(filename.indexOf('?')+1,filename.length);
	filename=filename.replace('?'+params,'');
	var ext = path.extname(filename);
	var localPath = __dirname;
	var validExtensions = {
		".html" : "text/html",
		".js": "application/javascript",
		".css": "text/css",
		".ico": "image/ico"
	};
	var mimeType = validExtensions[ext];
	localPath += filename;
	fs.exists(localPath, function(exists) {
			if(exists) {
				console.log("Serving file: " + localPath);
				getFile(localPath, res, mimeType);
			} else {
				console.log("File not found: " + localPath);
				res.writeHead(404);
				res.end();
			}
	});
}).listen(port, serverUrl);

function getFile(localPath, res, mimeType) {
	fs.readFile(localPath, function(err, contents) {
		if(!err) {
			res.setHeader("Content-Length", contents.length);
			if (mimeType != undefined) {
				res.setHeader("Content-Type", mimeType);
			}
			res.statusCode = 200;
			res.end(contents);
		} else {
			res.writeHead(500);
			res.end();
		}
	});
}
