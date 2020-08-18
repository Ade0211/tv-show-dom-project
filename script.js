//You can edit ALL of the code here

function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
} 

function makePageForEpisodes(episodeList) {
 
  const rootElem = document.getElementById("root");
  // rootElem.textContent = `Got ${episodeList.length} episode(s)`;
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