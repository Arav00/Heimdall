//const { expect } = require("chai")
import { TokenGen } from "../2-advanced-examples/token"
const authToken = new TokenGen();


// describe('Login Function', () => {
//   beforeEach(() => {
//     var token = cy.getAuthToken();
   
//   });
// });


describe('Heimdall Login', () => {
  

  it('Login with OTP', function(){
  //   cy.getAuthToken().then(authtoken1 => {
  //     cy.log("log2 = " + authtoken1 );
  const url1 = "https://heimdall.stg-az-striimcloudweb.com"
  cy.visit(url1);
  authToken.passwordLogin()
  var toekn1 = authToken.tokenGen1()
    console.log(toekn1)
    cy.wait(2000)

  })

  // it('get token', function(){
    

  // })
  // it('fetch token',  function(){
  //   authToken.getVm()
  // })


  
})
     
   
    

  



