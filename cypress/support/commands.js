// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('loginAndVisitUI', (path='') => {
    cy.request({
        method: 'POST',
        url: 'https://qauto.forstudy.space/api/auth/signin',
        body: {
            email: 'aaaawa@gmail.com',
            password: 'eADv!qe5EEyjAg6',
            remember: true
        },
        withCredentials: true
    }).then((resp) => {
        const cookie = resp.headers['set-cookie']?.find(c => c.startsWith('sid'));
        if (cookie) {
            const sidValue = cookie.split(';')[0].split('=')[1]; 
            cy.log(`Extracted cookie: ${sidValue}`);

            cy.setCookie('sid', sidValue, {
                domain: 'qauto.forstudy.space',
            });

            cy.visit(`https://guest:welcome2qauto@qauto.forstudy.space${path}`, {
                failOnStatusCode: false // Allow debugging of 401 errors
            }).then((response) => {
                if (response.status === 401) {
                    cy.log('Unauthorized access. Verify the sid cookie or authentication process.');
                }
            });
    
        } else {
          throw new Error('SID cookie not found in response headers');
        }
    });
  });
