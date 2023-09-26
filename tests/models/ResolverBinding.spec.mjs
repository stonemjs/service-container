import { ResolverBinding } from '../../src/models/ResolverBinding.mjs'

describe('ResolverBinding', () => {
  describe('resolve', () => {
    it('should return the resolved value', function () {
      // Arrange
      const bindings = { version: 1 }
      const resolver = container => 'StoneJS: ' + container.version
      const binding = new ResolverBinding(resolver)
      // Act
      const response = binding.resolver(bindings)
      // Assert
      this.assert.equal(response, resolver(bindings))
    })
  })
})
