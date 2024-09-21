/* jshint esversion: 11 */

let gridSize = 3;  //later: get from user with getGridSize()


// Add event listeners for tiles once Dom content is loaded
document.addEventListener("DOMContentLoaded", function() {
  // HTML collection of tiles
  let gridTiles = document.getElementsByClassName("tile-js");
  for (let tile of gridTiles) {
    tile.addEventListener("click", handleClick);
  }
});

function handleClick(event) {
  console.log("click");
  let gridTiles = document.getElementsByClassName("tile-js");
  let currentTile = getTile(gridTiles, this);
  console.log(currentTile);
  if (isNeighbourEmpty(gridTiles, currentTile)){
    console.log(getTilesArray(gridTiles));
    moveTile(gridTiles, currentTile);
    console.log(getTilesArray(gridTiles));
    // After rearranging the tiles need to add event listener again
    for (let tile of gridTiles) {
      tile.addEventListener("click", handleClick);
    }
  }
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

function runGame() {

}

function getGridSize() {

}

function shuffle() {

}

function isSolvable() {

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

// function getNeighbours(currentTile){
//   let position = currentTile.position;
//   let X = position[0];
//   let Y = position[1];
//   console.log(position);
//   let coordinates = getCoordinates(gridSize);
//   // array of possible neighbouring positions
//   let newPositions = [[X-1, Y], [X, Y-1], [X+1, Y], [X, Y+1]];
//   console.log(coordinates, newPositions);
//   // check wether positions are within the grid, if yes push to neighbours array
//   let neighbours = [];
//   for (let newPosition of newPositions){
//     let newX = newPosition[0];
//     let newY = newPosition[1];
//     if (newX >= 0 && newX < gridSize && newY >= 0 && newY < gridSize) {
//       neighbours.push(newPosition);
//     }
//   }
//   console.log(neighbours);
//   return neighbours;
// }

// function getEmptyTilePosition(tilesObjectArray) {
//   for (let i = 0; i < tilesObjectArray.length; i++) {
//     let number = tilesObjectArray[i].number;
//     if (number === "0"){
//     console.log("withing empty tile function");
//     console.log(tilesObjectArray[i].position);
//     //return position of empty tile
//     return [i, tilesObjectArray[i].position];
//     }
//   }
// }

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

function isPuzzleSolved() {

}

function winMessage() {

}

