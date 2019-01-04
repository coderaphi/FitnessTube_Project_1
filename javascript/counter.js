// Initialize Firebase

newFunction();
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


// REGULAR EXPRESSION TO EXTRACT NUMBERS ONLY
const number_regex = /(\d+)/gm;

function getInt(val) {
   if (!val) {
      return 0;
   }
   const match = number_regex.exec(val);
   if (match && match[0]) {
      return parseInt(match[0]);
   }
   return 0;
}

$(document).ready(function () {

   // CREATE OBJECT "context" AS A PLACE HOLDER FOR TOTAL ACCUMULATING VALUES
   const context = {
      water: 0,
      caloriesBurnt: 0,
      stopWatch: 0
   };

   // CREATE ON CLICK EVENT FUNCTION FOR RECORD WATER INTAKE
   $("#button-addon-water").on("click", function (event) {

      event.preventDefault();
      var inputWater = $(".form-water").val();

      // CREATE OBJECT "fitnessTubeData", WHERE USER INPUT DATA ARE PROPERTY.VALUES OF THE OBJECT
      var fitnessTubeData = {
         waterIntake: inputWater,
         dateAdded: firebase.database.ServerValue.TIMESTAMP
      };

      // PUSH OBJECT "fitnessTubeDate" TO FIREBASE
      database.ref().push(fitnessTubeData, function (err) {

         if (!err) {
            context['water'] = context['water'] + getInt(inputWater);

            $(".displayWater").text(context['water']);
            $(".displayWaterInput").text(inputWater);
         }
      });
      // RESET DATA FIELDS ONCE THE "submit" BUTTON IS CLICKED
      $(".inputDataWater")[0].reset();
   });

   // +++++++++++++++++++++++++++++++++++++CALORIES+++++++++++++++++++++++++++++++++++++//
   // $('#button-SS').on('click', function (event) {
   //    event.preventDefault();
   // });


   // CREATE ON CLICK EVENT FUNCTION TO RECORD CALORIES BURNT
   $("#button-addon-calories").on("click", function (event) {

      event.preventDefault()
      var inputCalories = $(".form-calories").val()


      // CREATE OBJECT "fitnessTubeData", WHERE USER INPUT DATA ARE PROPERTY.VALUES OF THE OBJECT
      var fitnessTubeData = {
         caloriesBurnt: inputCalories,
         dateAdded: firebase.database.ServerValue.TIMESTAMP
      }
      // PUSH OBJECT "fitnessTubeDate" TO FIREBASE
      database.ref().push(fitnessTubeData, function (err) {

         if (!err) {
            context['caloriesBurnt'] = context['caloriesBurnt'] + getInt(inputCalories);

            $(".displayCalories").text(context['caloriesBurnt']);
            $(".displayCaloriesInput").text(inputCalories);
         }
      });

      // RESET DATA FIELDS ONCE THE "submit" BUTTON IS CLICKED
      $(".inputDataCalories")[0].reset();

   });
   // +++++++++++++++++++++++++++++++++++++CALORIES+++++++++++++++++++++++++++++++++++++//

   //+++++++++++++++++++++++++++++++++++++++++TIMER+++++++++++++++++++++++++++++++++++++//

   var counter;
   var secondCounter = 0;

   $(document).ready(function stopWatch() {
      $('#button-SS').on("click", function () {
         if (counter) {
            clearInterval(counter);
            console.log(secondCounter);
            // CREATE OBJECT "fitnessTubeData", WHERE USER INPUT DATA ARE PROPERTY.VALUES OF THE OBJECT
            var fitnessTubeData = {
               secondCounter: secondCounter,
               dateAdded: firebase.database.ServerValue.TIMESTAMP
            };
            // PUSH OBJECT "fitnessTubeDate" TO FIREBASE
            database.ref().push(fitnessTubeData, function (err) {

               console.log(secondCounter);

               if (!err) {
                  // context['stopWatch'] = context['stopWatch'] + secondCounter;

                  $(".displayTimeTotal").text(moment().hour(0).minute(0).second(context['stopWatch']).format('HH : mm : ss'));
                  // $(".displayTime").text(secondCounter);
                  displayTime();
                  secondCounter = 0;
                  counter = undefined;
               }
            });
            
         } else {
            counter = setInterval(displayTime, 1000);
         }

      });
   });
   function displayTime() {
      $('.displayTime').text(moment().hour(0).minute(0).second(secondCounter++).format('HH : mm : ss'));
   }
   //+++++++++++++++++++++++++++++++++++++++++TIMER+++++++++++++++++++++++++++++++++++++//

   database.ref().on("child_added", function (snapshot) {

      // STORE VALUES OF THE VARIOUS PROPERTIES OF "fitnessTubeData" OBJECT IN THE DATABASE
      var dbWater = getInt(snapshot.val().waterIntake);
      var dbCalories = getInt(snapshot.val().caloriesBurnt);
      var dbSecondCounter = snapshot.val().secondCounter;

      if (dbSecondCounter) {
         dbSecondCounter = parseInt(dbSecondCounter);
      } else {
         dbSecondCounter = 0;
      }

      this['caloriesBurnt'] = this['caloriesBurnt'] + dbCalories;
      this['water'] = this['water'] + dbWater;
      this['stopWatch'] = this['stopWatch'] + dbSecondCounter;

      $(".displayWater").text(this['water']);
      $(".displayCalories").text(this['caloriesBurnt']);
      $(".displayTimeTotal").text(moment().hour(0).minute(0).second(this['stopWatch']).format('HH : mm : ss'));
   }, (t) => console.log(t), context);
});

function newFunction() {
   $(".displayWater").val("");
   $(".displayCalories").val("");
}

