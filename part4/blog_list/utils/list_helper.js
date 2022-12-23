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
    return blogs.reduce((a, blog) => a + blog.likes, 0)
}

module.exports = {
  dummy,
  totalLikes
}
