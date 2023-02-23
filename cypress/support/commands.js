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

const { TokenGen } = require("../e2e/2-advanced-examples/token");

// Cypress.Commands.add('getAuthToken',() => {
    
//     return cy.wrap(getToken());
// })

Cypress.Commands.add("getauthtoken", elements =>  {
    //let authtoken1 = "";
    const url = "https://heimdall.stg-striimcloudweb.com"
    const mail = "aravindan.damodaran@striim.com"
    const password="December@123_"
    
    
    const totp = require("totp-generator");
    const token = totp("DSWARQRKKYEWWDDD",  { period: 30 });
    
    console.log(token);
    cy.visit(url);
    
    cy.get('#okta-signin-username').type(mail)
    cy.get('#okta-signin-password').click({force:true}).type(password)
    cy.get('#okta-signin-submit').click()
    cy.get('#input69').type(token).type('{enter}')
    cy.wait(2000)
    cy.intercept({
      path: '/web/accs/dashboard'
    }).as('dashboard')
    cy.get('.Mui-selected > .MuiListItemText-root > .MuiTypography-root').click()
    //cy.wait(2000)
    return cy.wait('@dashboard').then(inter =>{
    var auhtoken =  JSON.stringify(inter.request.headers.authorization);
    var authtoken1 = auhtoken.replace(/[""]/g,'');
   // window.localStorage.setItem("token",authtoken1)
   console.log(authtoken1)
    return authtoken1
    })});

// describe('Heimdall Login', () => {
//     it('Login with OTP', () => {
//       cy.request({
//         method: 'GET',
//         url:'https://heimdall.stg-striimcloudweb.com' + '/web/vms',
//         headers:{
//           'Authorization': window.localStorage.getItem("token")
    
//         }
        
//     }).as('details')
//     //Validate status code
//     cy.get('@details').its('status').should('eq', 200)
//     cy.get('@details').then((response) => {
//         cy.log(JSON.stringify(response.body))
//     })
//       })
      
//   })


