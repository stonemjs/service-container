import { Injectable } from '../../src/decorators/Injectable.mjs'

describe('#InjectableDecorator', () => {
  it('should add $$metadata$$.service static property to class', () => {
    // Arrange
    class User {}
    class User2 {}

    // Act
    const response = Injectable({ alias: 'user', name: 'User' })(User)
    const response2 = Injectable({ alias: 'user', name: 'User', singleton: false })(User2)

    // Assert
    expect(response.$$metadata$$.service).toEqual({ alias: 'user', name: 'User', singleton: true })
    expect(response2.$$metadata$$.service).toEqual({ alias: 'user', name: 'User', singleton: false })
  })
})
