import Provider from './src/Provider.mjs';
import Container from './src/Container.mjs';
import service from './src/decorators/service.mjs';

const decorators = {
  service
}

export {
  Provider,
  Container,
  decorators
}