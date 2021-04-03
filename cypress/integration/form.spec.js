describe('Form test', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('Shows the first question', () => {
        // arrange
        let form = cy.get('form[name=configuration]');
        let input = form.get('input[name=qname]');

        // assert
        input.should('exist');
        input.should('have.attr', 'type', 'text');
    });

    it('Shows a reset button', () => {
        // arrange
        let btn = cy.get('#reset');

        // assert
        btn.should('exist');
    });

    context('Validation', () => {
        it('Fails on empty input', () => {
            // arrange
            let form = cy.get('form[name=configuration]');
            let next = form.get('button[type=button]').contains('Next');

            // act
            next.click();

            // assert
            form.get('.error').should('contain', 'Enter a value!');
        });

        it('Shows the next question', () => {
            // arrange
            
            // act

            // assert
        });
    });
});
