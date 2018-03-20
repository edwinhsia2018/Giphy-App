//Initial array of giphys

var topics = ["aragorn", "frodo", "legolas", "gimli", "boromir"];

renderButtons();

$(document).on("click", ".giphy-btn", displayGiphy);

function displayGiphy() {
  var giphy = $(this).attr("data-name");
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + giphy + "&api_key=dc6zaTOxFJmzC&limit=10";

  //Ajax call to query giphy
  $.ajax({
    url: queryURL,
    method: "GET"
  })
  .then(function(response) {
      var results = response.data;
      for (var i=0; i < results.length; i++) {
          var gifDiv = $("<div class='giphy'>");
          var rating = results[i].rating;
          var p = $("<p>").text("Rating: " + rating);
          var giphyImage = $("<img>","<data-still>","<data-animate>","<data-state='still'>","<class>");
          giphyImage.attr("src", results[i].images.fixed_height_still.url);
          giphyImage.attr("data-still", results[i].images.fixed_height_still.url);
          giphyImage.attr("data-animate", results[i].images.fixed_height.url);
          giphyImage.attr("class", "gif");
      
          //Appending the results to the HTML.
          gifDiv.append(p);
          gifDiv.append(giphyImage);
          $("#giphys-appear-here").prepend(gifDiv);
      }
    });
}
//Function for creating buttons from the search
function renderButtons() {
  $("#giphy-buttons").empty();
  for (var i = 0; i < topics.length; i++) {
    var a = $("<button>");
    a.addClass("giphy-btn");
    a.attr("data-name", topics[i]);
    a.text(topics[i]);
    $("#giphy-buttons").append(a);
  }
}
//Adding the search text to the button created
$(document).on("click", "#add-giphy", function(event) {
  event.preventDefault();
  var giphyInput = $("#giphy-input").val().trim();
  topics.push(giphyInput);
  renderButtons();
});