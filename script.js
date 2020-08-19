//You can edit ALL of the code here


function search_movie() { 
  let input = document.getElementById('searchbar').value 
  input=input.toLowerCase(); 
  let x = document.getElementsByClassName('features'); 
    
  for (i = 0; i < x.length; i++) {  
      if (!x[i].innerHTML.toLowerCase().includes(input)) { 
          x[i].style.display="none"; 
      } 
      else { 
          x[i].style.display="list-item";                  
      } 
  } 
}

function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
} 

function makePageForEpisodes(episodeList) {
const rootElem = document.getElementById("root");

for(let i = 0; i < episodeList.length; i++){
  const newDiv = document.createElement("div");
  newDiv.className = "features";
  rootElem.appendChild(newDiv);
  newDiv.innerHTML= `${episodeList[i].name} - S${episodeList[i].season>9?episodeList[i].season: "0" +episodeList[i].season} 
  E${episodeList[i].number>9?episodeList[i].number: "0" + episodeList[i].number}
  <img src="${episodeList[i].image.medium}" alt="">
  ${episodeList[i].summary>9?episodeList[i].summary>9:episodeList[i].summary}`;
 
}


}
window.onload = setup;


function GFG_Fun() { 
                  
  // Create anchor element. 
  var a = document.createElement('a');  
    
  // Create the text node for anchor element. 
  var link = document.createTextNode("Tv maze Link"); 
    
  // Append the text node to anchor element. 
  a.appendChild(link);  
    
  // Set the title. 
  a.title = "Tv maze Link";  
    
  // Set the href property. 
  a.href = "https://www.tvmaze.com/";  
    
  // Append the anchor element to the body. 
  document.body.appendChild(a);  
} 
