
var userInfo = {
    "name": 1,
    "wpm": 0,
    "accuracy": 0,
    "time": 0,
    "lessons": [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]
  };


function storeLocalInfo(level) {

    if (typeof(Storage) !== "undefined"){
        // Store the level in loval storage
        localStorage.setItem("level", level)

        // Fetch the data
        console.log(localStorage.getItem("level"));
    }
}


function loadPageInfo(lesson) {


    // Set local variables
    var beginnerPercent = 0;
    var advancedPercent = 0;
    var isNotCompleted = false;

    // Find out the user's progress on the beginner lessons
    var lessons = userInfo.lessons;
    for (var i = 0; i < 10; i++) {
        if (lessons[i] == true)
            beginnerPercent += 10;
        
        if (lessons[i + 10] == true)
            advancedPercent += 10;
    }

   
    var timeStamp = new Date(null);
    timeStamp.setSeconds(userInfo.time);
    var result = timeStamp.toISOString().substr(11,8);

    document.getElementById("beginnerProgress").innerHTML = beginnerPercent + "%";
    document.getElementById("advancedProgress").innerHTML = advancedPercent + "%";

    document.getElementById("speed").innerHTML += (userInfo.wpm + "wpm");
    document.getElementById("accuracy").innerHTML += (userInfo.accuracy + "%");
    document.getElementById("time").innerHTML += result;
}