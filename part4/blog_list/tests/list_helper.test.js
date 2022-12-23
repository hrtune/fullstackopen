const listHelper = require('../utils/list_helper')
const blogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0
  }
]
test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
  const totalLikes = listHelper.totalLikes
  

  test('of empty array is zero', () => {
    const emptyBlogs = []
    const result = totalLikes(emptyBlogs)
    expect(result).toBe(0)
  })

  test('when list has only one blog, equals the likes of that', () => {
    const oneBlog = [blogs[0]]
    const result = totalLikes(oneBlog)
    expect(result).toBe(oneBlog[0].likes)
  })

  test('of two blogs', () => {
    const twoBlogs = [blogs[0], blogs[1]]
    const result = totalLikes(twoBlogs)
    expect(result).toBe(blogs[0].likes + blogs[1].likes)
  })

  test('of a blog, whose likes is zero, is zero', () => {
    const zeroLikes = [blogs[4]]
    const result = totalLikes(zeroLikes)
    expect(result).toBe(0)
  })

  test('of the six blogs is 36', () => {
    const result = totalLikes(blogs)
    expect(result).toBe(36)
  })
})

describe('favorite blog', () => {
  const favoriteBlog = listHelper.favoriteBlog

  test('of empty array is null', () => {
    const result = favoriteBlog([])
    expect(result).toEqual(null)
  })

  test('of one blog is the one', () => {
    const blog = blogs[0]
    const result = favoriteBlog(Array(blog))
    expect(result).toEqual(blog)
  })

  test('of two blogs is the one has bigger likes', () => {
    const result = favoriteBlog(Array(blogs[0], blogs[1]))
    expect(result).toEqual(blogs[0])
  })

  test('of many blogs is the one has the biggest likes', () => {
    const result = favoriteBlog(blogs)
    expect(result).toEqual(blogs[2])
  })

})