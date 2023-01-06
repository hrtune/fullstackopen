const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')
const Blog = require('../models/blog')
const User = require('../models/user')
const bcrypt = require('bcrypt')


// const TIMEOUT = 100 * 1000 // ms

const userA = {
    username: 'user_a',
    password: 'password_a'
}
const userB = {
    username: 'user_b',
    password: 'password_b'
}

const getToken = async (user) => {
    const request = await api
        .post("/api/login")
        .send(user)
    
    return request.body.token
}

beforeEach(async () => {

    await Blog.deleteMany({})
    await User.deleteMany({})

    let user = new User({
        username: userA.username,
        passwordHash: await bcrypt.hash(userA.password, 10)
    })
    await user.save()
    let blog = new Blog({
        ...helper.initialBlogs[0],
        user: user._id
    })
    await blog.save()
    blog = new Blog({
        ...helper.initialBlogs[1],
        user: user._id
    })
    blog.save()

    user = new User({
        username: userB.username,
        passwordHash: await bcrypt.hash(userB.password, 10)
    })
    await user.save()
    blog = new Blog({
        ...helper.initialBlogs[2],
        user: user._id
    })
    await blog.save()

})

describe('get blogs', () => {
    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('there are two blogs', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body).toHaveLength(helper.initialBlogs.length)
    })

    test('one property is defined by id', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body[0].id).toBeDefined()
    })

    test('property _id is not defined', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body[0]._id).not.toBeDefined()
    })
})


describe('create blogs', () => {

    test('a valid blog can be added', async () => {
        const newBlog = {
            title: "Teach Junkie",
            author: "Leslie",
            url: "https://www.teachjunkie.com/",
            likes: 0
        }

        // login
        const token = await getToken(userA)

        await api
            .post("/api/blogs")
            .set('Authorization', 'bearer ' + token)
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

        const token = await getToken(userA)

        await api
            .post('/api/blogs')
            .set('Authorization', 'bearer ' + token)
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)
        
        const blogAdded = await Blog.findOne({title: newBlog.title})
        
        expect(blogAdded.likes).toBe(0)

    })

    test('blog without title cannot be added and makes bad request', async () => {
        const titleMissing = {
            author: "Chris Gampat",
            url: "https://www.thephoblographer.com/",
            likes: 100
        }

        const token = await getToken(userA)

        const response = await api
            .post("/api/blogs")
            .set('Authorization', 'bearer ' + token)
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

        const token = await getToken(userA)

        const response = await api
            .post("/api/blogs")
            .set('Authorization', 'bearer ' + token)
            .send(urlMissing)
            .expect(400)

        expect(response.status).toBe(400)
        
    })

    test('a blog cannot be created without token', async () => {
        const newBlog = {
            title: "今日の御言葉",
            author: "丸山芳浩",
            url: "https://mikotoba.org",
            likes: 123 
        }


        await api
            .post("/api/blogs")
            .send(newBlog)
            .expect(401)
        
        const blogsAfterPost = await helper.blogsInDb()

        const titles = blogsAfterPost.map(b => b.title)
        
        expect(blogsAfterPost).toHaveLength(helper.initialBlogs.length)
        expect(titles).not.toContain('今日の御言葉')
        
    })
})

describe('delete blogs', () => {

    test('delete one blog in db by authorized user', async () => {

        const blogToDelete = await Blog.findOne({title: "Cup Of Jo"})
        const token = await getToken(userA)

        await api
            .delete(`/api/blogs/${blogToDelete._id.toString()}`)
            .set('Authorization', 'bearer ' + token)
            .expect(204)
        
        const blogsAfterDelete = await helper.blogsInDb()
        
        expect(blogsAfterDelete).toHaveLength(helper.initialBlogs.length - 1)
        expect(blogsAfterDelete).not.toContainEqual(blogToDelete.toJSON())

    })

    test('a user not in db cannot delete blogs', async () => {
        const blogs = await helper.blogsInDb()
        const token = await getToken({username: "dummy", password: "dummy"})

        for (const blog of blogs) {
            await api
                .delete(`/api/blogs/${blog.id}`)
                .set('Authorization', 'bearer ' + token)
                .expect(401)   
        }

        const blogsAfter = await helper.blogsInDb()

        expect(blogsAfter).toHaveLength(helper.initialBlogs.length)
    })

    test("a user cannot delete the other person's blog", async () => {
        const blogToDelete = await Blog.findOne({title: "Cup Of Jo"})
        const token = await getToken(userB)

        await api
            .delete(`/api/blogs/${blogToDelete._id.toString()}`)
            .set('Authorization', 'bearer ' + token)
            .expect(401)
        
        const blogsAfterDelete = await helper.blogsInDb()
        
        expect(blogsAfterDelete).toHaveLength(helper.initialBlogs.length)
        expect(blogsAfterDelete).toContainEqual(blogToDelete.toJSON())

    })

    test('delete non existent blog', async () => {
        const token = await getToken(userA)

        await api
            .delete(`/api/blogs/${await helper.nonExistingId()}`)
            .set('Authorization', 'bearer ' + token)
            .expect(204)

        const blogsAfterDelete = await helper.blogsInDb()

        expect(blogsAfterDelete).toHaveLength(helper.initialBlogs.length)
    })
})

describe('update blogs', () => {

    test('increment likes of a blog by one by its user', async () => {
        const blogToUpdate = await Blog.findOne({title: "Cup Of Jo"})
        const blogToPut = {
            title: blogToUpdate.title,
            url: blogToUpdate.url,
            author: blogToUpdate.author,
            likes: blogToUpdate.likes + 1
        }

        const token = await getToken(userA)

        await api
            .put(`/api/blogs/${blogToUpdate._id.toString()}`)
            .set('Authorization', 'bearer ' + token)
            .send(blogToPut)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const blogAfterUpdate = await Blog.findById(blogToUpdate._id)

        expect(blogAfterUpdate.likes).toBe(blogToUpdate.likes + 1)
        expect(blogAfterUpdate._id.toString()).toBe(blogToUpdate._id.toString())

    })


    test('decrement likes of a blog by its user', async () => {
        const blogToUpdate = await Blog.findOne({title: "Cup Of Jo"})
        const blogToPut = {
            title: blogToUpdate.title,
            url: blogToUpdate.url,
            author: blogToUpdate.author,
            likes: blogToUpdate.likes - 1
        }

        const token = await getToken(userA)

        await api
            .put(`/api/blogs/${blogToUpdate._id.toString()}`)
            .set('Authorization', 'bearer ' + token)
            .send(blogToPut)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const blogAfterUpdate = await Blog.findById(blogToUpdate._id)

        expect(blogAfterUpdate.likes).toBe(blogToUpdate.likes - 1)
        expect(blogAfterUpdate._id.toString()).toBe(blogToUpdate._id.toString())

    })

    test('an unauthorized user cannnot update a blog', async () => {
        const blogToUpdate = await Blog.findOne({title: "Cup Of Jo"})
        const blogToPut = {
            title: blogToUpdate.title,
            url: blogToUpdate.url,
            author: blogToUpdate.author,
            likes: blogToUpdate.likes + 1
        }

        const token = await getToken(userB)

        await api
            .put(`/api/blogs/${blogToUpdate._id.toString()}`)
            .set('Authorization', 'bearer ' + token)
            .send(blogToPut)
            .expect(401)

        const blogAfterUpdate = await Blog.findById(blogToUpdate._id)

        expect(blogAfterUpdate.likes).toBe(blogToUpdate.likes)

    })
})

afterAll(() => {
    mongoose.connection.close()
})