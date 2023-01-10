import { useState } from "react"
const Blog = ({blog}) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const [viewMode, setViewMode] = useState(false)

  const handleClick = () => {
    setViewMode(!viewMode)
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
      likes {blog.likes} <button>like</button> <br />
      {blog.author}
    </div>
  )

  return (
    viewMode ? detailedBlog() : simplifiedBlog()
  )
}

export default Blog