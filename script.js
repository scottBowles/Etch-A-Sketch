function createDivs(numberOfDivs) {
  let arrayOfDivs = []
  for (i=0; i<numberOfDivs; i++) {
    let newDiv = document.createElement('div');
    arrayOfDivs[i] = newDiv;
  }
  return arrayOfDivs
}

let squareDimension = 16;
let numberOfDivs = squareDimension**2;
let arrayOfDivs = createDivs(numberOfDivs);

const root = document.querySelector(':root');
const boxDimensionPixels = 575;
root.style.setProperty('--box-dimension', boxDimensionPixels + 'px');

const gridTemplateText = "repeat(" + squareDimension + ", 1fr)"

const container = document.querySelector('#container');
container.style.gridTemplateColumns = gridTemplateText;
container.style.gridTemplateRows = gridTemplateText;

for (const i in arrayOfDivs) {
  arrayOfDivs[i].classList.add('tile');
}

for (const i in arrayOfDivs) {
  container.appendChild(arrayOfDivs[i]);
}

arrayOfDivs.forEach(element => {
  element.addEventListener('mouseover', () => {
    element.style.backgroundColor = 'grey';
  })
});


