const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/listHelper')

test('dumpin return one', () => {
  const blog = []

  const result = listHelper.dumpin(blog)
  assert.strictEqual(result, 1)
})

describe('Total likes', () => {
  test('When the list has only one blog , equals likes to that ', () => {
    const blogs = listHelper.blogs

    const result = listHelper.totalLikes(blogs)

    assert.strictEqual(result, 5)
  })
})
