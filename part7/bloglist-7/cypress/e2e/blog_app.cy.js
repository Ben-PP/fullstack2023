describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3002/api/testing/reset')
    const users = [
      {
        name: 'Ben Tester',
        username: 'tester',
        password: 'tester'
      },
      {
        name: 'Other Tester',
        username: 'other',
        password: 'other'
      }
    ]
    users.forEach((user) => {
      cy.request('POST', 'http://localhost:3002/api/users', user)
    })
    cy.visit('http://localhost:5173')
  })

  it('Login form is shown', function () {
    cy.get('#username')
    cy.get('#password')
    cy.get('#login-button')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('tester')
      cy.get('#password').type('tester')
      cy.get('#login-button').click()
      cy.contains('new blog')
    })
    it('fails gracefully with wrong credentials', function () {
      cy.get('#username').type('tester')
      cy.get('#password').type('ter')
      cy.get('#login-button').click()
      cy.contains('wrong credentials')
    })
  })
  describe('Blogs', function () {
    beforeEach(function () {
      cy.request('POST', 'http://localhost:3002/api/login', {
        username: 'tester',
        password: 'tester'
      }).then(({ body }) => {
        localStorage.setItem('loggedUser', JSON.stringify(body))
        cy.visit('http://localhost:5173')
      })
    })
    it('Logged in user can add a blog', function () {
      cy.contains('new blog').click()
      cy.get('#title').type('Created by cypress')
      cy.get('#author').type('Cypress')
      cy.get('#url').type('cypress.com')
      cy.contains('add').click()
      cy.get('.blog').should('exist')
    })
    it('blog can be liked', function () {
      cy.contains('new blog').click()
      cy.get('#title').type('Created by cypress')
      cy.get('#author').type('Cypress')
      cy.get('#url').type('cypress.com')
      cy.contains('add').click()
      cy.contains('view').click()
      cy.contains('like').click()
      cy.contains('likes 1')
    })
    it('blog can be removed by the creator', function () {
      cy.contains('new blog').click()
      cy.get('#title').type('Created by cypress')
      cy.get('#author').type('Cypress')
      cy.get('#url').type('cypress.com')
      cy.contains('add').click()
      cy.contains('view').click()
      cy.contains('remove').click()
      cy.get('.blog').should('not.exist')
    })
    it('remove button is shown only to correct user', function () {
      cy.contains('new blog').click()
      cy.get('#title').type('Created by cypress')
      cy.get('#author').type('Cypress')
      cy.get('#url').type('cypress.com')
      cy.contains('add').click()
      cy.contains('view').click()
      cy.contains('remove')
      cy.contains('logout').click()
      cy.reload()
      cy.get('#username').type('other')
      cy.get('#password').type('other')
      cy.get('#login-button').click()
      cy.contains('view').click()
      cy.get('.removeButton').should('not.exist')
    })
    // TODO Test that blogs are sorted correctly
    it.only('blogs are ordered correctly', function () {
      cy.get('#new-blog').click()
      cy.get('#title').type('title1')
      cy.get('#author').type('Cypress')
      cy.get('#url').type('cypress.com')
      cy.get('#submit').click()
      cy.get('#new-blog').click()
      cy.get('#title').type('title2')
      cy.get('#author').type('Cypress')
      cy.get('#url').type('cypress.com')
      cy.get('#submit').click()
      cy.get('#new-blog').click()
      cy.get('#title').type('title3')
      cy.get('#author').type('Cypress')
      cy.get('#url').type('cypress.com')
      cy.get('#submit').click()
      cy.contains('view').click()
      cy.contains('view').click()
      cy.contains('view').click()
      cy.get('.blog').eq(0).should('contain', 'title1')
      cy.get('.blog').eq(1).should('contain', 'title2')
      cy.get('.blog').eq(2).should('contain', 'title3')
      cy.get('.blog').eq(2).contains('like').click()
      cy.get('.blog').eq(0).contains('like').click()
      cy.get('.blog').eq(0).contains('like').click()
      cy.get('.blog').eq(2).contains('like').click()
      cy.get('.blog').eq(1).contains('like').click()
      cy.get('.blog').eq(0).should('contain', 'title3')
      cy.get('.blog').eq(1).should('contain', 'title2')
      cy.get('.blog').eq(2).should('contain', 'title1')
      cy.get('.blog').eq(1).contains('like').click()
      cy.get('.blog').eq(1).contains('like').click()
      cy.get('.blog').eq(0).should('contain', 'title2')
    })
  })
})
