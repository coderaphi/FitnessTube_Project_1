





var fitnessArray = ["HIIT", "KICKBOXING", "PILATES", "CROSSFIT", "YOGA", " WEIGHT TRAINING", "SPINNING", "ZUMBA ", "CALASTHENICS"];
var channelIdArray = ["UCAxW1XT0iEJo0TYlRfn6rYQ", "UCa9_TpiSkqYwcr35uh5N7Og", "UCBINFWq52ShSgUFEoynfSwg", "UCUSI-3qy0rx0b3f-thKqNcA", "UCFKE7WVJfvaHW5q283SxchA", "UCe0TLA0EsQbE-MjuHXevj2A", "UCuTaETsuCOkJ0H_GAztWt0Q", "UC4GTYUQEZSQ-28KNX7I0ngw", "UCZIIRX8rkNjVpP-oLMHpeDw"]





function createButtons() {

   $("#workOut-name").empty();

   for (var i = 0; i < fitnessArray.length; i++) {

      var workoutName = fitnessArray[i];
      var channelId = channelIdArray[i];

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



$(document).ready(function () {
   createButtons()

   //https://medium.com/@feldman238/the-quickest-and-easiest-preloader-ever-9efa975e1a50   having issues getting a preloader
   $('.preloader').fadeOut('slow');

   //-----------------------------------------------------------------------------------


   var Key = 'AIzaSyCRKBaWuXHkfpm1NX2uT2AhcUievnGtH6A'
   var playlistId = 'LLqjwF8rxRsotnojGl4gM0Zw'
   var url = 'https://www.googleapis.com/youtube/v3/playlistItems'



   $("#workOut-name").on("click", function () {
      $("#workOut-name").fadeOut(1000)
      $("article").fadeIn(1000)
      $("#return").fadeIn(2000)
     


   })


   $("#return").on("click", function () {
      $("#workOut-name").fadeIn(1000)
      $("#return").fadeOut(2000)
      $("article").fadeOut(2000)

   })





   var options = {
      part: 'snippet',
      key: Key,
      maxResults: 12,
      playlistId: playlistId




   }



   loadVids()



   function loadVids() {
      $.getJSON(url, options, function (info) {

         var id = info.items[0].snippet.resourceId.videoId

         mainVid(id);

      });
   }

});

function mainVid(id) {

   $('#video').html(`


<iframe width="1000" height="405" src="https://www.youtube.com/embed/${id}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
allowfullscreen></iframe>

`)
}


function alertWorkoutName() {



   var workOutName = $(this).attr("data-name");
   var channelIdStringForMyQuery = $(this).attr("channelId");

   console.log(channelIdStringForMyQuery);


   var queryURL = "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=12&channelId=" + channelIdStringForMyQuery + "&q=" + workOutName + "&type=video&key=AIzaSyCRKBaWuXHkfpm1NX2uT2AhcUievnGtH6A";

   console.log(queryURL);

   $.ajax({
      url: queryURL,
      method: "GET"
   }).then(function (response) {

      // var dataResults = response.items[0].snippet.resourceId.videoId

      console.log(response)

      var list = [];

      $('main').html('');

      for (var i = 0; i < response.items.length; i++) {

         var item = response.items[i];

         list.push(`
            <article class="clickable" onClick="mainVid('${item.id.videoId}');">
               <img src="${item.snippet.thumbnails.medium.url}" alt="" class="thumb">
               <div class="details">
                  <h4>${item.snippet.title}</h4>
                  <p class="details_text">${item.snippet.description.substring(0, 100)} ${item.snippet.description.length >= 100 ? '...' : ''}</p>
               </div>      
            
            </article>
         `);

      }

      $("main").html(list.join(""));



   });
};
