import { Factory } from '../../src/models/Factory.mjs'

describe('Factory', () => {
  describe('#resolve', () => {
    const bindings = { version: 1 }
    const resolver = container => ['StoneJS: ' + container.version]

    it('should return the resolved value', () => {
      // Arrange
      const binding = new Factory(resolver)

      // Act
      const response = binding.resolve(bindings)

      // Assert
      expect(response[0]).toEqual(resolver(bindings)[0])
    })

    it('should always return a new resolved instance value each time `resolve` is called', () => {
      // Arrange
      const binding = new Factory(resolver)

      // Act
      const response = binding.resolve(bindings)
      const response2 = binding.resolve(bindings)

      // Assert
      expect(response === response2).toBe(false)
    })
  })
})
