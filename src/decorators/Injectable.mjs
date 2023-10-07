import { Service } from './Service.mjs'

/**
 * Injectable decorator to mark a class as a service
 * and autobind it to the container.
 *
 * @param  {object} configurations - The decorator congiguration keys.
 * @return {any}
 */
export const Injectable = Service
