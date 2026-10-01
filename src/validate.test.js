import test from 'node:test'
import assert from 'node:assert/strict'
import { validateContact } from './validate.js'

test('accepts a complete message', () => {
  assert.deepEqual(
    validateContact({ name: 'Ada', email: 'ada@studio.com', message: 'Need a redesign' }),
    {},
  )
})

test('rejects empty and short fields', () => {
  const errors = validateContact({ name: ' ', email: 'nope', message: 'short' })
  assert.ok(errors.name)
  assert.ok(errors.email)
  assert.ok(errors.message)
})
