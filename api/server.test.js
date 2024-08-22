// Write your tests here
const request = require('supertest')
const db = require('../data/dbConfig')
const server = require('../api/server')

const elle = { username: 'elle' , password: '1234' }

beforeAll(async () => {
  await db.migrate.rollback() 
  await db.migrate.latest()
})
beforeEach(async () => {
  await db('users').truncate()
})
afterAll(async () => {
  await db.destroy()
})

describe('sanity check' , () => {
  test('environment is testing' , () => {
      expect(process.env.NODE_ENV).toBe('testing')
  })
})

describe('[POST] register' , () => {
  test('should return 201 okay on successful registration' , async () => {
    const res = await request(server).post('/api/auth/register').send(elle)
    expect(res.status).toBe(201)
    })
    test('should return 400 if try to register with taken username' , async () => {
      const res = await request(server).post('/api/auth/register').send(elle)
      const invalid = await request(server).post('/api/auth/register').send(elle)
      expect(invalid.status).toBe(400)
      })
  })

  describe('[POST] login' , () => {
    test('should return 200 okay on successful login' , async () => {
      const res = await request(server).post('/api/auth/register').send(elle)
      const login = await request(server).post('/api/auth/login').send(elle)
      expect(login.status).toBe(200)
      })
      test('should return 400 when no username or password' , async () => {
        const res = await request(server).post('/api/auth/register').send()
        expect(res.status).toBe(400)
    })
  })
