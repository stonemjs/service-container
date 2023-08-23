import UserService from "../services/UserService.mjs";

export default class UserController {
  static get metadata () {
    return {
      type: 'service',
      dependencies: [
        { name: '$userService', value: UserService }
      ]
    }
  }

  constructor ({ $userService }) {
    this.$userService = $userService
  }

  list(request) {
    console.log('User controller list:', request);
    console.log('User controller user service:', this.$userService.list());
  }

  show(request) {
    console.log('User controller show:', this.$userService.show(request.id));
  }
}