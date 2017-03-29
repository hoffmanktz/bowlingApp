var readline = require('readline');

var prompt = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

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

var Frame = function(firstRoll, secondRoll, score, wasStrike, wasSpare) {
	this.firstRoll = firstRoll;
	this.secondRoll = secondRoll;
	this.score = score;
	this.wasStrike = wasStrike;
	this.wasSpare = wasSpare;
};

var exit = function(){
	wipe();
	sleep(500);
    console.log("Thanks for playing!!! Roll out.");
    process.exit();
};

var wipe = function () {
  return process.stdout.write('\033c');
};

var askName = function(){
	prompt.question("What is your name? ", (inputP1Name) => {
		playerOneName = validateName(inputP1Name);
		if (inputP1Name.length > 1 && inputP1Name.length < 16) {
			firstRoll();
		}
	});
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
	sleep(1500);
	prompt.question("Welcome! What is your name? ", (inputP1Name) => {
		playerOneName = validateName(inputP1Name);
		if (inputP1Name.length > 1 && inputP1Name.length < 16) {
			wipe();
			firstRoll();
		}
	});
};
                                             
var art1 = function() {
	wipe();
console.log(
 "                                              \n" +
 "                                 .-.\n" +
 "                                 \\ /      .-.\n" +
 "                                 |_|  .-. \\ /\n" +
 "                                 |=|  \\ / |_|\n" +
 "                                /   \\ |_| |=|\n" +
 "                               / (@) \\|=|/   \\\n" +
 "                          ____ |     /   \\@)  \\\n" +
 "                        .'    '.    / (@) \\   |\n" +
 "                       / #      \\   |     |   |\n" +
 "                       |    o o |'='|     |  /\n" +
 "                       \\     o  /    \\   /'='\n" +
 "                        '.____.'      '='\n" +
 "                                            \n" +
 " _____  __ __  _____  _____  _____  _____  _____  __  __  ____   ___  ___ \n" +
 "/  ___>/  |  \\/  _  \\/   __\\/  _  \\/  _  \\/  _  \\/   /  \\/  _/  /   \\/   \\\n" +
 "|___  ||  |  ||   __/|   __||  _  <|  _  <|  |  ||  /\\  ||  |---\\___/\\___/\n" +
 "<_____/\\_____/\\__/   \\_____/\\__|\\_/\\_____/\\_____/\\__/\\__/\\_____/<___><___>\n" +
 "                                                                          \n" 
);
askName();
};

var firstRoll = function() {
	sleep(500);
    console.log("When you're ready to get your roll on, type 'roll' and hit enter!\nTo exit at any time, type 'exit' and hit enter.");
    sleep(700);
    prompt.question("Are you ready to roll, " + playerOneName + "? " , (rollPlz) => {
    	rollPlzLC = rollPlz.toLowerCase();
        if (rollPlzLC == "roll") {
        	wipe();
            console.log("Rolling now! Wait for it...");
            sleep(2000);
            roll1 = Math.floor(Math.random() * 10) + 1;
                if (roll1 == 10) {
                    console.log("Strike!!!");
                    roll2 = 0;
                    strikeScore();
                    endTurn();
                } else if (roll1==0) {
                	console.log("Gutter Ball! Wah-wah-wah......");
                	secondRoll();
                } 

                else {
            console.log("You knocked down " + roll1 + " pin(s) on the first roll!"); 
            secondRoll();
            }
            //exit
        } else if( rollPlz == "exit"){
            exit();
        } else {
        	wipe();
            firstRoll();
        }
    });
};

var secondRoll = function() {
	console.log("****");
	sleep(500);
	console.log("When you're ready to get your roll on, type 'roll' and hit enter!");
	sleep(700);
	prompt.question("Are you ready to roll again, " + playerOneName + "? " , (rollPlz2) => {
		rollPlzLC2 = rollPlz2.toLowerCase();
		if (rollPlzLC2 == "roll") {
			wipe();
			console.log("Rolling now! Wait for it...");
			sleep(2000);
			roll2 = Math.floor(Math.random() * (10-roll1+1));
			console.log("You knocked down " + roll2 + " pin(s) on the second roll!");
			frameScore = roll1+roll2;
			if (frameScore==10) {
				spareScore();
			} else if (roll2==0) {
                	console.log("Gutter Ball! Wah-wah-wah......");
                	
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
	for (var i = 0; i < allRounds.length; i++) {
		overallScore = overallScore + allRounds[i].score;
	}
	console.log("Your final score is: " + overallScore);
};

var scoreTotal2 = function(x) {
	for (var i = 0, x = 0; i < allRounds.length; x += allRounds[i++].score); {
        totalSoFar = x;
    }
	
	console.log("TOTAL SCORE: " + totalSoFar);
	console.log("*****");
};

var endTurn = function() {
	sleep(1500);
	console.log("Your rolls: " + roll1 + " " + roll2);
	if (roll1 == 10 && roll2 == 0) {
		rollToPush = new Frame(roll1, roll2, frameScore, true, false);
	} else if (roll1+roll2 == 10 && roll1 != 10) {
		rollToPush = new Frame(roll1, roll2, frameScore, false, true);
	} else {
	rollToPush = new Frame(roll1, roll2, frameScore, false, false);
	}
	allRounds.push(rollToPush);
	console.log("*****");
	for (var i=0; i <= allRounds.length -1; i++) {
		console.log("Your score for round " + parseInt(i+1) + " is " + allRounds[i].score + ". Strike?: " + allRounds[i].wasStrike + " Spare?: " + allRounds[i].wasSpare);
	
}
scoreTotal2();
	checkFrameLength();
};

var checkFrameLength = function() {
	if (allRounds.length ==10) {
		endGame();
	} else {
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

art1();