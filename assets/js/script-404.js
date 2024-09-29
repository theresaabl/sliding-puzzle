/* jshint esversion: 11 */

// Add event listeners for tiles once Dom content is loaded
document.addEventListener("DOMContentLoaded", function() {
    //create error message in 404 page
    errorMessage();
});

//generate and display error message on 404 page
function errorMessage(){
    let error = document.getElementById("error-message");
    let errorHTML = "";
    let gridSize = 8;
    for (let i = 1; i < gridSize * gridSize; i++) {
      errorHTML += `<div class="tile-style tile-js"><p>${i}</p></div>`;
    }
    errorHTML += '<div class="empty-tile tile-js"><p>0</p></div>';
    document.getElementById("error-message").innerHTML = errorHTML;
    //set styles for grid
    //calculate column-width depending on gridSize as a percentage
    error.style.gridTemplateColumns = `${100 / gridSize}%`.repeat(gridSize);
}