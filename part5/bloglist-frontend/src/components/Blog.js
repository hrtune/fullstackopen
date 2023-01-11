import { useState } from "react"
import blogService  from '../services/blogs'

const Blog = ({blog, owned}) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [viewMode, setViewMode] = useState(false)
  const [likes, setLikes] = useState(blog.likes)
  const [removed, setRemoved] = useState(false)

  const handleClick = () => {
    setViewMode(!viewMode)
  }

  const handleRemove = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      await blogService.remove(blog.id)
      setRemoved(true)
    }
  }

  const handleLike = async () => {
    const newBlog = {
      ...blog,
      user: blog.user.id,
      likes: likes + 1
    }

    try {
      const updatedBlog = await blogService.update(newBlog)
      console.log(`likes : ${likes} -> ${updatedBlog.likes} (${blog.title})`);
      setLikes(updatedBlog.likes)
    } catch (exception) {
      console.log(exception.message);
    }

      
  }

  const simplifiedBlog = () => (
    <div style={blogStyle}>
      {blog.title} <em>by</em> {blog.author} <button onClick={handleClick}>ℹ️</button>
    </div>

  )

  const detailedBlog = () => (
    <div style={blogStyle}>
      {blog.title} <button onClick={handleClick}>🙈</button> <br />
      {blog.url} <br />
      likes {likes} <button onClick={handleLike}>like</button> <br />
      {blog.author} <br />
      { owned && (<button onClick={handleRemove}>remove</button>)}
    </div>
  )

  return (
    removed || (viewMode ? detailedBlog() : simplifiedBlog())
  )
}

export default Blog