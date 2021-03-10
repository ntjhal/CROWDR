import { VisitorModel } from "../models/visitorModel.js";

export class VisitorController {
    constructor(visitorView) {
        this.visitorView = visitorView;
    }

    generateVisitor() {
        this.visitorModel = new VisitorModel();

        this.visitorModel.generateInfo()
            .then(v => {  
                
                let r = v.results[0];
                
                const data = {
                    firstname: r.name.first,
                    lastname: r.name.last,
                    gender: r.gender,
                    hometown: r.location.city
                };

                console.log(this.visitorView);

                this.visitorView.render(data);
            })
            .catch(e => {
                alert('Visitor not found!');
            });
        }
}
