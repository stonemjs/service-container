import Binding from './Binding.mjs'

export default class ResolverBinding extends Binding {
  #resolver

  /**
   * Create a new instance of ResolverBinding.
   *
   * @param {Function} resolver
   */
  constructor (resolver) {
    super()
    this.hasResolved = false
    this.#resolver = resolver
  }

  /**
   * Retrieve the value of the resolver property.
   *
   * @return {Function}
   */
  get resolver () {
    return this.#resolver
  }
}
