import { Provider } from './Provider.mjs'
import Factory from './models/Factory.mjs'
import Instance from './models/Instance.mjs'
import Singleton from './models/Singleton.mjs'
import ContainerException from './exceptions/ContainerException.mjs'
import { SERVICE_TYPE } from './decorators/Service.mjs'

export class Container {
  #bindings
  #providers

  constructor () {
    this.#bindings = new Map()
    this.#providers = new Set()
  }

  /**
   * Retrieve the value of the bindings property.
   *
   * @return {Binding}
   */
  get bindings () {
    return this.#bindings
  }

  /**
   * Bind a single instance or value into the container under the provided key.
   *
   * @param  {any} key
   * @param  {any} value
   * @return {this}
   */
  instance (key, value) {
    this.#bindings.set(key, new Instance(value))
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
    this.#bindings.set(key, new Singleton(resolver))
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
    this.#bindings.set(key, new Factory(resolver))
    return this
  }

  /**
   * Resolve a value from the container by its key.
   *
   * @param  {any} key
   * @return {any}
   */
  make (key) {
    if (this.#bindings.has(key)) {
      return this.#bindings.get(key).resolve(this)
    }
    throw new ContainerException(ContainerException.RESOLUTION_TYPE, key)
  }

  /**
   * Check if value is already bound in the container by its key.
   *
   * @param  {any} key
   * @return {boolean}
   */
  bound (key) {
    return this.#bindings.has(key)
  }

  /**
   * Add a service provider into the container to register one or many bindings
   * as a unit.
   *
   * @param  {Provider} provider
   * @return {this}
   */
  provider (ProviderClass) {
    if (!(ProviderClass.prototype instanceof Provider)) throw new ContainerException(ContainerException.PROVIDER_TYPE, ProviderClass)
    const provider = new ProviderClass(this)
    provider.register()
    !this.#providers.has(provider) && this.#providers.add(provider)
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
    this.#bindings.clear()
    this.#providers.clear()
    return this
  }

  /**
   * Auto Discover services
   *
   * @return {this}
   */
  discovering (services = []) {
    (services ?? []).forEach(item => {
      if (!item.metadata) throw new ContainerException(ContainerException.NOT_A_SERVICE_TYPE, item)
      this.#autoBinding(item, item)
    })
    return this
  }

  #autoBinding (name, value) {
    if (!this.bound(name)) {
      if (value.metadata?.type === SERVICE_TYPE) {
        const dependencies = value.metadata.dependencies ?? []
        for (const item of dependencies) {
          this.#autoBinding(item.value.metadata ? item.value : item.name, item.value)
        }
        const deps = Object.fromEntries(dependencies.map(item => [item.name, this.make(item.value.metadata ? item.value : item.name)]))
        const Class = value
        const resolver = () => new Class(deps)
        value.metadata.singleton ? this.singleton(name, resolver) : this.binding(name, resolver)
      } else {
        this.instance(name, value)
      }
    }
  }
}
