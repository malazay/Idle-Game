function drawHourly(){
    drawTimer();
}

function drawOnClick(){
    drawStats();
    drawPopulationCostUpdates();
}

function drawAtStart(){
    drawStats();
    drawClickers();
    drawPopulationButtons();
    drawBuildingButtons();
}

function drawTimer(){
    var timer = document.getElementById("timer")
    timer.innerText = `Day ${gameTimeData.day} of ${getSeasonName(gameTimeData.season)}, Year ${gameTimeData.year}`;
    calculatePopulation();
    drawStats();
}

function drawStats(){
    var gameStatsElement = document.getElementById("game-stats");
    var statsContent = "";
    for (key in gameStats) {
        statsContent += `<li>${key}: ${gameStats[key].toFixed(2)}</li>`
    }
    gameStatsElement.innerHTML = statsContent;
}

function drawClickers(){
    var clickersList = document.getElementById("game-clickers");
    for (let i=0; i < clickers.length; i++){
        var item = document.createElement('li');
        item.classList.add("collection-item");
        item.innerHTML = `<button class="waves-effect waves-light btn-large">${clickers[i].title}</button>`
    
        item.onclick = function(){
            clickers[i].addResource();
        }
        clickersList.appendChild(item);
    }
}

function drawPopulationButtons(){
    var populationBuyersList = document.getElementById("game-population");
    populationBuyersList.innerHTML = "";
    for (let i = 0; i < populationUnits.length; i++){
        var item = document.createElement('li');
        item.classList.add("collection-item");
        item.innerHTML = `
        <button class="waves-effect waves-light btn-large">
            <i class="material-icons left">add</i> ${populationUnits[i].title}
        </button> - <span id="${populationUnits[i].title}-cost">Buy 1 for ${populationUnits[i].getCostToBuy()} food</span>`
        item.onclick = function(){
            populationUnits[i].add();
        }
        populationBuyersList.appendChild(item);
    }
}

function drawPopulationCostUpdates(){
    for (let i = 0; i < populationUnits.length; i++){
        var populationCost = document.getElementById(`${populationUnits[i].title}-cost`);
        if (populationCost){
            populationCost.innerText = `Buy 1 for ${populationUnits[i].getCostToBuy()} food`
        }
    }
}

function drawBuildingButtons(){
    console.log('Draw buildings')
    var buildingBuyersList = document.getElementById("game-buildings");
    for (let i=0; i < buildingUnits.length; i++){
        var item = document.createElement('li');
        item.classList.add("collection-item");
        item.innerHTML = `
        <button class="waves-effect waves-light btn-large">
            <i class="material-icons left">add</i> ${buildingUnits[i].title}
        </button> - <span id="${buildingUnits[i].title}-cost">Buy 1 for 1 food</span>`;
        // item.onclick = function(){
        //     populationUnits[i].add();
        // }
        buildingBuyersList.appendChild(item);
    }
}

drawAtStart();