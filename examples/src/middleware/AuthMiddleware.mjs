import ConfigurationService from "../services/ConfigurationService.mjs"

export default class AuthMiddleware {
  static get metadata () {
    return {
      type: 'service',
      singleton: true,
      dependencies: [
        { name: '$configurationService', value: ConfigurationService }
      ]
    }
  }

  constructor ({ $configurationService }) {
    this.$configurationService = $configurationService
  }

  handleRequest(request) {
    console.log('Middleware request:', request)
    console.log('Middleware request config:', this.$configurationService.get('middleware.name'))
  }

  handleResponse(request, response) {
    console.log('Middleware response:', request, response)
  }
}