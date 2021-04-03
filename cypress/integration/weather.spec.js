describe('Weather API tests', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('Connects to API', () => {

    });

    it('Fetches weather data', () => {

    });

    it('Shows weather data on screen', () => {
        // act
        cy.get('#weather input[type=text]').type('Amsterdam');
        cy.get('#weather button').click();

        // act
        cy.wait(1500);

        // assert
        cy.get('#city').should('contains', 'Amsterdam');
        cy.get('#temp').should('contain', '°C');
        cy.get('#icon').children().should('have.length', 1);
    });

    it('Shows an error', () => {
        // act
        cy.get('#weather input[type=text]').type('Somewhereia');
        cy.get('#weather button').click();

        // assert
        cy.wrap(new Promise((resolve, reject) => {
            cy.on('window:alert', (msg) => {
                expect(msg).to.contains('Error');
                resolve();
            });

            setTimeout(() => {
                reject(new Error('Alert wasn\'t triggered within 4s'));
              }, 4000);
        }));
    });
});
