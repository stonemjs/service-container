import Provider from "./Provider.mjs"
import ContainerException from "./exceptions/ContainerException.mjs"
import Factory from "./models/Factory.mjs"
import Instance from "./models/Instance.mjs"
import Singleton from "./models/Singleton.mjs"

export default class Container {
  constructor (configurations) {
    if (!configurations) throw new ContainerException(ContainerException.CONFIG_TYPE)
    this._providers = new Set()
    this._bindings = new WeakMap()
    this._configurations = configurations
  }

  /**
   * Retrieve the value of the bindings property.
   *
   * @return {Binding}
   */
  get bindings () {
    return this._bindings
  }

  /**
   * Bind a single instance or value into the container under the provided key.
   *
   * @param  {any} key
   * @param  {any} value
   * @return {this}
   */
  instance (key, value) {
    this._bindings.set(key, new Instance(value))
    return this
  }

  /**
   * Bind a resolver function into the container under the provided key. The
   * resolver will be run once and the resulting value will be returned for all
   * subsequent resolutions.
   *
   * @param  {any}      key
   * @param  {Resolver} resolver
   * @return {this}
   */
  singleton (key, resolver) {
    this._bindings.set(key, new Singleton(resolver))
    return this
  }

  /**
   * Bind a resolver function into the container under the provided key. The
   * resolver will be run each time the key is resolved resulting in new
   * instances each resolution.
   *
   * @param  {any}      key
   * @param  {Resolver} resolver
   * @return {this}
   */
  binding (key, resolver) {
    this._bindings.set(key, new Factory(resolver))
    return this
  }

  /**
   * Resolve a value from the container by its key.
   *
   * @param  {any} key
   * @return {any}
   */
  make (key) {
    if (this._bindings.has(key)) {
      return this._bindings.get(key).resolve(this)
    }
    throw new ContainerException(ContainerException.RESOLUTION_TYPE, key)
  }

  /**
   * Add a service provider into the container to register one or many bindings
   * as a unit.
   *
   * @param  {Provider} provider
   * @return {this}
   */
  provider (ProviderClass) {
    if (ProviderClass !== Provider) throw new ContainerException(ContainerException.PROVIDER_TYPE, ProviderClass)
    const provider = new ProviderClass(this)
    provider.register()
    !this._providers.has(provider) && this._providers.add(provider)
    return this
  }

  /**
   * Reset the container so that all fake bindings are removed and all original
   * bindings will be used when requested. If a hard request is run, then both
   * the fakes and the bindings will be cleared.
   *
   * @param  {boolean} hard
   * @return {this}
   */
  clear () {
    this._bindings.clear()
    return this
  }
}