import { Injectable } from '../../../src/index.mjs'

@Injectable({
  singleton: false
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