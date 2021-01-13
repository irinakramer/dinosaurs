// Fetch object data from JSON

function fetchDinoData() {
    fetch('./dino.json')
        .then(response => response.json())
        .then(data => {
            dinos = data;
            console.log(dinos);
            return dinos;
        })
        .catch(error => console.log(error))
        .finally(() => { });
}


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
    })
})();

// Create Dino Constructor


// Create Dino Objects


// Create Human Object

// Use IIFE to get human data from form


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