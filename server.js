var express = require('express'),
	app = express(),
	http = require('http').Server(app),
	port = process.env.PORT || 3000;

app.use(express.static('./'));

http.listen(port, function() {
	console.log('Listening on port: '+port);
});