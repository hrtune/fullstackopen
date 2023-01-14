describe('Blog app', function() {

  const user = {
    username: 'johncena',
    password: 'bingchilling'
  }

  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.createUser(user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('log in to application')
    cy.contains('username')
    cy.contains('password')
    cy.get('button').contains('login')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#login-username').type(user.username)
      cy.get('#login-password').type(user.password)
      cy.get('button').click()

      cy.contains(`${user.username} logged in`)

    })

    it('fails with wrong credentials', function() {
      cy.get('#login-username').type(user.username)
      cy.get('#login-password').type('sassybaka') // wrong password
      cy.get('button').click()

      cy.contains('username or password is incorrect')
    })
  })

  describe('When logged in', function() {
    const blog = {
      title: 'Eat Icecream in China',
      author: 'John Cena',
      url: 'http://example.com'
    }

    beforeEach(function() {
      cy.login(user)
    })

    it('A blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#blogform-title').type(blog.title)
      cy.get('#blogform-author').type(blog.author)
      cy.get('#blogform-url').type(blog.url)
      cy.get('#blogform-submit').click()

      cy.contains(`${blog.title} ${blog.author}`)
    })

    describe('When a blog is created', function() {
      const anotherUser = {
        username: 'yilongma',
        name: 'Yi Long Ma',
        password: 'hieveryone'
      }

      beforeEach(function() {
        cy.createBlog(blog)
        cy.createUser(anotherUser)
        cy.visit('http://localhost:3000')
      })

      it('The owner can like a blog', function() {
        cy.contains('ℹ️').click()
        cy.get('#like-button').click()

        cy.get('.blog-likes').contains('likes 1')
      })

      it('The other user can alos like the blog', function() {

        cy.login(anotherUser)
        cy.visit('http://localhost:3000')

        cy.contains('ℹ️').click()
        cy.get('#like-button').click()

        cy.get('.blog-likes').contains('likes 1')
      })

      it('The owner can delete the blog', function() {
        cy.contains('ℹ️').click()
        cy.get('#remove-button').contains('remove').click()
        cy.should('not.contain', blog.title)
      })

      it('The other user cannot delete the blog', function() {
        cy.login(anotherUser)
        cy.visit('http://localhost:3000')

        cy.contains('ℹ️').click()

        cy.get('.blog-detail')
          .should('not.contain', 'remove')

      })

    })

    describe('When several blogs are created', function() {
      const blog_a = {
        title: 'The Blog A',
        author: 'A',
        url: 'http://example.com/A',
        likes: 0
      }
      const blog_b = {
        title: 'The Blog B',
        author: 'B',
        url: 'http://example.com/B',
        likes: 1
      }
      const blog_c = {
        title: 'The Blog C',
        author: 'C',
        url: 'http://example.com/C',
        likes: 2
      }

      beforeEach(function(){
        cy.createBlog(blog_a)
        cy.createBlog(blog_b)
        cy.createBlog(blog_c)
        cy.visit('http://localhost:3000')
      })

      it('Blogs are sorted in decending order', function() {
        cy.get('.blog-simple').eq(0).should('contain', blog_c.title)
        cy.get('.blog-simple').eq(1).should('contain', blog_b.title)
        cy.get('.blog-simple').eq(2).should('contain', blog_a.title)
      })
    })
  })
})