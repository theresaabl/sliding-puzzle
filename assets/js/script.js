/* jshint esversion: 11 */


// Add event listeners for tiles

// HTML collection of tiles
let gridPositions = document.getElementsByClassName("position");
console.log(gridPositions);
// 1d array of tiles
let gridSize = 3;
let tilesArray1d = [];
for (let tile of gridPositions){
  tilesArray1d.push(tile.textContent);
}
console.log(tilesArray1d);
// grid coordinates for gridSize
let coordinates = [];
for (let i = 0; i < gridSize; i ++){
  for (let j = 0; j < gridSize; j++){
    coordinates.push([i, j]);
  }
}
console.log(coordinates);

// array of tiles objects to save grid position and assigned number
let tilesObjectArray = [];
for (let i = 0; i < gridPositions.length; i++){
  let tilesObject = {};
  tilesObject.position = coordinates[i];
  tilesObject.number = gridPositions[i].textContent;
  tilesObjectArray.push(tilesObject);
}
console.log(tilesObjectArray);

for (let tile of gridPositions) {
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

