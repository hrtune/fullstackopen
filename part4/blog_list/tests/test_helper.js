const Blog = require('../models/blog')

const initialBlogs = [
    {
        title: "Cup Of Jo",
        author: "Joanna Goddard",
        url: "https://cupofjo.com/",
        likes: 1000
    },
    {
        title: "ASK DAVE TAYLOR",
        author: "Dave Taylor",
        url: "https://www.askdavetaylor.com/",
        likes: 300
    },
    {
        title: "Treehugger",
        author: "Tim Fisher",
        url: "https://www.treehugger.com/",
        likes: 600
    }
]

const nonExistingId = async () => {

  const blog = new Blog({
    title: "foo",
    author: "bar",
    url: "http://foobar.com",
    likes: 0
  })

  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(b => b.toJSON())
}

module.exports = {
    initialBlogs,
    nonExistingId,
    blogsInDb
}