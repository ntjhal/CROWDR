import { Visitor, VisitorGroup } from "../models/visitorModel.js";

export class VisitorController {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        this.init();
    }

    init() {
        this.view.onShow = this.getVisitor.bind(this);
    }

    async getVisitor() {
        await this.model.getVisitor()
            .then(data => {
                if (data === undefined) {
                    throw 'Failed to fetch visitor data!';
                }

                return data;
            })
            .then(v => {     
                this.view.render(v.results[0]);
            })
            .catch(e => {
                alert(e);
            });
    }

    async generateVisitorGroup() {
        let newGroupSize = Math.floor(Math.random() * 4) + 1;
        let newGroup = new VisitorGroup(newGroupSize); 

        await this.model.generateInfo(newGroupSize)
            .then(data => {
                if (data === undefined) {
                    throw 'Failed to fetch visitor data!';
                }

                return data;
            })
            .then(v => {                 
                for (let r of v.results) {
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
                alert('Failed to fetch visitor data!');
            });
        
        return newGroup;
    }
}
