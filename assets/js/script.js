/* jshint esversion: 11 */

//code for the new game modal
//https://blog.webdevsimplified.com/2023-04/html-dialog/
const newGameButton = document.getElementById("new-game-button");
const newGameModal = document.getElementById("new-game-modal");

newGameButton.addEventListener("click", function() {
  newGameModal.showModal()
});

//https://blog.webdevsimplified.com/2023-04/html-dialog/
newGameModal.addEventListener("click", e => {
  //get position and dimensions of the modal relative to viewport
  //backdrop is child element of modal, so if backdrop clicked, evenListener works
  const newGameModalDimensions = newGameModal.getBoundingClientRect()
  //if click inside modal nothing happens
  if (
    e.clientX < newGameModalDimensions.left ||
    e.clientX > newGameModalDimensions.right ||
    e.clientY < newGameModalDimensions.top ||
    e.clientY > newGameModalDimensions.bottom
  ) {
    //click outside: modal closes
    newGameModal.close()
  }
})

//set default grid size
//let gridSize = 3;  //later: get from user with getGridSize()


// Add event listeners for tiles once Dom content is loaded
document.addEventListener("DOMContentLoaded", function() {
  //show modal on first page load
  document.getElementById("landing-modal").showModal();
  //handle form in landing modal to get player name and grid size
  let landingForm = document.getElementById("landing-form");
  landingForm.addEventListener("submit", handleLandingFormSubmit);
});


function handleLandingFormSubmit(event) {
  event.preventDefault();
  let playerName = this.elements["player-name-input"].value;
  let gridSize = this.elements["grid-size-input"].value;
  // display grid size
  document.getElementById("grid-size-display").textContent = `${gridSize}`;
  //save playername
  document.getElementsByClassName("player-name").textContent = `Player name: ${playerName}`;
  this.submit();
  //run game when landing form is submitted
  runGame();
}

function runGame() {
  console.log("rungame");
  let gridSize = document.getElementById("grid-size-display").textContent;
  gridSize = parseInt(gridSize[0]);
  console.log(document.getElementById("grid-size-display").textContent);
  console.log(gridSize);
  createGrid(gridSize);
  // HTML collection of tiles
  let gridTiles = document.getElementsByClassName("tile-js");
  randomShuffle(gridTiles, gridSize);
  for (let tile of gridTiles) {
    tile.addEventListener("click", handleTileClick);
  }
}

function handleTileClick(event) {
  let gridTiles = document.getElementsByClassName("tile-js");
  let currentTile = getTile(gridTiles, this);
  if (isNeighbourEmpty(gridTiles, currentTile)){
    moveTile(gridTiles, currentTile);
    //check whether puzzle is solved
    if (isPuzzleSolved(gridTiles)){
      winMessage();
      //newgame
    }
    // After rearranging the tiles need to add event listener again
    for (let tile of gridTiles) {
      tile.addEventListener("click", handleTileClick);
    }
  }
}

function createGrid(gridSize){
  let puzzle = document.getElementById("puzzle");
  let puzzleHTML = puzzle.innerHTML;
  for (let i = 1; i < gridSize * gridSize; i++) {
    puzzleHTML += `<div class="tile-style tile-js"><p>${i}</p></div>`;
  }
  puzzleHTML += '<div class="empty-tile tile-js"><p>0</p></div>';
  document.getElementById("puzzle").innerHTML = puzzleHTML;
  //set styles for grid
  puzzle.style.gridTemplateColumns = "auto ".repeat(gridSize - 1) + "auto";
}
  
/**
 * This function takes the HTML collection of tiles in the puzzle grid
 * and returns an array of tile objects which contain the coordinates 
 * as well as displayed numbers of the tiles
 * @param {*} gridTiles (HTML collection of puzzle tiles)
 * @returns array of tile objects
 */
function getTilesObjectArray(gridTiles){
  // grid coordinates for gridSize
  let coordinates = getCoordinates(gridSize);
  // array of tiles objects to save grid position and assigned number
  let tilesObjectArray = [];
  for (let i = 0; i < gridTiles.length; i++){
    let tilesObject = {};
    tilesObject.position = coordinates[i];
    tilesObject.number = gridTiles[i].textContent;
    tilesObjectArray.push(tilesObject);
  }
  return tilesObjectArray;
}

function getCoordinates(size) {
  let coordinates = [];
  for (let i = 0; i < size; i ++){
    for (let j = 0; j < size; j++){
      coordinates.push([i, j]);
    }
  }
  return coordinates;
}

/**
 * This function takes the HTML collection of puzzle tiles and
 * returns a 1d array of the numbers on the tiles
 * @param {*} gridTiles (HTML collection of puzzle tiles)
 * @returns 1d array of numbers on tiles
 */
function getTilesArray(gridTiles){
  // 1d array of tiles
  let tilesArray = [];
  for (let tile of gridTiles){
    tilesArray.push(tile.textContent);
  }
  return tilesArray;
}

function getGridSize() {

}

// Code inspiration from: https://www.freecodecamp.org/news/how-to-shuffle-an-array-of-items-using-javascript-or-typescript/
//Using Fisher-Yates shuffle algorithm
function randomShuffle(gridTiles, gridSize) {
  const tilesOrdered = getTilesArray(gridTiles);
  let tilesArray = getTilesArray(gridTiles);
  for (let i = tilesArray.length - 1; i > 0; i--) { 
    const j = Math.floor(Math.random() * (i + 1)); 
    [tilesArray[i], tilesArray[j]] = [tilesArray[j], tilesArray[i]]; 
  }
  //save HTML of ordered tiles in a new array
  let tilesOrderedHTML = [];
  for (let tile of gridTiles) {
    tilesOrderedHTML.push(tile.outerHTML);
  }  
  //swap tiles based on shuffled 1d tilesArray
  for (let i = 0; i < tilesOrdered.length; i++){
    let newHTML = tilesOrderedHTML[tilesArray[i]];
    document.getElementsByClassName("tile-js")[[tilesOrdered[i]]].outerHTML = newHTML;
  }
  //check that puzzle is solvable (or shuffle again)
  if (!isSolvable(gridTiles, gridSize)){
    console.log("puzzle not solvable.")
    randomShuffle(gridTiles,gridSize);
  } else {
    console.log("puzzle is solvable");
  }
}

//need inversion counter for isSolvable
function countInversions(gridTiles) {
  let tilesArray = getTilesArray(gridTiles);
  //need array without empty tile
  tilesArray.splice(tilesArray.indexOf("0"), 1);
  let invCounter = 0;
  for (let i = 0; i < tilesArray.length - 1; i++){
    for (let j = i + 1; j < tilesArray.length; j++){
      if (tilesArray[i] > tilesArray[j]) {
        invCounter++;
      }
    }
  }
  console.log(`Number of inversions: ${invCounter}.`);
  return invCounter;
}

//check whether is solvable
//code inspiration: https://www.geeksforgeeks.org/check-instance-15-puzzle-solvable/
function isSolvable(gridTiles, gridSize) {
  //need index of row with empty tile from bottom (starting at 1)
  let emptyTileRow = getEmptyTile(gridTiles)[1].position[0];
  let emptyTileRowBottom = gridSize - emptyTileRow;
  //number of inversions in the puzzle
  let invCount = countInversions(gridTiles);
  //conditions for puzzle to be solvable
  //gridSize is odd
  if (gridSize % 2) {
    console.log(`grid size ${gridSize} is odd and puzzle solvable if inversions ${invCount} is even.`);
    return (!(invCount % 2));
  } else {
    //gridSize is even
    //empty tile row index from bottom is even
    if (!(emptyTileRowBottom % 2)){
      console.log(`grid size ${gridSize} is even, empty tile row index from bottom ${emptyTileRowBottom} is even and puzzle solvable if inversions ${invCount} is odd.`);
      //true if invCount odd
      return (invCount % 2); 
    } else {
      //empty tile row index from bottom is odd
      //true if invCount even
      console.log(`grid size ${gridSize} is even, empty tile row index from bottom ${emptyTileRowBottom} is odd and puzzle solvable if inversions ${invCount} is even.`);
      return (!(invCount % 2));
    }
  }
}

/**
 * This function takes the HTML collection of tiles and the currently clicked tile 
 * and returns the current tile as an object with position and number
 * @param {*} gridTiles 
 * @param {*} tileHTML 
 */
function getTile(gridTiles, tileHTML) {
  let currentTileText = tileHTML.textContent;
  let currentTileIndex = getTilesArray(gridTiles).indexOf(currentTileText);
  let currentTile = getTilesObjectArray(gridTiles)[currentTileIndex];
  return currentTile;
}

function getEmptyTile(gridTiles) {
  let tilesObjectArray = getTilesObjectArray(gridTiles);
  let tilesArray = getTilesArray(gridTiles);
  let emptyTileIndex = tilesArray.indexOf("0");
  let emptyTile = tilesObjectArray[emptyTileIndex];
  return [emptyTileIndex, emptyTile];
}

function isNeighbourEmpty(gridTiles, currentTile) {
  let emptyTilePosition = getEmptyTile(gridTiles)[1].position;
  let currentTilePosition = currentTile.position;
  // check if currentTile and emptyTile are neighbours
  let DiffX = (currentTilePosition[0] - emptyTilePosition[0]);
  let DiffY = (currentTilePosition[1] - emptyTilePosition[1]);
  if ((DiffX === -1 && DiffY === 0)||(DiffX === 0 && DiffY === -1)||(DiffX === 1 && DiffY === 0)||(DiffX === 0 && DiffY === 1)) {
    return true;
  } else {
    return false;
  }
}

function moveTile(gridTiles, currentTile) {
  let currentTileIndex = getTilesArray(gridTiles).indexOf(currentTile.number);
  let emptyTileIndex = getEmptyTile(gridTiles)[0];
  let emptyTileHTML = gridTiles[emptyTileIndex].outerHTML;
  let currentTileHTML = gridTiles[currentTileIndex].outerHTML;
  //swap HTML of the two tiles
  document.getElementsByClassName("tile-js")[emptyTileIndex].outerHTML = currentTileHTML;
  document.getElementsByClassName("tile-js")[currentTileIndex].outerHTML = emptyTileHTML;
}

function incrementMoveCounter() {

}

function isPuzzleSolved(gridTiles) {
  let tilesArray = getTilesArray(gridTiles);
  //check empty tile is in correct place
  if (tilesArray[tilesArray.length - 1] === "0") {
    //check for each tile whether they are in correct position
    for (let i = 1; i < tilesArray.length; i++) {
      if (tilesArray[i - 1] !== `${i}`){
        return false;
      } else {
      }
    }
    return true;
  } else {
    return false;
  }
}

function winMessage() {
  console.log("You win !!!"); //make dialoque later!
}

