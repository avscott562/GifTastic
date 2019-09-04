//Declare variables
//list of comedians
var topics = ["Adam Sandler", "Amy Schumar", "Bernie Mac", "Bill Maher", "Carol Burnett", "Carrot Top", "Cedric The Entertainer", 
"Chevy Chase", "Chris Farley", "Chris Tucker", "Damon Wayans", "Eddie Murphy", "Ellen DeGeneres", "George Carlin", "Gilda Radner", 
"Howie Mandel", "Jerry Seinfeld", "Jim Carrey", "John Belushi", "John Leguizamo", "Leslie Jones", "Lucille Ball", "Kevin Hart", 
"Martin Lawrence", "Mike Epps", "Richard Pryor", "Robin Williams", "Sarah Silvermann", "Steve Harvey", "Steve Martin", "Whoopie Goldberg"];

//api key
var key = "GYHcoSDnNTboO0ZRaXgPLt7ixB2VEDWn";

//display buttons on screen
topics.forEach(buttons);

//function to create buttons
function buttons(comic) {
  var dataName = comic;
  var name = comic.split(' ');
  var dataSearch = name.join('+');
  var button = $('<button>').text(comic);
  button.addClass('btn btn-info m-2 comic');
  button.attr({
    'data-name': dataName,
    'data-search': dataSearch
  });
  $('#buttons').append(button);
}

//add click event to the buttons
$(".comic").on("click", function() {
  var alt = $(this).attr("data-name");

  //variable to hold api query
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + $(this).attr("data-search") + "&api_key=" + key + "&limit=10";

  //pulling data fron the api
  $.ajax({
    url: queryURL,
    method: "GET"
  })

    //after we get data from the api
    .then(function(response) {
        var images = response.data;
        console.log(images);

        //empty screen of any existing giphs
        $("#giphs").empty();

        for (i=0; i<images.length; i++) {
            
            //get image urls from the api response
            var imageUrl = images[i].images.original.url;
            var stillUrl = images[i].images.original_still.url;

            //create div for rating
            var rating = $("<div>");

            //check if rating exists
            if (images[i].rating) {
              //if rating exists
              rating.text(images[i].rating);
            } else {
              //if no rating exists
              rating.text("No Rating");
            }

            //creating wrapper div
            var wrapper = $("<div>");

            //add class info to wrapper for styling
            wrapper.addClass("gif-wrapper mr-5 mb-5");
            
            //creating an image tag
            var comicImage = $("<img>");

            //adding image urls from api, still, animate and state attributes
            comicImage.attr({
              src: stillUrl,
              "data-still": stillUrl,
              "data-animate": imageUrl,
              "data-state": "still",
              alt: alt
            });

            //add comic-image class to image
            comicImage.addClass("comic-image");

            //add image and rating to wrapper
            wrapper.append(comicImage, rating);

            //dispaying image and rating on screen
            $("#giphs").append(wrapper);
        }
    });
});

//add click event to each gif
$(document).on("click", ".comic-image", function() {
  //get current state of gif
  var state = $(this).attr("data-state");

  if (state === "still") {  
    //animate gif if state is still
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
  } else {
    //pause gif if state is animate
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  }
});