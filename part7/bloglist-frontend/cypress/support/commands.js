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

const backendUrl = 'http://localhost:3003'
const frontendUrl = 'http://localhost:3000'

Cypress.Commands.add('createUser', (newUser) => {
  cy.request('POST', backendUrl + '/api/users', newUser)
})

Cypress.Commands.add('login', ({ username, password }) => {
  cy.request('POST', backendUrl + '/api/login', {
    username, password
  }).then(({ body }) => {
    localStorage.setItem('loggedBloglistUser', JSON.stringify(body))
    cy.visit(frontendUrl)
  })
})

Cypress.Commands.add('createBlog', (newBlog) => {
  const token = JSON.parse(localStorage.getItem('loggedBloglistUser')).token
  cy.request({
    method: 'POST',
    url: backendUrl + '/api/blogs',
    auth: {
      bearer: token
    },
    body: newBlog
  })
})