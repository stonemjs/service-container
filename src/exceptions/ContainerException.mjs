export default class ContainerException extends Error {
  static get CONFIG_TYPE () { return 'config' }
  static get PROVIDER_TYPE () { return 'provider' }
  static get RESOLUTION_TYPE () { return 'resolution' }
  static get NOT_A_SERVICE_TYPE () { return 'not_a_service' }
  static get DECORATOR_VALUE_TYPE () { return 'decorator_value' }
  static get SERVICE_NOT_FOUND_TYPE () { return 'service_not_found' }

  constructor (type, message) {
    this.type = type
    this.name = 'noowow.service_container'
    super(this.getMessage(message))
  }

  getMessage (message) {
    const messages = {
      [ContainerException.CONFIG_TYPE]: 'No configurations provided.',
      [ContainerException.RESOLUTION_TYPE]: this.getResolutionMessage(message),
      [ContainerException.SERVICE_NOT_FOUND_TYPE]: `Service(${message}) not found.`,
      [ContainerException.DECORATOR_VALUE_TYPE]: 'No configurations provided for this decorator.',
      [ContainerException.PROVIDER_TYPE]: `This class(${message}) is not a provider. Class must extends Provider class.`,
      [ContainerException.NOT_A_SERVICE_TYPE]: `This (${message}) is not service. Must contains metadata static property or must user @Service decorator`,
    }
    return messages[type] ?? 'An error has occured.'
  }

  getResolutionMessage (key) {
    let value = ''

    switch (true) {
      case key === undefined:
        value = 'undefined'
        break
      case key === null:
        value = 'null'
        break
      case typeof key === 'function': {
        const funcName = key.name ? `: ${key.name}` : ''
        value = `[Function${funcName}]`
        break
      }
      case typeof key === 'object': {
        value = `[Object: ${key.constructor.name}]`
        break
      }
      case typeof key === 'string':
        value = `type ${typeof key} with a value of '${key}'`
        break
      case typeof key === 'symbol':
        value = key.toString()
        break
      default:
        value = `type ${typeof key} with a value of ${key}`
        break
    }

    return `Failed to resolve a binding with a key of ${value} from the service container.`
  }
}