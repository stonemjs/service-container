import Proxiable from './Proxiable.mjs'
import Factory from './models/Factory.mjs'
import Instance from './models/Instance.mjs'
import Singleton from './models/Singleton.mjs'
import ContainerException from './exceptions/ContainerException.mjs'
import { SERVICE_TYPE } from './decorators/Service.mjs'

export class Container extends Proxiable {
  #aliases
  #bindings
  #providers

  constructor () {
    super({
      get: (target, prop, receiver) => {
        if (target.bound.apply(this, [prop])) {
          return target.make.apply(this, [prop])
        } else {
          return Reflect.get(target, prop, receiver)
        }
      }
    })

    this.#aliases = new Map()
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

  get aliases () {
    return this.#aliases
  }

  alias (key, aliases) {
    for (const alias of Array.isArray(aliases) ? aliases : [aliases]) {
      if (key === alias) {
        throw new ContainerException(`${key} is aliased to itself.`)
      }
      this.#aliases.set(alias, key)
    }
    return this
  }

  isAlias (alias) {
    return this.#aliases.has(alias)
  }

  getAlias (alias) {
    return this.#aliases.get(alias)
  }

  /**
   * Bind a single instance or value into the container under the provided key.
   *
   * @param  {any} key
   * @param  {any} value
   * @return {this}
   */
  instance (key, value) {
    this.#setClassNameAsAlias(key)
    this.#bindings.set(key, new Instance(value))
    return this
  }

  instanceIf (key, value) {
    !this.bound(key) && this.instance(key, value)
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
    this.#setClassNameAsAlias(key)
    this.#bindings.set(key, new Singleton(resolver))
    return this
  }

  singletonIf (key, resolver) {
    !this.bound(key) && this.singleton(key, resolver)
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
    this.#setClassNameAsAlias(key)
    this.#bindings.set(key, new Factory(resolver))
    return this
  }

  bindingIf (key, resolver) {
    !this.bound(key) && this.binding(key, resolver)
    return this
  }

  /**
   * Resolve a value from the container by its key.
   *
   * @param  {any} key
   * @return {any}
   */
  make (key) {
    key = this.isAlias(key) ? this.getAlias(key) : key

    if (this.#bindings.has(key)) {
      return this.#bindings.get(key).resolve(this)
    }

    throw new ContainerException(ContainerException.RESOLUTION_TYPE, key)
  }

  factory (key) {
    return () => this.make(key)
  }

  /**
   * Check if value is already bound in the container by its key.
   *
   * @param  {any} key
   * @return {boolean}
   */
  bound (key) {
    if (this.#aliases.has(key)) {
      return this.#bindings.has(this.getAlias(key))
    } else {
      return this.#bindings.has(key)
    }
  }

  has (key) {
    return this.bound(key)
  }

  /**
   * Add a service provider into the container to register one or many bindings
   * as a unit.
   *
   * @param  {Provider} provider
   * @return {this}
   */
  provider (ProviderClass) {
    const provider = new ProviderClass(this)

    if (provider.register) {
      provider.register()
      !this.#providers.has(provider) && this.#providers.add(provider)
      return this
    }

    throw new ContainerException(ContainerException.PROVIDER_TYPE, ProviderClass)
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
    for (const service of (services ?? [])) {
      if (!service.metadata) throw new ContainerException(ContainerException.NOT_A_SERVICE_TYPE, service)
      this.autoBinding(service.metadata.name ?? service, service)
    }
    return this
  }

  autoBinding (name, value) {
    if (!this.bound(name)) {
      if (value.metadata?.type === SERVICE_TYPE) {
        const Class = value
        const resolver = (container) => new Class(container)
        value.metadata.singleton ? this.singleton(name, resolver) : this.binding(name, resolver)
        this.alias(name, value.metadata.alias ?? [])
      } else {
        this.instance(name, value)
      }
    }
  }

  #setClassNameAsAlias (Class) {
    if (!/^\s*class/.test(Class.toString())) return
    let name = Class.prototype.constructor.name
    name = name.charAt(0).toLowerCase() + name.slice(1)
    return this.alias(Class, name)
  }
}
