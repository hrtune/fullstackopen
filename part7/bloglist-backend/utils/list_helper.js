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
    // { "author1" : (blogs of author1), ... }
    const stats = blogs.reduce((acc, blog) => {
        if (blog.author in acc) {
            acc[blog.author] += 1
        } else {
            acc[blog.author] = 1
        }
        return acc
    }, {})
    return Object.keys(stats).reduce((acc, author) => {
        if (acc === null || stats[author] > acc.blogs) {
            return { author: author, blogs: stats[author] }
        } else {
            return acc
        }
    }, null)
}

const mostLikes = (blogs) => {
    // { "author1": (total_likes)}
    const stats = blogs.reduce((acc, blog) => {
        if (blog.author in acc) {
            acc[blog.author] += blog.likes
        } else {
            acc[blog.author] = blog.likes
        }
        return acc
    }, {})
    return Object.keys(stats).reduce((acc, author) => {
        if (acc === null || stats[author] > acc.likes) {
            return { author: author, likes: stats[author] }
        } else {
            return acc
        }
    }, null)
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
