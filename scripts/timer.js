var SPEED = 1000;

var gameTimeData = {
    hour: 1,
    day: 1,
    season: 1,
    year: 0
};

var game = setInterval(function () {
    addHour();  
}, SPEED )

function addHour() {
    if (gameTimeData.hour !== 24){
        gameTimeData.hour++;
    }else{
        gameTimeData.hour = 1;
        addDay();
    }
    drawHourly();
    calculateHourly();
}

function addDay() {
    if (gameTimeData.day < 90){
        gameTimeData.day++;
    }else{
        gameTimeData.day = 1;
        addSeason();
    }
}

function addSeason() {
    if (gameTimeData.season !== 4){
        gameTimeData.season++;
    }else{
        gameTimeData.season = 1;
        gameTimeData.year++;
    }
}

function getSeasonName(){
    switch(gameTimeData.season){
        case 1:
            return "Summer";
        case 2:
            return "Autumn";
        case 3:
            return "Winter";
        case 4:
            return "Spring";
        default:
            return "Invalid season!"
    }
}