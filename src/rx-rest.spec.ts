import { RxRest } from './rx-rest';
import { RxResource } from './rx-resource';

describe('RxRest', () => {
  let rest: RxRest;

  beforeEach(() => {
    rest = new RxRest();
  });

  it('can be instantiated without parameters', () => {
    expect(new RxRest()).toBeDefined();
  });

  it('can define a new resource and returns it', () => {
    let resource = rest.defineResource('users');
    expect(resource instanceof RxResource);
    expect(rest.getResource('users')).toBe(resource);
  });

  it('can register existing resources', () => {
    let resource = new RxResource('users', {});
    rest.registerResource(resource);
    expect(rest.getResource('users')).toBe(resource);
  });

});
