/* jshint esversion: 11 */

//Event Listeners

//code inspiration for modals: https://blog.webdevsimplified.com/2023-04/html-dialog/
//Add event listeners to buttons to show and call further functions
document.getElementById("new-game-button").addEventListener("click", function() {
  document.getElementById("new-game-modal").showModal();
  //handle form in new game modal to get grid size
  document.getElementById("new-game-form").addEventListener("submit", handleNewGameFormSubmit);
});
document.getElementById("leaderboard-icon").addEventListener("click", function() {
  document.getElementById("leaderboard-modal").showModal();
});
document.getElementById("rules-icon").addEventListener("click", function() {
  document.getElementById("rules-modal").showModal();
});

//buttons to close modals (all except landing modal and win modal)
document.getElementById("close-new-game-modal").addEventListener("click", function() {
  document.getElementById("new-game-modal").close();
});
document.getElementById("close-win-modal").addEventListener("click", function() {
  document.getElementById("win-modal").close();
});
document.getElementById("close-leaderboard-modal").addEventListener("click", function() {
  document.getElementById("leaderboard-modal").close();
});
document.getElementById("close-rules-modal").addEventListener("click", function() {
  document.getElementById("rules-modal").close();
});

//Add event listeners to modals to close them when clicked outside of it
document.getElementById("new-game-modal").addEventListener("click", handleModalClick);
document.getElementById("win-modal").addEventListener("click", handleModalClick);
document.getElementById("leaderboard-modal").addEventListener("click", handleModalClick);
document.getElementById("rules-modal").addEventListener("click", handleModalClick);


// Add event listeners for tiles once Dom content is loaded
document.addEventListener("DOMContentLoaded", function() {
  //show modal on first page load
  document.getElementById("landing-modal").showModal();
  //handle form in landing modal to get player name and grid size
  document.getElementById("landing-form").addEventListener("submit", handleLandingFormSubmit);
});

//Add event listener to reshuffle button
//starts a new game but not changing the grid size, allows the user to quickly reshuffle the puzzle
document.getElementById("reshuffle-button").addEventListener("click", runGame);

function handleLandingFormSubmit(event) {
  event.preventDefault();
  let playerName = this.elements["player-name-input"].value;
  let gridSize = this.elements["grid-size-input-landing"].value;
  // display grid size
  document.getElementById("grid-size-display").textContent = `${gridSize}`;
  //save playername
  document.getElementsByClassName("player-name").textContent = `Player name: ${playerName}`;
  this.submit();
  //run game when landing form is submitted
  runGame();
}

function handleNewGameFormSubmit(event) {
  event.preventDefault();
  //get grid size user input
  let gridSize = this.elements["grid-size-input-new-game"].value;
  // display grid size
  document.getElementById("grid-size-display").textContent = `${gridSize}`;
  this.submit();
  //run game when new game form is submitted
  runGame();
}

function runGame() {
  //reset grid every time game is run
  document.getElementById("puzzle").innerHTML = "";
  let gridSize = document.getElementById("grid-size-display").textContent;
  gridSize = parseInt(gridSize[0]);
  createGrid(gridSize);
  // HTML collection of tiles
  let gridTiles = document.getElementsByClassName("tile-js");
  randomShuffle(gridTiles, gridSize);
  for (let tile of gridTiles) {
    tile.addEventListener("click", handleTileClick);
  }
}

function handleTileClick(event) {
  let gridSize = document.getElementById("grid-size-display").textContent;
  gridSize = parseInt(gridSize[0]);
  let gridTiles = document.getElementsByClassName("tile-js");
  let currentTile = getTile(gridTiles, gridSize, this);
  if (isNeighbourEmpty(gridTiles, gridSize, currentTile)){
    moveTile(gridTiles, currentTile);
    //check whether puzzle is solved
    if (isPuzzleSolved(gridTiles)){
      //show win message and start new game with user input grid size
      winMessage();
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
  //calculate column-width depending on gridSize as a percentage
  puzzle.style.gridTemplateColumns = `${100 / gridSize}%`.repeat(gridSize);
}
  
/**
 * This function takes the HTML collection of tiles in the puzzle grid
 * and returns an array of tile objects which contain the coordinates 
 * as well as displayed numbers of the tiles
 * @param {*} gridTiles (HTML collection of puzzle tiles)
 * @returns array of tile objects
 */
function getTilesObjectArray(gridTiles, gridSize){
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

// function getGridSize() {

// }

function randomShuffle(gridTiles, gridSize) {
  //create array of ordered tiles
  let tilesOrdered = [];
  for (let i = 0; i < gridSize * gridSize; i++) {
    tilesOrdered.push(i + 1);
  }
  let ordered = true;
  let solvable = false;
  //shuffle again until puzzle is solvable and not accidentally ordered
  do {
    console.log("start new loop");
    //create copy of array of tiles to shuffle
    let tilesArray = tilesOrdered.slice();
    //random shuffle using Fisher-Yates shuffle algorithm
    //Code inspiration from: https://www.freecodecamp.org/news/how-to-shuffle-an-array-of-items-using-javascript-or-typescript/
    for (let i = tilesArray.length - 1; i > 0; i--) { 
      const j = Math.floor(Math.random() * (i + 1)); 
      [tilesArray[i], tilesArray[j]] = [tilesArray[j], tilesArray[i]]; 
    }

    //check that shuffled puzzle is not accidentally ordered
    for (let i = 0; i < tilesArray.length; i++) {
      //compare ordered and shuffled arrays
      if (tilesArray[i] !== tilesOrdered[i]) {
        //if any element is not the same, break out of loop
        ordered = false;
        break;
      } 
    }
    console.log(`ordered: ${ordered}`);
    //save HTML of ordered tiles in a new array
    let tilesOrderedHTML = [];
    for (let tile of gridTiles) {
      tilesOrderedHTML.push(tile.outerHTML);
    }
    //swap tiles based on shuffled 1d tilesArray
    for (let i = 0; i < tilesOrdered.length; i++){
      let newHTML = tilesOrderedHTML[tilesArray[i] - 1];
      document.getElementsByClassName("tile-js")[[tilesOrdered[i] - 1]].outerHTML = newHTML;
    }

    //check that puzzle is solvable (or shuffle again)
    if (isSolvable(gridTiles, gridSize)){
      solvable = true;
    }
  } while (!solvable || ordered);
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
  return invCounter;
}

//check whether is solvable
//code inspiration: https://www.geeksforgeeks.org/check-instance-15-puzzle-solvable/
function isSolvable(gridTiles, gridSize) {
  //need index of row with empty tile from bottom (starting at 1)
  let emptyTileRow = getEmptyTile(gridTiles, gridSize)[1].position[0];
  let emptyTileRowBottom = gridSize - emptyTileRow;
  //number of inversions in the puzzle
  let invCount = countInversions(gridTiles);
  //conditions for puzzle to be solvable
  //gridSize is odd
  if (gridSize % 2) {
    return (!(invCount % 2));
  } else {
    //gridSize is even
    //empty tile row index from bottom is even
    if (!(emptyTileRowBottom % 2)){
      //true if invCount odd
      return (invCount % 2); 
    } else {
      //empty tile row index from bottom is odd
      //true if invCount even
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
function getTile(gridTiles, gridSize, tileHTML) {
  let currentTileText = tileHTML.textContent;
  let currentTileIndex = getTilesArray(gridTiles).indexOf(currentTileText);
  let currentTile = getTilesObjectArray(gridTiles, gridSize)[currentTileIndex];
  return currentTile;
}

function getEmptyTile(gridTiles, gridSize) {
  let tilesObjectArray = getTilesObjectArray(gridTiles, gridSize);
  let tilesArray = getTilesArray(gridTiles);
  let emptyTileIndex = tilesArray.indexOf("0");
  let emptyTile = tilesObjectArray[emptyTileIndex];
  return [emptyTileIndex, emptyTile];
}

function isNeighbourEmpty(gridTiles, gridSize, currentTile) {
  let emptyTilePosition = getEmptyTile(gridTiles, gridSize)[1].position;
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
  let winModal = document.getElementById("win-modal");
  winModal.showModal();
  let winModalForm = document.getElementById("win-form");
  winModalForm.addEventListener("submit", handleWinFormSubmit);
}

function handleWinFormSubmit(event) {
  event.preventDefault();
  //get grid size user input
  let gridSize = this.elements["grid-size-input-win"].value;
  // display grid size
  document.getElementById("grid-size-display").textContent = `${gridSize}`;
  this.submit();
  //run game when new game form is submitted
  runGame();
}

//Modal is closed when click outside of it, use for most modals (not landing modal)
//https://blog.webdevsimplified.com/2023-04/html-dialog/
function handleModalClick(event) {
  //get position and dimensions of the modal relative to viewport
  //backdrop is child element of modal, so if backdrop clicked, evenListener works
  const modalDimensions = this.getBoundingClientRect()
  //if click inside modal nothing happens
  if (
    event.clientX < modalDimensions.left ||
    event.clientX > modalDimensions.right ||
    event.clientY < modalDimensions.top ||
    event.clientY > modalDimensions.bottom
  ) {
    //click outside: modal closes
    this.close()
  }
}