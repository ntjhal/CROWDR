import { Visitor, VisitorGroup } from "../models/visitorModel.js";

export class VisitorController {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.visitors = [];

        this.init();
    }

    init() {
        this.view.onShow = this.getVisitor.bind(this);
    }

    checkList(controller) {
        if (controller.visitors.length <= 4) {
            controller.fillVisitorList();
        }
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
                console.log(e);
            });
    }

    async fillVisitorList() {
        await this.model.generateInfo(3000)
            .then(data => {
                if (data === undefined) {
                    throw 'Failed to fetch visitor data!';
                }
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
                
                    this.visitors.push(visitor);
                }
            })
            .catch(e => {
                console.log('Failed to fetch visitor data!');
                return null;
            });
    }
}
