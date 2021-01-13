// Create Dino Constructor
function Dino(species, weight, height, diet, where, when, fact) {
    this.species = species;
    this.weight = weight;
    this.height = height;
    this.diet = diet;
    this.where = where;
    this.when = when;
    this.fact = fact;
}

// Create Dino Objects
// Fetch object data from JSON
function fetchDinoData() {
    let arr = [];
    // returns a promise
    return fetch('./dino.json')
        .then(response => response.json())
        // array or Dino objects
        .then(data => {
            arr = data.Dinos.map(
                (item) =>
                    new Dino(
                        item.species,
                        item.weight
                    )
            );
            console.log(arr);
            return arr;
        })
        .catch(error => console.log(error))
        .finally(() => { });
}


// Create Human Object
function Human(name, height, weight, diet) {
    this.name = name;
    this.height = height;
    this.weight = weight;
    this.diet = diet;
}


// TODO: Use IIFE to get human data from form
const human = function getHumanData() {
    const name = document.getElementById('name').value;
    const feet = parseFloat(document.getElementById('feet').value);
    const inches = parseFloat(document.getElementById('inches').value);
    const weight = parseFloat(document.getElementById('weight').value);
    const diet = document.getElementById('diet').value;
    const height = feet * 12 + inches;
    //console.log(new Human(name, height, weight, diet));
    return new Human(name, height, weight, diet);
};


// Create Dino Compare Method 1
// NOTE: Weight in JSON file is in lbs, height in inches. 


// Create Dino Compare Method 2
// NOTE: Weight in JSON file is in lbs, height in inches.


// Create Dino Compare Method 3
// NOTE: Weight in JSON file is in lbs, height in inches.


// Generate Tiles for each Dino in Array

// Add tiles to DOM

// Remove form from screen


// On button click, prepare and display infographic


// IFFE to protect all variables  and run the program
(function () {
    let dinos = [];
    window.addEventListener('load', async () => {
        dinos = await fetchDinoData();
    });
    compareMeBtn = document.getElementById('btn');
    compareMeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        console.log('Btn clicked');
        // compare me code here
        console.log(human());
    })
})();
