
var highScore = document.querySelector(".scores");
var clear = document.querySelector(".clear");


//Clear the local storage
clear.addEventListener("click",function(){
    localStorage.clear();
    location.reload();
});


//access local storage

var allScores = localStorage.getItem("allScores");
allScores =JSON.parse(allScores);

if(allScores!=null) {
    allScores.forEach(function(scores){
        var createButton = document.createElement("li");
        createButton.textContent=scores.initials + " - " + scores.score;

        highScore.appendChild(createButton);

    });
}


function switchPage(from, to) {
    var location= window.location.pathname;
   location = location.replace(from,to);
    console.log(location);
     window.location.assign(location);
  }
