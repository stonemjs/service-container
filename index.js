module.exports = {
  Provider: require('./src/Provider.mjs'),
  Container: require('./src/Container.mjs'),
  decorators: {
    service: require('./src/decorators/service.mjs')
  }
}