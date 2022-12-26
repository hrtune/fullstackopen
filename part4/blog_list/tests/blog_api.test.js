const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

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

const TIMEOUT = 100 * 1000 // ms

beforeEach(async () => {
    await Blog.deleteMany({})
    let blogObject = new Blog(initialBlogs[0])
    await blogObject.save()
    blogObject = new Blog(initialBlogs[1])
    await blogObject.save()
})


test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
}, TIMEOUT)

test('there are two blogs', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(2)
}, TIMEOUT)

afterAll(() => {
    mongoose.connection.close()
})