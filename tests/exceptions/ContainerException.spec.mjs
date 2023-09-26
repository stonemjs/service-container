import { ContainerException } from '../../src/exceptions/ContainerException.mjs'

describe('ContainerException', () => {
  it('should return `No configurations provided.` as message when CONFIG_TYPE error', function () {
    // Arrange
    const exception = new ContainerException(ContainerException.CONFIG_TYPE, 'Classname')
    // Assert
    this.assert.equal(exception.message, 'No configurations provided.')
  })

  it('should return a not found as message when CONFIG_TYPE error', function () {
    // Arrange
    const exception = new ContainerException(ContainerException.SERVICE_NOT_FOUND_TYPE, 'Classname')
    // Assert
    this.assert.equal(exception.message, 'Service(Classname) not found.')
  })

  it('should return a Failed to resolve a binding as message when CONFIG_TYPE error', function () {
    // Arrange
    const exception = new ContainerException(ContainerException.RESOLUTION_TYPE, 'Classname')
    // Assert
    this.assert.equal(exception.message, "Failed to resolve a binding with a key of type string with a value of 'Classname' from the service container.")
  })

  describe('getResponse', () => {
    it('should return a ResponseException instance', function () {
      // Arrange
      const exception = new ContainerException(ContainerException.CONFIG_TYPE, 'Classname')
      const expectValue = {
        error: true,
        name: exception.name,
        code: ContainerException.CODE,
        content: exception.message,
        metadata: {}
      }
      // Act
      const response = exception.getResponse()
      // Assert
      this.assert.deepEqual(response, expectValue)
    })
  })
})
