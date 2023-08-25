import ContainerException from '../exceptions/ContainerException.mjs'

export const SERVICE_PROVIDER_TYPE = 'service_provider'

export const ServiceProvider = (value) => {
  if (!value) throw new ContainerException(ContainerException.DECORATOR_VALUE_TYPE)
  return (target) => {
    target.metadata = { ...value, type: SERVICE_PROVIDER_TYPE }
  }
}
