import { SERVICE_TYPE, Service } from '../../src/decorators/Service.mjs'

describe('Service', () => {
  describe('main', () => {
    it('should add metadata static property to class', function () {
      // Arrange
      class User {}
      // Act
      const response = Service({ alias: 'user' })(User)
      // Assert
      this.assert.isOk(response.metadata)
      this.assert.equal(response.metadata.singleton, true)
      this.assert.equal(response.metadata.type, SERVICE_TYPE)
    })
  })
})
