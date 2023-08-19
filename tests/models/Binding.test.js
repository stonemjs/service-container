import { Binding } from '../../src/models/Binding.mjs'

describe('Binding', () => {
  describe('#resolve', () => {
    it('should return the resolved value', () => {
      // Arrange
      const value = 'StoneJS'
      const binding = new Binding(value)

      // Act
      const response = binding.resolve()

      // Assert
      expect(response).toBe(value)
    })
  })
})
