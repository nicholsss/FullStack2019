/* eslint-disable no-undef */
describe('Bloglist ', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'testaaja',
      username: 'testaaja',
      password: 'testaaja'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })
  it('front page can be opened', function(){
    cy.contains('log in to application')
  })

  describe('when logged in', function(){
    
    beforeEach(function(){
      cy.contains('log in to application')
      cy.get('#username').type('testaaja')
      cy.get('#password').type('testaaja')
      cy.contains('Submit').click()
      
    })

    it('show logged user name', function(){
      cy.contains('testaaja logged in')
    })

    it('user can add new blog', function(){
      cy.contains('create new').click()
      cy.get('#title').type('this is a test title')
      cy.get('#author').type('this is a test author')
      cy.get('#url').type('this is a test url')
      cy.get('[data-cy=create]').click()
      cy.reload()
      cy.contains('this is a test title this is a test author').click()
      cy.contains('like').click()

    
     
    })
    /*
    it('user can like blog',function(){
     
      cy.contains('this is a test title this is a test author').click()
      cy.contains('like').click()
    })
*/

  })
})



