import { Service } from "@noowow-community/service-container-js"
import ConfigurationService from "../services/ConfigurationService.mjs"

@Service({
  singleton: true,
  dependencies: [
    { name: 'configurationService', value: ConfigurationService }
  ]
})
export default class AuthMiddleware {
  constructor ({ configurationService }) {
    this.configurationService = configurationService
  }

  handleRequest(request) {
    console.log('Middleware request:', request)
    console.log('Middleware request config:', this.configurationService.get('middleware.name'))
  }

  handleResponse(request, response) {
    console.log('Middleware response:', request, response)
  }
}