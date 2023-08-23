export default class ConfigurationService {
  static get metadata () {
    return {
      type: 'service',
      dependencies: [
        { name: 'config', value: { config: { middleware: { name: 'Vensy Middleware' }, user: { email: 'jonh.doe@noowow.com', names: ['Jonh', 'Doe', 'James'] } } } }
      ]
    }
  }

  constructor ({ config }) {
    if (!config) throw new Error('No configurations provided')
    this.configurations = config
  }

  get (keyword, scope = 'config') {
    return keyword
      .split('.')
      .reduce((config, key) => {
        if (!config[key]) throw new Error(`No config for this key: ${keyword}`)
        return config[key]
      }, scope ? this.configurations[scope] : this.configurations)
  }
}