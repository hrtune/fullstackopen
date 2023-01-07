import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'




const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')


  // load all blogs
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  // load login information
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      console.log(`user ${user.username} has logged in`);
      setUser(user)
      //< set token
    }
  }, [])



  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })

      //< set token
      window.localStorage.setItem('loggedBloglistUser', JSON.stringify(user))
      setUser(user)
      console.log(`user ${username} has logged in`);
      setUsername('')
      setPassword('')
    } catch (exception) {
      //
      console.log(exception.message);
      setPassword('')
    }
  }

  const handleLogout = async (event) => {
    window.localStorage.removeItem('loggedBloglistUser')
    setUser(null)
  }

  const loginPage = () => (
    <div>
      <h2>log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({target}) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({target}) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )

  const blogPage = () => (
    <div>
      <h2>blogs</h2>
      <p>
        {user.name} logged in<button onClick={handleLogout}>logout</button>
      </p>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
      
    </div>
  )

  return (
    user === null ?
    loginPage() :
    blogPage()
  )
}

export default App
