var readline = require('readline');

var prompt = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

var allRounds = [];
var playerOneName;

var firstRoll = function() {
	prompt.question("Are you ready to roll, " + playerOneName + "?" , (rollPlz) => {
		if (rollPlz == "roll") {
			console.log("Rolling now!");
			var roll1 = Math.floor(Math.random() * 10) + 1;
			console.log("Your 1st roll: " + roll1); 
			secondRoll();
		} else {
			firstRoll();
		}
	});
};

var secondRoll = function() {
	prompt.question("Are you ready to roll again, " + playerOneName + "?" , (rollPlz2) => {
		if (rollPlz2 == "roll") {
			console.log("Rolling now!");
			var roll2 = Math.floor(Math.random() * 10) + 1;
			console.log("Your 2nd roll: " + roll2);
		} else {
			secondRoll();
		}
	});
};

prompt.question("What is your name?", (inputP1Name) => {
	playerOneName = inputP1Name;
	firstRoll();
});
