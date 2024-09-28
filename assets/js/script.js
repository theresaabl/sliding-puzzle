/* jshint esversion: 11 */

////////////////////////////////////////////////////
// for testing purpose only:

localStorage.setItem("size-4-best-time", "13:12");
localStorage.setItem("size-4-best-time-player", "cari");
localStorage.setItem("size-4-least-moves", "623");
localStorage.setItem("size-4-least-moves-player", "bobbie");

localStorage.setItem("size-5-best-time", "13:12");
localStorage.setItem("size-5-best-time-player", "cari");
localStorage.setItem("size-5-least-moves", "623");
localStorage.setItem("size-5-least-moves-player", "bobbie");

localStorage.setItem("size-6-best-time", "13:12");
localStorage.setItem("size-6-best-time-player", "cari");
localStorage.setItem("size-6-least-moves", "623");
localStorage.setItem("size-6-least-moves-player", "bobbie");

localStorage.setItem("size-7-best-time", "13:12");
localStorage.setItem("size-7-best-time-player", "cari");
localStorage.setItem("size-7-least-moves", "623");
localStorage.setItem("size-7-least-moves-player", "bobbie");

////////////////////////////////////////////////////

//Event Listeners

//code inspiration for modals: https://blog.webdevsimplified.com/2023-04/html-dialog/
//Add event listeners to buttons to show and call further functions
document.getElementById("new-game-button").addEventListener("click", function() {
  //pause timer when modal open
  stopTimer();
  document.getElementById("new-game-modal").showModal();
  //handle form in new game modal to get grid size
  document.getElementById("new-game-form").addEventListener("submit", handleNewGameFormSubmit);
});
document.getElementById("leaderboard-icon").addEventListener("click", function() {
  //pause timer when modal open
  stopTimer();
  document.getElementById("leaderboard-modal").showModal();
});
document.getElementById("rules-icon").addEventListener("click", function() {
  //pause timer when modal open
  stopTimer();
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

//Add event listeners when modals closed to start timer again
document.getElementById("new-game-modal").addEventListener("close", startTimer);
document.getElementById("leaderboard-modal").addEventListener("close", startTimer);
document.getElementById("rules-modal").addEventListener("close", startTimer);
//not for win modal since game is finished

////////////////////////////////////////////////////////////////////////////////
// Add event listeners for tiles once Dom content is loaded
document.addEventListener("DOMContentLoaded", function() {
  //check whether a player name is already in storage and if so, prepopulate the field in win modal
  let playerName = localStorage.getItem("player-name");
  if (playerName) {
    document.getElementById("player-name-input").value = playerName;
  }
  //initialize the leaderboard (in case data is stored in local storage)
  showLeaderboard();
  //show modal on first page load
  document.getElementById("landing-modal").showModal();
  //handle form in landing modal to get player name and grid size
  document.getElementById("landing-form").addEventListener("submit", handleLandingFormSubmit);
});
/////////////////////////////////////////////////////////////////////////////

//Add event listener to reshuffle button
//starts a new game but not changing the grid size, allows the user to quickly reshuffle the puzzle
document.getElementById("reshuffle-button").addEventListener("click", runGame);

function handleLandingFormSubmit(event) {
  event.preventDefault();
  let playerName = this.elements["player-name-input"].value;
  let gridSize = this.elements["grid-size-input-landing"].value;
  // display grid size
  document.getElementById("grid-size-display").textContent = `${gridSize} x ${gridSize}`;
  //save playername
  document.getElementsByClassName("player-name").textContent = `Player name: ${playerName}`;
  //save to local storage
  localStorage.setItem("player-name", playerName);
  this.submit();
  //run game when landing form is submitted
  runGame();
}

function handleNewGameFormSubmit(event) {
  event.preventDefault();
  //get grid size user input
  let gridSize = this.elements["grid-size-input-new-game"].value;
  // display grid size
  document.getElementById("grid-size-display").textContent = `${gridSize} x ${gridSize}`;
  this.submit();
  //run game when new game form is submitted
  runGame();
}


// ///////////////////////////////////////////////
// code inspiration for timer from: https://dev.to/walternascimentobarroso/creating-a-timer-with-javascript-8b7
//figure out how to do without global variables
let second = 0;
let minute = 0;
let hour = 0;
//set timerInterval to false initially to indicate it is not running
let timerInterval = false;
//set gameWon to false, need to check this in moveTile function
//https://stackoverflow.com/a/2679208
let gameWon = false;

function timer() {
  second++

  if (second == 60) {
    second = 0;
    minute++;
  }
  if (minute == 60) {
    minute = 0;
    hour++;
  }

  // check how to display time, depending on number of digits
  //seconds
  let secondString = second < 10 ? `0${second}` : `${second}`;
  document.getElementById("seconds-display").textContent = secondString;
  //minutes
  let minuteString = minute < 10 ? `0${minute}` : `${minute}`;
  //if minutes more than 60:
  if (hour > 0) {
    hourString = hour < 10 ? `0${hour}` : `${hour}`;
    minuteString = `${hourString}:${minuteString}`;
  } 
  document.getElementById("minutes-display").textContent = minuteString;
}

function startTimer() {
  //start timerInterval only if it is not already running
  if (timerInterval === false) {
    //call function timer every 1000ms
    timerInterval = setInterval(timer, 1000);
  }
}

function stopTimer() {
  //stops timer
  clearInterval(timerInterval);
  //set timerInterval to false each time it is stopped, can check whether running or not
  timerInterval = false; 
}
// /////////////////////////////////////////////////////////


function runGame() {
  gameWon = false;
  //reset grid every time game is run
  document.getElementById("puzzle").innerHTML = "";
  //reset move counter and timer
  document.getElementById("moves-display").textContent = "0";
  stopTimer(); //clear interval and set timer to false
  second = 0;
  minute = 0;
  hour = 0;
  document.getElementById("minutes-display").textContent = "00";
  document.getElementById("seconds-display").textContent = "00";
  //create puzzle grid
  let gridSize = document.getElementById("grid-size-display").textContent;
  gridSize = parseInt(gridSize[0]);
  createGrid(gridSize);
  //start timer
  startTimer();
  // HTML collection of tiles
  let gridTiles = document.getElementsByClassName("tile-js");
  //shuffle
  randomShuffle(gridTiles, gridSize);
  for (let tile of gridTiles) {
    tile.addEventListener("click", handleTileClick);
  }
}

function handleTileClick(event) {
  //if game already won, nothing happens
  if (gameWon === false) {
    let gridSize = document.getElementById("grid-size-display").textContent;
    gridSize = parseInt(gridSize[0]);
    let gridTiles = document.getElementsByClassName("tile-js");
    let currentTile = getTile(gridTiles, gridSize, this);
    if (isNeighbourEmpty(gridTiles, gridSize, currentTile)){
      moveTile(gridTiles, currentTile);
      incrementMoveCounter();
      //check whether puzzle is solved
      if (isPuzzleSolved(gridTiles)){
        gameWon = true;
        //show win message and start new game
        handleWin(gridSize);
      }
      // After rearranging the tiles need to add event listener again
      for (let tile of gridTiles) {
        tile.addEventListener("click", handleTileClick);
      }
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
    //reset ordered and solvable for each loop
    ordered = true;
    solvable = false;
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
  let moveCount = document.getElementById("moves-display");
  let moveCountInt = parseInt(moveCount.textContent);
  moveCountInt++
  document.getElementById("moves-display").textContent = `${moveCountInt}`;
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

function handleWin(gridSize) {
  stopTimer();
  //display player name from local storage in win message
  let playerName = localStorage.getItem("player-name");
  document.getElementById("player-name-win-display").textContent = ` ${playerName}`;
  // save movecount and time
  let moves = document.getElementById("moves-display").textContent;
  let time = `${document.getElementById("minutes-display").textContent}:${document.getElementById("seconds-display").textContent}`;
  //save to local storage
  localStorage.setItem("last-win-moves", moves);
  localStorage.setItem("last-win-time", time);
  localStorage.setItem("last-win-grid-size", `${gridSize}`);
  //check leaderboard
  updateLeaderboard();
  //display in win modal together with gridSize
  document.getElementById("grid-size-display-win").textContent = `${gridSize} x ${gridSize}`;
  document.getElementById("moves-win-display").textContent = moves;
  document.getElementById("time-win-display").textContent = time;
  //preselect the gridsize that was just played
  document.getElementById("grid-size-input-win").value = `${gridSize}`;
  //show win message modal
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
  document.getElementById("grid-size-display").textContent = `${gridSize} x ${gridSize}`;
  this.submit();
  //run game when new game form is submitted
  runGame();
}

function showLeaderboard() {
  //reset leaderboard html before updating
  document.getElementById("leaderboard-entries").innerHTML = "";
  let leaderboardDiv = "";

  //loop through each available grid size
  //get select element from landing modal
  let selectGridSize = document.getElementById("grid-size-input-landing");
  //value of last element in select element is the largest grid size
  let maxSize = parseInt(selectGridSize[selectGridSize.length - 1].value);
  for (let i = 2; i <= maxSize; i++) {
    //check whether leaderboard entry exists for gridSize i in local storage
    let moves = localStorage.getItem(`size-${i}-least-moves`);
    if (moves) {
      let time = localStorage.getItem(`size-${i}-best-time`);
      let movesPlayer = localStorage.getItem(`size-${i}-least-moves-player`);
      let timePlayer = localStorage.getItem(`size-${i}-best-time-player`);
      let moveOrMoves = parseInt(moves) === 1 ? "move" : "moves";
      leaderboardDiv += `
      <div class="leaderboard-entries-per-size">
        <h3>Puzzle size: ${i} x ${i}</h3>
        <div class="leaderboard-score-div">
          <span class="leaderboard-score-type">Least moves: </span><span class="leaderboard-score-container"><span class="leaderboard-player">${movesPlayer}</span> with ${moves} ${moveOrMoves}</span>
        </div>
        <div class="leaderboard-score-div">
          <span class="leaderboard-score-type">Best time: </span><span class="leaderboard-score-container"><span class="leaderboard-player">${timePlayer}</span> with ${time}</span>
        </div>
      </div>
    `;
    }
  }
  document.getElementById("leaderboard-entries").innerHTML = leaderboardDiv;
}

function updateLeaderboard() {
  //get data from current win from local storage
  let playerName = localStorage.getItem("player-name");
  let gridSize = localStorage.getItem("last-win-grid-size");
  let moves = localStorage.getItem("last-win-moves");
  let time = localStorage.getItem("last-win-time");
  //get data from leaderboard from local storage
  let bestTime = localStorage.getItem(`size-${gridSize}-best-time`);
  let leastMoves = localStorage.getItem(`size-${gridSize}-least-moves`);
  // check if these entries exist in local storage
  if (!leastMoves) {
    //if no entries yet, set new least moves entry
    localStorage.setItem(`size-${gridSize}-least-moves`, moves);
    localStorage.setItem(`size-${gridSize}-least-moves-player`, playerName);
    //set new best time entry
    localStorage.setItem(`size-${gridSize}-best-time`, time);
    localStorage.setItem(`size-${gridSize}-best-time-player`, playerName);
    //show new leaderboard
    showLeaderboard();
  } else {
    //if entry already exists, compare current win moves and update if better
    if (parseInt(moves) < parseInt(leastMoves)) {
      //replace entry in local storage
      localStorage.setItem(`size-${gridSize}-least-moves`, moves);
      localStorage.setItem(`size-${gridSize}-least-moves-player`, playerName);
      //show new leaderboard
      showLeaderboard();
    }
    //compare time to best time
    //convert time to integer seconds
    let timeInt = timeToInt(time);
    let bestTimeInt = timeToInt(bestTime);
    if (timeInt < bestTimeInt) {
      //replace entry in local storage
      localStorage.setItem(`size-${gridSize}-best-time`, time);
      localStorage.setItem(`size-${gridSize}-best-time-player`, playerName);
      //show new leaderboard
      showLeaderboard();
    }
    }
  }

function timeToInt(time) {
  let timeArray = time.split(":");
  let timeSeconds = parseInt(timeArray[timeArray.length - 1]);
  let timeMinutes = parseInt(timeArray[timeArray.length - 2]);
  //in case game is running for long time and includes hours
  let timeHours = (timeArray.length === 3) ? parseInt(timeArray[timeArray.length - 3]) : 0;

  let timeInt = timeHours * 3600 + timeMinutes * 60 + timeSeconds;
  return timeInt;
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

