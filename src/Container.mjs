import { Factory } from './models/Factory.mjs'
import { Instance } from './models/Instance.mjs'
import { Singleton } from './models/Singleton.mjs'
import { ContainerError } from './errors/ContainerError.mjs'
import { Proxiable, isClass, isFunction, lcfirst } from '@stone-js/common'

/**
 * Class representing a Container.
 *
 * @author Mr. Stone <evensstone@gmail.com>
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
   * @return {Map}
   */
  get bindings () {
    return this.#bindings
  }

  /**
   * Retrieve the value of the aliases property.
   *
   * @return {Map}
   */
  get aliases () {
    return this.#aliases
  }

  /**
   * Set a binding as alias.
   *
   * @param  {*}                 key     - The binding key.
   * @param  {(string|string[])} aliases - Take a string or an array of string as alias.
   * @return {this}
   */
  alias (key, aliases) {
    [].concat(aliases)
      .forEach(alias => {
        if (key === alias) {
          throw new ContainerError(ContainerError.ALIAS_TYPE, key)
        } else if (!this.has(key)) {
          throw new ContainerError(ContainerError.ALIAS_UNBOUND_TYPE, key)
        }
        this.#aliases.set(alias, key)
      })
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
   * @return {*}
   */
  getAlias (alias) {
    return this.#aliases.get(alias)
  }

  /**
   * Set class name as camelCase alias
   *
   * @param  {Function} Class - The class.
   * @return {this}
   */
  asAlias (Class) {
    if (!isClass(Class)) { return this }
    return this.alias(Class, lcfirst(Class.$$metadata$$?.name ?? Class.name))
  }

  /**
   * Bind a single instance or value into the container under the provided key.
   *
   * @param  {*} key   - The key
   * @param  {*} value - The value
   * @return {this}
   */
  instance (key, value) {
    this.#bindings.set(key, new Instance(value))
    return this
  }

  /**
   * Bind a single instance or value into the container under the provided key if not bound.
   *
   * @param  {*} key   - The key
   * @param  {*} value - The value
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
   * @param  {*}        key      - The key
   * @param  {Function} resolver - The resolver function
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
   * @param  {*}        key      - The key
   * @param  {Function} resolver - The resolver function
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
   * @param  {*}        key      - The key
   * @param  {Function} resolver - The resolver function
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
   * @param  {*}        key      - The key
   * @param  {Function} resolver - The resolver function
   * @return {this}
   */
  bindingIf (key, resolver) {
    !this.bound(key) && this.binding(key, resolver)
    return this
  }

  /**
   * Resolve only registered value from the container by its key.
   *
   * @param  {*} key - The key
   * @return {*}
   */
  make (key) {
    key = this.isAlias(key) ? this.getAlias(key) : key

    if (this.#bindings.has(key)) {
      return this.#bindings.get(key).resolve(this)
    }

    throw new ContainerError(ContainerError.RESOLUTION_TYPE, key)
  }

  /**
   * Resolve registered or non-registered value by its key.
   *
   * @param  {*} key - The key
   * @return {*}
   */
  resolve (key, singleton = false) {
    if (this.has(key)) {
      return this.make(key)
    } else if (isClass(key)) {
      return this.autoBinding(key, key, singleton).make(key)
    }

    throw new ContainerError(ContainerError.RESOLUTION_TYPE, key)
  }

  /**
   * Resolve a value from the container by its key and return it in a factory function.
   *
   * @param  {*} key - The key
   * @return {Function}
   */
  factory (key) {
    return () => this.make(key)
  }

  /**
   * Check if value is already bound in the container by its key.
   *
   * @param  {*} key - The key
   * @return {boolean}
   */
  bound (key) {
    return this.#bindings.has(this.#aliases.has(key) ? this.getAlias(key) : key)
  }

  /**
   * Check if value is already bound in the container by its key.
   *
   * @param  {*} key - The key
   * @return {boolean}
   */
  has (key) {
    return this.bound(key)
  }

  /**
   * Add a service provider into the container to register one or many bindings as a unit.
   *
   * @param  {(Function|Function[])} classes - A class extended the AbstractProvider Class
   * @return {this}
   */
  provider (classes) {
    for (const Class of [].concat(classes)) {
      if (Class.prototype?.register) {
        const provider = new Class(this)
        if (!this.#providers.has(Class)) {
          provider.register()
          this.#providers.add(Class)
        }
      } else {
        throw new ContainerError(ContainerError.PROVIDER_TYPE, Class)
      }
    }

    return this
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
   * Register services with zero configuration.
   *
   * @param  {(Function|Function[])} classes - Classes representing the services to be registered in the container.
   * @return {this}
   */
  register (classes) {
    for (const Class of [].concat(classes)) {
      if (Class.$$metadata$$?.service) {
        const { name, singleton = true, alias } = Class.$$metadata$$.service
        this.autoBinding(name ?? Class, Class, singleton, alias ?? [])
      } else {
        throw new ContainerError(ContainerError.NOT_A_SERVICE_TYPE, Class)
      }
    }

    return this
  }

  /**
   * AutoBind value to the service container.
   *
   * @param  {*}                 name             - A key to make the binding. Can be anything.
   * @param  {*}                 [value=null]     - The item to bind.
   * @param  {boolean}           [singleton=true] - Bind as singleton when true.
   * @param  {(string|string[])} [alias=[]]       - key binding aliases.
   * @return {this}
   */
  autoBinding (name, Value = null, singleton = true, alias = []) {
    Value ??= name
    if (!this.bound(name)) {
      if (isFunction(Value)) {
        const resolver = isClass(Value) ? (container) => new Value(container) : (container) => Value(container)
        singleton ? this.singleton(name, resolver) : this.binding(name, resolver)
      } else {
        this.instance(name, Value)
      }
      this.alias(name, alias)
    }
    return this
  }
}
