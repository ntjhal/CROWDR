describe('Visitor API tests', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('Shows visitor data on screen', () => {
        // act
        cy.get('#visitor button').click();

        // assert
        cy.get('#name').should('not.have.value', 'undefined').and('not.be.empty');
        cy.get('#gender').should('not.have.value', 'undefined').and('not.be.empty');
        cy.get('#city').should('not.have.value', 'undefined').and('not.be.empty');
    });
});
