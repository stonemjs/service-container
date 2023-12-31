/**
 * Class representing a ContainerException.
 */
export class ContainerException extends Error {
  static CODE = 'IoC_CON-500'

  static get CONFIG_TYPE () { return 'config' }
  static get PROVIDER_TYPE () { return 'provider' }
  static get RESOLUTION_TYPE () { return 'resolution' }
  static get NOT_A_SERVICE_TYPE () { return 'not_a_service' }
  static get DECORATOR_VALUE_TYPE () { return 'decorator_value' }
  static get SERVICE_NOT_FOUND_TYPE () { return 'service_not_found' }

  constructor (type, message, metadata = {}) {
    super()
    this.type = type
    this.metadata = metadata
    this.code = ContainerException.CODE
    this.name = 'stonejs.ioc.service_container'
    this.message = this.#getMessage(type, message)
  }

  /**
   * The ResponseException allow to normalize response.
   *
   * @typedef  {Object}         ResponseException
   * @property {boolean}        error
   * @property {number|string}  code
   * @property {string}         name
   * @property {string}         content
   * @property {Object}         metadata
   */

  /**
   * Get Error as a ResponseException's Object.
   *
   * @return {ResponseException}.
   */
  getResponse () {
    return {
      error: true,
      code: this.code,
      name: this.name,
      content: this.message,
      metadata: this.metadata
    }
  }

  #getMessage (type, message) {
    const messages = {
      [ContainerException.CONFIG_TYPE]: 'No configurations provided.',
      [ContainerException.RESOLUTION_TYPE]: this.#getResolutionMessage(message),
      [ContainerException.SERVICE_NOT_FOUND_TYPE]: `Service(${message}) not found.`,
      [ContainerException.DECORATOR_VALUE_TYPE]: 'No configurations provided for this decorator.',
      [ContainerException.PROVIDER_TYPE]: `This class(${message}) is not a provider. Class must extends Provider class or must use @ServiceProvider decorator.`,
      [ContainerException.NOT_A_SERVICE_TYPE]: `This (${message}) is not service. Must contains metadata static property or must use @Service decorator`
    }
    return messages[type] ?? 'An error has occured.'
  }

  #getResolutionMessage (key) {
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
