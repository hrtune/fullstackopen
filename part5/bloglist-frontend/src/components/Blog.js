import { useState } from "react"
import blogService  from '../services/blogs'

const Blog = ({blog}) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const [viewMode, setViewMode] = useState(false)
  const [likes, setLikes] = useState(blog.likes)

  const handleClick = () => {
    setViewMode(!viewMode)
  }

  const handleLike = async () => {
    const newBlog = {
      ...blog,
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
      {blog.title} <em>by</em> {blog.author} <button onClick={handleClick}>view</button>
    </div>

  )

  const detailedBlog = () => (
    <div style={blogStyle}>
      {blog.title} <button onClick={handleClick}>hide</button> <br />
      {blog.url} <br />
      likes {likes} <button onClick={handleLike}>like</button> <br />
      {blog.author}
    </div>
  )

  return (
    viewMode ? detailedBlog() : simplifiedBlog()
  )
}

export default Blog