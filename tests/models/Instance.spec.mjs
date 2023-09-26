import { Instance } from '../../src/models/Instance.mjs'

describe('Instance', () => {
  describe('resolve', () => {
    it('should return the resolved value', function () {
      // Arrange
      const value = 'StoneJS'
      const binding = new Instance(value)
      // Act
      const response = binding.resolve()
      // Assert
      this.assert.equal(response, value)
    })
  })
})
