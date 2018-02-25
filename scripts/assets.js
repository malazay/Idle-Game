//All assets share common properties, like name, quantity, how much does it cost, what does it produce, what upgrades does it have, is it available, etc...
class Unit {
    constructor(name, quantity, resourcesList, costList, upgradesList, isAvailable, icon) {
        this.name = name;
        this.quantity = quantity;
        this.resourcesList = resourcesList;
        this.costList = costList;
        this.upgradesList = upgradesList;
        this.isAvailable = isAvailable;
        this.canBuy = false;
        this.icon = icon;
    }
    add() {
        this.quantity++;
    }
    updateCostToBuy() {
        for (var i = 0; i < this.costList.length; i++) {
            this.costList[i].amount = Math.round(Math.pow(this.costList[i].amount + this.quantity, this.costList[i].buyModifier));
        }
    }
    upgradeResource(name, amount){
        for (var i = 0; i < this.resourcesList.length; i++){
            if (name === this.resourcesList[i].type){
                this.resourcesList[i].amount *= amount;
                return;
            }
        }
        console.log(`Resource ${name} not found`);
    }

    getPlural(){
        return this.name + "s";
    }
}

class Building extends Unit {
    constructor(name, quantity, resourcesList, costList, upgradesList, isAvailable, icon, unitTrainList){
        super(name, quantity, resourcesList, costList, upgradesList, isAvailable, icon);
        this.unitTrainList = unitTrainList;
    }

    sayShit(){
        console.log("Say shit bitch")
    }
}

class Resource {
    constructor(type, amount){
        this.type = type;
        this.amount = amount;
    }
}

class Cost {
    constructor(type, amount, buyModifier){
        this.type = type;
        this.amount = amount;
        this.buyModifier = buyModifier;
    }
}

class Upgrade {
    constructor(typeList, costList, bonusList, title, icon, description, isAvailable) {
        this.typeList = typeList;
        this.costList = costList;
        this.bonusList = bonusList;
        this.title = title;
        this.icon = icon;
        this.description = description;
        this.canBuy = false;
        this.isAvailable = isAvailable;
    }
}