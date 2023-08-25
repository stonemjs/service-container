import { Service } from "@noowow-community/service-container-js"

@Service({
  dependencies: [
    { name: 'config', value: { config: { middleware: { name: 'Vensy Middleware' }, user: { email: 'jonh.doe@noowow.com', names: ['Jonh', 'Doe', 'James'] } } } }
  ]
})
export default class ConfigurationService {
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