export class ConfigForm {
    questions = [];
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
    constructor(id, question, type) {
        this.id = id;
        this.question = question;
        this.type = type;
    }
}
