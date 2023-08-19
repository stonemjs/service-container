import { Binding } from './Binding.mjs'

/**
 * Class representing a ResolverBinding.
 *
 * @author Mr. Stone <evensstone@gmail.com>
 */
export class ResolverBinding extends Binding {
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
   * Retrieve the resolver.
   *
   * @return {Function}
   */
  get resolver () {
    return this.#resolver
  }
}
