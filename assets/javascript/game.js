var trivia = [{

    question : "In what country can you visit Machu Picchu?",
    options : ["Columbia", "Bolivia", "Peru", "Chile"],
    answer : "Peru"
}, {

     question : "What is Earth's largest continent?",
     options : ["Europe", "Asia", "Antartica", "Africa"],
     answer : "Asia"
} ,{
     question : "What is the largest country in South America?",
     options : ["Chile", "Brazil", "Columbia", "Argentina"],
     answer : "Brazil"
}, {

     question : "Montevideo is the capital of what South American country?",
     options : ["Uruguay", "Suriname", "Peru", "Paraguay"],
     answer : "Uruguay"
}, {

     question : "What is the only continent with land in all four hemispheres?",
     options : ["Africa", "Antartica", "Australia", "Asia"],
     answer : "Africa"
}, {

     question : "What continent contains the most fresh water?",
     options : ["Asia", "Africa", "North America", "Antartica"],
     answer : "Antartica"
}, {
     question : "What is the only major city located on two continents?",
     options : ["London", "Istanbul", "Rome", "New Delhi"],
     answer : "Istanbul"
}, {
     question : "What river runs through Paris?",
     options : ["Elbe", "Thames", "Seine", "Danube"],
     answer : "Seine"
}, {
     question : "What Asian country has Kuala Lumpur as its capital?",
     options : ["Cambodia", "Thailand","Bangladesh", "Malaysia"],
     answer : "Malaysia"
}, {
     question : "What mountain is nicknamed the Savage Mountain?",
     options : ["Annapurna", "K2", "Mount Everest", "Matterhorn"],
     answer : "K2"
}]

var quiz = $(".qcontainer");
var optionsDiv;
var qCounter = 0;
var correctAnswer = "";
var rCounter = 0;
var wCounter = 0;
var uCounter = 0;
var displayTimer;

var timer = {

  counter : 10,

  time : 0,

  start : function() {
    timer.time = window.setInterval(timer.decrement, 1000);

  },

  delay : function(){

   // window.setTimeout(  ,5000);

  },

  decrement : function() {
    timer.counter--;
    console.log(timer.counter);
    //displayTimer = $("<div class = 'timerclass'> Time Remaining : " + timer.counter + "  Seconds");
    $(".timerclass").html("Time Remaining : " + timer.counter + "  Seconds");
   //quiz.html(displayTimer);
    if(timer.counter === 0) {
        
        uCounter++;
        clearQuestionaire();
        var message = $("<p class='resultmessage'> Time Up! <br> Correct Answer:  " + correctAnswer + "</p>");
        quiz.append(message);
        setTimeout(playGame, 3000);
        
     }
  },

  stop : function() {
   
      window.clearInterval(timer.time);
 
  }
}

function createQuestionaire(index) {

  var userQuestion = $("<p class='uquestion'>" + trivia[index].question + "</p>");

  quiz.append(userQuestion);

  optionsDiv = $("<div class ='options-set'>");

   for(var i = 0; i<4 ; i++){

      var options = $("<div><button type='button' class='btn btn-default btn-lg optionbtn'>" + trivia[index].options[i] + "</button></div>");
      optionsDiv.append(options); 
    }
}

function clearQuestionaire() {

   timer.stop();
   $(".uquestion").remove();
   $(".options-set").remove();
  
 }

 function clearMessage(){

  timer.stop();

  $(".resultmessage").remove();

 }

 function clearFinalScore(){

  timer.stop();
  $(".timerclass").empty();
  $(".fmessage").remove();
  $(".rmessage").remove();
  $(".wmessage").remove();
  $(".umessage").remove();
  $(".startover").remove();

 }

  
function answerCheck(index){

  correctAnswer = trivia[index].answer;

  $(".optionbtn").on("click", function() {

    if($(this).text() === trivia[index].answer){
      rCounter++;
      clearQuestionaire();  
      var message = $("<p class='resultmessage'>");
      message.text("Yay! you got it");
      quiz.append(message);
      setTimeout(playGame, 2000);
     
      
    }


    else{
      wCounter++
      clearQuestionaire();
      var message = $("<p class='resultmessage'> Oops! Try your luck again <br> Correct Answer:  " + correctAnswer + "</p>");
     // message.text("Wrong Answer!");
      quiz.append(message);
      setTimeout(playGame, 3000);
     
        
    }

    

  });

}

function finalScore(){

  //timer.counter = 10;
  //var qCounter = 0;

  if(qCounter === 10){

    clearMessage();

    clearQuestionaire();

    var finalMessage = $("<div class = 'fmessage'>");
    finalMessage.text(" You did it!, Here is your final score ");
    quiz.append(finalMessage);

    var rightAnswerMessage = $("<div class = 'rmessage'>");
    rightAnswerMessage.text("Answered Correct:  " + rCounter);
    quiz.append(rightAnswerMessage);

    var wrongAnswerMessage = $("<div class = 'wmessage'>");
    wrongAnswerMessage.text("Answered Wrong:  " + wCounter);
    quiz.append(wrongAnswerMessage);    


    var unAnswerMessage = $("<div class = 'umessage'>");
    unAnswerMessage.text("Unanswered:  " + uCounter);
    quiz.append(unAnswerMessage);


    var startOverButton = $("<div><button type='button' class='btn btn-default btn-lg startover'> Start Over! </button></div>");
    //startOverButton.text("Start Over!")
    quiz.append(startOverButton);

    $(".startover").on("click", function(){
    
        clearFinalScore();
        var startButton = $("<div><button type='button' class='btn btn-default btn-lg start'> Start </button></div>");
        $(".btncontainer").append(startButton);
        gameRestart();
    }); 

  
    }
}


function gameRestart(){

  correctAnswer = "";
  rCounter = 0;
  wCounter = 0;
  uCounter = 0;
  qCounter = 0;
  startPlay();
}



function startPlay(){
  $(".start").on("click", function(){
      $(".start").remove();
      timer.start();
      createQuestionaire(qCounter);
      quiz.append(optionsDiv);
      answerCheck(qCounter);
     
  });


} 

  function playGame(){
  clearMessage();  
  timer.counter = 10;
  timer.start();    
  qCounter++;
  if(qCounter < 10){
    createQuestionaire(qCounter);
    quiz.append(optionsDiv);
    answerCheck(qCounter);
  }  
  finalScore();

}

//Execution

startPlay();





