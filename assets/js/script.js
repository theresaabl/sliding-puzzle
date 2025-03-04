/* jshint esversion: 11 */

//initialize global variables
//set the maximum grid size available for the game, set globally so can change in one place
const maxGridSize = 9;
// timer variables
let second = 0;
let minute = 0;
let hour = 0;
//set timerInterval to false initially to indicate it is not running
//code inspiration for only starting timer if no interval is set yet https://stackoverflow.com/a/2679208
let timerInterval = false;
//set gameWon to false, need to check this in moveTile and startTimer functions
let gameWon = false;
//set modalOpen to false, to track whether a modal (except landscape modal) is currently open or not
let modalOpen = false;
//store whether the page was loaded from landscape mode on mobile devices
//this influences when the timer should start (only once the phone is in portrait mode)
let loadedFromLandscape = false;

//Event Listeners

//Add event listeners to buttons to show modals and call further functions
//code inspiration for modals: https://blog.webdevsimplified.com/2023-04/html-dialog/
// Click new game button
document.getElementById("new-game-button").addEventListener("click", function() {
  //pause timer when modal open
  stopTimer();
  modalOpen = true;
  //set innerHTML of select element based on maxGridSize
  document.getElementById("grid-size-input-new-game").innerHTML = createSelect();
  document.getElementById("new-game-modal").showModal();
  //handle form in new game modal to get grid size
  document.getElementById("new-game-form").addEventListener("submit", handleNewGameFormSubmit);
});

// Click leaderboard icon
document.getElementById("leaderboard-icon").addEventListener("click", function() {
  //pause timer when modal open
  stopTimer();
  modalOpen = true;
  document.getElementById("leaderboard-modal").showModal();
});

// Click rules icon
document.getElementById("rules-icon").addEventListener("click", function() {
  //pause timer when modal open
  stopTimer();
  modalOpen = true;
  //set inner HTML of max grid size
  document.getElementById("rules-max-grid-size").innerHTML = `${maxGridSize} x ${maxGridSize}`;
  document.getElementById("rules-modal").showModal();
});

//buttons to close modals (all except landing modal and landscape modal)
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
document.getElementById("new-game-modal").addEventListener("close", function () {
    startTimer();
    modalOpen = false;
  }
);
document.getElementById("leaderboard-modal").addEventListener("close", function () {
    startTimer();
    modalOpen = false;
  }
);
document.getElementById("rules-modal").addEventListener("close", function () {
  startTimer();
  modalOpen = false;
}
);
//not for win modal since game is finished or landing modal since start new game anyway
document.getElementById("win-modal").addEventListener("close", function () {
  modalOpen = false;
}
);
document.getElementById("landing-modal").addEventListener("close", function () {
  modalOpen = false;
}
);

//Add event listener to dynamically change the font size of the tile numbers when screen width changes
window.addEventListener("resize", tileFontSize);

//Add event listener to reshuffle button, starts a new game but not changing the grid size
document.getElementById("reshuffle-button").addEventListener("click", runGame);

// The main program:
// Add event listeners for tiles once Dom content is loaded
document.addEventListener("DOMContentLoaded", function() {
  //reset loadedFromLandScape to false
  loadedFromLandscape = false;
  //check if mobile device in landscape mode when loading page
  checkIfLandscape(); //set loadedFromLandscape to true if is the case
  checkOrientationChange();
  //show a default grid behind the landing modal
  createGrid(4);
  //check whether a player name is already in storage and if so, prepopulate the field in win modal
  let playerName = localStorage.getItem("player-name");
  if (playerName) {
    document.getElementById("player-name-input").value = playerName;
  }
  //initialize the leaderboard (in case data is stored in local storage)
  showLeaderboard();
  //set innerHTML of select element based on maxGridSize
  document.getElementById("grid-size-input-landing").innerHTML = createSelect();
  //show modal on first page load
  modalOpen = true;
  document.getElementById("landing-modal").showModal();
  //handle form in landing modal to get player name and grid size
  document.getElementById("landing-form").addEventListener("submit", handleLandingFormSubmit);
});

/**
 * This function takes userinput and processes it, then starts a game with runGame
 * @param {*} event (submit landing form)
 */
function handleLandingFormSubmit(event) {
  event.preventDefault();
  // get userinput
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

/**
 * This function takes user input, displays it and starts a new game
 * @param {*} event (submit new game form)
 */
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

/**
 * This function starts a game by reseting variables, creating a randomly shuffled puzzle and adding click event listeners to tiles
 */
function runGame() {
  gameWon = false;
  //reset move counter and timer
  document.getElementById("moves-display").textContent = "0";
  stopTimer(); //clear interval and set timer to false
  second = 0;
  minute = 0;
  hour = 0;
  document.getElementById("minutes-display").textContent = "00 :";
  document.getElementById("seconds-display").textContent = "00";
  //get grid size
  let gridSize = document.getElementById("grid-size-display").textContent;
  gridSize = parseInt(gridSize[0]);
  //create ordered grid
  createGrid(gridSize);
  //start timer (only if page was not loaded in landscape mode on mobile device)
  if (!loadedFromLandscape) {
    startTimer();
  }
  //set to false since this is only relevant on the very first run
  loadedFromLandscape = false;
  // HTML collection of tiles
  let gridTiles = document.getElementsByClassName("tile-js");
  //shuffle tiles
  randomShuffle(gridTiles, gridSize);
  // add click event listeners to tiles
  for (let tile of gridTiles) {
    tile.addEventListener("click", handleTileClick);
  }
}

/**
 * This function handles users clicking on (not empty) tiles and moves them if they are next to the empty tile. Checks if game won.
 * @param {} event (click on tiles) 
 */
function handleTileClick(event) {
  //if game already won, nothing happens
  if (gameWon === false) {
    let gridSize = document.getElementById("grid-size-display").textContent;
    gridSize = parseInt(gridSize[0]);
    // HTML collection of tiles
    let gridTiles = document.getElementsByClassName("tile-js");
    // get the clicked tile
    let currentTile = getTile(gridTiles, gridSize, this);
    // check whether the clicked tile is next to the empty one, if yes, move tile
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

/**
 * This function creates an ordered puzzle grid of the required grid size
 * @param {*} gridSize 
 */
function createGrid(gridSize){
  let puzzle = document.getElementById("puzzle");
  let puzzleHTML = "";
  // loop through grid and assign the required HTML
  for (let i = 1; i < gridSize * gridSize; i++) {
    puzzleHTML += `<div class="tile-style tile-js"><p>${i}</p></div>`;
  }
  puzzleHTML += '<div class="empty-tile tile-js"><p>0</p></div>';
  document.getElementById("puzzle").innerHTML = puzzleHTML;
  //set styles for grid
  //calculate column-width depending on gridSize as a percentage
  puzzle.style.gridTemplateColumns = `${100 / gridSize}%`.repeat(gridSize);
  //set dynamic fontsize
  tileFontSize();
}

/**
 * This function sets a dynamic font size for the number on the tiles depending on the size of the tiles (i.e. the number of tiles and the size of the screen)
 */
function tileFontSize() {
  //get computed style width of tile
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

/**
 * This function resets the grid to its ordered condition (needed for shuffle randomShuffle)
 * Note it is similar to createGrid but does not require to set the grid column styles again in each loop in randomShuffle
 * @param {*} gridSize 
 */
function resetGrid(gridSize) {
  let puzzleHTML = "";
  for (let i = 1; i < gridSize * gridSize; i++) {
    puzzleHTML += `<div class="tile-style tile-js"><p>${i}</p></div>`;
  }
  puzzleHTML += '<div class="empty-tile tile-js"><p>0</p></div>';
  document.getElementById("puzzle").innerHTML = puzzleHTML;
  //set dynamic fontsize
  tileFontSize();
  }

/**
 * This function takes the HTML collection of tiles in the puzzle grid and returns an array of tile objects which contain the coordinates as well as displayed numbers of the tiles
 * @param {*} gridTiles (HTML collection of puzzle tiles)
 * @returns array of tile objects
 */
function getTilesObjectArray(gridTiles, gridSize){
  // 2d grid coordinates for gridSize
  let coordinates = getCoordinates(gridSize);
  // array of tiles objects with keys "position" and values "number" to save grid position and assigned number
  let tilesObjectArray = [];
  for (let i = 0; i < gridTiles.length; i++){
    let tilesObject = {};
    tilesObject.position = coordinates[i];
    tilesObject.number = gridTiles[i].textContent;
    tilesObjectArray.push(tilesObject);
  }
  return tilesObjectArray;
}

/**
 * This function returns an array of 2d coordinates for a required grid size
 * @param {} size 
 * @returns array of 2d coordinates
 */
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
 * This function takes the HTML collection of puzzle tiles and returns a 1d array of the numbers on the tiles
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

/**
 * This function takes the grid tiles and the grid size and randomly shuffles the puzzle tiles until they are solvable (and not ordered), it then assigns the new HTML to the grid
 * @param {*} gridTiles 
 * @param {*} gridSize 
 */
function randomShuffle(gridTiles, gridSize) {
  //create array of ordered tiles
  let tilesOrdered = [];
  for (let i = 0; i < gridSize * gridSize; i++) {
    tilesOrdered.push(i + 1);
  }
  let ordered = true;
  let solvable = false;
  //shuffle until puzzle is solvable and not accidentally ordered
  do {
    //reset ordered and solvable for each loop
    ordered = true;
    solvable = false;
    //also reset gridTiles to ordered each time
    resetGrid(gridSize);
    //create copy of array of tiles to shuffle
    let tilesArray = tilesOrdered.slice();
    //random shuffle using Fisher-Yates shuffle algorithm, swap each tile in the array with a tile with random index from the remaining unshuffled tiles.       
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
    //swap tiles HTML based on shuffled 1d tilesArray
    for (let i = 0; i < tilesOrdered.length; i++){
      let newHTML = tilesOrderedHTML[tilesArray[i] - 1];
      document.getElementsByClassName("tile-js")[[tilesOrdered[i] - 1]].outerHTML = newHTML;
    }
    //check that puzzle is solvable (or shuffle again)
    solvable = isSolvable(gridTiles, gridSize);
  } while (!solvable || ordered);
}

/**
 * This function takes randomly shuffled grid tiles and checks whether the puzzle is solvable
 * code inspiration and more info: https://www.geeksforgeeks.org/check-instance-15-puzzle-solvable/
 * @param {*} gridTiles 
 * @param {*} gridSize 
 * @returns true or false
 */
function isSolvable(gridTiles, gridSize) {
  //need index of row with empty tile from bottom (starting at 1)
  let emptyTileRow = getEmptyTile(gridTiles, gridSize)[1].position[0];
  let emptyTileRowBottom = gridSize - emptyTileRow;
  //number of inversions in the puzzle (see below)
  let invCount = countInversions(gridTiles);
  //conditions for puzzle to be solvable
  //gridSize is odd
  if (gridSize % 2 !== 0) {
    // puzzle solvable if inversions even
    return (invCount % 2 === 0);
  } else {
    //gridSize is even
    //empty tile row index from bottom is even
    if (emptyTileRowBottom % 2 === 0){
      //true if invCount odd
      return (invCount % 2 !== 0); 
    } else {
      //empty tile row index from bottom is odd
      //true if invCount even
      return (invCount % 2 === 0);
    }
  }
}

/**
 * This function takes the grid tiles and returns the total number of inversions in the puzzle, an inversion is when a tile with a larger number is before a tile with a smaller number
 * @param {*} gridTiles 
 * @returns number of inversions 
 */
function countInversions(gridTiles) {
  // get array of tiles
  let tilesArray = getTilesArray(gridTiles);
  //need array without empty tile
  tilesArray.splice(tilesArray.indexOf("0"), 1);
  let invCounter = 0;
  // loop through all tiles in the array and compare each tile number to all tiles coming after, increase counter everytime a larger number comes before a smaller number in the grid 
  for (let i = 0; i < tilesArray.length - 1; i++){
    for (let j = i + 1; j < tilesArray.length; j++){
      // convert strings to integers
      if (parseInt(tilesArray[i]) > parseInt(tilesArray[j])) {
        invCounter++;
      }
    }
  }
  return invCounter;
}

/**
 * This function takes the HTML collection of tiles, the grid size and the currently clicked tile 
 * and returns the current tile as an object with position and number
 * @param {*} gridTiles
 * @param {*} gridSize
 * @param {*} tileHTML 
 */
function getTile(gridTiles, gridSize, tileHTML) {
  let currentTileText = tileHTML.textContent;
  let currentTileIndex = getTilesArray(gridTiles).indexOf(currentTileText);
  // get current tile object
  let currentTile = getTilesObjectArray(gridTiles, gridSize)[currentTileIndex];
  return currentTile;
}

/**
 * This function takes the grid tiles and grid size and returns the empty tile (and its index)
 * @param {*} gridTiles 
 * @param {*} gridSize 
 * @returns the index of the empty tile and the empty tile HTML object
 */
function getEmptyTile(gridTiles, gridSize) {
  // array of objects
  let tilesObjectArray = getTilesObjectArray(gridTiles, gridSize);
  // 1d array
  let tilesArray = getTilesArray(gridTiles);
  // get index
  let emptyTileIndex = tilesArray.indexOf("0");
  // get object
  let emptyTile = tilesObjectArray[emptyTileIndex];
  return [emptyTileIndex, emptyTile];
}

/**
 * This function takes the grid tiles, grid size and the currently clicked tile to check whether it is a neighbour to the empty tile
 * @param {*} gridTiles 
 * @param {*} gridSize 
 * @param {*} currentTile 
 * @returns true or false
 */
function isNeighbourEmpty(gridTiles, gridSize, currentTile) {
  // get position of empty tile and current tile as 2d coordinates
  let emptyTilePosition = getEmptyTile(gridTiles, gridSize)[1].position;
  let currentTilePosition = currentTile.position;
  // check if currentTile and emptyTile are neighbours by calculating the difference of their coordinates (x and y axis)
  let DiffX = (currentTilePosition[0] - emptyTilePosition[0]);
  let DiffY = (currentTilePosition[1] - emptyTilePosition[1]);
  // if the differences are one of the following four, they are neighbours on the 2d grid
  if ((DiffX === -1 && DiffY === 0)||(DiffX === 0 && DiffY === -1)||(DiffX === 1 && DiffY === 0)||(DiffX === 0 && DiffY === 1)) {
    return true;
  } else {
    return false;
  }
}

/**
 * This function takes the grid tiles and the current tile and swaps the HTML code of the clicked tile and the empty tile
 * @param {*} gridTiles 
 * @param {*} currentTile 
 */
function moveTile(gridTiles, currentTile) {
  // get indices
  let currentTileIndex = getTilesArray(gridTiles).indexOf(currentTile.number);
  let emptyTileIndex = getEmptyTile(gridTiles)[0];
  // get HTML
  let emptyTileHTML = gridTiles[emptyTileIndex].outerHTML;
  let currentTileHTML = gridTiles[currentTileIndex].outerHTML;
  //swap HTML of the two tiles
  document.getElementsByClassName("tile-js")[emptyTileIndex].outerHTML = currentTileHTML;
  document.getElementsByClassName("tile-js")[currentTileIndex].outerHTML = emptyTileHTML;
}

/**
 * This function increments the move counter and displays in the game statistics aside each time a tile is moved
 */
function incrementMoveCounter() {
  let moveCount = document.getElementById("moves-display");
  let moveCountInt = parseInt(moveCount.textContent);
  moveCountInt++;
  document.getElementById("moves-display").textContent = `${moveCountInt}`;
}

/**
 * This function implements a timer that is displayed in the game stats in the game area
 * code inspiration for timer from: https://dev.to/walternascimentobarroso/creating-a-timer-with-javascript-8b7
 */
function timer() {
  //incement seconds by one each time timer is called, increment minutes and hours accordingly
  second++;

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
  let minuteString = minute < 10 ? `0${minute} :` : `${minute} :`;
  // hours (just in case someone leaves game running for really long time)
  //if minutes more than 60:
  if (hour > 0) {
    let hourString = hour < 10 ? `0${hour}` : `${hour}`;
    minuteString = `${hourString} : ${minuteString}`;
  }
  // update the HTML
  document.getElementById("minutes-display").textContent = minuteString;
}

/**
 * This function starts the timer by setting an interval
 */
function startTimer() {
  //start timerInterval only if it is not already running and if game is not won
  if (timerInterval === false && gameWon === false) {
    //call function timer every 1000ms
    timerInterval = setInterval(timer, 1000);
  }
}

/**
 * This function stops the timer by clearing the interval
 */
function stopTimer() {
  //stops timer
  clearInterval(timerInterval);
  //set timerInterval to false each time it is stopped, can check whether running or not
  timerInterval = false; 
}

/**
 * This function checks whether the puzzle is solved or not after every tile move, by looping through the grid tiles and checking whether their numbers are sorted
 * @param {*} gridTiles 
 * @returns true or false
 */
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

/**
 * This function handles the event that the puzzle is solved, it stops the timer, displays a win message, saves the score to local storage, calls the leader board update function and shows the win modal 
 * @param {*} gridSize 
 */
function handleWin(gridSize) {
  stopTimer();
  //set innerHTML of select element based on maxGridSize
  document.getElementById("grid-size-input-win").innerHTML = createSelect();
  //preselect the gridsize that was just played
  document.getElementById("grid-size-input-win").value = `${gridSize}`;
  //display player name from local storage in win message
  let playerName = localStorage.getItem("player-name");
  document.getElementById("player-name-win-display").textContent = ` ${playerName}`;
  // save movecount and time
  let moves = document.getElementById("moves-display").textContent;
  let time = `${document.getElementById("minutes-display").textContent} ${document.getElementById("seconds-display").textContent}`;
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
  //show win message modal
  let winModal = document.getElementById("win-modal");
  modalOpen = true;
  winModal.showModal();
  let winModalForm = document.getElementById("win-form");
  winModalForm.addEventListener("submit", handleWinFormSubmit);
}

/**
 * This function handles the win form submit, it takes the grid size selected by the player, displays it and starts a new game
 * @param {*} event 
 */
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

/**
 * This function takes the player name and score from the recent win from local storage and compares it to the stored leaderboard values, if any new record is set, the local storage data is updated, it calls the showLeaderboard function
 */
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

/**
 * This function takes the leaderboard data from the local storage, creates the HTML code for the leaderboard entries and displays them in the leaderboard modal
 */
function showLeaderboard() {
  //reset leaderboard html before updating
  document.getElementById("leaderboard-entries").innerHTML = "";
  let leaderboardDiv = "";
  //loop through each available grid size and
  //check whether leaderboard entry exists in local storage
  for (let i = 2; i <= maxGridSize; i++) {
    let moves = localStorage.getItem(`size-${i}-least-moves`);
    if (moves) {
      let time = localStorage.getItem(`size-${i}-best-time`);
      let movesPlayer = localStorage.getItem(`size-${i}-least-moves-player`);
      let timePlayer = localStorage.getItem(`size-${i}-best-time-player`);
      let moveOrMoves = parseInt(moves) === 1 ? "move" : "moves";
      leaderboardDiv += `
        <!-- Leaderboard entries for ${i} x ${i} puzzle -->
        <section class="leaderboard-entries-per-size">

            <h3>Puzzle Size: ${i} x ${i}</h3>

            <!-- display least moves needed -->
            <div class="leaderboard-score-div">

                <span class="leaderboard-score-type">Least moves: </span>
                <!-- player and number of moves -->
                <span class="leaderboard-score-container">
                    <span class="leaderboard-player player-name-style">${movesPlayer}</span> with ${moves} ${moveOrMoves}
                </span>
            
            </div>

            <!-- display best time needed -->
            <div class="leaderboard-score-div">

                <span class="leaderboard-score-type">Best time: </span>
                <!-- player and time -->
                <span class="leaderboard-score-container">
                    <span class="leaderboard-player player-name-style">${timePlayer}</span> with ${time}
                </span>
            
            </div>

        </section>
    `;
    }
  }
  //update HTML
  document.getElementById("leaderboard-entries").innerHTML = leaderboardDiv;
}

/**
 * This function takes a time string and turns it into integer seconds
 * @param {*} time as string
 * @returns time in seconds as integer
 */
function timeToInt(time) {
  let timeArray = time.split(":");
  let timeSeconds = parseInt(timeArray[timeArray.length - 1]);
  let timeMinutes = parseInt(timeArray[timeArray.length - 2]);
  //in case game is running for long time and includes hours
  let timeHours = (timeArray.length === 3) ? parseInt(timeArray[timeArray.length - 3]) : 0;
  //time integer
  let timeInt = timeHours * 3600 + timeMinutes * 60 + timeSeconds;
  return timeInt;
}

/**
 * This function handles the event when user clicks outside of a modal (all but landing and landscape modals)
 * code from https://blog.webdevsimplified.com/2023-04/html-dialog/
 * @param {*} event (clilck outside of modal)
 */
function handleModalClick(event) {
  //get position and dimensions of the modal relative to viewport
  //backdrop is child element of modal, so if backdrop clicked, eventListener works
  const modalDimensions = this.getBoundingClientRect();
  //if click inside modal nothing happens
  //click outside: modal closes
  if (
    event.clientX < modalDimensions.left ||
    event.clientX > modalDimensions.right ||
    event.clientY < modalDimensions.top ||
    event.clientY > modalDimensions.bottom
  ) {
    this.close();
  }
}

/**
 * This function returns the select element for landing, new game and win modals depending on maxGridSize
 * @returns HTML code for select elements in modals
 */
function createSelect() {
  let selectHTML = "";
  for (let i = 2; i <= maxGridSize; i++) {
    selectHTML += `<option value="${i}">${i} x ${i}</option>`;
  }
  return selectHTML;
}

/**
 * This function adds an event listener for when mobile device is turned into landscape mode and shows a modal with a warning
 * code inspiration from https://dev.to/dcodeyt/the-easiest-way-to-detect-device-orientation-in-javascript-7d7
 */
function checkOrientationChange() {
  window.matchMedia("(orientation: portrait)").addEventListener("change", e => {
    //check these conditions and only if true, show warning when in landscape mode
    //for mobile devices with screens less than 680px, this is about the min height that need to display game properly
    if (window.innerWidth < 680 || window.innerHeight < 680){
      const portrait = e.matches;
      //if phone is rotated into portrait mode
      if (portrait) {
        //if no other modal is open, start timer
        if (!modalOpen) {
          startTimer();
        }
        // close the landscape warning modal
        document.getElementById("landscape-modal").close();
      } else {
        //if phone rotated to landscape mode
        //check if another modal is open that handles the timer already
        if (!modalOpen) {
          stopTimer();
        }
        // show modal
        document.getElementById("landscape-modal").showModal();
      }
    }
  });
}

/**
 * This function checks whether a device is in landscape mode (as opposed to detecting the change of orientation done in checkOrientationChange), this is needed when the game is loaded in landscape mode on a mobile device
 */
function checkIfLandscape() {
  //check these conditions and only if true, show warning when in landscape mode
  //for mobile devices with screens less than 680px
  if (window.innerWidth < 680 || window.innerHeight < 680){
    let portrait = window.matchMedia("(orientation: portrait)").matches;
    //if in landscape mode
    if (portrait === false) {
      //set variable to true
      loadedFromLandscape = true;
      //show the warning modal until device is turned back (orientation change is detected with checkOrientationChange)
      do {
        document.getElementById("landscape-modal").showModal();
      } while (checkOrientationChange());
    }
  }
}