


// Beats per minute
var bpm         = 60;

var seconds       = 0;
var timePassed    = setInterval(updateTimer, 1000);

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
	"9": 2
}


/**********************************************************
 * This is essentially the game loop.
 *********************************************************/
function updateTimer() {

	// Check Input


	// Update

	// Render / create notes
	//button id="note2" type="button" class="btn btn-primary btn-lg note">2</button>

	if (seconds < Object.keys(song).length) {

    	var charset = "abcdefghijklmnopqrstuvwxyz0123456789";
    
    	var text = charset.charAt(Math.floor(Math.random() * charset.length));
    	//console.log(text);

		var note   = document.createElement("BUTTON");
		note.id    = "note" + song[seconds];
		note.className = "btn btn-primary btn-lg note";
		note.innerHTML = text;

		//console.log(note.value);

		document.getElementById("notes").appendChild(note);


		

    
		
	}

	// Maybe put at the beginning
		seconds++

	// Clean up
	// Only clean up after 4 seconds have passed
	// Later improve this 
	// There is probably a way to make this happen when an animation is finished
	//console.log("Seconds: " + seconds);
	//console.log("jsonLength: " + Object.keys(song).length);

	if (4 < seconds && seconds < Object.keys(song).length + 6) {
		var list = document.getElementById("notes");
		list.removeChild(list.childNodes[0]);
	}



}




