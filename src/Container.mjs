import { Proxiable } from './Proxiable.mjs'
import { Factory } from './models/Factory.mjs'
import { Instance } from './models/Instance.mjs'
import { Singleton } from './models/Singleton.mjs'
import { ContainerException } from './exceptions/ContainerException.mjs'

/**
 * Class representing a Container.
 *
 * @author Mr. Stone <pierre.evens16@gmail.com>
 */
export class Container extends Proxiable {
  #aliases
  #bindings
  #providers

  /**
   * Create a container.
   */
  constructor () {
    super({
      get: (target, prop, receiver) => {
        if (Reflect.has(target, prop)) {
          return Reflect.get(target, prop, receiver)
        } else {
          return target.make.apply(this, [prop])
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

  /**
   * Retrieve the value of the aliases property.
   *
   * @return {Binding}
   */
  get aliases () {
    return this.#aliases
  }

  /**
   * Set a binding as alias.
   *
   * @param  {any}               key     - The binding key.
   * @param  {(string|string[])} aliases - Take a string or an array of string as alias.
   * @return {this}
   */
  alias (key, aliases) {
    for (const alias of Array.isArray(aliases) ? aliases : [aliases]) {
      if (key === alias) {
        throw new ContainerException(`${key} is aliased to itself.`)
      }
      this.#aliases.set(alias, key)
    }
    return this
  }

  /**
   * Is alias exists.
   *
   * @param  {string} alias - The alias.
   * @return {boolean}
   */
  isAlias (alias) {
    return this.#aliases.has(alias)
  }

  /**
   * Get a binding by it's alias.
   *
   * @param  {(string|string[])} alias - The alias name.
   * @return {any}
   */
  getAlias (alias) {
    return this.#aliases.get(alias)
  }

  /**
   * Set class name as camelCase alias
   *
   * @param  {Class} Class - The class name.
   * @return {this}
   */
  asAlias (Class) {
    if (!this.#isClass(Class)) { return this }
    return this.alias(Class, `${Class.name.charAt(0).toLowerCase()}${Class.name.slice(1)}`)
  }

  /**
   * Bind a single instance or value into the container under the provided key.
   *
   * @param  {any} key   - The key
   * @param  {any} value - The value
   * @return {this}
   */
  instance (key, value) {
    this.#bindings.set(key, new Instance(value))
    return this
  }

  /**
   * Bind a single instance or value into the container under the provided key if not bound.
   *
   * @param  {any} key   - The key
   * @param  {any} value - The value
   * @return {this}
   */
  instanceIf (key, value) {
    !this.bound(key) && this.instance(key, value)
    return this
  }

  /**
   * Bind a resolver function into the container under the provided key. The
   * resolver will be run once and the resulting value will be returned for all
   * subsequent resolutions.
   *
   * @param  {any}      key      - The key
   * @param  {Resolver} resolver - The resolver function
   * @return {this}
   */
  singleton (key, resolver) {
    this.#bindings.set(key, new Singleton(resolver))
    return this
  }

  /**
   * Bind a resolver function into the container under the provided key. The
   * resolver will be run once and the resulting value will be returned for all
   * subsequent resolutions if not bound.
   *
   * @param  {any}      key      - The key
   * @param  {Resolver} resolver - The resolver function
   * @return {this}
   */
  singletonIf (key, resolver) {
    !this.bound(key) && this.singleton(key, resolver)
    return this
  }

  /**
   * Bind a resolver function into the container under the provided key. The
   * resolver will be run each time the key is resolved resulting in new
   * instances each resolution.
   *
   * @param  {any}      key      - The key
   * @param  {Resolver} resolver - The resolver function
   * @return {this}
   */
  binding (key, resolver) {
    this.#bindings.set(key, new Factory(resolver))
    return this
  }

  /**
   * Bind a resolver function into the container under the provided key. The
   * resolver will be run each time the key is resolved resulting in new
   * instances each resolution if not bound.
   *
   * @param  {any}      key      - The key
   * @param  {Resolver} resolver - The resolver function
   * @return {this}
   */
  bindingIf (key, resolver) {
    !this.bound(key) && this.binding(key, resolver)
    return this
  }

  /**
   * Resolve a value from the container by its key.
   *
   * @param  {any} key - The key
   * @return {any}
   */
  make (key) {
    key = this.isAlias(key) ? this.getAlias(key) : key

    if (this.#bindings.has(key)) {
      return this.#bindings.get(key).resolve(this)
    }

    throw new ContainerException(ContainerException.RESOLUTION_TYPE, key)
  }

  /**
   * Resolve a value from the container by its key and return it in a factory function.
   *
   * @param  {any} key - The key
   * @return {Function}
   */
  factory (key) {
    return () => this.make(key)
  }

  /**
   * Check if value is already bound in the container by its key.
   *
   * @param  {any} key - The key
   * @return {boolean}
   */
  bound (key) {
    if (this.#aliases.has(key)) {
      return this.#bindings.has(this.getAlias(key))
    } else {
      return this.#bindings.has(key)
    }
  }

  /**
   * Check if value is already bound in the container by its key.
   *
   * @param  {any} key - The key
   * @return {boolean}
   */
  has (key) {
    return this.bound(key)
  }

  /**
   * Add a service provider into the container to register one or many bindings
   * as a unit.
   *
   * @param  {Provider} providerClass - A class extended the Provider Class
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
   * Reset the container so that all bindings are removed.
   *
   * @return {this}
   */
  clear () {
    this.#aliases.clear()
    this.#bindings.clear()
    this.#providers.clear()
    return this
  }

  /**
   * Auto Discover services with zero configuration.
   *
   * @param  {Function[]} services - Classes representing the services to be registered in the container.
   * @return {this}
   */
  discovering (services) {
    for (const service of (services ?? [])) {
      if (!service.metadata?.isInjectable) {
        throw new ContainerException(ContainerException.NOT_A_SERVICE_TYPE, service)
      }
      const { name, singleton = true, alias } = service.metadata
      this.autoBinding(name ?? service, service, singleton, alias ?? [])
    }
    return this
  }

  /**
   * AutoBind value to the service container.
   *
   * @param  {any}               name             - A key to make the binding. Can be anything.
   * @param  {any}               value            - The item to bind.
   * @param  {boolean}           [singleton=true] - Bind as singleton when true.
   * @param  {(string|string[])} [alias=[]]       - A key to make the binding.
   * @return {this}
   */
  autoBinding (name, Value, singleton = true, alias = []) {
    if (!this.bound(name)) {
      if (this.#isFunction(Value)) {
        const resolver = this.#isArrowFunction(Value) ? (container) => Value(container) : (container) => new Value(container)
        singleton ? this.singleton(name, resolver) : this.binding(name, resolver)
      } else {
        this.instance(name, Value)
      }
      this.alias(name, alias)
    }
    return this
  }

  #isFunction (value) {
    return typeof value === 'function'
  }

  #isClass (value) {
    return this.#isFunction(value) && /^\s*class/.test(value.toString())
  }

  #isArrowFunction (value) {
    return this.#isFunction(value) && value.toString().includes('=>') && !value.prototype?.constructor
  }
}
