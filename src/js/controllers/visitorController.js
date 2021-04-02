import { VisitorModel } from "../models/visitorModel.js";

export class VisitorController {
    constructor(visitorView) {
        this.visitorView = visitorView;
    }

    generateVisitor() {
        this.visitorModel = new VisitorModel();

        this.visitorModel.generateInfo()
            .then(data => {
                if (data === undefined) {
                    throw 'Failed to fetch visitor data!';
                }

                return data;
            })
            .then(v => {  
                let r = v.results[0];
                
                const data = {
                    firstname: r.name.first,
                    lastname: r.name.last,
                    gender: r.gender,
                    hometown: r.location.city
                };

                this.visitorView.render(data);
            })
            .catch(e => {
                alert(`Error: ${e}`)
            });
        }
}
