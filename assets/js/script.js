/* jshint esversion: 11 */

let gridSize = 3;  //later: get from user with getGridSize()


  // HTML collection of tiles
  let gridTiles = document.getElementsByClassName("tile-js");

// // 1d array of tiles
// let tilesArray = [];
// for (let tile of gridTiles){
//   tilesArray.push(tile.textContent);
// }

// Add event listeners for tiles
for (let tile of gridTiles) {
  tile.addEventListener("click", function() {
    this.style.backgroundColor="red";
    console.log(this);
    let isNeighbour = isNeighbourEmpty(this);
    // let emptyTile = document.getElementsByClassName("empty-tile");
    // if (isNeighbourEmpty(this)){
    //   moveTile(this);
    // }
  });
}

/**
 * This function takes the HTML collection of tiles in the puzzle grid
 * and returns an array of tile objects which contain the coordinates 
 * as well as displayed numbers of the tiles
 * @param {*} gridTiles HTML collection of puzzle tiles
 * @returns array of tile objects
 */
function getTilesObjectArray(gridTiles){
  // grid coordinates for gridSize
  let coordinates = [];
  for (let i = 0; i < gridSize; i ++){
    for (let j = 0; j < gridSize; j++){
      coordinates.push([i, j]);
    }
  }
  // array of tiles objects to save grid position and assigned number
  let tilesObjectArray = [];
  for (let i = 0; i < gridTiles.length; i++){
    let tilesObject = {};
    tilesObject.position = coordinates[i];
    tilesObject.number = gridTiles[i].textContent;
    tilesObjectArray.push(tilesObject);
  }
  console.log(tilesObjectArray);
  return tilesObjectArray;
}

getTilesObjectArray(gridTiles);

function runGame() {

}

function getGridSize() {

}

function shuffle() {

}

function isSolvable() {

}

function getTile() {

}

function isNeighbourEmpty(tile) {
  let pos = tile.position;
  console.log(pos);
}

function moveTile() {

}

function incrementMoveCounter() {

}

function isPuzzleSolved() {

}

function winMessage() {

}

