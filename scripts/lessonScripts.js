

var letters       = "";
var currentLetter = 0;
var correctLetters = 0;
var seconds       = 0;

var lessonEnd     = false;
var start         = false;
var justEnded     = false;

var spans;
var currentLesson;
var lessonContent;
var timeStamp;

// TODO: May need to reset an initialize
var level = -1;
var lessonNumber;
var lessonPart;

var timePassed    = setInterval(updateTimer, 1000);

/************************************
 * 
 *************************************/
function highlightLesson(lesson) {

    var lessonName = "lesson" + lesson;

    if (lessonNumber) {
        var oldLesson  = "lesson" + lessonNumber;
        document.getElementById(oldLesson).style.backgroundColor  = "" // Reset
    }

    document.getElementById(lessonName).style.backgroundColor  = "#ff751a" // Set to orange

} 

/**********************************************************
 * Reset the page
 *********************************************************/
function reset() {

    seconds        = 0;
    correctLetters = 0;
    start          = false;
    lessonEnd      = false;
    justEnded     = false;
    timeStamp = null;
    

    // Repeated code 
    // Later create a seperate function for this
    for (var i = 0; i <= currentLetter; i++) {
        // Reset the color and id of each span
        spans[currentLetter].id = "";
        spans[i].style.backgroundColor = "";     // Set to grey

        if(i == 0) {
            spans[currentLetter].id = "current";
            spans[i].style.backgroundColor = "#66a3ff"; // Set to blue
        }
    }

    currentLetter = 0;

    // Reset the focus onto the lesson
    document.getElementById("reset").blur();

}

/**********************************************************
 * That's pretty self explanitory...
 *********************************************************/
function updateTimer() {

    // Add a 5 minute cap
    if (seconds <= 300 && !lessonEnd) {

        // Format the seconds into a time stamp
        if (seconds % 60 < 10)
            timeStamp = Math.floor(seconds / 60) + ":0" + (seconds % 60);
        else 
            timeStamp = Math.floor(seconds / 60) + ":" + (seconds % 60);

        // document.getElementById("timer").innerHTML = timeStamp;

        if(start == true)
            seconds++;
    }
}


/**********************************************************
* When a link to the lessons is pressed in from the homepage
* start the correct lesson.
***********************************************************/
function goToNextLesson() {

    // Find out which part and which lesson number
    // to start based of the level they want to practice
    level = localStorage.getItem("level");

   /* $.getJSON("userInfo.json", function(json) {
        console.log(json);
    });*/

    console.log(process.cwd())

    var fs = require('fs');
    var filename = "userInfo.json";
    userInfo = JSON.parse(fs.readFileSync(filename));

    for (var i = 1; i <= 20; i++) {

        document.getElementById("lesson" + i).style.backgroundColor = ""; // Set to grey

        // TODO - Change everything to be index based
        if (userInfo.lessons[i - 1] == true) 
            document.getElementById("lesson" + i).style.backgroundColor = "#28a745";
    }

    if (level > -1) {
        for(var i = 0; i < 10 ; i++)
            if(userInfo.lessons[i + (10 * level)] == false) {
                lessonNumber = i + (10 * level) + 1;
                break;
            }

        // Find the first uncompleted part of the lesson
        filename = "lesson" + lessonNumber + ".json";
        var temporaryLesson = JSON.parse(fs.readFileSync(filename));

        // Call load lesson with the correct info now

        for (var i = 0; i < 10; i++)
            if (temporaryLesson.wpm[i] == 0) {
                lessonPart = i;
                break
            }

        localStorage.setItem("level", -1)

        loadLesson(lessonNumber, lessonPart);
    }

}

/**********************************************************
* 
***********************************************************/
function loadLesson(lesson, part) {

    // If it's the last part of a lesson go to the next lesson
    if (part == 10) {
        part = 0;
        lesson++
    }

    // TODO - This is bad
    // This is not what I want to happen, just for the record
    if (lesson == 21) {
        lesson = 1;
    }



    lessonNumber = lesson;
    lessonPart   = part;
    var tmp1     = null;


    
    if(letters.length > 0) {
        var someLetter = letters[currentLetter].toLowerCase();


        tmp1 = document.getElementById(someLetter).className;
        document.getElementById(someLetter).className = tmp1.replace("active", "disabled");
    }

    //If another lesson has been started, reset
    if(start == true || lessonEnd == true) {
        reset();
    }


    // Read from the lesson file
    var fs = require('fs');
    var filename = "lessons/lesson" + lesson + ".json";
    currentLesson = JSON.parse(fs.readFileSync(filename));

    // Loop through the lesson and split it into multiple divs.
    // Send the divs to the document
    

    // Parsed text with html
    lessonContent = currentLesson[part][0].split('||');

    // Original letters
    letters = lessonContent.join('');



    // Fill the progress bar correctly
    for (var i = 0; i < 10; i++) {

        var partName = "part" + i;
        document.getElementById(partName).style.backgroundColor = ""; // Set to grey

        if (currentLesson.wpm[i] != 0) 
            document.getElementById(partName).style.backgroundColor = "#28a745";
    }

    // Set the current lesson part to orange
    document.getElementById("part" + part).style.backgroundColor = "#ff751a";

    // Make sure the progress bar is now visible
    // TODO: this does not need to happen every time
    document.getElementById("lessonProgress").style.visibility = "visible";

    /**********************
     * Repeated code. Store in a function later
     *********************/
    filename = "userInfo.json";
    userInfo = JSON.parse(fs.readFileSync(filename));

    // Show which lessons are done
    for (var i = 1; i <= 20; i++) {

        document.getElementById("lesson" + i).style.backgroundColor = ""; // Set to grey

        // TODO - Change everything to be index based
        if (userInfo.lessons[i - 1] == true) 
            document.getElementById("lesson" + i).style.backgroundColor = "#28a745";
    }

    // Set the current lesson to orange 
    highlightLesson(lesson);


    // For each line
    for (var i = 0; i < lessonContent.length; i++) {
        
        // Initialize and reset letter spans 
        var letterSpans = "";

        // Put each letter in a span tab and write it to the document
        for (var j = 0; j < lessonContent[i].length; j++)
            if(!(j == 0 && i == 0))
                letterSpans += "<span class=\"letter\">" + lessonContent[i][j] + "</span>";
            else if(j == 0 && i == 0)
                letterSpans += "<span class=\"letter\" id=\"current\" style=\"background-color: #66a3ff;\">" + lessonContent[i][j] + "</span>";

        // Create a div for that line
        lessonContent[i] = "<div class=\"row\" id=\"row" + i + "\">" + letterSpans + "</div>";
    }

    // Make the first letter in the lesson active on the keyboard
    if(letters.length > 0) {
        var lowerLetter = letters[0].toLowerCase();        

        tmp1 = document.getElementById(lowerLetter).className;
        document.getElementById(lowerLetter).className = tmp1.replace("disabled", "active");
    }

    document.getElementById("tip").innerHTML = currentLesson[part][1];

    document.getElementById("lessonInput").innerHTML = "";

    for (var i = 0; i < lessonContent.length; i++)
        document.getElementById("lessonInput").innerHTML += lessonContent[i]; 

    spans = document.getElementsByClassName("letter");
}

/**********************************************************
 * 
 *********************************************************/
function changeKeys(forward) {

    // TODO: Can still make this better...
    if (forward) {var letterToChange = currentLetter - 1;}
    else         {var letterToChange = currentLetter + 1;}

    var someLetter = letters[currentLetter].toLowerCase();

    var tmp1 = document.getElementById(someLetter).className;
    document.getElementById(someLetter).className = tmp1.replace("active", "disabled");

    var tmp2 = document.getElementById(someLetter).className;
    document.getElementById(someLetter).className = tmp2.replace("disabled", "active");
}

/**********************************************************
 * 
 *********************************************************/
function moveForward(isCorrect) {

    if(isCorrect) {
        correctLetters++;
        spans[currentLetter].id = "correct";
        spans[currentLetter].style.backgroundColor = "#5cd65c"; // Set to green
    } 
    else {
        spans[currentLetter].id = "wrong";
        spans[currentLetter].style.backgroundColor = "#ff6666"; // Set to red
    }

    currentLetter++;

    if(currentLetter == letters.length) {
        justEnded = lessonEnd = true;
        currentLetter--;
    }
    else {
        spans[currentLetter].id = "current";
        spans[currentLetter].style.backgroundColor = "#66a3ff"; // Set to blue  

        if(start == false)
            start = true;

        changeKeys(true);
    }
}


/**********************************************************
 * 
 *********************************************************/
document.addEventListener('keydown', function(event) {

    // Disable the enter key and tab keys
    if (event.keyCode == 9 || event.keyCode == 11 || event.keyCode == 13)
        event.preventDefault();

    //console.log(event.keyCode);

    // Check if the lesson is over. Enter starts the next lesson
    if (event.keyCode == 13 && lessonEnd) {
        loadLesson(lessonNumber, lessonPart + 1);
        $("#myModal").modal("hide");

    }

    // Only do this if the lesson isn't over
    if(!lessonEnd) {

        if (letters[currentLetter] == event.key) {
            moveForward(true); // Correct Key was pressed
        } 
        else if ( ((32 <= event.keyCode && event.keyCode < 127) || event.keyCode == 186) && start == true) {
            moveForward(false); // Incorrect Key was pressed
        } 
        else if (event.keyCode == 8 && currentLetter > 0) {
            
            spans[currentLetter].id = "";
            spans[currentLetter].style.backgroundColor = ""; // Set to grey
            
            if (spans[currentLetter - 1].id == "correct") 
                correctLetters--;
            
            currentLetter--;

            changeKeys(false);

            spans[currentLetter].id = "current";
            spans[currentLetter].style.backgroundColor = "#66a3ff";     // Set to blue
        }
    }
    
    if (lessonEnd && justEnded){


        justEnded = false;


        var accuracy = Math.floor((correctLetters / letters.length) * 100);
        var wpm      =  Math.floor((letters.length / 5.1) / (seconds / 60));


        currentLesson.accuracy[lessonPart] = accuracy;
        currentLesson.wpm[lessonPart] = wpm;

        
        // Update the modal with the correct info about the lesson
        document.getElementById("wpm").innerHTML = wpm + "wpm";
        document.getElementById("accuracy").innerHTML = accuracy + "%";
        document.getElementById("time").innerHTML = timeStamp;

        $("#myModal").modal({show: true});  


        var filename = "lessons/lesson" + lessonNumber + ".json";

        // Write the Info back to the file
        // TODO: This is not the most efficent way
        // Also, raising some flag
        var fs = require('fs');
        var data = JSON.stringify(currentLesson, null, 2);
        fs.writeFile(filename, data);
    

        // Record the user's progress
        // Read from the userInfo file
        filename = "userInfo.json";
        userInfo = JSON.parse(fs.readFileSync(filename));

        var updateLessons = true;

        for (var i = 0; i < 10; i++) {
            if (currentLesson.accuracy[i] == 0) {
                updateLessons = false;
                break;
            }
        }
    
        // If the lesson was finished, update the lessons in userInfo
        if(updateLessons) { userInfo.lessons[lessonNumber - 1] = true; }

        // Update the accuracy
        // Later use a better strategy
        if (userInfo.accuracy > 0)
            userInfo.accuracy = Math.floor((userInfo.accuracy + currentLesson.accuracy[lessonPart])) / 2;
        else 
            userInfo.accuracy = Math.floor(currentLesson.accuracy[lessonPart]);

        // Update the wpm
        if (userInfo.wpm > 0)
            userInfo.wpm = Math.floor((userInfo.wpm + currentLesson.wpm[lessonPart])) / 2;
        else 
            userInfo.wpm = Math.floor(currentLesson.wpm[lessonPart]);

        // Write to the userInfo file
        var data = JSON.stringify(userInfo, null, 2);
        fs.writeFile(filename, data);
    }
}

);
