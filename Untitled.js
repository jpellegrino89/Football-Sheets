var Firebase = require('firebase');
var http = require('http');
var fs = require('fs');
var scores = require('./Untitled.json')

var myFirebaseRef = new Firebase('https://Football-Sheets.firebaseio.com/');


	var file = fs.createWriteStream('scores.json');
	var url = 'http://www.nfl.com/liveupdate/scorestrip/postseason/scorestrip.json'
	var request = http.get(url, function(response) {
		response.pipe(file);
		file.on('finish', function() {
			file.close();  // close() is async, call cb after close completes.
		});
	});




var obj = JSON.parse(fs.readFileSync('Untitled.json', 'utf8'));

console.log(obj['ss'][0])

var arrayCoount = obj['ss'].length;

var game = obj['ss'];
var gameRef = myFirebaseRef.child("games");
var newGameRef = gameRef.push();


for (i=0; i< arrayCoount; i++){
	console.log(i);
		gameRef.child(i).set({
			Day: game[i][0],
			Time: game[i][1],
			Disposition: game[i][2],
			gameStats: {
				homeTeamFull: game[i][6],
				homeAbbr: game[i][7],
				homeScore: game[i][8],
				awayTeamFull: game[i][3],
				awayAbbr: game[i][4],
				awayScore: game[i][5]
			}
			
		});
}

//console.log('Require:', scores[0][0]);
//console.log(JSON.parse(scores.toString()));


/*
myFirebaseRef.set({
	title: "Hello World2!",
	author: "Firebase",
	location: {
		city: "San Francisco",
		state: "California",
		zip: 94103
	}
});
*/