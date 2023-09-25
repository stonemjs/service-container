import { ResolverBinding } from './ResolverBinding.mjs'

/**
 * Class representing a Factory.
 */
export class Factory extends ResolverBinding {
  /**
   * Resolve and return the value of the binding.
   *
   * @param  {Container} container
   * @return {any}
   */
  resolve (container) {
    this.hasResolved = true
    this.value = this.resolver(container)
    return this.value
  }
}
