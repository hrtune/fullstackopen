const User = require('../models/user')
const bcrypt = require('bcrypt')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')

describe('create a user', () => {
    beforeEach(async () => {
        await User.deleteMany({})
        const passwordHash = await bcrypt.hash('sekret', 10)
        const user = new User({ username: 'root', passwordHash })
        await user.save()
    })

    test('who is valid', async () => {

        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'elon',
            name: 'Elon Musk',
            password: 'musk1234',
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)


        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

        const usernames = usersAtEnd.map(u => u.username)
        expect(usernames).toContain(newUser.username)

    })

    test('whose username is missing', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            name: 'Elon Musk',
            password: 'musk1234',
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)

    })

    test('whose password is missing', async () => {

        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'elon',
            name: 'Elon Musk',
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)


        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)

    })

    test('whose name is missing', async () => { // valid case

        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'elon',
            password: 'musk1234',
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)


        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

        const usernames = usersAtEnd.map(u => u.username)
        expect(usernames).toContain(newUser.username)

    })

    test('whose username already exists', async () => {

        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'root',
            name: 'Elon Musk',
            password: 'musk1234',
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)


        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)

    })

    test('whose username is invalid', async () => {

        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'em',
            name: 'Elon Musk',
            password: 'musk1234',
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)


        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)

    })

    test('whose password is invalid', async () => {

        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'elon',
            name: 'Elon Musk',
            password: 'hi',
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)


        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)

    })
    
})