/**
 * Class representing a Provider.
 */
export class Provider {
  #container

  /**
   * Create a new instance of Provider.
   * @param  {Container} container
   */
  constructor (container) {
    this.#container = container
  }

  get container () {
    return this.#container
  }

  /**
   * Register any application services.
   */
  register () {}

  /**
   * Bootstrap any application services.
   */
  boot () {}
}
