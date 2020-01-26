/* These first three lines are here in case we need to change the 
container size is the future */
const root = document.querySelector(':root');
const boxDimensionPixels = 575;
root.style.setProperty('--box-dimension', boxDimensionPixels + 'px');




function createGrid(squareDimension) {
  const container = document.querySelector('#container');
  const gridTemplateText = "repeat(" + squareDimension + ", 1fr)";
  container.style.gridTemplateColumns = gridTemplateText;
  container.style.gridTemplateRows = gridTemplateText;
}

function createTileDivs(squareDimension) {
  let numberOfTiles = squareDimension**2;
  let arrayOfTiles = [];
  for (i=0; i<numberOfTiles; i++) {
    let tileDiv = document.createElement('div');
    arrayOfTiles[i] = tileDiv;
  }
  return arrayOfTiles;
}

function putTilesInGrid(arrayOfTiles) {
  for (const i in arrayOfTiles) {
    container.appendChild(arrayOfTiles[i]);
  }
}

function addTileMouseoverListeners(arrayOfTiles) {
  arrayOfTiles.forEach(element => {
    element.addEventListener('mouseover', () => {
      element.style.backgroundColor = 'grey';
    })
  });
}

function constructPalette(squareDimension){
  createGrid(squareDimension);
  let arrayOfTiles = createTileDivs(squareDimension);
  putTilesInGrid(arrayOfTiles);
  addTileMouseoverListeners(arrayOfTiles);
  return arrayOfTiles;
}

let squareDimension = 16;
let arrayOfTiles = constructPalette(squareDimension);



const resetButton = document.querySelector('#reset');

resetButton.addEventListener('click', resetClick);
  
function resetClick() {
  clearTiles();  
  let newDimension = +prompt("Reset? Enter new resolution up to 64. For instance, '64' will result in a 64x64 square palette.");
  if (Number.isInteger(newDimension) && (0 < newDimension < 65)) {
    arrayOfTiles = constructPalette(newDimension);
  }else{
    resetClick();
  }
  return arrayOfTiles;
}

function clearTiles(){
  for (i in arrayOfTiles) {
    container.removeChild(arrayOfTiles[i]);
  }
}