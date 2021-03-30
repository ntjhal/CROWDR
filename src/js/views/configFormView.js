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
        button.textContent = 'Next';
        button.type = 'button';
        button.addEventListener('click', () => {
            this.onNext(question, input.value);
        });

        flexdiv.appendChild(input);
        flexdiv.appendChild(button);

        let errorDiv = document.createElement('div');
        this.errorDiv = errorDiv;

        let label = document.createElement('label');
        label.textContent = question.question;
        label.htmlFor = input.id;

        field.appendChild(label);
        field.appendChild(flexdiv);
        field.appendChild(errorDiv);

        // insert before the reset button
        this.formNode.insertBefore(field, this.resetBtn);
    }

    renderReset() {
        let button = document.createElement('button');
        button.type = 'button';
        button.id = 'reset';
        button.textContent = 'Reset';
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

    showError(error) {
        // clear old errors
        this.clearErrors();

        let text = document.createElement('p');
        text.textContent = error;
        text.classList.add('error');

        this.errorDiv.appendChild(text);        
    }

    clearErrors() {
        if (this.errorDiv == null) {
            return;
        }

        this.errorDiv.childNodes.forEach(child => {
            this.errorDiv.removeChild(child);
        })
    }
}
