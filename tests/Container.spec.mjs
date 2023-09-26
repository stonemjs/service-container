import { ContainerException } from '../src/exceptions/ContainerException.mjs'
import { Container } from '../src/index.mjs'

describe('Container', () => {
  const container = new Container()

  beforeEach(() => {
    container.clear()
  })

  describe('make', () => {
    it('should return a resolved instance', function () {
      // Arrange
      container.instance('framework', 'StoneJS')
      // Act
      const response = container.make('framework')
      // Assert
      this.assert.equal(response, 'StoneJS')
    })

    it('should throw a `ContainerException` if the binding does not exist', function () {
      // Assert
      this.assert.throws(
        () => container.make('StoneJS'),
        ContainerException,
        'Failed to resolve a binding with a key of type string with a value of \'StoneJS\' from the service container.'
      )
    })
  })
})
