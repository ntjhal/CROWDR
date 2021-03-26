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
        for (let i; i < numberOfTents; i++) {
            let tent = new ParkObject(parkObjects.length, 'tent');
            tent.maxVisitors = undefined;
            tent.openingtime = '00:00';
            tent.closingtime = '00:01';
            parkObjects.push(tent);
        }
        //Food
        for (let i; i < numberOfFoodstands; i++) {
            let food = new ParkObject(parkObjects.length, 'foodstand');
            food.openingtime = '00:00';
            food.closingtime = '00:00';
            food.typeOfFood = undefined;
            parkObjects.push(food);
        }
        //Drinks
        for (let i; i < numberOfDrinkstands; i++) {
            let drink = new ParkObject(parkObjects.length, 'drinkstand');
            parkObjects.push(drink);
        }
        //Trees
        for (let i; i < numberOfTrees; i++) {
            let tree = new ParkObject(parkObjects.length, 'tree');
            parkObjects.push(tree);
        }
        //Toilets
        for (let i; i < numberOfToilets; i++) {
            let toilet = new ParkObject(parkObjects.length, 'toiletbuilding');
            parkObjects.push(toilet);
        }
        //Trashcans
        for (let i; i < numberOfTrashcans; i++) {
            let trashcan = new ParkObject(parkObjects.length, 'trashcan');
            trashcan.capacity = undefined;
            trashcan.timeBetweenEmpty = 10; 
            parkObjects.push(trashcan);
        }
    }


}