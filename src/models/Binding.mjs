/**
 * Class representing a Binding.
 */
export class Binding {
  /**
   * Create a new instance of Binding.
   *
   * @param {any} [value=null]
   */
  constructor (value = null) {
    this.value = value
  }

  /**
   * Resolve and return the value of the binding.
   *
   * @return {any}
   */
  resolve () {
    return this.value
  }
}
