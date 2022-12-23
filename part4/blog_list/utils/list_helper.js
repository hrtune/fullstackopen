/*
blogs:
[{
    "title": "My first jorney",
    "author": "John Smith",
    "url": "http://example.com",
    "likes": 0
},
... ]
*/
const dummy = (blogs) => {
    console.log("dummy", blogs);
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((acc, blog) => acc + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
    return blogs.reduce((acc, blog) => {
        if (acc === null || blog.likes > acc.likes) {
            return blog
        } else {
            return acc
        }
    }, null)
}

/*
return object:
{
  author: "Robert C. Martin",
  blogs: 3
}
*/
const mostBlogs = (blogs) => {
    return null
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}
