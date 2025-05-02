
describe('Car and Expense Tests', () => {

  beforeEach(() => { 
    const url = Cypress.env('url');
  });

  it('go to garage page', () => {
    cy.loginAndVisitUI('/panel/garage');
    cy.contains('Add car').should('exist');
  });

  it('fetch cars via API', () => {
    cy.loginAndVisitUI(); 
    cy.getCookie('sid').then((cookie) => {
        cy.request({
          method: 'GET',
          url: 'https://qauto.forstudy.space/api/cars',
          headers: {
            Cookie: `sid=${cookie.value}`
          },
          failOnStatusCode: false
        }).then((response) => {
          expect(response.status).to.eq(200);
          cy.log('Cars fetched successfully:', response.body);
        });  
    });
  });
});