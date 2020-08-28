//You can edit ALL of the code here

// creating a search-bar for the movies
/////////////////////////////
function search_movie(fromList=false) {
let counter = 0; 
  let input = document.getElementById('search-bar').value 
  input=input.toLowerCase(); 
  let movies = document.getElementsByClassName('features'); 
  for (i = 0; i < movies.length; i++) {  
  
      if (!movies[i].innerHTML.toLowerCase().includes(input)) { 
          movies[i].style.display="none";
         
          document.getElementById("back-link").style.visibility = "visible"; 
      } 
      else { 
          movies[i].style.display="block"; 
         if(fromList){
          movies[i].style.maxWidth = "30%";
          movies[i].style.maxHeight = "30%";
          
         }else{
           movies[i].style.maxWidth = "22%";
         }
         movies[i].style.alignItems = "center";
          movies[i].style.display = "flex";
          counter++;  
          document.getElementById("back-link").style.visibility = "hidden";              
      }   
  } 
  document.getElementById('charNum').innerHTML = counter;
}

// creating a dropdown select placeholder
///////////////////////////////////////

  const allEpisodes = getAllEpisodes();
  for(let i = 0;i<allEpisodes.length;i++){
    let option = document.createElement("option");
    option.text = `S${allEpisodes[i].season>9?allEpisodes[i].season: "0" +allEpisodes[i].season} 
    E${allEpisodes[i].number>9?allEpisodes[i].number: "0" + allEpisodes[i].number} - ${allEpisodes[i].name}`;
    option.value = i;
    let select = document.getElementById("select");
    select.appendChild(option);
    document.getElementById("back-link").style.visibility = "hidden";
  }

// using the dropdown selector to go directly to the movie picked
////////////////////////////////////////

  let selection = document.querySelector("#select");
 selection.addEventListener("change",() =>{   
 let searchBar =  document.getElementById('search-bar');
 console.log((selection.options[selection.selectedIndex].text).split("-"));
  searchBar.value = selection.options[selection.selectedIndex].text.split(" - ")[1]; 
  search_movie(true);
  document.getElementById("back-link").style.visibility = "visible";  
});


// getting allEpisodes
/////////////////

function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
} 
//  getting episodeList
//////////////////
function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
// loop through the array of movies
for(let i = 0; i < episodeList.length; i++){
  // creating a new div for every movie
  const newDiv = document.createElement("div");
  // giving a className to the new div
  newDiv.className = "features";
  rootElem.appendChild(newDiv);
  newDiv.innerHTML= `<p id="header">${episodeList[i].name} - S${episodeList[i].season>9?episodeList[i].season: "0" +episodeList[i].season} 
  E${episodeList[i].number>9?episodeList[i].number: "0" + episodeList[i].number}</p>
 <p><img src="${episodeList[i].image.medium}" alt="">
  ${episodeList[i].summary>9?episodeList[i].summary>9:episodeList[i].summary}</p>`;
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

