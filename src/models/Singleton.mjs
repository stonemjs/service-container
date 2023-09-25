import { ResolverBinding } from './ResolverBinding.mjs'

/**
 * Class representing a Singleton.
 */
export class Singleton extends ResolverBinding {
  /**
   * Resolve and return the value of the binding.
   *
   * @param  {Container} container
   * @return {any}
   */
  resolve (container) {
    if (this.hasResolved === false) {
      this.hasResolved = true
      this.value = this.resolver(container)
    }

    return this.value
  }
}
