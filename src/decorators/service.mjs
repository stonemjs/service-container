import deepmerge from 'deepmerge'

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
    target.metadata = deepmerge(target.metadata ?? {}, { ...value, isInjectable: true })
    target.metadata.singleton ??= true
    return target
  }
}
