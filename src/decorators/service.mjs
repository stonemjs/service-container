export default (value) => {
  if (!value) throw new ContainerDecoratorException('service')
  return (target) => {
    target.metadata = value
  }
}