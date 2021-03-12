export class ConfigFormView {
    constructor(form) {
        this.formNode = form;

        // register events
        this.onNext = null;
        this.onReset = null;
    }

    renderQuestion(question) {
        // clear the form
        this.emptyDiv(this.formNode);

        let field = document.createElement('div');
        field.classList.add('field');
        
        let flexdiv = document.createElement('div');
        flexdiv.classList.add('horizontal');

        let input = document.createElement('input');
        input.id = input.name = `q${question.id}`;
        input.type = question.type;
        
        let button = document.createElement('button');
        button.textContent = 'Volgende';
        button.type = 'button';
        button.addEventListener('click', () => {
            this.onNext(question.id, input.value);
        });

        flexdiv.appendChild(input);
        flexdiv.appendChild(button);

        let label = document.createElement('label');
        label.textContent = question.question;
        label.htmlFor = input.id;

        field.appendChild(label);
        field.appendChild(flexdiv);

        // insert before the reset button
        this.formNode.insertBefore(field, this.resetBtn);
    }

    renderReset() {
        let button = document.createElement('button');
        button.type = 'button';
        button.id = 'reset';
        button.textContent = 'Begin opniuew';
        button.addEventListener('click', this.onReset);

        this.formNode.appendChild(button);
        this.resetBtn = button;
    }

    emptyDiv(div) {
        div.childNodes.forEach(child => {
            if (child.classList?.contains('field')) {
                div.removeChild(child);
            }
        });
    }
}
