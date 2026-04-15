const { test, after, describe, beforeEach } = require('node:test')
const assert = require('assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const { blogs } = require('../utils/listHelper')
const Blog = require('../modules/blog')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  const blogData = new Blog(blogs[0])
  await blogData.save()
})

describe('test 4.8', async () => {
  test('check status and content-type', async () => {
    await api.get('/api/blogs').expect(200).expect('Content-Type', /application\/json/)
  })

  test('check that return the correct amount', async () => {
    const result = await api.get('/api/blogs')

    assert.deepStrictEqual(result.body.length, blogs.length)
  })
})

describe('test 4.9', async () => {
  test('check that the property id be exact', async () => {
    const result = await api.get('/api/blogs')
    assert.ok(result.body[0].id)
  })
})

describe('test 4.10', async () => {
  test('check that the post this correct', async () => {
    await api.post('/api/blogs').send(blogs[0]).expect(201)

    const result = await api.get('/api/blogs')

    assert.strictEqual(result.body.length, blogs.length)
  })
})

describe('test 4.11', async () => {
  test('check that the property like to be', async () => {
    const result = await blogs[1]

    assert.strictEqual(result.likes, undefined)
  })
})

after(async () => {
  await mongoose.connection.close()
})
