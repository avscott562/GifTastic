//Declare variables
//list of comedians
var topics = ["Adam Sandler", "Amy Schumar", "Bernie Mac", "Bill Maher", "Carol Burnett", "Carrot Top", "Cedric The Entertainer", 
"Chevy Chase", "Chris Farley", "Chris Tucker", "Damon Wayans", "Dick Gregory", "Eddie Murphy", "Ellen DeGeneres", "George Carlin", 
"Gilda Radner", "Howie Mandel", "Jerry Seinfeld", "Jim Carrey", "John Belushi", "John Leguizamo", "Lucille Ball", "Kevin Hart", 
"Martin Lawrence", "Mike Epps", "Moms Mabley", "Richard Pryor", "Robin Williams", "Steve Harvey", "Whoopie Goldberg"];

//api key
var key = "GYHcoSDnNTboO0ZRaXgPLt7ixB2VEDWn";

//function to create buttons
function buttons(comic) {
    var name = comic.split(' ');
    var dataName = name.join('+');
    var button = $('<button>').text(comic);
    button.addClass('btn btn-info m-2 comic');
    button.attr('data-name', dataName);
    $('#buttons').append(button);
}

//display buttons on screen
topics.forEach(buttons);

  //add click event to the button
  $(".comic").on("click", function() {

    //variable to hold api query
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + $(this).attr("data-name") + "&api_key=" + key + "&limit=15";

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
              
              //get image url from the api response
              var imageUrl = images[i].embed_url;

              //create div for rating
              var rating = $("<div>");
              rating.text(images[i].rating);

              //creating wrapper div
              var wrapper = $("<div>");
              wrapper.addClass("gif-wrapper m-1");
              wrapper.append(rating);
              
              //creating an image tag
              var comicImage = $("<img>");

              //adding image url from api
              comicImage.attr("src", imageUrl);
              comicImage.addClass("comic-image");
              comicImage.attr("alt", $(this)[0].innerText);
              wrapper.append(comicImage);

              //dispaying image on screen
              $("#giphs").append(wrapper);
          }
      });
  });
