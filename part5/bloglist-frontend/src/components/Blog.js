import { useState } from 'react'
import blogService  from '../services/blogs'

const Blog = ({ blog, owned, handleLike }) => {
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

  if (!handleLike) {
    handleLike = async () => {
      const newBlog = {
        ...blog,
        user: blog.user.id,
        likes: likes + 1
      }

      try {
        const updatedBlog = await blogService.update(newBlog)
        console.log(`likes : ${likes} -> ${updatedBlog.likes} (${blog.title})`)
        setLikes(updatedBlog.likes)
      } catch (exception) {
        console.log(exception.message)
      }


    }
  }

  const simplifiedBlog = () => (
    <div style={blogStyle} className="blog-simple">
      {blog.title} {blog.author} <button id="show-button" onClick={handleClick}>ℹ️</button>
    </div>

  )

  const detailedBlog = () => (
    <div style={blogStyle} className="blog-detail">
      {blog.title} <button id="hide-button" onClick={handleClick}>🙈</button> <br />
      <div className='blog-url'>
        {blog.url} <br />
      </div>
      <div className='blog-likes'>
        likes {likes} <button id="like-button" onClick={handleLike}>like</button> <br />
      </div>
      {blog.author} <br />
      { owned && (
        <div className='remove-button'>
          <button id="remove-button" onClick={handleRemove}>remove</button>
        </div>
      )}
    </div>
  )

  return (
    removed || (viewMode ? detailedBlog() : simplifiedBlog())
  )
}

export default Blog