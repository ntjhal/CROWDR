export class ConfigFormController {
    constructor(model, view) {
        this.model = model;
        this.view = view;
    }

    init() {
        // bind to event listeners
        this.view.onNext = this.onNext.bind(this);
        this.view.onReset = this.onReset.bind(this);
        
        // render the reset button
        this.view.renderReset();

        // show the first question
        this.nextQuestion();
    }

    saveAnswer(question, answer) {
        const validationResult = question.validate(this.model.answers, answer);

        // validate the answer
        if (!validationResult.valid) {
            // show the error message
            this.view.showError(validationResult.message); 
                       
            return false;
        }

        // start with an empty object
        let answers = {};

        // check if there are any answers saved already
        if (localStorage.answers !== undefined) {
            // get the answers form the storage
            answers = JSON.parse(localStorage.answers);
        }

        // add the answer to the answer list
        answers[`${question.id}`] = answer;

        // save the new list
        localStorage.setItem('answers', JSON.stringify(answers));

        return true;
    }

    nextQuestion() {
        // clear the error
        this.view.clearErrors();

        // update the answers in the model
        this.model.answers = localStorage.getItem('answers');

        // get the next question
        let question = this.model.nextQuestion();

        // see if there is any
        if (question == null) {
            // we are done here
            return;
        }

        // show the question
        this.showQuestion(question);
    }

    onNext(question, answer) {
        // save the answer
        let success = this.saveAnswer(question, answer);

        if (!success) {
            return;
        }

        // show the next question
        this.nextQuestion();
    }

    onReset() {
        // clear the storage
        localStorage.removeItem('answers');

        // reset the model
        this.model.reset();

        // clear the errors
        this.view.clearErrors();

        // show the first question again
        this.nextQuestion();
    }

    showQuestion(question) {
        // ask the view to render the question
        this.view.renderQuestion(question);
    }
}
