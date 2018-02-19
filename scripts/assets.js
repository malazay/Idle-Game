class Unit {
    constructor(title, quantity, costMultiplier, produceList, upgradesList, description){
        this.title = title;
        this.quantity = quantity;
        this.costMultiplier = costMultiplier;
        this.produceList = produceList;
        this.upgradesList = upgradesList;
    }

    getCostToBuy(){
        return ((1 + this.quantity) * this.costMultiplier).toFixed(2);
    }

    add(){
        if (gameStats.food >= this.getCostToBuy()){
            this.quantity++;
            gameStats.food -= this.getCostToBuy();
        }
        drawOnClick();
    }

    produceHourly(){
        for (let i = 0; i < this.produceList.length; i++){
            gameStats[this.produceList[i].type] += this.getOutcomeValue(this.produceList[i]);
        }
    }

    getOutcomeValue(produceItem){
        return produceItem.value * this.quantity;
    }

    kill(){
        if (this.quantity > 0)
            this.quantity--;
    }
}

class Clicker {
    constructor(type, title, resource, costMultiplier, upgradesList){
        this.type = type;
        this.title = title;
        this.resource = resource;
        this.costMultiplier = costMultiplier;
        this.upgradesList = upgradesList;
    }

    addResource(){
        switch(this.type){
            case 'food': gameStats.food++;
            break;
            case 'wood': gameStats.wood++;
            break;
        }
        drawOnClick();
    }
}