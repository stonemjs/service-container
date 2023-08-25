import Binding from './Binding.mjs'

export default class ResolverBinding extends Binding {
  /**
   * Create a new instance of ResolverBinding.
   *
   * @param {Function} resolver
   */
  constructor (resolver) {
    super()
    this.hasResolved = false
    this._resolver = resolver
  }

  /**
   * Retrieve the value of the resolver property.
   *
   * @return {Function}
   */
  get resolver () {
    return this._resolver
  }
}
