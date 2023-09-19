import deepmerge from 'deepmerge'

export const SERVICE_TYPE = 'service'

export const Service = (value) => {
  return (target) => {
    value ??= {}
    target.metadata = deepmerge(target.metadata ?? {}, { ...value, type: SERVICE_TYPE })
    target.metadata.singleton ??= true
    return target
  }
}
