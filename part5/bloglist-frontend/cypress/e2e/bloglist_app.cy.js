describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.visit('http://localhost:3000')
  })

  const user = {
    name: 'Alvin',
    username: 'alvinle29',
    password: 'abcd1234'
  }
  cy.request('POST', 'http://localhost:3003/api/users/', user)

  it('Login form is shown', function () {
    cy.contains('username')
    cy.contains('password')
    cy.contains('login')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('alvinle29')
      cy.get('#password').type('abcd1234')
      cy.get('#login-button').click()

      cy.contains('Alvin logged-in')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('alvinle')
      cy.get('#password').type('1231234')
      cy.get('#login-button').click()

      cy.contains('wrong credentials', { matchCase: false })
    })
  })
})