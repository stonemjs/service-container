import { Service } from "@noowow-community/service-container"

@Service({
  alias: 'userCtrl'
})
export default class UserController {
  constructor ({ userService }) {
    this.userService = userService
  }

  list(request) {
    console.log('User controller list:', request);
    console.log('User controller user service:', this.userService.list());
    return this.userService.list()
  }

  show(request) {
    console.log('User controller show:', this.userService.show(request.id));
  }
}