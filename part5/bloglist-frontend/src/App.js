import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import './App.css'

const TIMEOUT = 2500

const Notification = ({message, state}) => {
  if (!message) {
    return null
  }

  return (
    <div className={state}>
      {message}
    </div>
  )
}

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')


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
      blogService.setToken(user.token)
    }
  }, [])



  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })

      blogService.setToken(user.token)
      window.localStorage.setItem('loggedBloglistUser', JSON.stringify(user))
      setUser(user)
      console.log(`user ${username} has logged in`);
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('username or password is incorrect')
      setTimeout(() => setErrorMessage(''), TIMEOUT)
      console.log(exception.message);
      setPassword('')
    }
  }

  const handleLogout = async (event) => {
    window.localStorage.removeItem('loggedBloglistUser')
    setUser(null)
  }

  const handleCreate = async (event) => {
    event.preventDefault()
    try {
      const newBlog = {
        title,
        author,
        url,
        likes: 0
      }

      const blog = await blogService.create(newBlog)

      console.log(`blog ${blog.title} has created`)

      setBlogs(blogs.concat(blog))

      // clean up inputs on form
      setTitle('')
      setAuthor('')
      setUrl('')

      setSuccessMessage(`a new blog ${blog.title} by ${blog.author} added`)
      setTimeout(() => setSuccessMessage(''), TIMEOUT)

    } catch (exception) {
      setErrorMessage('something wrong with the new blog')
      setTimeout(() => setErrorMessage(''), TIMEOUT)
      console.log(exception.message);
    }
  }

  const createForm = () => (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleCreate}>
        <div>
          title:
          <input
            type="text"
            name="Title"
            value={title}
            onChange={({target}) => setTitle(target.value)}
          />
        </div>
        <div>
          author:
          <input
            type="text"
            name="Author"
            value={author}
            onChange={({target}) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <input
            type="text"
            name="Url"
            value={url}
            onChange={({target}) => setUrl(target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )

  const loginPage = () => (
    <div>
      <h2>log in to application</h2>
      <Notification message={errorMessage} state="error" />
      <Notification message={successMessage} state="success" />
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
      <Notification message={errorMessage} state="error" />
      <Notification message={successMessage} state="success" />
      <p>
        {user.name} logged in<button onClick={handleLogout}>logout</button>
      </p>
      {createForm()}
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
