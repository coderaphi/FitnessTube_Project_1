var fitnessArray = ["HIIT", "KICKBOXING", "PILATES", "CROSSFIT", "YOGA", " WEIGHT TRAINING", "SPINNING", "ZUMBA ", "CALASTHENICS"];
var channelIdArray = ["UCAxW1XT0iEJo0TYlRfn6rYQ","UCa9_TpiSkqYwcr35uh5N7Og","UCBINFWq52ShSgUFEoynfSwg","UCUSI-3qy0rx0b3f-thKqNcA","UCFKE7WVJfvaHW5q283SxchA","UCe0TLA0EsQbE-MjuHXevj2A","UCuTaETsuCOkJ0H_GAztWt0Q","UC4GTYUQEZSQ-28KNX7I0ngw","UCZIIRX8rkNjVpP-oLMHpeDw"]


function createButtons() {
   
   $("#workOut-name").empty();

   for (var i = 0; i < fitnessArray.length; i++) {

      var workoutName = fitnessArray[i];
      var channelId= channelIdArray[i];

      var buttonCreate = $(
         '<button/>',
         {
            class: "workoutTitle",
            'data-name': workoutName,
            'channelId': channelId,
            click: alertWorkoutName
         }
      );

      buttonCreate.text(workoutName);
   
      $("#workOut-name").append(buttonCreate);

   }

}



$( document ).ready(function() {
   createButtons();

//    var apiKey = 'AIzaSyCRKBaWuXHkfpm1NX2uT2AhcUievnGtH6A'
//    var playListID = 'LLqjwF8rxRsotnojGl4gM0Zw'
//    var url= 'https://www.googleapis.com/youtube/v3/playlistItems'


//    var options =  {
//       part:'snippet',
//       key:apiKey,
//       maxResults:20,
//       playListID


//    }

//    loadVids()

// function loadVids(){
//    $.getJSON (url,options,function(data) {


//       console.log(data)
//    })
// }






});


function alertWorkoutName() {

   $('.images').empty();

   var workOutName = $(this).attr("data-name");
   var channelIdStringForMyQuery= $(this).attr("channelId")

  

   var queryURL = "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&channelId="+channelIdStringForMyQuery+"&q=" + workOutName + "&type=video&key=AIzaSyCRKBaWuXHkfpm1NX2uT2AhcUievnGtH6A";

   console.log(queryURL);

   $.ajax({
      url: queryURL,
      method: "GET"
   }).then(function (response) {

      console.log(response)

      var dataResults = response.kind.items;

      for (var i = 0; i < dataResults.length; i++) {

         var imgData = dataResults[i];




         

      }

      function mainVideo() {


         $('#video').html (`

         <iframe width="1000" height="405" src="https://www.youtube.com/embed/KkeQJNtIDu8" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

         
         
         
         
         `)
      }

   });
};
