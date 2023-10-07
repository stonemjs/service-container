import deepmerge from 'deepmerge'

/**
 * SERVICE_TYPE.
 */
export const SERVICE_TYPE = 'service'

/**
 * Service decorator to mark a class as a service
 * and autobind it to the container.
 *
 * @param  {object} configurations - The decorator congiguration keys.
 * @return {any}
 */
export const Service = (value) => {
  return (target) => {
    value ??= {}
    target.metadata = deepmerge(target.metadata ?? {}, { ...value, type: SERVICE_TYPE })
    target.metadata.singleton ??= true
    return target
  }
}
