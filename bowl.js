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
var overallScore=0;
var rollPlzLC;
var rollPlzLC2;
var totalSoFar;

var exit = function(){
    console.log("Thanks for playing!!! Roll out.");
    process.exit();
};

var firstRoll = function() {
    console.log("When you're ready to get your roll on, type 'roll' and hit enter!\nTo exit at any time, type 'exit' and hit enter.");
    prompt.question("Are you ready to roll, " + playerOneName + "? " , (rollPlz) => {
    	rollPlzLC = rollPlz.toLowerCase();
        if (rollPlzLC == "roll") {
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
            //exit
        } else if( rollPlz == "exit"){
            exit();
        }
        else {
            firstRoll();
        }
    });
};

var secondRoll = function() {
	console.log("****");
	console.log("When you're ready to get your roll on, type 'roll' and hit enter!");
	prompt.question("Are you ready to roll again, " + playerOneName + "? " , (rollPlz2) => {
		rollPlzLC2 = rollPlz2.toLowerCase();
		if (rollPlzLC2 == "roll") {
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
	console.log("You got a SPARE!!!");
};

var scoreTotal = function() {
	for (var i =0; i<allRounds.length; i++) {
		overallScore = overallScore + allRounds[i].score;
	}
	console.log(overallScore);
};

var scoreTotal2 = function(x) {
	for (var i = 0, x = 0; i < allRounds.length; x += allRounds[i++].score); {
        totalSoFar = x;
    }
	
	console.log("TOTAL SCORE: " + totalSoFar);
	console.log("*****");
};

var endTurn = function() {
	console.log("Your rolls: " + roll1 + " " + roll2);
	rollToPush = new Frame(roll1, roll2, frameScore);
	allRounds.push(rollToPush);
	console.log("*****");
	for (var i=0; i <= allRounds.length -1; i++) {
	console.log("Your score for round " + parseInt(i+1) + " is " + allRounds[i].score);
	
}
scoreTotal2();
	checkFrameLength();
};

var validateName = function(x) {
	if (x.length > 1 && x.length < 16) {
		return x;
	} else {
		console.log("Please use 2-15 characters");
		askName();
	}
};

var askName = function(){
	prompt.question("What is your name? ", (inputP1Name) => {
	playerOneName = validateName(inputP1Name);
	firstRoll();
});

};

//check for amount in array, if == 10, then go to end game to quit
var checkFrameLength = function() {
	if (allRounds.length ==10) {
		endGame();
	}
	else {
		firstRoll();
	}
};

var endGame = function() {
	scoreTotal();
	prompt.close();
};

var sleep = function(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
      if ((new Date().getTime() - start) > milliseconds){
        break;
      }
    }
};

askName();