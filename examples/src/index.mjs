// import { globSync } from "glob"
// import { getRelativePath } from "./utils.mjs"
import { container } from "./service-container.mjs"
import AuthMiddleware from "./middleware/AuthMiddleware.mjs"
import UserController from "./controllers/UserController.mjs"
import UserService from "./services/UserService.mjs"
import ConfigurationService from "./services/ConfigurationService.mjs"

// const importServiceClasses = async () => {
//   const klasses = new Set()
//   for (const folder of ['src']) {
//     const files = globSync(`${folder}/**/*.mjs`, { absolute: false })
//     for (const file of files) {
//       try {
//         const klass = (await import(getRelativePath(file))).default
//         klass.metadata && !klasses.has(klass) && klasses.add(klass)
//       } catch (e) {
//         console.log('Error while importing services', e);
//       }
//     }
//   }
//   return klasses
// }
const getModules = () => Promise.resolve([UserService, UserController, ConfigurationService, AuthMiddleware])

getModules().then(modules => {
  container.discovering(modules)
  console.log('Binding values:', container.bindings.values());
  container.make(AuthMiddleware).handleRequest({ body: { name: 'Evens' } })
  container.make(UserController).list({ body: { name: 'Evens' } })
}).catch(e => console.log('Error', e))

// import { container } from "./service-container.mjs"
// import modules from "./*.mjs"
// console.log('modules', modules)
// console.log('palllll', container);