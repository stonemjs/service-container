import ResolverBinding from "./ResolverBinding.mjs"

export default class Factory extends ResolverBinding {
  /**
   * Resolve and return the value of the binding.
   *
   * @param  {Container} container
   * @return {any}
   */
  resolve (container) {
    this.hasResolved = this.hasResolved === false || true
    return this.resolver(container)
  }
}