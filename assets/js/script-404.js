/* jshint esversion: 11 */

// Add event listeners for tiles once Dom content is loaded
document.addEventListener("DOMContentLoaded", function() {
    //create error message in 404 page
    errorMessage();
});

//Add eventlistener to dynamically change the font size of the tile numbers when screen width changes
window.addEventListener("resize", tileFontSize);

//generate and display error message on 404 page
function errorMessage(){
    let error = document.getElementById("error-message");
    let errorHTML = "";
    let errorString = `Error404Oops this page does not exist To return to game click `;
    let gridSize = 8;
    for (let i = 0; i < errorString.length; i++) {
      errorHTML += `<div class="tile-style"><p>${errorString[i]}</p></div>`;
    }
    errorHTML += '<div class="tile-style"><p><a href="index.html"><i class="fa-solid fa-puzzle-piece" title="Go to game"></i></a></p></div>';
    document.getElementById("error-message").innerHTML = errorHTML;
    //set styles for grid
    //calculate column-width depending on gridSize as a percentage
    error.style.gridTemplateColumns = `${100 / gridSize}%`.repeat(gridSize);
    tileFontSize();
}

//calculate tile number font size from tile width
function tileFontSize() {
  //get computed style width of tile (div containing the number)
  let tileStyleWidth = getComputedStyle(document.getElementsByClassName("tile-style")[0]).width;
  //get a string "number" + "px", remove "px"
  tileStyleWidth.slice(-2);
  let tileStyleWidthInt = parseInt(tileStyleWidth);
  //set font size to percentage of tile width for each element
  let styledTiles = document.getElementsByClassName("tile-style");
  for (let styledTile of styledTiles) {
    styledTile.style.fontSize = `${tileStyleWidthInt * 0.5}px`;
  }
}