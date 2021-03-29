import { ParkObject } from "./parkObjectModel.js";

export class Region {
    //name
    //tents (amount)
    //foodstands (amount)
    //drinkstands (amount)
    //trees ??
    //toilets (amount)
    //trashbins (amount)
    constructor(id) {
        this.id = id;
        this.name = `region${id}`; //temp
        this.parkObjects = [];
    }

    handleConfigAnswers() {
        let answers = {};
        if (localStorage.answers !== undefined) {
            answers = JSON.parse(localStorage.answers);
        }

        this.name = answers['q1'];
        this.generateParkObjects(
            Number(answers['q2']),
            Number(answers['q3']),
            Number(answers['q4']),
            Number(answers['q5']),
            Number(answers['q6']),
            Number(answers['q7'])
        );
        
    }

    generateParkObjects(numberOfTents, numberOfFoodstands, numberOfDrinkstands, numberOfTrees, numberOfToilets, numberOfTrashcans) {
        //Tents
        
        for (let i = 0; i < numberOfTents; i++) {
            let tent = new ParkObject(this.parkObjects.length + 1, 'tent', 'src/images/Tent.png', 3, 3);
            tent.maxVisitors = 0;
            tent.openingtime = '00:00';
            tent.closingtime = '00:01';
            tent.width = 3; tent.height = 3;
            this.parkObjects.push(tent);
        }
        //Food
        for (let i = 0; i < numberOfFoodstands; i++) {
            let food = new ParkObject(this.parkObjects.length + 1, 'foodstand', 'src/images/Foodstand_3.png', 1, 1);
            food.maxVisitors = 0;
            food.typeOfFood = null;
            this.parkObjects.push(food);
        }
        //Drinks
        for (let i = 0; i < numberOfDrinkstands; i++) {
            let drink = new ParkObject(this.parkObjects.length + 1, 'drinkstand', 'src/images/Drinkstand.png', 1, 2);
            this.parkObjects.push(drink);
        }
        //Trees
        for (let i = 0; i < numberOfTrees; i++) {
            let tree = new ParkObject(this.parkObjects.length + 1, 'tree', 'src/images/Tree.png', 1, 1);
            this.parkObjects.push(tree);
        }
        //Toilets
        for (let i = 0; i < numberOfToilets; i++) {
            let toilet = new ParkObject(this.parkObjects.length + 1, 'toiletbuilding', 'src/images/Toiletbuilding.png', 3, 1);
            this.parkObjects.push(toilet);
        }
        //Trashcans
        for (let i = 0; i < numberOfTrashcans; i++) {
            let trashcan = new ParkObject(this.parkObjects.length + 1, 'trashcan', 'src/images/trashcan.png', 1, 1);
            trashcan.capacity = 0;
            trashcan.timeBetweenEmpty = 10; 
            this.parkObjects.push(trashcan);
        }
    }


}