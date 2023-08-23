import { globSync } from "glob"
import { getRelativePath } from "./utils.mjs"
import { container } from "./service-container.mjs"
import AuthMiddleware from "./src/middleware/AuthMiddleware.mjs"
import UserController from "./src/controllers/UserController.mjs"

const importServiceClasses = async () => {
  const klasses = new Set()
  for (const folder of ['src']) {
    const files = globSync(`${folder}/**/*.mjs`, { absolute: false })
    for (const file of files) {
      try {
        const klass = (await import(getRelativePath(file))).default
        klass.metadata && !klasses.has(klass) && klasses.add(klass)
      } catch (e) {
        console.log('Error while importing services', e);
      }
    }
  }
  return klasses
}

importServiceClasses().then(modules => {
  container.discovering(modules)
  console.log('Binding values:', container.bindings.values());
  container.make(AuthMiddleware).handleRequest({ body: { name: 'Evens' } })
  container.make(UserController).list({ body: { name: 'Evens' } })
}).catch(e => console.log('Error', e))
