 gameStats = {
    population : 0,
    food : 0,
    wood : 0,
    iron : 0,
    skins : 0,
    plants : 0,
    ore: 0
}

evolveStats = {
    knowledge: 0,
    evolution: 0
}

function calculateEvolutionLevel(){
    switch(evolveStats.evolution){
        case 0: return "Tribe";
        case 1: return "Small Town"
        case 2: return "Big Town"
        case 3: return "City"
        case 4: return "Country"
        case 5: return "Empire"
        case 6: return "Space Civilization"
        case 7: return "Galactic Travelers"
        case 8: return "Galactic Empire"
        case 9: return "Evolved" 
    }
}