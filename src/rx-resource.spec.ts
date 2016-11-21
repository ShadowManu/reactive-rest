import { RxRest } from './rx-rest';
import { RxResource } from './rx-resource';
import * as mock from './rx-mocks';

describe('RxResource', () => {
  let rest: RxRest;

  beforeEach(() => {
    rest = new RxRest();
  });

  it('can be created with minimum requirements', () => {
    expect(new RxResource('users', mock.EXAMPLE_CONFIG)).toBeDefined();
  });

});
