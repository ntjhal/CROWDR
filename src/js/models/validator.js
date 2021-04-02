export class Validator {
    constructor() {
        this.answers = [];
    }

    min(amount, value) {
        // check if the given value is smaller than the minimum value
        if (value < amount) {
            return new ValidationResult(false, `Value too low, minimum is ${amount}!`);
        }

        // all checks passed, valid
        return new ValidationResult();
    }

    max(amount, value) {
        // check if the given value is higher than the maximum value
        if (value > amount) {
            return new ValidationResult(false, `Value too high, maximum is ${amount}!`);
        }

        // all checks passed, valid
        return new ValidationResult();
    }

    ifTent(maximum, value) {
        if (this.answers['tents'] < 1) {
            // if there are no tents, this maximum doesn't count
            return new ValidationResult();
        }
        
        // check if the given value is higher than the maximum value
        return this.max(maximum, value);
    }

    percentOfSpace(space, percent, value) {
        const maximum = percent * space;

        if (value > maximum) {
            return new ValidationResult(false, `Value too high, maximum is ${maximum}`);
        }

        // all checks passed, valid
        return new ValidationResult();
    }
}

export class ValidationResult {
    constructor(valid = true, message = null) {
        this.valid = valid;
        this.message = message;
    }
}
