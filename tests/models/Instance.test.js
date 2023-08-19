import { Instance } from '../../src/models/Instance.mjs'

describe('Instance', () => {
  describe('#resolve', () => {
    it('should return the resolved value', () => {
      // Arrange
      const value = 'StoneJS'
      const binding = new Instance(value)

      // Act
      const response = binding.resolve()

      // Assert
      expect(response).toEqual(value)
    })
  })
})
