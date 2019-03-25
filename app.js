'use strict';

// Global Variables ----------------------------------------------

var allProducts = [];
var TotalClickCounter = 0;

var leftImage = document.getElementById('image1');
var middleImage = document.getElementById('image2');
var rightImage = document.getElementById('image3');
var imageSection = document.getElementById('busmall-images');


// Functions -----------------------------------------------------

function ProductSuccessSurvey (name, src ){
  this.name = name;
  this.productClickCounter = 0;
  this.timesDisplayed = 0;
  this.src = src;

  allProducts.push(this);
}


//  The function imageDisplayer also increments the .timesDisplayed property with respect to which three products are shown on the page.
function imageDisplayer(){
  var leftIndex = Math.floor(allProducts.length * Math.random());
  var middleIndex = Math.floor(allProducts.length * Math.random());
  var rightIndex = Math.floor(allProducts.length * Math.random());
  console.log(leftIndex);
  console.log(middleIndex);
  console.log(rightIndex);

  if(leftIndex === rightIndex || leftIndex === middleIndex || middleIndex === rightIndex) {
    console.log('Restart function because two of the same products were displayed');
    return;
  }

  allProducts[leftIndex].timesDisplayed++;
  allProducts[middleIndex].timesDisplayed++;
  allProducts[rightIndex].timesDisplayed++;

  leftImage.src = allProducts[leftIndex].src;
  middleImage.src = allProducts[middleIndex].src;
  rightImage.src = allProducts[rightIndex].src;

  var imageOneText = document.getElementById('productOneName');
  imageOneText.textContent = `${allProducts[leftIndex].name}`;
  var imageTwoText = document.getElementById('productTwoName');
  imageTwoText.textContent = `${allProducts[middleIndex].name}`;
  var imageThreeText = document.getElementById('productThreeName');
  imageThreeText.textContent = `${allProducts[rightIndex].name}`;


}

function clickHandler () {
  if(event.target.tagName !== 'IMG'){
    console.log('click on an image');
    return;
  }
  for(var i = 0; i < allProducts.length; i++){
    if(event.target.src.includes(allProducts[i].src)){
      console.log(`${allProducts[i].name} was picked!`);
      allProducts[i].productClickCounter++;
      TotalClickCounter++;
      console.log(TotalClickCounter);
      console.log(allProducts[i].productClickCounter);
      if(TotalClickCounter >= 25) {
        graphBuilder();
        localStorageCreator();
      }
    }
  }
  imageDisplayer();
}

function localStorageCreator() {
  var dataStringer = JSON.stringify(allProducts);
  localStorage.setItem('stringData', dataStringer);
}

//Chart
function graphBuilder() {

  var ctx = document.getElementById('myChart').getContext('2d');

  var barName = [];
  var dataHolder = [];

  for(var i = 0; i < allProducts.length; i++) {
    barName.push(allProducts[i].name);
    dataHolder.push(100 * (allProducts[i].productClickCounter / allProducts[i].timesDisplayed));

  }
  // var dataStringer = JSON.stringify(dataHolder);
  // localStorage.setItem('data', dataStringer);

  var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: barName,
      datasets: [{
        label: '% Approval',
        data: dataHolder,
        backgroundColor: [
          '#FF0000',
          '#00FF00',
          '#0000FF',
          '#FF0000',
          '#00FF00',
          '#0000FF',
          '#FF0000',
          '#00FF00',
          '#0000FF',
          '#FF0000',
          '#00FF00',
          '#0000FF',
          '#FF0000',
          '#00FF00',
          '#0000FF',
          '#FF0000',
          '#00FF00',
          '#0000FF',
          '#FF0000'
        ],
        borderColor: [
          '#00FF00',
          '#0000FF',
          '#FF0000',
          '#00FF00',
          '#0000FF',
          '#FF0000',
          '#00FF00',
          '#0000FF',
          '#FF0000',
          '#00FF00',
          '#0000FF',
          '#FF0000',
          '#00FF00',
          '#0000FF',
          '#FF0000',
          '#00FF00',
          '#0000FF',
          '#FF0000',
          '#00FF00'
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
}



// Instantiating -------------------------------------------------
if(localStorage.getItem('stringData') === null){
  new ProductSuccessSurvey('Bag', 'img/bag.jpg');
  new ProductSuccessSurvey('Banana', 'img/banana.jpg');
  new ProductSuccessSurvey('Bathroom', 'img/bathroom.jpg');
  new ProductSuccessSurvey('Boots', 'img/boots.jpg');
  new ProductSuccessSurvey('Breakfast', 'img/breakfast.jpg');
  new ProductSuccessSurvey('Bubblegum', 'img/bubblegum.jpg');
  new ProductSuccessSurvey('Chair', 'img/chair.jpg');
  new ProductSuccessSurvey('Cthulhu', 'img/cthulhu.jpg');
  new ProductSuccessSurvey('Dragon', 'img/dragon.jpg');
  new ProductSuccessSurvey('Pen', 'img/pen.jpg');
  new ProductSuccessSurvey('Pet-Sweep', 'img/pet-sweep.jpg');
  new ProductSuccessSurvey('Scissors', 'img/scissors.jpg');
  new ProductSuccessSurvey('Shark', 'img/shark.jpg');
  new ProductSuccessSurvey('Sweep', 'img/sweep.png');
  new ProductSuccessSurvey('Tauntaun', 'img/tauntaun.jpg');
  new ProductSuccessSurvey('Unicorn', 'img/unicorn.jpg');
  new ProductSuccessSurvey('USB', 'img/usb.gif');
  new ProductSuccessSurvey('Water-Can', 'img/water-can.jpg');
  new ProductSuccessSurvey('Wine-Glass', 'img/wine-glass.jpg');
} else {
  var dataStringer = localStorage.getItem('stringData');
  allProducts = JSON.parse(dataStringer);
}

imageSection.addEventListener('click', clickHandler);

imageDisplayer();

