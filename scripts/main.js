const app = new Vue({
    el: "#app",
    data: {
        timer: {
            hour: 1,
            day: 1,
            season: 1,
            year: 0
        },
        requirements: {
            default: ['gatherer', 'hunter'],
            stoneTools: ['warrior', 'builder']
        },
        stats: {
            population: 0,
            food: 0,
            wood: 0,
            iron: 0,
            leather: 0,
            stone: 0,
        },
        units: [
            new Unit('gatherer', 0, [new Resource('food', 1), new Resource('wood', 1)], [{
                type: 'food',
                amount: 10,
                buyModifier: 1.01
            }], [], true, 'gatherer.svg'),
            new Unit('hunther', 0, [new Resource('food', 2)], [{
                type: 'food',
                amount: 11,
                buyModifier: 1.01
            }, {
                type: 'wood',
                amount: 20,
                buyModifier: 1.02
            }], [], true, 'branch-arrow.svg'),
            new Unit('warrior', 0, [new Resource('food', 1)], [{
                type: 'food',
                amount: 10,
                buyModifier: 1.3
            }], [], false, 'warrior.svg'),
            new Unit('builder', 0, [new Resource('food', 1)], [{
                type: 'food',
                amount: 10,
                buyModifier: 1.3
            }], [], false, 'builder.svg'),
            new Unit('archer', 0, [new Resource('food', 1)], [{
                type: 'food',
                amount: 10,
                buyModifier: 1.3
            }], [], false, 'bowman.svg'),
            new Unit('healer', 0, [new Resource('food', 1)], [{
                type: 'food',
                amount: 10,
                buyModifier: 1.5
            }], [], false, 'trival-mask.svg'),
        ],
        upgrades: [
            new Upgrade([{
                type: 'unit',
                name: 'gatherer'
            }], [{
                type: 'wood',
                amount: 100
            }], [{
                type: 'food',
                amount: 2
            }], 'Build stone tools for Gatherers', 'stone-axe.svg', 'Stone axes are way better than hands!', true),
            new Upgrade([{
                type: 'unit',
                name: 'hunther'
            }], [{
                type: 'wood',
                amount: 500
            }], [{
                type: 'food',
                amount: 2
            }], 'Discover spears for Hunthers', 'caveman.svg', 'No animal is too much now! more food!', true),
            new Upgrade([{
                type: 'unit',
                name: 'gatherer'
            }, {
                type: 'unit',
                name: 'hunther'
            }], [{
                type: 'wood',
                amount: 500
            }, {
                type: 'food',
                amount: 500
            }], [{
                type: 'food',
                amount: 2
            }, {
                type: 'wood',
                amount: 2
            }], 'Domesticate animals', 'bison.svg', "With help of beasts Hunthers and Gatherers produce more food and wood", true)
        ],
        buildings: [
            new Building('barrack', 0, [], [{
                type: 'food',
                amount: 1000}, {type: 'wood', 'amount' : 1000}, {type: 'stone', 'amount' : 1000}], [], true, 'gatherer.svg', 'warrior')
        ],
        canBuyList: [],
        clickerAvailable: ['food', 'wood', 'stone'],
        resourceGeneration: {
            food: 0,
            wood: 0,
            iron: 0,
            leather: 0,
            stone: 0,
        },
        purchasedUpgrades: []
    },
    methods: {
        addResource(resource) {
            this.stats[resource] += 1;
            this.updateCanBuy();
        },
        addUnit(unit) {
            if (this.canBuy(unit)) {
                unit.add();
                unit.costList.every(this.spendResource);
                unit.updateCostToBuy();
                this.updateCanBuy()
            } else {
                console.log("Not enough resources")
            }
        },
        buyUpgrade(upgrade) {
            //costList if tiene recursos suficientes
            this.upgradeUnit(upgrade);
        },
        upgradeUnit(upgrade){
            if (upgrade.canBuy) {
                for (var i = 0; i < upgrade.typeList.length; i++) {
                    var unit = upgrade.typeList[i];
                    //iterates through the list of units that will be upgraded
                    for (var j = 0; j < upgrade.bonusList.length; j++) {
                        var bonus = upgrade.bonusList[j];
                        //iterates through the list of bonuses
                        var unitToUpgrade = this.findObjectByKey(this.units, 'name', unit.name);
                        var resourceToUpgrade = this.findObjectByKey(unitToUpgrade.resourcesList, 'type', bonus.type);
                        if (!resourceToUpgrade){
                            unitToUpgrade.resourcesList.push({'type': bonus.type, 'amount': 1});
                            // resourceToUpgrade = this.findObjectByKey(unitToUpgrade.resourcesList, 'type', bonus.type);
                        }
                        unitToUpgrade.upgradeResource(bonus.type, bonus.amount);
                    }
                }
                for(var i = 0; i < upgrade.costList.length; i++){
                    this.spendResource(upgrade.costList[i]);
                }
                this.purchasedUpgrades.push(upgrade.title);
            }
        },
        makeUnitAvailable(index) {
            this.units[index].isAvailable = true;
        },
        //Timer functions
        addHour() {
            if (this.timer.hour !== 24) {
                this.timer.hour++;
            } else {
                this.timer.hour = 1;
                this.addDay();
            }
        },
        addDay() {
            if (this.timer.day < 90) {
                this.timer.day++;
            } else {
                this.timer.day = 1;
                this.addSeason();
            }
        },
        addSeason() {
            if (this.timer.season !== 4) {
                this.timer.season++;
            } else {
                this.timer.season = 1;
                this.timer.year++;
            }
        },
        enoughResourceToBuy(resource) {
            //Verifies if the resoruce needed amount is available in stats 
            return this.stats[resource.type] >= resource.amount;
        },
        canBuy(asset) {
            //Return true if every resource in the cost list is available
            return asset.costList.every(this.enoughResourceToBuy);
        },
        spendResource(resource) {
            //Spends the resource
            this.stats[resource.type] -= resource.amount;
        },
        updateCanBuy() {
            this.canBuyList = []
            for (var i = 0; i < this.units.length; i++) {
                var unit = this.units[i];
                if (unit.isAvailable && this.canBuy(unit)) {
                    this.canBuyList.push(unit.name);
                    unit.canBuy = true;
                } else {
                    unit.canBuy = false;
                }
            }
            for (var i = 0; i < this.upgrades.length; i++) {
                var upgrade = this.upgrades[i];
                if (upgrade.isAvailable && this.canBuy(upgrade)) {
                    this.canBuyList.push(upgrade.title);
                    upgrade.canBuy = true;
                } else {
                    upgrade.canBuy = false;
                }
            }
        },
        resourcesPerHour() {
            for (var i = 0; i < this.units.length; i++) {
                var unit = this.units[i];
                for (var j = 0; j < unit.resourcesList.length; j++) {
                    var resource = unit.resourcesList[j];
                    this.stats[resource.type] += (resource.amount * unit.quantity);
                    this.updateCanBuy();
                }
            }
            this.calculateResourceGeneration();
        },
        calculateResourceGeneration() {
            var resourceDict = {
                food: 0,
                wood: 0,
                iron: 0,
                leather: 0,
                stone: 0,
            }
            for (var i = 0; i < this.units.length; i++) {
                var unit = this.units[i];
                for (var j = 0; j < unit.resourcesList.length; j++) {
                    var resource = unit.resourcesList[j];
                    resourceDict[resource.type] += (resource.amount * unit.quantity);
                }
            }
            this.resourceGeneration = resourceDict;
        },
        calculatePopulation() {
            var pop = 0;
            for (var i = 0; i < this.units.length; i++){
                pop+=this.units[i].quantity;
            }
            this.stats.population = pop;
        },
        findObjectByKey(array, key, value) {
            for (var i = 0; i < array.length; i++) {
                if (array[i][key] === value) {
                    return array[i];
                }
            }
            return null;
        }
    },
    filters: {
        seasonName: function (value) {
            switch (value) {
                case 1:
                    return 'Summer';
                case 2:
                    return 'Autumn';
                case 3:
                    return 'Winter';
                case 4:
                    return 'Spring';
                default:
                    return 'Invalid Season Number';
            }
        },
        stringifyMaterials: function (materialList) {
            var stringified = "";
            var length = materialList.length;
            for (var i = 0; i < length; i++) {
                var name = materialList[i].type;
                var amount = materialList[i].amount;
                stringified += `${amount} ${name}`
                if ((i + 1) < length)
                    stringified += ", "
            }
            return stringified
        },
        formatNumber(value) {
            if (value === 0)
                return 0;
            return parseFloat(Math.round(value * 100) / 100).toFixed(2);
        },
        formatPerSecond(value) {
            if (value === 0)
                return "";
            return `${value}/s`
        }
    },
    beforeMount() {
        var game = setInterval(function () {
            this.addHour();
            this.resourcesPerHour();
            this.calculatePopulation();
        }.bind(this), 1000)
    },
    mounted() {
        this.updateCanBuy();
        this.calculateResourceGeneration();
    }
})

Vue.config.devtools = true;