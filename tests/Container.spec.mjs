import { assert } from 'chai'
import ContainerException from '../src/exceptions/ContainerException.mjs'
import { Container } from '../src/index.mjs'

describe('Container', () => {
  const container = new Container()

  describe('make', () => {
    beforeEach(() => {
      container.clear()
    })

    it('should throw a `ContainerException` if the binding does not exist', function () {
      const container = new Container()

      assert.throws(
        () => container.make('Noowow'),
        ContainerException,
        'Failed to resolve a binding with a key of type string with a value of \'Noowow\' from the service container.'
      )
    })
  })
})
