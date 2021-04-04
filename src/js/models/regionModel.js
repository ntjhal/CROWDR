import { ParkObject } from "./parkObjectModel.js";

export class Region {
    // name
    // tents (amount)
    // foodstands (amount)
    // drinkstands (amount)
    // trees ??
    // toilets (amount)
    // trashbins (amount)
    constructor(id) {
        this.id = id;
        this.name = `region${id}`; // temp
        this.parkObjects = [];
        this.locked = false;

        this.handleConfigAnswers();
    }

    handleConfigAnswers() {
        let answers = {};

        if (localStorage.answers !== undefined) {
            answers = JSON.parse(localStorage.answers);
        }

        this.name = answers['name'];
        this.generateParkObjects(
            Number(answers['tents']),
            Number(answers['eating_stalls']),
            Number(answers['drinking_stalls']),
            Number(answers['tree_high']),
            Number(answers['tree_wide']),
            Number(answers['tree_shadow']),
            Number(answers['toilet_stalls']),
            Number(answers['bins']),
        );
    }

    generateParkObjects(numberOfTents, numberOfFoodstands, numberOfDrinkstands, numberOfTreesHigh, numberOfTreesWide, numberOfTreesShadow, numberOfToilets, numberOfTrashcans) {
        // Tents
        for (let i = 0; i < numberOfTents; i++) {
            let tent = new ParkObject(this.parkObjects.length + 1, 'tent', 'src/images/Tent.png', 3, 3);
            tent.maxVisitors = 0;
            tent.openingtime = '00:00';
            tent.closingtime = '23:59';
            tent.width = 3; tent.height = 3;
            this.parkObjects.push(tent);
        }

        // Food
        for (let i = 0; i < numberOfFoodstands; i++) {
            let food = new ParkObject(this.parkObjects.length + 1, 'foodstand', 'src/images/Foodstand_3.png', 1, 1);
            food.maxVisitors = 0;
            food.foodtype = "";
            this.parkObjects.push(food);
        }

        // Drinks
        for (let i = 0; i < numberOfDrinkstands; i++) {
            let drink = new ParkObject(this.parkObjects.length + 1, 'drinkstand', 'src/images/Drinkstand.png', 1, 2);
            this.parkObjects.push(drink);
        }

        // Trees
        for (let i = 0; i < numberOfTreesHigh; i++) {
            let tree = new ParkObject(this.parkObjects.length + 1, 'tree_high', 'src/images/Tree.png', 1, 1);
            this.parkObjects.push(tree);
        }
        for (let i = 0; i < numberOfTreesWide; i++) {
            let tree = new ParkObject(this.parkObjects.length + 1, 'tree_wide', 'src/images/Tree.png', 1, 2);
            this.parkObjects.push(tree);
        }
        for (let i = 0; i < numberOfTreesShadow; i++) {
            let tree = new ParkObject(this.parkObjects.length + 1, 'tree_shadows', 'src/images/Tree.png', 3, 3);
            this.parkObjects.push(tree);
        }

        // Toilets
        for (let i = 0; i < numberOfToilets; i++) {
            let toilet = new ParkObject(this.parkObjects.length + 1, 'toiletbuilding', 'src/images/Toiletbuilding.png', 3, 1);
            this.parkObjects.push(toilet);
        }

        // Trashcans
        for (let i = 0; i < numberOfTrashcans; i++) {
            let trashcan = new ParkObject(this.parkObjects.length + 1, 'trashcan', 'src/images/trashcan.png', 1, 1);
            trashcan.capacity = 0;
            trashcan.timeBetweenEmpty = 10; 
            this.parkObjects.push(trashcan);
        }
    }
}
