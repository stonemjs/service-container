import { Container } from '../src/Container.mjs'
// import { ContainerError } from '../src/errors/ContainerError.mjs'

describe('Container', () => {
  const container = new Container()
  const User = class {
    constructor ({ framework }) {
      this.framework = framework
    }
  }
  const People = class {
    constructor ({ language }) {
      this.language = language
    }
  }
  const Article = class {
    constructor ({ framework }) {
      this.framework = framework
    }
  }
  const Comment = class {
    constructor ({ language }) {
      this.language = language
    }
  }
  const Like = class {
    constructor ({ likes }) {
      this.count = likes
    }
  }

  beforeEach(() => {
    container.clear()
  })

  describe('Add items to container and get them', () => {
    it('should add items to container', () => {
      // Act
      container.instance('likes', 10)
      container.instance('framework', 'StoneJS')
      container.instanceIf('language', 'JavaScript')
      container.instanceIf('language', 'TypeScript')
      container.instanceIf('version', '1.0.0')

      container.singleton(User, cont => new User(cont)).alias(User, 'user')
      container.singletonIf(People, cont => new People(cont)).asAlias(People)
      container.singletonIf(People, cont => new User(cont))

      container.binding(Article, cont => new Article(cont)).alias(Article, 'article')
      container.bindingIf(Comment, cont => new Comment(cont)).asAlias(Comment)
      container.bindingIf(Comment, cont => new Article(cont)).asAlias('Comment')

      // Assert
      expect(container.aliases.size).toBe(4)
      expect(container.bindings.size).toBe(8)

      expect(container.has('language')).toBe(true)
      expect(container.bound('framework')).toBe(true)
      expect(container.make('framework')).toBe('StoneJS')
      expect(container.language).toBe('JavaScript')
      expect(container.make('version')).toBe('1.0.0')

      expect(container.has(User)).toBe(true)
      expect(container.bound('people')).toBe(true)
      expect(container.resolve(User) === container.user).toBe(true)
      expect(container.resolve(People) === container.people).toBe(true)
      expect(container.resolve(User).framework).toBe('StoneJS')
      expect(container.resolve(Like).count).toBe(10)
      expect(container.people.language).toBe('JavaScript')

      expect(container.has(Article)).toBe(true)
      expect(container.bound('comment')).toBe(true)
      expect(container.factory(Article)() === container.article).toBe(false)
      expect(container.make(Comment) === container.comment).toBe(false)
      expect(container.make(Article).framework).toBe('StoneJS')
      expect(container.comment.language).toBe('JavaScript')

      // Clear
      container.clear()

      expect(container.aliases.size).toBe(0)
      expect(container.bindings.size).toBe(0)
    })
  })

  describe('#make', () => {
    it('must throw an error when key is not bound', () => {
      try {
        // Act
        container.make('tech')
        expect(true).toBe(false) // To ensure
      } catch (error) {
        expect(error.message).toBe("Failed to resolve a binding with a key of type string with a value of 'tech' from the service container.")
      }
    })
  })

  describe('#resolve', () => {
    it('must throw an error when not a class', () => {
      try {
        // Act
        container.resolve('tech')
        expect(true).toBe(false) // To ensure
      } catch (error) {
        expect(error.message).toBe("Failed to resolve a binding with a key of type string with a value of 'tech' from the service container.")
      }
    })
  })

  describe('#alias', () => {
    it('must throw an error when key === alias', () => {
      try {
        // Act
        container.instance('framework', 'StoneJS').alias('framework', 'framework')
        expect(true).toBe(false) // To ensure
      } catch (error) {
        expect(error.message).toBe('framework is aliased to itself.')
      }
    })

    it('must throw an error when key is not bound', () => {
      try {
        // Act
        container.instance('framework', 'StoneJS').alias('language', 'tech')
        expect(true).toBe(false) // To ensure
      } catch (error) {
        expect(error.message).toBe('Cannot alias an unbound value(language).')
      }
    })
  })

  describe('#provider', () => {
    it('must throw an error when method `register` not exists', async () => {
      try {
        // Arrange
        class UserProvider {}

        // Act
        await container.provider(UserProvider)
        expect(true).toBe(false) // To ensure
      } catch (error) {
        expect(error.message).toBe('This class(class UserProvider {}) is not a provider. Class must extends AbstractProvider class or must use @ServiceProvider decorator.')
      }
    })

    it('must register provider items to container', async () => {
      // Arrange
      const Animal = class {}
      const Dog = class {
        name = 'Doggy'
      }
      const animal2 = (container) => 'animal 2'

      class UserProvider {
        constructor (container) {
          this.container = container
        }

        register () {
          this
            .container
            .autoBinding(Dog)
            .autoBinding(Animal, Animal, true, ['animal'])
            .autoBinding('animal2', animal2)
            .autoBinding('app_name', 'Stonejs')
            .autoBinding('app_name', 'Stonejs')
        }
      }

      // Act
      container.provider(UserProvider)
      container.provider(UserProvider)

      // Assert
      expect(container.aliases.size).toBe(1)
      expect(container.bindings.size).toBe(4)

      expect(container.make(Dog).name).toBe('Doggy')

      expect(container.has('animal')).toBe(true)
      expect(container.bound(Animal)).toBe(true)
      expect(container.make(Animal) === container.animal).toBe(true)

      expect(container.has('animal2')).toBe(true)
      expect(container.make('animal2')).toBe('animal 2')

      expect(container.app_name).toBe('Stonejs')
    })
  })

  describe('#register', () => {
    it('must throw an error when $$metadata$$ key is not found', () => {
      try {
        // Arrange
        class User {}

        // Act
        container.register([User])
        expect(true).toBe(false) // To ensure
      } catch (error) {
        expect(error.message).toBe('This (class User {}) is not service. Must contains $$metadata$$ static property or must use @Service decorator.')
      }
    })

    it('must register classes to container', () => {
      // Arrange
      const Animal = class {
        static $$metadata$$ = { service: { isInjectable: true, alias: 'animal' } }
      }
      const Animal2 = class {
        static $$metadata$$ = { service: { isInjectable: true, singleton: false } }
      }

      // Act
      container.register([Animal, Animal2])

      // Assert
      expect(container.aliases.size).toBe(1)
      expect(container.bindings.size).toBe(2)

      expect(container.has('animal')).toBe(true)
      expect(container.bound(Animal)).toBe(true)
      expect(container.make(Animal) === container.animal).toBe(true)

      expect(container.has('animal2')).toBe(false)
      expect(container.bound(Animal2)).toBe(true)

      container.asAlias(Animal2)
      expect(container.make(Animal2) === container.animal2).toBe(false)
    })
  })
})
