import { RuntimeError } from '@stone-js/common'

/**
 * Class representing a ContainerError.
 *
 * @author Mr. Stone <evensstone@gmail.com>
 */
export class ContainerError extends RuntimeError {
  static get ALIAS_TYPE () { return 'alias' }
  static get CONFIG_TYPE () { return 'config' }
  static get PROVIDER_TYPE () { return 'provider' }
  static get RESOLUTION_TYPE () { return 'resolution' }
  static get ALIAS_UNBOUND_TYPE () { return 'alias_unbound' }
  static get NOT_A_SERVICE_TYPE () { return 'not_a_service' }
  static get DECORATOR_VALUE_TYPE () { return 'decorator_value' }
  static get SERVICE_NOT_FOUND_TYPE () { return 'service_not_found' }

  /**
   * Create a ContainerError.
   *
   * @param {string} type
   * @param {*} message
   * @param {Object} [options={}] - The error options.
   * @param {string} [options.code] - The error code.
   * @param {*} [options.metadata] - Additional information to log.
   * @param {*} [options.cause] - Previous error.
   */
  constructor (type, message, options) {
    super(null, options)
    this.type = type
    this.name = 'ContainerError'
    this.message = this.#getMessage(type, message)
  }

  #getMessage (type, message) {
    const messages = {
      [ContainerError.CONFIG_TYPE]: 'No configurations provided.',
      [ContainerError.ALIAS_TYPE]: `${message?.toString()} is aliased to itself.`,
      [ContainerError.RESOLUTION_TYPE]: this.#getResolutionMessage(message),
      [ContainerError.SERVICE_NOT_FOUND_TYPE]: `Service(${message?.toString()}) not found.`,
      [ContainerError.DECORATOR_VALUE_TYPE]: 'No configurations provided for this decorator.',
      [ContainerError.ALIAS_UNBOUND_TYPE]: `Cannot alias an unbound value(${message?.toString()}).`,
      [ContainerError.NOT_A_SERVICE_TYPE]: `This (${message?.toString()}) is not service. Must contains $$metadata$$ static property or must use @Service decorator.`,
      [ContainerError.PROVIDER_TYPE]: `This class(${message?.toString()}) is not a provider. Class must extends AbstractProvider class or must use @ServiceProvider decorator.`
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
