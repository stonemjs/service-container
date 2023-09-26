import { Binding } from '../../src/models/Binding.mjs'

describe('Binding', () => {
  describe('resolve', () => {
    it('should return the resolved value', function () {
      // Arrange
      const value = 'StoneJS'
      const binding = new Binding(value)
      // Act
      const response = binding.resolve()
      // Assert
      this.assert.equal(response, value)
    })
  })
})
