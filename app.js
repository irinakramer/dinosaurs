// Create Dino Constructor
function Dino(species, weight, height, diet, where, when, fact) {
    this.species = species;
    this.weight = weight;
    this.height = height;
    this.diet = diet;
    this.where = where;
    this.when = when;
    this.fact = fact;
};

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
                        item.weight,
                        item.height,
                        item.diet,
                        item.where,
                        item.when,
                        item.fact
                    )
            );
            console.log(arr);
            return arr;
        })
        .catch(error => console.log(error))
        .finally(() => { });
};


// Create Human Object
function Human(name, height, weight, diet) {
    this.name = name;
    this.height = height;
    this.weight = weight;
    this.diet = diet;
};


// Get human data from form
function getHumanData() {
    const name = document.getElementById('name').value;
    const feet = parseFloat(document.getElementById('feet').value);
    const inches = parseFloat(document.getElementById('inches').value);
    const weight = parseFloat(document.getElementById('weight').value);
    const diet = (document.getElementById('diet').value).toLowerCase();
    const height = feet * 12 + inches;
    return new Human(name, height, weight, diet);
};


// Create Dino Compare Method 1
// NOTE: Weight in JSON file is in lbs, height in inches. 
Dino.prototype.compareWeight = function (human) {
    const weightRatio = (this.weight / human.weight).toFixed(1);
    if (this.species === 'Pigeon') {
        return;
    } else if (weightRatio > 1) {
        return `${this.species} weights ${weightRatio} times more than you.`;
    } else if (weightRatio < 1) {
        return `You weigh ${human.weight - this.weight} pounds more than ${this.species}.`;
    } else if (weightRatio === 1) {
        return `You weigh the same as ${this.species}.`;
    }
};


// Create Dino Compare Method 2
// NOTE: Weight in JSON file is in lbs, height in inches.
Dino.prototype.compareHeight = function (human) {
    const heightRatio = (this.height / human.height).toFixed(1);
    if (this.species === 'Pigeon') {
        return;
    } else if (heightRatio > 1) {
        return `${this.species} is ${heightRatio} times taller than you.`;
    } else if (heightRatio < 1) {
        return `You are ${human.height - this.height} inches taller than ${this.species}.`;
    } else if (heightRatio === 1) {
        return `You are the same height as ${this.species}.`;
    }
};

// Create Dino Compare Method 3
// NOTE: Weight in JSON file is in lbs, height in inches.
Dino.prototype.compareDiet = function (human) {
    if (this.species === 'Pigeon') {
        return;
    } else if (this.diet === human.diet) {
        return `Both ${this.species} and you are ${this.diet}s.`;
    } else {
        return `You are a ${human.diet}, but ${this.species} is a ${this.diet}.`;
    }
};



// Generate Tiles for each Dino in Array
function createDinoTile(dino, human) {
    let randomFact;

    // Pigeon always has same fact, so we assign case to 0
    //      and get Pigeon's fact directly from the array.
    // For the rest random number 1 through 5

    const randomNum = dino.species === 'Pigeon' ? 0 : Math.round(Math.random() * 5);
    console.log("createDinoTile", dino);

    switch (randomNum) {
        case 0:
            randomFact = `${dino.fact}`;
            break;
        case 1:
            randomFact = `${dino.compareWeight(human)}`;
            break;
        case 2:
            randomFact = `${dino.compareHeight(human)}`;
            break;
        case 3:
            randomFact = `${dino.compareDiet(human)}`;
            break;
        case 4:
            randomFact = `The ${dino.species} lived in ${dino.where}.`;
            break;
        case 5:
            randomFact = `The ${dino.species} lived in ${dino.when} period.`;
            break;
        default:
            randomFact = `Charming Dinosaurs!`;
    }

    // build div
    const div = document.createElement('div');
    div.className = ('grid-item');
    div.innerHTML = `<h3>${dino.species}</h3><img src="images/${(dino.species).toLowerCase()}.png" alt="${dino.species}"><p>${randomFact}</p>`;

    return div;
}

function createHumanTile(human) {
    const div = document.createElement('div');
    div.className = ('grid-item');
    div.innerHTML = `<h3>${human.name}</h3><img src="images/human.png" alt="${human.name}">`;

    return div;
}

// Add tiles to DOM
function createGrid(dinos, human) {
    let grid = document.getElementById('grid');
    dinos.forEach((dino, index) => {
        if (index === 4) {
            let gridItemHuman = createHumanTile(human);
            grid.append(gridItemHuman);
        }
        const gridItem = createDinoTile(dino, human);
        grid.append(gridItem);
    });

    // add repeat btn
    const repeatBtn = document.getElementById('repeat-btn');
    repeatBtn.style.display = 'block';
}

async function compare(e) {
    e.preventDefault();
    // Remove form from screen
    document.getElementById('dino-compare').style.display = 'none';
    const dinos = await fetchDinoData();
    console.log(dinos);
    const human = getHumanData();
    // form validation
    if (human.name === "") {
        alert("Please enter name.");
        reset();
        return;
    } else if (human.height < 1) {
        alert("Please enter number greater than 0.");
        reset();
        return;
    } else if (human.weight < 1) {
        alert("Please enter number greater than 0.");
        reset();
        return;
    }

    // create grid
    createGrid(dinos, human);

}

function reset() {
    document.getElementById('grid').innerHTML = '';
    document.getElementById('repeat-btn').style.display = 'none';
    document.getElementById('dino-compare').reset();
    document.getElementById('dino-compare').style.display = 'block';
}


// On button click, prepare and display infographic
// IFFE to protect all variables and run the program
(function () {
    const compareMeBtn = document.getElementById('btn');
    const repeatBtn = document.getElementById('repeat-btn');
    compareMeBtn.addEventListener('click', compare);
    repeatBtn.addEventListener('click', reset);
})();
