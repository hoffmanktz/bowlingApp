var readline = require('readline');

var prompt = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

var Frame = function(firstRoll, secondRoll, score) {
	this.firstRoll = firstRoll;
	this.secondRoll = secondRoll;
	this.score= score;
};

var allRounds = [];
var playerOneName;
var roll1;
var roll2;
var rollToPush;
var frameScore = 0;

var firstRoll = function() {
	prompt.question("Are you ready to roll, " + playerOneName + "?" , (rollPlz) => {
		if (rollPlz == "roll") {
			console.log("Rolling now!");
			roll1 = Math.floor(Math.random() * 10) + 1;
				if (roll1 == 10) {
					console.log("Strike!!!");
					roll2 = 0;
					strikeScore();
					endTurn();
				} else {
			console.log("Your 1st roll: " + roll1); 
			secondRoll();
			}
		} else {
			firstRoll();
		}
	});
};

var secondRoll = function() {
	prompt.question("Are you ready to roll again, " + playerOneName + "?" , (rollPlz2) => {
		if (rollPlz2 == "roll") {
			console.log("Rolling now!");
			roll2 = Math.floor(Math.random() * (10-roll1+1));
			console.log("Your 2nd roll: " + roll2);
			frameScore = roll1+roll2;

			if (frameScore==10) {
				spareScore();
			}
			endTurn();
		} else {
			secondRoll();
		}
	});
};

var strikeScore = function() {
	frameScore=30;
	
};

var spareScore = function() {
	frameScore=20;
	console.log(frameScore);
};

var endTurn = function() {
	console.log("Your rolls: " + roll1 + " " + roll2);
	rollToPush = new Frame(roll1, roll2, frameScore);
	allRounds.push(rollToPush);
	console.log(allRounds);
};

prompt.question("What is your name?", (inputP1Name) => {
	playerOneName = inputP1Name;
	firstRoll();
});