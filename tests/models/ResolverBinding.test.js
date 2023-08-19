import { ResolverBinding } from '../../src/models/ResolverBinding.mjs'

describe('ResolverBinding', () => {
  describe('#resolve', () => {
    it('should return the resolved value', () => {
      // Arrange
      const bindings = { version: 1 }
      const resolver = container => 'StoneJS: ' + container.version
      const binding = new ResolverBinding(resolver)

      // Act
      const response = binding.resolver(bindings)

      // Assert
      expect(response).toEqual(resolver(bindings))
    })
  })
})
