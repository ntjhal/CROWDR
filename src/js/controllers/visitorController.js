import { Visitor, VisitorGroup, VisitorModel } from "../models/visitorModel.js";

export class VisitorController {
    constructor() {
        this.visitorModel = new VisitorModel();
    }

    generateVisitorGroup() {
        let newGroupSize = Math.floor(Math.random() * 4) + 1;
        let newGroup = new VisitorGroup(newGroupSize); 

        this.visitorModel.generateInfo(newGroupSize)
            .then(data => {
                if (data === undefined) {
                    throw 'Failed to fetch visitor data!';
                }

                return data;
            })
            .then(v => {                 
                for(let r of v.results) {
                    let visitor = new Visitor(
                        r.name.first,
                        r.name.last,
                        r.gender,
                        r.location.city,
                        r.dob.age,
                    );
                
                    newGroup.visitors.push(visitor);
                }
                
            })
            .catch(e => {
                alert(`Error: ${e}`)
            });
        
        return newGroup;
    }

    saveGroup(group) {
        console.log(group)
    }
}
