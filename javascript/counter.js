// Initialize Firebase


newFunction();
// $(".displayTimer").val("");
var config = {
   apiKey: "AIzaSyDr1eJ25h6a_EpX_pwfZJnLvFmyiKPI5No",
   authDomain: "fitnesstube-1f1b3.firebaseapp.com",
   databaseURL: "https://fitnesstube-1f1b3.firebaseio.com",
   projectId: "fitnesstube-1f1b3",
   storageBucket: "fitnesstube-1f1b3.appspot.com",
   messagingSenderId: "452708890891"
};
firebase.initializeApp(config);

var database = firebase.database();

$(document).ready(function () {
 
   // CREATE ON CLICK EVENT FUNCTION 
   $("#button-addon1").on("click", function (event) {
   
      event.preventDefault()
      // STORE USER INPUT DATA 
      var inputWeight = $(".form-weight").val()
      var inputWater = $(".form-water").val()
      var inputCalories = $(".form-calories").val()

      console.log(inputWeight)
      console.log(inputWater)
      console.log(inputCalories)

      // CREATE OBJECT "fitnessTubeData", WHERE USER INPUT DATA ARE PROPERTY.VALUES OF THE OBJECT
      var fitnessTubeData = {
         weight: inputWeight,
         waterIntake: inputWater,
         caloriesBurnt: inputCalories,
         dateAdded: firebase.database.ServerValue.TIMESTAMP
      }
      // PUSH OBJECT "fitnessTubeDate" TO FIREBASE
      database.ref().push(fitnessTubeData)

      // RESET DATA FIELDS ONCE THE "submit" BUTTON IS CLICKED
      $(".inputData")[0].reset();

      
   });
   // CREATE OBJECT "context" AS A PLACE HOLDER FOR TOTAL ACCUMULATING VALUES
   const context = {
      caloriesBurnt: 0,
      weight: 0,
      water: 0
   };
   // REGULAR EXPRESSION TO EXTRACT NUMBERS ONLY
   const number_regex = /(\d+)/gm;

   database.ref().on("child_added", function (snapshot) {

      // PRINT THE VALUES TO THE CONSOLE LOG 
      console.log(snapshot.val());

      console.log(context);


      // STORE VALUES OF THE VARIOUS PROPERTIES OF "fitnessTubeData" OBJECT IN THE DATABASE
      var dbWeight = snapshot.val().weight;
      var dbWater = snapshot.val().waterIntake;
      var dbCalories = snapshot.val().caloriesBurnt;

      // ONLY ADD WHEN VALUE IS PRESENT
      if (dbCalories) {
         context['caloriesBurnt'] = context['caloriesBurnt'] + parseInt(dbCalories);
      }
      // MATCH[0] = FIRST GROUP OF NUMBERS
      if (dbWeight) {
         const match = number_regex.exec(dbWeight);
         if(match && match[0]) {
            context['weight'] = context['weight'] + parseInt(match[0]);
         }
      }

      if (dbWater) {
         const match = number_regex.exec(dbWater);
         if(match && match[0]) {
            context['water'] = context['water'] + parseInt(match[0]);
         }
      }


      $(".displayWeight").text(context['weight']);
      $(".displayWater").text(context['water']);
      $(".displayCalories").text(context['caloriesBurnt']);
   });
});

function newFunction() {
   $(".displayWeight").val("");
   $(".displayWater").val("");
   $(".displayCalories").val("");
}
// function (errorObject) {
//    console.log("The read failed: " + errorObject.code);
