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

        if (this.type === 'number') {
            const total = 15 * 15;
            let occupied = 0;
            
            // parse json
            answers = JSON.parse(answers);
    
            // calculate space left
            for (const key in answers) {
                switch (key) {
                    case undefined:
                        break;
    
                    case 'tents':
                        occupied += 3 * 3 * answers[key];
                        break;
    
                    case 'eating_stalls':
                        occupied += 1 * 1 * answers[key];
                        break;
    
                    case 'drinking_stalls':
                        occupied += 1 * 2 * answers[key];
                        break;
    
                    case 'tree_high':
                        occupied += 1 * 1 * answers[key];
                        break;
    
                    case 'tree_wide':
                        occupied += 2 * 1 * answers[key];
                        break;
    
                    case 'tree_shadow':
                        occupied += 3 * 3 * answers[key];
                        break;
    
                    case 'toilet_stalls':
                        occupied += 1 * 3 * answers[key];
                        break;
                
                    default:
                        break;
                }
            }
    
            // subtract occupied space from total
            const space = total - occupied;

            if (this.rules.percentOfSpace != undefined) {
                validationResult = this.validator.percentOfSpace(space, this.rules.percentOfSpace, answer);
            }

            // check if the placement of the amount of objects is possible at all
            validationResult = this.validator.enoughSpaceLeft(space, answer);
        }

        return validationResult;
    }
}
