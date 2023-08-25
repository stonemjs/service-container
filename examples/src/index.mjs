import modules from "./**/*.mjs"
import { container } from "./service-container.mjs"
import AuthMiddleware from "./middleware/AuthMiddleware.mjs"
import UserController from "./controllers/UserController.mjs"

const services = modules
  .filter(v => v.default)
  .map(v => v.default)
  .filter(v => v.metadata && v.metadata.type === 'service')

container.discovering(services)
console.log('Binding values:', container.bindings.size);
container.make(AuthMiddleware).handleRequest({ body: { name: 'Evens' } })
container.make(UserController).list({ body: { name: 'Evens' } })
