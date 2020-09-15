    //You can edit ALL of the code here


    // creating a search-bar for the movies
    /////////////////////////////
    let counter = 0;
    function search_movie(fromList=false) {
    
      let input = document.getElementById('search-bar').value 
      input=input.toLowerCase(); 
      let movies = document.getElementsByClassName('features'); 
      let listOfSearchedMovies = [...movies].filter((episodes)=>episodes.innerHTML.toLowerCase().includes(input))
        console.log({movies:movies});
     for(episode of listOfSearchedMovies)
      console.log(listOfSearchedMovies);
          if (listOfSearchedMovies.length == 0) { 
             movies[0].style.display="none";
            
              document.getElementById("back-link").style.visibility = "visible"; 
          } 
          else { 
             movies[0].style.display="block"; 
            if(fromList){
             movies[0].style.maxWidth = "25%";
             movies[0].style.maxHeight = "25%";
              
            }else{
             movies[0].style.maxWidth = "22%";
            }
           movies[0].style.alignItems = "center";
             movies[0].style.display = "flex";
              counter++
                
              
              document.getElementById("back-link").style.visibility = "visible";             
          } 
          
      
      counter = listOfSearchedMovies.length;
      document.getElementById('charNum').textContent  = `Displaying ${counter} /${movies.length}`;  
    }
    

    // using the dropdown selector to go directly to the movie picked
    ////////////////////////////////////////

      let selection = document.querySelector("#select");
    selection.addEventListener("change",() =>{   
    let searchBar =  document.getElementById('search-bar');
    console.log((selection.options[selection.selectedIndex].text).split("-"));
      searchBar.value = selection.options[selection.selectedIndex].text.split(" - ")[1]; 
      search_movie(true);
      document.getElementById("back-link").style.visibility = "visible "; 
      
    });
    // get allShows
    ///////////////////

    // getting allMovies
    ///////////////// 

    const  makePageForMovies = (movieList) => {
      
      const rootElem = document.getElementById("root");
    // loop through the array of movies
    for(let i = 0; i < movieList.length; i++){
      // creating a new div for every movie
      const newDiv = document.createElement("div");
      // giving a className to the new div
      newDiv.className = "features";
      
      rootElem.appendChild(newDiv);
      newDiv.innerHTML= `<h1 id="movieListName">${movieList[i].name}</h1> 
      <div id = "moviePage">
      <img src="${movieList[i].image? movieList[i].image.medium: ""}" alt="No Image Found">
      <div id ="summary"><p>${movieList[i].summary}</p></div>
      <ul><li>Rating: ${movieList[i].rating.average}</li>
      <li>Status: ${movieList[i].status}</li>
      <li>Genre: ${movieList[i].genres.map((genre)=>genre)}  </li>
      <li>Runtime: ${movieList[i].runtime}</li></ul>
      </div>`;
      newDiv.style.backgroundColor = "white";
      newDiv.style.display = "table";
      newDiv.style.justifyContent = "space-around";
      newDiv.style.flexWrap = "wrap";
      newDiv.style.maxWidth = "80%";
      newDiv.style.margin = "10px";
      document.getElementById("back-link").style.visibility = "visible";
      
      newDiv.addEventListener("click", ()=> getEpisodes(movieList[i].id))
    }
      // counter++;
      document.getElementById('charNum').textContent  = `Displaying ${movieList.length} / ${movieList.length}`
     

    }
    function setup() {
    
      let allTheMovies = getAllShows();
      let movieChoice = document.getElementById("select2");
      for(let i = 0; i < allTheMovies.length; i ++){
        let movieOptions = document.createElement("option");
        movieOptions.innerHTML = 
        `
        <h1 class="movie-name">${allTheMovies[i].name}</h1>
          <a href="https://api.tvmaze.com/shows/${allTheMovies[i].id}/episodes"></a>
        `
        movieOptions.value = allTheMovies[i].id
       
        movieChoice.appendChild(movieOptions)
      
        movieChoice.style.width = "150px"; 
        // getEpisodes(allTheMovies[i].id)
        // 
      }
      document.getElementById("select").style.visibility = "hidden"
      makePageForMovies(allTheMovies);
      }
      
    
    function getEpisodes(showID){
    let rootElem = document.getElementById("root");
    document.body.removeChild(rootElem);
    rootElem = document.createElement("div");
    rootElem.id = "root";
  
    let episodeSelector = document.getElementById("select")
    episodeSelector.style.visibility = "visible";
    episodeSelector.querySelectorAll("option").forEach((item, i )=> i ? episodeSelector.removeChild(item):NaN)
    document.body.appendChild(rootElem);

      fetch(`https://api.tvmaze.com/shows/${showID}/episodes`).then(function(response){
        return response.json();
      }).then(allEpisodes =>  makePageForEpisodes(allEpisodes)
      ).catch(error => console.log(error))
      
    }

    //  getting episodeList
    //////////////////

    document.getElementById("select2").addEventListener("change", (event)=>
    {
      console.log(event.target.value);
      getEpisodes(event.target.value)
      }
      );

    function makePageForEpisodes(episodeList) {

      const rootElem = document.getElementById("root");
    // loop through the array of movies
    for(let i = 0; i < episodeList.length; i++){
      // creating a new div for every movie
      const newDiv = document.createElement("div");
      // giving a className to the new div
      newDiv.className = "features";
      rootElem.appendChild(newDiv);
      let option = document.createElement("option");
        option.text = `S${episodeList[i].season>9?episodeList[i].season: "0" +episodeList[i].season} 
        E${episodeList[i].number>9?episodeList[i].number: "0" + episodeList[i].number} - ${episodeList[i].name}`;
        option.value = i;
        document.getElementById("select").appendChild(option);
      newDiv.innerHTML= `<p id="header">${episodeList[i].name} - S${episodeList[i].season>9?episodeList[i].season: "0" +episodeList[i].season} 
      E${episodeList[i].number>9?episodeList[i].number: "0" + episodeList[i].number}</p>
    <p><img src="${episodeList[i].image.medium}" alt="">
      ${episodeList[i].summary>9?episodeList[i].summary>9:episodeList[i].summary}</p>`;
      document.getElementById("back-link").style.visibility = "visible";
      // counter++;
      document.getElementById('charNum').textContent  = `Displaying ${episodeList.length} / ${episodeList.length}`
      
    }

    }
    window.onload = setup;

    // A link to the original data
    ////////////////////
    function originalLink(e) { 
                  
      // Create anchor element. 
      let a = document.createElement('a');   
        
      // Set the href property. 
      a.href =window.open('https://www.TvMaze.com', '_blank');  

        
      // Append the anchor element to the body. 
      document.body.appendChild(a); 
    } 


