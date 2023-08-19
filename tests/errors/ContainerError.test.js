import { ContainerError } from '../../src/errors/ContainerError.mjs'

describe('#ContainerError', () => {
  it('should return messages errors for different types', () => {
    // Arrange
    const error = new ContainerError('Any', 'Classname')
    const aliasError = new ContainerError(ContainerError.ALIAS_TYPE, 'Classname')
    const configError = new ContainerError(ContainerError.CONFIG_TYPE, 'Classname')
    const providerError = new ContainerError(ContainerError.PROVIDER_TYPE, 'Classname')
    const notServiceError = new ContainerError(ContainerError.NOT_A_SERVICE_TYPE, 'Classname')
    const decoratorError = new ContainerError(ContainerError.DECORATOR_VALUE_TYPE, 'Classname')
    const aliasUnboundError = new ContainerError(ContainerError.ALIAS_UNBOUND_TYPE, 'Classname')
    const notFoundError = new ContainerError(ContainerError.SERVICE_NOT_FOUND_TYPE, 'Classname')

    // Assert
    expect(error.message).toBe('An error has occured.')
    expect(configError.message).toBe('No configurations provided.')
    expect(aliasError.message).toBe('Classname is aliased to itself.')
    expect(notFoundError.message).toBe('Service(Classname) not found.')
    expect(aliasUnboundError.message).toBe('Cannot alias an unbound value(Classname).')
    expect(decoratorError.message).toBe('No configurations provided for this decorator.')
    expect(notServiceError.message).toBe('This (Classname) is not service. Must contains $$metadata$$ static property or must use @Service decorator.')
    expect(providerError.message).toBe('This class(Classname) is not a provider. Class must extends AbstractProvider class or must use @ServiceProvider decorator.')
  })

  it('should return messages errors for different resolution types', () => {
    // Arrange
    const numberError = new ContainerError(ContainerError.RESOLUTION_TYPE, 2)
    const objectError = new ContainerError(ContainerError.RESOLUTION_TYPE, {})
    const nullError = new ContainerError(ContainerError.RESOLUTION_TYPE, null)
    const stringError = new ContainerError(ContainerError.RESOLUTION_TYPE, 'value')
    const functionError = new ContainerError(ContainerError.RESOLUTION_TYPE, () => {})
    const functionNameError = new ContainerError(ContainerError.RESOLUTION_TYPE, function patate () {})
    const symbolError = new ContainerError(ContainerError.RESOLUTION_TYPE, Symbol('patate'))
    const undefinedError = new ContainerError(ContainerError.RESOLUTION_TYPE, undefined)

    // Assert
    expect(nullError.message).toBe('Failed to resolve a binding with a key of null from the service container.')
    expect(functionError.message).toBe('Failed to resolve a binding with a key of [Function] from the service container.')
    expect(undefinedError.message).toBe('Failed to resolve a binding with a key of undefined from the service container.')
    expect(symbolError.message).toBe('Failed to resolve a binding with a key of Symbol(patate) from the service container.')
    expect(objectError.message).toBe('Failed to resolve a binding with a key of [Object: Object] from the service container.')
    expect(functionNameError.message).toBe('Failed to resolve a binding with a key of [Function: patate] from the service container.')
    expect(numberError.message).toBe('Failed to resolve a binding with a key of type number with a value of 2 from the service container.')
    expect(stringError.message).toBe("Failed to resolve a binding with a key of type string with a value of 'value' from the service container.")
  })
})
