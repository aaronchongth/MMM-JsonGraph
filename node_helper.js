var NodeHelper = require('node_helper');
// var XMLHttpRequest = require('xhr2');
var fs=require('fs');
// var data=fs.readFileSync('words.json', 'utf8');
// var words=JSON.parse(data);

// var request = require('request');

// function readTextFile(file, callback) {
// 	var rawFile = new XMLHttpRequest();
// 	rawFile.overrideMimeType("application/json");
// 	rawFile.open("GET", file, true);
// 	rawFile.onreadystatechange = function() {
// 			if (rawFile.readyState === 4 && rawFile.status == "200") {
// 					callback(rawFile.responseText);
// 			}
// 	}
// 	rawFile.send(null);
// }

module.exports = NodeHelper.create({
	start: function () {
		console.log('MMM-JsonGraph helper started...');
	},

	getJson: function (url) {
		var self = this;
		console.log("MMM-JsonGraph getJson url:" + url);

    // var json = require('/tmp/mi/test.json');
    // var json = require(url);
		// readTextFile(url, function(text) {
		// 	var json = JSON.parse(text);
		// 	// console.log(json);
		// 	self.sendSocketNotification("MMM-JsonGraph_JSON_RESULT", {url: url, data: json});
		// });
		var data=fs.readFileSync(url, 'utf8');
		var json=JSON.parse(data);
		self.sendSocketNotification("MMM-JsonGraph_JSON_RESULT", {url: url, data: json});

		// request({ url: url, method: 'GET' }, function (error, response, body) {
		// 	if (!error && response.statusCode == 200) {
		// 		var json = JSON.parse(body);
		// 		// Send the json data back with the url to distinguish it on the receiving part
		// 		self.sendSocketNotification("MMM-JsonGraph_JSON_RESULT", {url: url, data: json});
		// 		console.log("MMM-JsonGraph request was succesfull");
		// 	}
		// 	else {
		// 		console.log("MMM-JsonGraph request had error", error, response);
		// 	}
		// });
	},

	socketNotificationReceived: function (notification, url) {
		if (notification === "MMM-JsonGraph_GET_JSON") {
			console.log("MMM-JsonGraph_GET_JSON received for url:" + url);
			this.getJson(url);
		}
	}
});
