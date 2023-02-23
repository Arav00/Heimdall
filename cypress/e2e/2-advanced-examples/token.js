const getToken = require("totp-generator")
const mail = "aravindan.damodaran@striim.com"
  const password="December@123_"
  const totp = require("totp-generator");
  const token = totp("DSWARQRKKYEWWDDD",  { period: 30 });
export class TokenGen {
    constructor() {}
    tokenGen1() {
      // cy.intercept('/web/accs/dashboard').as('getSettings')

      // cy.wait('@getSettings').then((req) => {
      //   const authToken = req.headers['authorization']
      //  console.log(authToken)
      //  window.localStorage.setItem("accessToken", authToken);
       
      // },10000)
      cy.intercept({
        path: '/web/accs/dashboard'
      }).as('dashboard')
      cy.get('.Mui-selected > .MuiListItemText-root > .MuiTypography-root').click()
      //cy.wait(2000)
      return cy.wait('@dashboard').then(inter =>{
      var auhtoken =  JSON.stringify(inter.request.headers.authorization);
      var authtoken1 = auhtoken.replace(/[""]/g,'');
      window.localStorage.setItem("token",authtoken1)
     console.log(authtoken1)})
      

      


    // const myPromise = new Promise((resolve, reject) => {
      //  cy.intercept('/web/accs/dashboard', (req) => {
      //  const authToken = req.headers['authorization']
      //  console.log(authToken)
      //  window.localStorage.setItem("accessToken", authToken);
      // })
    // });
  //  cy.intercept({
  //     path: '/web/accs/dashboard'
  //   })
  //   .then((request) => {
  //     window.localStorage.setItem("accessToken", request.headers.authorization);
  //   })
    // cy.intercept('/web/accs/dashboard',(req)=> {
    //   console.log(req.headers['authorization'] )
    // })
    // cy.session(Token, () => {
    //   cy.request({
    //     method: 'GET',
    //     url: '/web/accs/dashboard',
    //   }).then(({ headers }) => {
    //     window.localStorage.setItem('authToken', headers.token)
    //   })

    // })
  
  }

passwordLogin(){
cy.get('#okta-signin-username').type(mail)
cy.get('#okta-signin-password').click({force:true}).type(password)
cy.get('#okta-signin-submit').click()
cy.wait(2000)
cy.get('#input69').type(token).type('{enter}')
cy.wait(2000)
}


getVm(){
  // cy.intercept('/web/accs/dashboard', (req) => {
  //   const authToken = req.headers['authorization']
    console.log(window.localStorage.getItem("token"))
    cy.request({

      method: 'GET',
      url: 'https://heimdall.stg-striimcloudweb.com/web/csp/regions',
      headers: {

        authorization: "Bearer " + window.localStorage.getItem("token")
          
      },
    }).then(resp => {
      console.log(resp.body)
    })
    // .catch((err) => {
    //   console.error(err);
    // });  
  //  })
  
}

}


    export default {
        TokenGen
    };