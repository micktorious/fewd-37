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

  for (var i = 0; i < results.Search.length; i++) {
    var movieList = document.getElementById("movies");

    // create the list item
    var movie = document.createElement("li")
    movie.setAttribute("class", "movie");
    movieList.appendChild(movie);

    // add the movie Poster
    var moviePoster = document.createElement("img")
    moviePoster.src = results["Search"][i]["Poster"];
    moviePoster.setAttribute("class", "movie-poster");
    movie.appendChild(moviePoster);

    // add the movie title
    var movieTitleDiv = document.createElement("div")
    movie.appendChild(movieTitleDiv);
    movieTitleDiv.setAttribute("class", "movie-title");
    var movieTitle = document.createElement("a");
    movieTitle.setAttribute("href", results["Search"][i]["imdbID"]);
    movieTitle.textContent = results["Search"][i]["Title"]
    movieTitle.setAttribute("class", "movie-title")
    movieTitleDiv.appendChild(movieTitle);

    // add the release date
    var releaseDate = document.createElement("p")
    releaseDate.setAttribute("class", "movie-release-date");
    releaseDate.textContent = results["Search"][i]["Year"];
    movieTitleDiv.appendChild(releaseDate);

  }

  document.getElementById("movie-search-form").reset();



  // Access the array of movies:
  // results["Search"]

  // Access the first movie title
  // results["Search"][0]["Title"]
}
