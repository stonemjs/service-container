import { ResolverBinding } from './ResolverBinding.mjs'

/**
 * Class representing a Factory.
 *
 * @author Mr. Stone <evensstone@gmail.com>
 */
export class Factory extends ResolverBinding {
  /**
   * Resolve and return the value of the binding.
   *
   * @param  {Container} container
   * @return {*}
   */
  resolve (container) {
    this.hasResolved = true
    this.value = this.resolver(container)
    return this.value
  }
}
