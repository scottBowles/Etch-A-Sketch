

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

const colorSelector = document.querySelector('#colorSelect');

function addGivenColorListeners(arrayOfTiles, givenColor=colorSelector.value) {
  arrayOfTiles.forEach(element => {
    element.addEventListener('mouseover', () => {
      element.style.backgroundColor = givenColor;
    })
  });
}

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
    let arrayElement = arrayOfTiles[i]
    let rgbArray = [];
    if (arrayElement.style.backgroundColor == "") {
      rgbArray = ["255", "255", "255"];
    } else {
      rgbArray = arrayElement.style.backgroundColor.slice(4, -1).split(", ");
    }
    objectOfTiles[i] = {
      "countdown": 10,
      "redValue": +rgbArray[0],
      "greenValue": +rgbArray[1],
      "blueValue": +rgbArray[2],
    }
    arrayElement.addEventListener('mouseover', () => {
      index = arrayOfTiles.indexOf(arrayElement);
      objectOfTiles[index]["countdown"] -= 1;
      let newRedValue = objectOfTiles[index]["redValue"] * objectOfTiles[index]["countdown"] / 10;
      let newGreenValue = objectOfTiles[index]["greenValue"] * objectOfTiles[index]["countdown"] / 10;
      let newBlueValue = objectOfTiles[index]["blueValue"] * objectOfTiles[index]["countdown"] / 10;
      arrayElement.style.backgroundColor = 'rgb(' + Math.floor(newRedValue) + ', ' + Math.floor(newGreenValue) + ', ' + Math.floor(newBlueValue) + ')';
    });
  }
}


//    PUTTING IT TOGETHER

function constructPalette(squareDimension, mouseoverSelection){
  createGrid(squareDimension);
  let arrayOfTiles = createTileDivs(squareDimension);
  putTilesInGrid(arrayOfTiles);
  mouseoverSelection(arrayOfTiles);
  return arrayOfTiles;
}

let palette = {
  "squareDimension": 16,
  "arrayOfTiles": [],
  "mouseoverSelection": addGivenColorListeners,
}

arrayOfTiles = constructPalette(palette["squareDimension"], palette["mouseoverSelection"]);
palette["arrayOfTiles"] = [...arrayOfTiles];


//    CHANGE MOUSEOVER OPTION

const buttonRandomRGB = document.querySelector('#randomRGB');
buttonRandomRGB.addEventListener('click', function() {
  addRandomRGBListeners(palette["arrayOfTiles"]);
  palette["mouseoverSelection"] = addRandomRGBListeners;
});

const buttonFadeToBlack = document.querySelector('#fadeToBlack');
buttonFadeToBlack.addEventListener('click', function() {
  addFadeToBlackListeners(palette["arrayOfTiles"]);
  palette["mouseoverSelection"] = addFadeToBlackListeners;
});

//const colorSelector = document.querySelector('#colorSelect'); (Assigned above)
colorSelector.addEventListener('input', function() {
  let chosenColor = colorSelector.value
  addGivenColorListeners(palette["arrayOfTiles"], chosenColor);
  palette["mouseoverSelection"] = addGivenColorListeners;
});


//    RESET BUTTON
let input = "";
const resetButton = document.querySelector('#reset');
resetButton.addEventListener('click', () => resetClick());

function resetClick(promptVersion="firstPrompt") {
  let newDimension = "";
  if (promptVersion == "firstPrompt"){
    newDimension = prompt("Reset? Enter new resolution up to 64. For instance, '64' will result in a 64x64 square palette.");
  } else {
    newDimension = prompt("Invalid input. Enter new resolution up to 64, or press 'Cancel' to stay on current palette. For instance, '64' will result in a 64x64 square palette.");
  }
  if (newDimension === null | newDimension == "") {
    return "Cancelled";
  }else if (Number.isInteger(+newDimension) && (0 < +newDimension) && (+newDimension < 65)) {
    clearTiles();
    palette["arrayOfTiles"] = constructPalette(+newDimension, palette["mouseoverSelection"]);
    return palette["arrayOfTiles"];
  }else{
    resetClick("error");
  }
}

function clearTiles(){
  let container = document.querySelector('#paletteContainer');
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
}