const { describe, test, beforeEach, after } = require('node:test')
const assert = require('node:assert')
const User = require('../modules/user')

test('Delete users', async () => {
  const result = await User.deleteMany({})
  console.log(result.length)

  assert.strictEqual(result.length === 0)
})
