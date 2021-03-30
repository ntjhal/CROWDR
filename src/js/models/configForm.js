import { Validator, ValidationResult } from "./validator.js";

export class ConfigForm {
    questions = [];
    answers = [];
    current = 0;

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
    constructor(id, question, type, rules = null) {
        this.id = id;
        this.question = question;
        this.type = type;
        this.rules = rules;

        this.validator = new Validator();
    }

    validate(answers, answer) {
        this.validator.answers = answers;

        let validationResult = null;

        if (answer == '') {
            return new ValidationResult(false, 'Enter a value!');
        }

        if (this.rules == null) {
            return new ValidationResult();
        }

        if (this.rules.max) {
            validationResult = this.validator.max(this.rules.max, answer);
        }

        if (this.rules.ifTent) {
            validationResult = this.validator.ifTent(this.rules.ifTent, answer);
        }

        if (this.rules.percentOfSpace) {
            // TODO: get space left
            let space = 2
            validationResult = this.validator.percentOfSpace(space, this.rules.percentOfSpace, answer);
        }

        return validationResult;
    }
}
