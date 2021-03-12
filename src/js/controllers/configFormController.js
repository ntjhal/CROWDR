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

    saveAnswer(id, answer) {
        // start with an empty object
        let answers = {};

        // check if there are any answers saved already
        if (localStorage.answers !== undefined) {
            // get the answers form the storage
            answers = JSON.parse(localStorage.answers);
        }

        // add the answer to the answer list
        answers[`q${id}`] = answer;

        // save the new list
        localStorage.setItem('answers', JSON.stringify(answers));
    }

    nextQuestion() {
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

    onNext(id, answer) {
        // save the answer
        this.saveAnswer(id, answer);

        // show the next question
        this.nextQuestion();
    }

    onReset() {
        // clear the storage
        localStorage.removeItem('answers');

        // reset the model
        this.model.reset();

        // show the first question again
        this.nextQuestion();
    }

    showQuestion(question) {
        // ask the view to render the question
        this.view.renderQuestion(question);
    }
}
