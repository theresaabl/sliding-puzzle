/* jshint esversion: 11 */

//Event listeners

// Add event listener for Dom content loaded
document.addEventListener("DOMContentLoaded", function() {
    //create error message in 404 page
    errorMessage();
});

//Add event listener to dynamically change the font size of the tile numbers when screen width changes
window.addEventListener("resize", tileFontSize);

/**
 * generate and display error message on 404 page
 */
function errorMessage(){
  //get element which will contain error message
  let error = document.getElementById("error-message");
  // initialise its HTML
  let errorHTML = "";
  // set the Error message as a string
  let errorString = `Error404Oops this page does not exist To return to game click `;
  let gridSize = 8; //grid size needed to contain error message
  // loop through the tiles and assign one letter per tile
  for (let i = 0; i < errorString.length; i++) {
    errorHTML += `<div class="tile-style"><p>${errorString[i]}</p></div>`;
  }
  // add an icon linking back to home page
  errorHTML += '<div class="tile-style"><a href="index.html"><i class="fa-solid fa-puzzle-piece" title="Go to game"></i></a></div>';
  // assign this HTML to innerHTML of error message
  document.getElementById("error-message").innerHTML = errorHTML;
  //set number of tiles for grid
  //calculate column-width depending on gridSize as a percentage
  error.style.gridTemplateColumns = `${100 / gridSize}%`.repeat(gridSize);
  tileFontSize();
}

/**
 * This function takes the width of the puzzle tiles and calculates a font-size from it.
 * This is then set as the font-size of the number on the tile.
 * The function is called each time the number of tiles or the screen size change.
 */
function tileFontSize() {
  //get computed style width of tile
  let tileStyleWidth = getComputedStyle(document.getElementsByClassName("tile-style")[0]).width;
  //get a string "number" + "px", remove "px"
  tileStyleWidth.slice(-2);
  let tileStyleWidthInt = parseInt(tileStyleWidth);
  //set font size of number in tile to percentage of tile width for each element
  //by looping through all tiles (including the empty one)
  let styledTiles = document.getElementsByClassName("tile-style");
  for (let styledTile of styledTiles) {
    styledTile.style.fontSize = `${tileStyleWidthInt * 0.5}px`;
  }
}