import modules from "./**/*.mjs"
import { container } from "./service-container.mjs"
import AuthMiddleware from "./middleware/AuthMiddleware.mjs"
import UserController from "./controllers/UserController.mjs"

const services = modules
  .reduce((prev, curr) => {
    return prev.concat(Object.values(curr).filter(v => (v.metadata ?? {}).type === 'service'))
  }, [])

container.discovering(services)
console.log('Binding values:', container.bindings.size)
console.log('Aliases values:', container.aliases.size, Array.from(container.aliases.keys()))
const { userController, config, userService } = container
console.log('user service-------', userService.list())
console.log('controller', userController.list({}))
console.log('user email', container.bound('config'), config)
// container.make(AuthMiddleware).handleRequest({ body: { name: 'Evens' } })
// container.make(UserController).list({ body: { name: 'Evens' } })
