/**
 * Class representing a Binding.
 *
 * @author Mr. Stone <evensstone@gmail.com>
 */
export class Binding {
  /**
   * Create a new instance of Binding.
   *
   * @param {*} [value=null]
   */
  constructor (value = null) {
    this.value = value
  }

  /**
   * Resolve and return the value of the binding.
   *
   * @return {*}
   */
  resolve () {
    return this.value
  }
}
