var populationUnits = [];
var clickers = [];

function startGame(){
    createUnits();
    createClickers();
}

function createClickers(){
    var foodClicker = new Clicker('food', 'Gather Food',{type: 'food', value: 1}, 1.75,[]);
    clickers.push(foodClicker);
    var woodClicker = new Clicker('wood', 'Gather Wood',{type: 'wood', value: 1}, 2.75,[]);
    clickers.push(woodClicker);
}

function createUnits(){
    var gatherer = new Unit('Gatherer', 0, 1.15, [{type: 'food', value: 1}, {type: 'wood', value: 0.3}], []);
    var hunther = new Unit('Hunther', 0, 1.35, [{type: 'food', value: 0.5}, {type: 'skins', value: 0.1}], []);
    var healer = new Unit('Healer', 0, 1.35, [{type: 'food', value: -0.5}, {type: 'plants', value: 0.1}], []);
    populationUnits.push(gatherer);
    populationUnits.push(hunther);
    populationUnits.push(healer);
}

function calculatePopulation(){
    var populationQuantity = 0;
    for (var i = 0; i < populationUnits.length; i++){
        populationQuantity += populationUnits[i].quantity;
    }
    gameStats.population = populationQuantity;
}

function addFood(){
    gameStats++;
}

function calculateHourly(){
    for (var i = 0; i < populationUnits.length; i++){
        populationUnits[i].produceHourly();
    }
}

startGame();

