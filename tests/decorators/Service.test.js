import { Service } from '../../src/decorators/Service.mjs'

describe('#ServiceDecorator', () => {
  it('Must throw an exception when target is not a class', () => {
    // Arrange
    class User {}
    try {
      // Act
      Service({})(User.prototype)
    } catch (error) {
      // Assert
      expect(error.message).toBe('This decorator can only be applied at class level.')
    }
  })

  it('should add $$metadata$$ static property to class', () => {
    // Arrange
    class User {}
    class User2 {}

    // Act
    const response = Service({ alias: 'user', name: 'User' })(User)
    const response2 = Service({ alias: 'user', name: 'User', singleton: false })(User2)

    // Assert
    expect(response.$$metadata$$.service).toEqual({ alias: 'user', name: 'User', singleton: true })
    expect(response2.$$metadata$$.service).toEqual({ alias: 'user', name: 'User', singleton: false })
  })
})
