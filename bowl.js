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
var brollPlzLC;
var brollPlzLC2;
var totalSoFar;
var playerGoal = 0;
var goalSet;

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

var playerSetGoal = function() {
    prompt.question("Would you like to set a goal for yourself? Type 'yes' or 'no.' ", (inputGoal) => {
        playerAnswer = inputGoal;
        playerAnswer = playerAnswer.toLowerCase();
        if ( playerAnswer=="yes") {
            prompt.question("Enter a goal between 100-300? ", (goal) => {
                playerGoal = goal;
                goalSet=true;
                checkGoal();
                });     
	    }   else if (playerAnswer=="no") {
            firstRoll();
        } else {
            console.log("Please type yes or no");
            playerSetGoal();
        }
    });
};

var checkGoal = function() {
    if (playerGoal>=100 && playerGoal<=300) {
	    console.log("Let's get rolling!");
	    sleep(800);
	    firstRoll();
	} else {
	    console.log("You must choose a number between 100-300");
	    playerSetGoal();
	}
};

var wipe = function () {
	return process.stdout.write('\033c');
};

var askName = function(){
	prompt.question("What is your name? ", (inputP1Name) => {
		playerOneName = validateName(inputP1Name);
		if (inputP1Name.length > 1 && inputP1Name.length < 16) {
			playerSetGoal();
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
 "/  ___>/  |  \\/  _  \\/   __\\/  _  \\/  _  \\/  _  \\/  \\/  \\/  _/  /   \\/   \\\n" +
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
            } else if (roll1 == 0) {
            	console.log("Gutter Ball! Wah-wah-wah......");
            	secondRoll();
            } else {
        		console.log("You knocked down " + roll1 + " pin(s) on the first roll!"); 
        		secondRoll();
        	}
        } else if(rollPlz == "exit"){
            exit();
        } else {
        	wipe();
        	console.log("Please type 'roll' to get going.");
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
			console.log("Please type 'roll' to get going.");
			secondRoll();
		}
	});
};

var strikeScore = function() {
	frameScore=10;
};

var spareScore = function() {
	frameScore=10;
	console.log("You got a SPARE!!!");
};

var scoreTotal = function() {
	for (var i = 0; i < allRounds.length; i++) {
		overallScore = overallScore + allRounds[i].score;
	}
	console.log("Your final score is: " + overallScore);
		if (overallScore>=playerGoal && goalSet==true) {
 		console.log("Congrats on hitting your goal!");
 		} else if (overallScore<playerGoal && goalSet==true){
		console.log("Sorry, you didn't do so hot. We still think you are a good person.");
 		} if (overallScore == 300) {
		console.log("Wow, 300! A perfect game!!");
		} else {
 		console.log("Congrats!");
		}
 	playAgain();
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
	console.log("******");
	if (allRounds.length > 1 && allRounds[allRounds.length-2].wasSpare == true) {
		allRounds[allRounds.length-2].score = allRounds[allRounds.length-2].score+roll1;
	}
	if (allRounds.length > 1 && allRounds[allRounds.length-2].wasStrike == true) {
		allRounds[allRounds.length-2].score = allRounds[allRounds.length-2].score+roll1+roll2;
	}
	if (allRounds.length > 2 && allRounds[allRounds.length-2].wasStrike == true && allRounds[allRounds.length-3].wasStrike == true) {
		allRounds[allRounds.length-3].score = allRounds[allRounds.length-3].score+roll1+roll2;
	}
	if (allRounds.length != 10) {
	for (var i=0; i <= allRounds.length -1; i++) {
		console.log("Your score for round " + parseInt(i+1) + " is " + allRounds[i].score + ". Strike?: " + allRounds[i].wasStrike + " Spare?: " + allRounds[i].wasSpare);	
	}
	scoreTotal2();
	}
	checkFrameLength();
};

var bonusRoll = function() {
	console.log("Time for your bonus roll");
 	console.log("When you're ready to get your roll on, type 'roll' and hit enter!\nTo exit at any time, type 'exit' and hit enter.");
 	sleep(700);
    prompt.question("Are you ready to roll, " + playerOneName + "? " , (brollPlz) => {
    	brollPlzLC = brollPlz.toLowerCase();
        if (brollPlzLC == "roll") {
        	wipe();
            console.log("Rolling now! Wait for it...");
            sleep(2000);
            roll1 = Math.floor(Math.random() * 10) + 1;
            console.log("You knocked down " + roll1 + " pin(s) on the first roll!"); 
            bonusRoll2();
        } else if(rollPlz == "exit"){
            exit();
        } else {
        	wipe();
            bonusRoll();
        }
    });
};

bonusRoll2 = function() {
	console.log("When you're ready to get your roll on, type 'roll' and hit enter!");
	sleep(700);
	prompt.question("Are you ready to roll again, " + playerOneName + "? " , (brollPlz2) => {
		brollPlzLC2 = brollPlz2.toLowerCase();
		if (brollPlzLC2 == "roll") {
			wipe();
			console.log("Rolling now! Wait for it...");
			sleep(2000);
			roll2 = Math.floor(Math.random() * (10-roll1+1));
			console.log("You knocked down " + roll2 + " pin(s) on the second roll!");
			frameScore = roll1+roll2;		 
            console.log("Your bonus rolls: " + roll1 + " " + roll2);
            if (roll1 == 10 && roll2 ==10) {
            	allRounds[allRounds.length-1].score = 30;
            	allRounds[allRounds.length-2].score = 30;
            	endGame();
            } else {
            	allRounds[allRounds.length-1].score = allRounds[allRounds.length-1].score+roll1+roll2;
            	endGame();
        	}
		} else {
				bonusRoll2();
		}
	});
};

var checkFrameLength = function() {
	if (allRounds.length == 10 && allRounds[allRounds.length-1].wasStrike == true) {
		console.log("Bonus roll!!");
		bonusRoll();
	} else if (allRounds.length == 10 && allRounds[allRounds.length-1].wasStrike == false) {
		endGame();
	} else {
		firstRoll();
	}
};

var endGame = function() {
	console.log("******");
	for (var i=0; i <= allRounds.length -1; i++) {
		console.log("Your score for round " + parseInt(i+1) + " is " + allRounds[i].score + ". Strike?: " + allRounds[i].wasStrike + " Spare?: " + allRounds[i].wasSpare);	
	}
	console.log("******");
	scoreTotal();
};

var playAgain = function () {
	sleep(700);
	prompt.question("Would you like to play again? Type 'yes' to play again or 'no' to exit." , (wantToPlayAgain) => {
		playerInput = wantToPlayAgain;
        playerInput = playerInput.toLowerCase();
        if (playerInput == "yes") {
            wipe();
            allRounds = [];
            overallScore = 0;
            playerSetGoal();
        } else if (playerInput == "no") {
            exit();
        } else {
            wipe();
            playAgain();
        }
    });
};

var sleep = function(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
		if ((new Date().getTime() - start) > milliseconds) {
			break;
		}
    }
};

art1();