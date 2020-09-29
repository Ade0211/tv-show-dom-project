//You can edit ALL of the code here
// Movie Set Up
////////////////

function setup() {
  let allTheMovies = getAllShows().filter((item) => item.id != 1127);
  allTheMovies.sort((a, b) => {
    if (a.name.toLowerCase() > b.name.toLowerCase()) {
      return 1;
    } else if (a.name.toLowerCase() < b.name.toLowerCase()) {
      return -1;
    } else {
      return 0;
    }
  });
  let movieChoice = document.getElementById("select2");
  for (let i = 0; i < allTheMovies.length; i++) {
    let movieOptions = document.createElement("option");
    movieOptions.innerHTML = `
              <h1 class="movie-name">${allTheMovies[i].name}</h1>
                <a href="https://api.tvmaze.com/shows/${allTheMovies[i].id}/episodes"></a>
              `;
    movieOptions.value = allTheMovies[i].id;

    movieChoice.appendChild(movieOptions);

    movieChoice.style.width = "150px";
  }
  document.getElementById("select").style.visibility = "hidden";
  makePageForMovies(allTheMovies);
}

// get allShows
///////////////////

const makePageForMovies = (movieList) => {
  const rootElem = document.getElementById("root");
    let SeasonSelector = document.getElementById('select-season');
  let seasonOptions = SeasonSelector.querySelectorAll("option");

  seasonOptions.forEach((item, ind) => ind ? SeasonSelector.removeChild(item):NaN);
  // loop through the array of movies
  for (let i = 0; i < movieList.length; i++) {
    // creating a new div for every movie
    const movieDiv = document.createElement("div");

    let cast = "";
    // giving a className to the new div
    movieDiv.className = "PageForMovies";
    rootElem.appendChild(movieDiv);
    let title = document.createElement("h1");
    title.innerText = movieList[i].name;
    title.style.cursor = "pointer";

    fetch(`http://api.tvmaze.com/shows/${movieList[i].id}?embed=cast`)
      .then((response) => response.json())
      .then((data) => {
        data._embedded.cast
          ? data._embedded.cast.forEach(
              (person) => (cast += person.person.name + ", ")
            )
          : "";

        let char_limit = 50;
        if (cast.length < char_limit) {
          cast = "<div> " + cast + "</div>";
        } else
          cast =
            "<div>" +
            cast.substr(0, char_limit) +
            '<span class="long-text">' +
            cast.substr(char_limit) +
            '</span><span class="text-dots">...</span><span class="show-more-button" data-more="0">Read More</span></div>';
        // console.log(cast)
        movieDiv.innerHTML = ` 
              <div id = "moviePage">
              <img id="MovieImage" src="${
                movieList[i].image ? movieList[i].image.medium : ""
              }" alt="No Image Found">
              <div id ="summary"><p>${movieList[i].summary}</p></div>
              <div id="movieType">
              <ul><li>Rating: ${movieList[i].rating.average}</li>
              <li>Status: ${movieList[i].status}</li>
              <li>Genre: ${movieList[i].genres.map((genre) => genre)}  </li>
              <li>Runtime: ${movieList[i].runtime}</li>
              <li>Cast: ${cast ? cast: ""}</li></ul>
              </div>
              </div>`;
        movieDiv.insertBefore(title, movieDiv.firstChild);

        let dots = movieDiv.querySelector(".text-dots");
        let longText = movieDiv.querySelector(".long-text");
        longText ? (longText.style.display = "none") : NaN;
        let showMoreButton = movieDiv.querySelector(".show-more-button");

        showMoreButton
          ? showMoreButton.addEventListener("click", function () {
              // If text is shown less, then show complete
              if (this.getAttribute("data-more") == 0) {
                this.setAttribute("data-more", 1);
                this.style.display = "block";
                this.innerHTML = "Read Less";

                dots.style.display = "none";
                longText.style.display = "inline";
              }
              // If text is shown complete, then show less
              else if (this.getAttribute("data-more") == 1) {
                this.setAttribute("data-more", 0);
                this.style.display = "inline";
                this.innerHTML = "Read More";

                dots.style.display = "inline";
                longText.style.display = "none";
              }
            })
          : NaN;
      })
      .catch((error) => console.log(error));
    movieDiv.style.backgroundColor = "white";
    rootElem.style.display = "flex";
    rootElem.style.flexDirection = "column";
    rootElem.style.alignItems = "center";
    movieDiv.style.flexWrap = "wrap";
    movieDiv.style.borderRadius = "5px";
    movieDiv.style.boxShadow = "15px";
    movieDiv.style.width = "80%";
    movieDiv.style.margin = "10px";
    document.getElementById("back-link").style.visibility = "visible";
    title.addEventListener("click", () => getEpisodes(movieList[i].id));
  }
  document.getElementById(
    "charNum"
  ).textContent = `found ${movieList.length} shows`;
};


// get Seasons
///////////////////
function makePageForSeasons(movieSeason) {
  const rootElem = document.getElementById("root");
  let SeasonSelector = document.getElementById('select-season');
  let seasonOptions = SeasonSelector.querySelectorAll("option");
  seasonOptions.forEach((item, ind) => ind ? SeasonSelector.removeChild(item):NaN);

  // loop through the array of movies
  for (let i = 0; i < movieSeason.length; i++) {
    let message = movieSeason[i].summary;
    let image = movieSeason[i].image.medium;
    if (message) {
      let char_limit = 100;
      console.log(message.length);
      if (message.length < char_limit) {
        message = "<div> " + message + "</div>";
        console.log(message);
      } else
        message =
          "<div>" +
          message.substr(0, char_limit) +
          '<span class="long-text">' +
          message.substr(char_limit) +
          '</span><span class="text-dots">...</span><span class="show-more-button" data-more="0">Read More</span></div>';
    } else {
      message = "";
    }
    let SeasonDiv = document.createElement("div");
    SeasonDiv.className = "seasons";

    SeasonDiv.innerHTML = ` 
                <div id = "moviePage">
                <div class ="season"><p>Season ${
                  movieSeason[i].number
                }</p></div>
                <img id="MovieImage" src="${
                  movieSeason[i].image ? image : ""
                }" alt="No Image Found">
                <div id ="summary"><p>${message}</p></div>
                </div>`;
    rootElem.appendChild(SeasonDiv);
    //////////////////
    let dots = SeasonDiv.querySelector(".text-dots");
    let longText = SeasonDiv.querySelector(".long-text");
    longText ? (longText.style.display = "none") : NaN;
    let showMoreButton = SeasonDiv.querySelector(".show-more-button");

    showMoreButton
      ? showMoreButton.addEventListener("click", function () {
          // If text is shown less, then show complete
          if (this.getAttribute("data-more") == 0) {
            this.setAttribute("data-more", 1);
            this.style.display = "block";
            this.innerHTML = "Read Less";

            dots.style.display = "none";
            longText.style.display = "inline";
          }
          // If text is shown complete, then show less
          else if (this.getAttribute("data-more") == 1) {
            this.setAttribute("data-more", 0);
            this.style.display = "inline";
            this.innerHTML = "Read More";
            dots.style.display = "inline";
            longText.style.display = "none";
          }
        })
      : NaN;
    ////////////////
    movieSeason[i].image?  document.getElementById("select-season").addEventListener("change", (event) => {
      const rootElem = document.getElementById("root");
      let seasons = rootElem.querySelectorAll(".seasons");
      seasons.forEach((item, i) => (i+1) !=event.target.value ? item.style.display = "none": item.style.display = "");
    }): " ";
    SeasonSelector = document.getElementById('select-season');
    var opt = document.createElement('option');
    opt.value = movieSeason[i].number;
    opt.innerHTML = `<p>Season ${movieSeason[i].number}</p>`;
    SeasonSelector.appendChild(opt);
    SeasonDiv.addEventListener("click", function (event) {
      fetch(`https://api.tvmaze.com/shows/${movieSeason[i].id}/episodes`)
        .then(function (response) {
          return response.json();
        })
        .then((allEpisodes) => {
          console.log(allEpisodes);
          makePageForEpisodes(
            allEpisodes.filter((item) => item.season === movieSeason[i].number)
          );
        })
        .catch((error) => console.log(error));
    });
  }
}

/////Episodes///////////

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  let seasons = rootElem.querySelectorAll(".seasons");
  seasons.forEach((item) => rootElem.removeChild(item));
  // loop through the array of movies
  for (let i = 0; i < episodeList.length; i++) {
    let message = episodeList[i].summary;
    if (message) {
      let char_limit = 100;
      if (message.length < char_limit) {
        message = "<div> " + message + "</div>";
        console.log(message);
      } else
        message =
          "<div>" +
          message.substr(0, char_limit) +
          '<span class="long-text">' +
          message.substr(char_limit) +
          '</span><span class="text-dots">...</span><span class="show-more-button" data-more="0">Read More</span></div>';
    } else {
      message = "";
    }
    let season = episodeList[i].season;
    let episodeNumber = episodeList[i].number;
    let image = episodeList[i].image;
    // creating a new div for every movie
    const movieDiv = document.createElement("div");
    // giving a className to the movie div
    movieDiv.className = "features";
    rootElem.appendChild(movieDiv);
    let option = document.createElement("option");
    option.text = `S${season > 9 ? season : "0" + season} 
              E${episodeNumber > 9 ? episodeNumber : "0" + episodeNumber} - ${
      episodeList[i].name
    }`;
    option.value = i;
    document.getElementById("select").appendChild(option);
    image
      ? (movieDiv.innerHTML = `<p id="header">${episodeList[i].name} - S${
          season > 9 ? season : "0" + season
        } 
        E${episodeNumber > 9 ? episodeNumber : "0" + episodeNumber}</p>
      <p><img src="${image.medium}" alt="">
      ${message}
      </p>`)
      : (movieDiv.innerHTML = `<p id="header">${episodeList[i].name} - S${
          season > 9 ? season : "0" + season
        } 
        E${episodeNumber > 9 ? episodeNumber : "0" + episodeNumber}</p>
      <p>
      ${message}
      </p>`);


    let dots = movieDiv.querySelector(".text-dots");
    let longText = movieDiv.querySelector(".long-text");
    longText ? (longText.style.display = "none") : NaN;
    let showMoreButton = movieDiv.querySelector(".show-more-button");

    showMoreButton
      ? showMoreButton.addEventListener("click", function () {
          // If text is shown less, then show complete
          if (this.getAttribute("data-more") == 0) {
            this.setAttribute("data-more", 1);
            this.style.display = "block";
            this.innerHTML = "Read Less";

            dots.style.display = "none";
            longText.style.display = "inline";
          }
          // If text is shown complete, then show less
          else if (this.getAttribute("data-more") == 1) {
            this.setAttribute("data-more", 0);
            this.style.display = "inline";
            this.innerHTML = "Read More";

            dots.style.display = "inline";
            longText.style.display = "none";
          }
        })
      : NaN;
    document.getElementById("back-link").style.visibility = "visible";
    // counter++;
    document.getElementById(
      "charNum"
    ).textContent = `Displaying ${episodeList.length} / ${episodeList.length}`;
  }
}

//Episodes ID///
function getEpisodes(showID) {
  let rootElem = document.getElementById("root");
  document.body.removeChild(rootElem);
  rootElem = document.createElement("div");
  rootElem.id = "root";
  let episodeSelector = document.getElementById("select");
  episodeSelector.style.visibility = "visible";
  episodeSelector
    .querySelectorAll("option")
    .forEach((item, i) => (i ? episodeSelector.removeChild(item) : NaN));
  document.body.appendChild(rootElem);

  fetch(`https://api.tvmaze.com/shows/${showID}/seasons`)
    .then(function (response) {
      return response.json();
    })
    .then((allSeasons) => makePageForSeasons(allSeasons))
    .catch((err) => {
      console.log(err);
      fetch(`https://api.tvmaze.com/shows/${showID}/episodes`)
        .then(function (response) {
          return response.json();
        })
        .then((allEpisodes) => {
          console.log(allEpisodes);
          makePageForEpisodes(allEpisodes);
        })
        .catch((error) => console.log(error));
    });
}

/////Movie Search/////
function search_Movies(moviePage, episodes) {
  let counter = 0;
  let input = document.getElementById("search-bar").value;
  input = input.toLowerCase();
  let movies = document.querySelectorAll(".features");

  let PageForMovies = document.querySelectorAll(".PageForMovies");

  PageForMovies.forEach((moviePage) => {
    if (moviePage.innerHTML.toLowerCase().includes(input)) {
      counter++;
      moviePage.style.display = "";
    } else {
      moviePage.style.display = "none";
    }
  });

  movies.forEach((episode) => {
    if (episode.innerHTML.toLowerCase().includes(input)) {
      counter++;
      episode.style.display = "";
    } else {
      episode.style.display = "none";
    }
  });
  if (PageForMovies.length) {
    document.getElementById("charNum").textContent = `found ${counter} shows`;
  } else {
    document.getElementById(
      "charNum"
    ).textContent = `Displaying ${counter} /${movies.length}`;
  }
}

// dropdown selector Eventlistener for Episodes //
////////////////////////////////////////
let selection = document.querySelector("#select");
selection.addEventListener("change", () => {
  let searchBar = document.getElementById("search-bar");
  console.log(selection.options[selection.selectedIndex].text.split("-"));
  searchBar.value = selection.options[selection.selectedIndex].text.split(
    " - "
  )[1];
  search_Movies();
  document.getElementById("back-link").style.visibility = "visible ";
});


// episodeList EventListeners///
//////////////////
document.getElementById("select2").addEventListener("change", (event) => {
  console.log(event.target.value);
  getEpisodes(event.target.value);
});


window.onload = setup;

// A link to the original data
////////////////////
function originalLink(e) {
  // Create anchor element.
  let a = document.createElement("a");

  // Set the href property.
  a.href = window.open("https://www.TvMaze.com", "_blank");

  // Append the anchor element to the body.
  document.body.appendChild(a);
}
