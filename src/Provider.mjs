export default class Provider {
  /**
   * Create a new instance of Provider.
   *
   * @param  {Container} container
   */
  constructor (container) {
    this._container = container
  }

  get container () {
    return this._container
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