import { Service } from '../../../src/index.mjs'

@Service({
  alias: ['userService']
})
export default class UserService {
  constructor ({ configurationService }) {
    this.configurationService = configurationService
  }

  list() {
    console.log('User service list');
    console.log('User service list config', this.configurationService.get('user.names'))
    return this.configurationService.get('user.names')
  }

  show(id) {
    console.log('User service show', id);
    console.log('User service show config', this.configurationService.get('user.email'))
    return this.configurationService.get('user.email')
  }
}