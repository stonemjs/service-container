import { ResolverBinding } from './ResolverBinding.mjs'

/**
 * Class representing a Singleton.
 *
 * @author Mr. Stone <evensstone@gmail.com>
 */
export class Singleton extends ResolverBinding {
  /**
   * Resolve and return the value of the binding.
   *
   * @param  {Container} container
   * @return {*}
   */
  resolve (container) {
    if (this.hasResolved === false) {
      this.hasResolved = true
      this.value = this.resolver(container)
    }

    return this.value
  }
}
