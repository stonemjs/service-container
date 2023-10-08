import modules from "./**/*.mjs"
import { container } from "./service-container.mjs"
import AuthMiddleware from "./middleware/AuthMiddleware.mjs"
import UserController from "./controllers/UserController.mjs"

/**
 * Get Services decorated with `@Service` decorator
 */
const services = modules
  .filter(v => v.default)
  .reduce((prev, curr) => {
    return prev.concat(Object.values(curr).filter(v => v.metadata?.isInjectable))
  }, [])

/**
 * Auto bind services to container
 * Zero configuration binding
 */
container.discovering(services)

/**
 * Print the size of bindings
 */
console.log('Binding size:', container.bindings.size)

/**
 * Print the size of aliases
 * Print the aliases keys
 */
console.log('Aliases size:', container.aliases.size)
console.log('Aliases keys:', Array.from(container.aliases.keys()))

/**
 * Bind a single value to the container
 */
container.instance('framework', 'StoneJS')

/**
 * Proxy resolver
 */
console.log('framework value resolved via proxy:', container.framework)

/**
 * Destructuring resolver
 * Resolve bindings in service container using Destructuring assignment
 */
const { userCtrl, config, userService } = container

/**
 * Use resolved services
 */
console.log('Invoke UserService list method', userService.list())
console.log('Invoke UserController list method', userCtrl.list({}))
console.log('Check if configutationService has bound', container.bound('config'))
console.log('Get user email in configs', config.get('user.email'))

/**
 * Resolve services from the container
 */
const authMiddleware = container.make(AuthMiddleware)
const userController = container.make(UserController)

/**
 * Invoke service methods
 */
userController.list({ body: { name: 'Evens' } })
authMiddleware.handleRequest({ body: { name: 'Evens' } })
