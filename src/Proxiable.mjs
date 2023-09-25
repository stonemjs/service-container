/**
 * Class representing a Proxiable.
 */
export class Proxiable {
  /**
   * Create a proxiable.
   *
   * @param {Object} handler - A trap object for the proxy.
   */
  constructor (handler) {
    return new Proxy(this, handler)
  }
}
