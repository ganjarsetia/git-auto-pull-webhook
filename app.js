'use strict';

const http = require("http");
const async = require("async");
const gitpull = require('git-pull');

http.createServer(function (req, res) {
    res.writeHead(200, {"Content-Type": "text/plain"});
    console.log("An event has been detected on the listened port: starting execution...")

	//const config = require("./config.json");
	const projects = [];
	async.each(projects, function(project_path, callback) {

	    // Perform operation on file here.
	    console.log('Processing pull ' + project_path);
	    gitpull(project_path, (err, consoleOutput) => {
	    	if (err) {
		        console.error("Error!", err, consoleOutput);
		        callback('Error! '+project_path);
		    } else {
		        console.log("Success!", project_path, consoleOutput);
		        callback();
		    }
	    });

	    /*gitpull(project_path, function (err, consoleOutput) {
		    if (err) {
		        console.error("Error!", err, consoleOutput);
		        callback('Error! '+project_path);
		    } else {
		        console.log("Success!", consoleOutput);
		        callback();
		    }
		});*/

	}, function(err) {
	    
	    if( err ) {
	      console.log('ada yang gagal pull');
	      console.log(err);
	      res.statusCode = 500;
	      res.statusMessage = 'ada yang gagal pull!';
	      res.end("Error!");
	    } else {
	      console.log('semua sukses di pull');
	      res.end("Success!");
	    }
	});

}).listen(1337);
console.log("Git-auto-pull is running");

