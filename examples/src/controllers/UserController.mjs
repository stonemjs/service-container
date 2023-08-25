import UserService from "../services/UserService.mjs"
import { Service } from "@noowow-community/service-container-js"

@Service({
  dependencies: [
    { name: 'userService', value: UserService }
  ]
})
export default class UserController {
  constructor ({ userService }) {
    this.userService = userService
  }

  list(request) {
    console.log('User controller list:', request);
    console.log('User controller user service:', this.userService.list());
  }

  show(request) {
    console.log('User controller show:', this.userService.show(request.id));
  }
}