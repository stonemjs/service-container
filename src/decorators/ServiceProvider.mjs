import deepmerge from 'deepmerge'
import { Provider } from '../Provider.mjs'

export const SERVICE_PROVIDER_TYPE = 'service_provider'

/**
 * Service decorator to mark a class as a ServiceProvider
 * and autobind it's services to the container.
 *
 * @param {object} configurations - The decorator congiguration keys.
 * @return {any}
 */
export const ServiceProvider = (value) => {
  return (target) => {
    value ??= {}
    Reflect.setPrototypeOf(target, Provider)
    Reflect.setPrototypeOf(target.prototype, Provider.prototype)
    target.metadata = deepmerge(target.metadata ?? {}, { ...value, type: SERVICE_PROVIDER_TYPE })
    return target
  }
}
