
//    PALETTE CONSTRUCTION FUNCTIONS

function createGrid(squareDimension) {
  const container = document.querySelector('#paletteContainer');
  const gridTemplateText = "repeat(" + squareDimension + ", 1fr)";
  container.style.gridTemplateColumns = gridTemplateText;
  container.style.gridTemplateRows = gridTemplateText;
}

function createTileDivs(squareDimension) {
  let numberOfTiles = squareDimension**2;
  let arrayOfTiles = [];
  for (i=0; i<numberOfTiles; i++) {
    let tileDiv = document.createElement(`div${i}`);
    arrayOfTiles[i] = tileDiv;
  }
  return arrayOfTiles;  
}

function putTilesInGrid(arrayOfTiles) {
  for (const i in arrayOfTiles) {
    paletteContainer.appendChild(arrayOfTiles[i]);
  }
}

//    TILE MOUSEOVER OPTIONS

function addRandomRGBListeners(arrayOfTiles) {
  let rgb = '';
  arrayOfTiles.forEach(element => {
    element.addEventListener('mouseover', () => {
      rgb = 'rgb(' + Math.floor(Math.random()*255) + ', ' + Math.floor(Math.random()*255) + ', ' + Math.floor(Math.random()*255);
      element.style.backgroundColor = rgb;
    })
  });
}

function addFadeToBlackListeners(arrayOfTiles) {
  let objectOfTiles = {};
  for (i in arrayOfTiles) {
    objectOfTiles[i] = 10;
  }
  for (i in arrayOfTiles) {
    let arrayElement = arrayOfTiles[i]
    arrayElement.addEventListener('mouseover', () => {
      index = arrayOfTiles.indexOf(arrayElement)
      objectOfTiles[index] -= 1;
      let rgbValue = objectOfTiles[index] * 255 / 10;
      arrayElement.style.backgroundColor = 'rgb(' + rgbValue + ', ' + rgbValue + ', ' + rgbValue + ')';
    });
  }
  return objectOfTiles;
}

function addTileToGreyListeners(arrayOfTiles) {
  arrayOfTiles.forEach(element => {
    element.addEventListener('mouseover', () => {
      element.style.backgroundColor = '#787878';
    })
  });
}

//    PUTTING IT TOGETHER

function constructPalette(squareDimension=16, tileMouseoverOption=addTileToGreyListeners){
  createGrid(squareDimension);
  let arrayOfTiles = createTileDivs(squareDimension);
  putTilesInGrid(arrayOfTiles);
  let objectOfTiles = tileMouseoverOption(arrayOfTiles);
  return arrayOfTiles;
}

let arrayOfTiles = constructPalette();

//    CHANGE MOUSEOVER OPTION

let mouseoverSelection = addTileToGreyListeners;

function getCurrentTiles() {
  const container = document.querySelector('#paletteContainer');
  let arrayOfTiles = [...container.children];
  return arrayOfTiles;
}

const buttonRandomRGB = document.querySelector('#randomRGB');
buttonRandomRGB.addEventListener('click', addRandomRGBListeners(getCurrentTiles()));

const buttonFadeToBlack = document.querySelector('#fadeToBlack');
buttonFadeToBlack.addEventListener('click', addFadeToBlackListeners(getCurrentTiles()));



//    RESET BUTTON

const resetButton = document.querySelector('#reset');

resetButton.addEventListener('click', resetClick);
  
function resetClick() {
  let newDimension = prompt("Reset? Enter new resolution up to 64. For instance, '64' will result in a 64x64 square palette.");
  if (newDimension === null) {
    return "Cancelled";
  }else if (Number.isInteger(+newDimension) && (0 < +newDimension < 65)) {
    clearTiles();
    arrayOfTiles = constructPalette(+newDimension, addRandomRGBListeners);
    return arrayOfTiles;
  }else{
    resetClick();
    return "Invalid Input"
  }
}

function clearTiles(){
  let container = document.querySelector('#paletteContainer');
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
}