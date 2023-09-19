import { Service } from "@noowow-community/service-container"

const configs = {
  config: { middleware: { name: 'Vensy Middleware' }, user: { email: 'jonh.doe@noowow.com', names: ['Jonh', 'Doe', 'James'] } }
}

@Service()
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