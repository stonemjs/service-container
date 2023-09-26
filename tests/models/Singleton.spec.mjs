import { Singleton } from '../../src/models/Singleton.mjs'

describe('Singleton', () => {
  describe('resolve', () => {
    const bindings = { version: 1 }
    const resolver = container => ['StoneJS: ' + container.version]

    it('should return the resolved value', function () {
      // Arrange
      const binding = new Singleton(resolver)
      // Act
      const response = binding.resolve(bindings)
      // Assert
      this.assert.equal(response[0], resolver(bindings)[0])
    })

    it('should always return the same resolved instance value each time `resolve` is called', function () {
      // Arrange
      const binding = new Singleton(resolver)
      // Act
      const response = binding.resolve(bindings)
      const response2 = binding.resolve(bindings)
      // Assert
      this.assert.strictEqual(response, response2)
    })
  })
})
