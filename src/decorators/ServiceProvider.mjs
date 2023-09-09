import deepmerge from 'deepmerge'
import { Provider } from '../Provider.mjs'
import ContainerException from '../exceptions/ContainerException.mjs'

export const SERVICE_PROVIDER_TYPE = 'service_provider'

export const ServiceProvider = (value) => {
  if (!value) throw new ContainerException(ContainerException.DECORATOR_VALUE_TYPE)
  return (target) => {
    Reflect.setPrototypeOf(target, Provider)
    Reflect.setPrototypeOf(target.prototype, Provider.prototype)
    target.metadata = deepmerge(target.metadata ?? {}, { ...value, type: SERVICE_PROVIDER_TYPE })
    return target
  }
}
