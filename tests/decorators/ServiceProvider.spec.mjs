import { Provider } from '../../src/Provider.mjs'
import { SERVICE_PROVIDER_TYPE, ServiceProvider } from '../../src/decorators/ServiceProvider.mjs'

describe('ServiceProvider', () => {
  describe('main', () => {
    it('should add metadata static property to class', function () {
      // Arrange
      class UserProvider {}
      // Act
      const response = ServiceProvider()(UserProvider)
      // Assert
      this.assert.isOk(response.metadata)
      this.assert.equal(response.metadata.type, SERVICE_PROVIDER_TYPE)
    })

    it('must extend Provider class', function () {
      // Arrange
      class UserProvider {}
      // Act
      const response = ServiceProvider()(UserProvider)
      // Assert
      this.assert.instanceOf(response.prototype, Provider)
    })
  })
})
