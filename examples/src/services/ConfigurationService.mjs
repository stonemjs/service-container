import { Service } from '../../../src/index.mjs'

const configs = {
  config: { middleware: { name: 'Vensy Middleware' }, user: { email: 'jonh.doe@stone-js.com', names: ['Jonh', 'Doe', 'James'] } }
}

@Service({
  alias: ['config', 'configurationService']
})
export default class ConfigurationService {
  constructor () {
    if (!configs) throw new Error('No configurations provided')
    this.configurations = configs
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