import ContainerException from "../exceptions/ContainerException.mjs"

export default (value) => {
  if (!value) throw new ContainerException(ContainerException.CONFIG_TYPE)
  return (target) => {
    target.metadata = value
  }
}