


var beats = 0;
var score   = 0;

var start     = false;
var rightNote = true;

var text    = "";
var letters = "";

var charset = "abcdefghijklmnopqrstuvwxyz";


var timePassed  = setInterval(updateTimer, 1000);

var audio = new Audio('song4.wav');

var song = {
	"0": 1,
	"1": 2,
	"2": 3,
	"3": 4,
	"4": 1,
	"5": 2,
	"6": 3,
	"7": 4,
	"8": 1,
	"9": 2,
	"10": 1,
	"11": 2,
	"12": 3,
	"13": 4,
	"14": 1,
	"15": 2,
	"16": 3,
	"17": 4,
	"18": 1,
	"19": 2,
	"20": 1,
	"21": 2,
	"22": 3,
	"23": 4,
	"24": 1,
	"25": 2,
	"26": 3,
	"27": 4,
	"28": 1,
	"29": 2,
}

/**********************************************************
* Will start the game 
***********************************************************/
function startGame() {


	audio.play(); 

	beats = 0;
    score   = 0;
    text    = "";
    letters = "";
	start   = true;

}


/**********************************************************
 * This is essentially the game loop.
 *********************************************************/
function updateTimer() {

	if (start) {


		// Update

		// Render / create notes
		if (beats < Object.keys(song).length) {
    
    		text = charset.charAt(Math.floor(Math.random() * charset.length));
    		letters += text;

			var note   = document.createElement("BUTTON");
			note.id    = "note" + song[beats];
			note.className = "btn btn-primary btn-lg note";
			note.innerHTML = text;

			document.getElementById("notes").appendChild(note);
		}


		// Maybe put at the beginning
		rightNote = true;
		beats++;
		

		if(beats >= Object.keys(song).length + 5) {
			start = false;

			var node = document.getElementById("notes");

			while (node.hasChildNodes())
    			node.removeChild(node.lastChild);

			//console.log("Game Over dude");
		}

		document.getElementById("score").innerHTML = "Score: " + score;

	}

}

/**********************************************************
 * Handle key strokes appropriatly
 *********************************************************/
document.addEventListener('keydown', function(event) {

	// I don't like the event handler approach to this problem

    // Disable the enter key and tab keys
    if (event.keyCode == 9 ||event.keyCode == 11 ||event.keyCode == 13 ||event.keyCode == 8) {

        event.preventDefault();
    }



    // Only do this if the lesson isn't over
    if(start) {


        if (beats > 3 && letters[beats - 4] == event.key) {
            score++;
            
            var list = document.getElementById("notes");
            
            var node = list.childNodes[beats - 3];

        	node.className = node.className.replace("primary", "success");
        } 
        else if (rightNote) {
        	//var note = document.getElementById("note" + (beats - 4));
            //note.class.replace("primary", "danger");


            if (beats > 3) {
	            var list = document.getElementById("notes");
            
            	var node = list.childNodes[beats - 3];

        		node.className = node.className.replace("primary", "danger");
        	}

        	rightNote = false;
        	score--;
        } 

    }

    if (event.keyCode == 13 && !start)
    	startGame();
    
	//console.log(score);
	
}

);


