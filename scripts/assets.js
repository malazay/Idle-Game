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
    upgrade(resource) {
        // This will upgrade the resource in resource list
        // new Upgrade([{type: 'unit', name: 'gatherer'}], [{type: 'wood', amount: 100}], [{type: 'food', amount: 2}], 'Build wooden tools for Gatherers')
        for (var i = 0; i < this.resourcesList.length; i++) {
            if (this.resourcesList[i].type == resource.type) {
                this.resourcesList[i].amount *= resource.amount;
            }
        }
    }

    getPlural(){
        return this.name + "s";
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
    constructor(type, costList, bonus, title, icon, description, isAvailable) {
        this.type = type;
        this.costList = costList;
        this.bonus = bonus;
        this.title = title;
        this.icon = icon;
        this.description = description;
        this.canBuy = false;
        this.isAvailable = isAvailable;
    }
}