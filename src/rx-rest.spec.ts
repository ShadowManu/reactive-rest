import { RxRest } from './rx-rest';
import { RxResource } from './rx-resource';
import * as mocks from './rx-mocks';

describe('RxRest', () => {
  let rest: RxRest;

  beforeEach(() => {
    rest = new RxRest(mocks.EXAMPLE_CONFIG);
  });

  it('can be instantiated without parameters', () => {
    expect(new RxRest()).toBeDefined();
  });

  it('can define a new resource with default configuration and returns it', () => {
    let resource = rest.defineResource<any, any[]>('users');

    expect(resource instanceof RxResource);
    expect(rest.getResource('users')).toBe(resource);
  });

  it('can register existing resources', () => {
    let resource = new RxResource('users', mocks.EXAMPLE_CONFIG);
    rest.registerResource(resource);

    expect(rest.getResource('users')).toBe(resource);
  });

  it('can transform the resource when defining it', () => {
    let transform = (resource: RxResource<any, any[]>) => { return 'it works!'; };

    let resource = rest.defineResource<any, any[]>('users', undefined, transform);

    expect<any>(resource).toBe('it works!');
    expect<any>(rest.getResource('users')).toBe('it works!');
  });

});
