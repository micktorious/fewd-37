// This is what the data returning from IMDB will look like:
var sampleResult = {
  "Search": [
    {
      "Title": "Cool Runnings",
      "Type": "movie",
      "Year": "1993",
      "imdbID": "tt0106611"
    }
  ]
}

// Attach an event listener to the form submit (using jQuery)
$("#movie-search-form").submit(formSubmitted);

// Handle the form submission: go to OMDB and get results
function formSubmitted(event) {
  event.preventDefault();
  var url = "http://omdbapi.com/?s=" + $("#query").val();
  $.get(url, resultsReceived);
}

function resultsReceived(results) {
  $("#movies").empty();
  // Try putting a debugger here and inspecting the results argument
  // The array of movies lives inside results["Search"]
  // See the sampleResult above for an example

  for (var i = 0; i < results["Search"].length; i++) {
    var $movieList = $("#movies");

    // create the list item
    var $movie = $("<li>").attr("class", "movie").appendTo($movieList);

    // add the movie Poster
    var $moviePoster = $("<img>").attr("src", results["Search"][i]["Poster"]).attr("class", "movie-poster").appendTo($movie);

    // add the movie title
    var $movieTitleDiv = $("<div>").appendTo($movie).attr("class", "movie-title");
    var $movieTitle = $("<a>").attr("href", "http://www.imdb.com/title/" + results["Search"][i]["imdbID"]).text(results["Search"][i]["Title"]).attr("class", "movie-title").appendTo($movieTitleDiv);

    // add the release date
    var $releaseDate = $("<p>").attr("class", "movie-release-date").text(results["Search"][i]["Year"]).appendTo($movieTitleDiv);

  }

  document.getElementById("movie-search-form").reset();



  // Access the array of movies:
  // results["Search"]

  // Access the first movie title
  // results["Search"][0]["Title"]
}
