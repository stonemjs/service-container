import ContainerException from '../exceptions/ContainerException.mjs'

export const SERVICE_TYPE = 'service'

export const Service = (value) => {
  if (!value) throw new ContainerException(ContainerException.DECORATOR_VALUE_TYPE)
  return (target) => {
    target.metadata = { ...value, type: SERVICE_TYPE }
  }
}
