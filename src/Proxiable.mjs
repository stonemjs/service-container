export default class Proxiable {
  constructor (handler) {
    return new Proxy(this, handler)
  }
}
