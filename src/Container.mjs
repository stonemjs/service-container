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
    this._providers.clear()
    return this
  }

  /**
   * Auto Discover services
   *
   * @return {Promise}
   */
  async discovering () {
    (await this._importServiceClasses()).forEach(item => {
      if (!item.metadata) throw new ContainerException(ContainerException.NOT_A_SERVICE_TYPE, item)
      this._autoBinding(item, item)
    })
  }

  _autoBinding (name, value) {
    if (!this._bindings.has(name)) {
      if (value.metadata) {
        const dependencies = value.metadata.dependencies ?? []
        for (const item of dependencies) {
          this._autoBinding(item.value, item.value)
        }
        const deps = Object.fromEntries(dependencies.map(item => [ item.name, this.make(item.value.metadata ? item.value : item.name) ]))
        const resolver = () => new value(deps)
        value.metadata.singleton ? this.singleton(name, resolver) : this.binding(name, resolver)
      } else {
        this.instance(name, value)
      }
    }
  }

  async _importServiceClasses () {
    const classes = new Set()
    for (const path of this._configurations.service.paths) {
      try {
        const files = await import(`base/${path}/**/*.mjs`)
        for (const file of files) {
          const item = file.default
          item.metadata && !classes.has(item) && classes.add(item)
        }
      } catch (e) {
        console.log('Error while importing services', e);
        throw new ContainerException(ContainerException.SERVICE_NOT_FOUND_TYPE, file)
      }
    }
    return classes
  }
}