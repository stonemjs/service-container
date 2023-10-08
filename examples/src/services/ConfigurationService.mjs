import { Service } from '../../../src/index.mjs'

@Service({
  alias: ['config', 'configurationService']
})
export default class ConfigurationService {
  constructor () {
    this.configurations = {
      config: { middleware: { name: 'Vensy Middleware' }, user: { email: 'jonh.doe@stone-js.com', names: ['Jonh', 'Doe', 'James'] } }
    }
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