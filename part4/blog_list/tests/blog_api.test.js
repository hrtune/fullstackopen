const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')
const Blog = require('../models/blog')


const TIMEOUT = 100 * 1000 // ms

beforeEach(async () => {
    await Blog.deleteMany({})
    const blogObjects = helper.initialBlogs.map(b => new Blog(b))
    const promiseArray = blogObjects.map(b => b.save())
    await Promise.all(promiseArray)
})


test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
}, TIMEOUT)

test('there are two blogs', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length)
}, TIMEOUT)

test('one property is defined by id', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
})

test('property _id is not defined', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0]._id).not.toBeDefined()
})

test('a valid blog can be added', async () => {
    const newBlog = {
        title: "Teach Junkie",
        author: "Leslie",
        url: "https://www.teachjunkie.com/",
        likes: 0
    }

    await api
        .post("/api/blogs")
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
    
    const blogsAfterPost = await helper.blogsInDb()

    const titles = blogsAfterPost.map(b => b.title)
    
    expect(blogsAfterPost).toHaveLength(helper.initialBlogs.length + 1)
    expect(titles).toContain('Teach Junkie')
    
})

test('blog without likes property can be added with 0 likes', async () => {

    const newBlog = {
        title: "Joe McNally's Blog",
        author: "Joe McNally",
        url: "https://joemcnally.com/"
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
    
    const blogAdded = await Blog.findOne({title: newBlog.title})

    console.log(blogAdded);
    
    expect(blogAdded.likes).toBe(0)

})

test('blog without title cannot be added and makes bad request', async () => {
    const titleMissing = {
        author: "Chris Gampat",
        url: "https://www.thephoblographer.com/",
        likes: 100
    }

    const response = await api
        .post("/api/blogs")
        .send(titleMissing)
        .expect(400)

    
    expect(response.status).toBe(400)
    
})

test('blog without url cannot be added and makes bad request', async () => {

        const urlMissing = {
        title: "CSIROscope",
        author: "Commonwealth Scientific and Industrial Research Organisation",
        // url: "https://blog.csiro.au/"
        likes: 200
    }

    const response = await api
        .post("/api/blogs")
        .send(urlMissing)
        .expect(400)

    expect(response.status).toBe(400)
    
})

afterAll(() => {
    mongoose.connection.close()
})