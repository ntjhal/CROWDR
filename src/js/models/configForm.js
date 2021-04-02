import { Validator, ValidationResult } from "./validator.js";

export class ConfigForm {
    constructor() {
        this.questions = [];
        this.answers = [];
        this.current = 0;
    }

    addQuestions(questions) {
        questions.forEach(q => {
            this.questions.push(q);
        })
    }

    nextQuestion() {
        return this.questions[this.current++];
    }

    reset() {
        this.current = 0;
    }
}

export class ConfigQuestion {
    constructor(id, question, type, rules = {}) {
        this.id = id;
        this.question = question;
        this.type = type;
        this.rules = rules;

        if (this.type === 'number') {
            this.rules.min = 0;
        }

        this.validator = new Validator();
    }

    validate(answers, answer) {
        this.validator.answers = answers;

        let validationResult = new ValidationResult();

        if (answer === '') {
            return new ValidationResult(false, 'Enter a value!');
        }

        if (this.type === 'number') {
            answer = parseInt(answer);
        }

        if (this.rules.min != undefined) {
            validationResult = this.validator.min(this.rules.min, answer);
        }

        if (this.rules.max != undefined) {
            validationResult = this.validator.max(this.rules.max, answer);
        }

        if (this.rules.ifTent != undefined) {
            validationResult = this.validator.ifTent(this.rules.ifTent, answer);
        }

        if (this.rules.percentOfSpace != undefined) {
            // TODO: get space left
            let space = 2
            validationResult = this.validator.percentOfSpace(space, this.rules.percentOfSpace, answer);
        }

        return validationResult;
    }
}
