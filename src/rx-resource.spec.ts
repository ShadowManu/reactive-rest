import { isMatch } from 'lodash';

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

  it('can transform the response with config.responseMaps', (done) => {
    let resource =  new RxResource('users', mock.EXAMPLE_CONFIG);
    let obs = resource.find('1');

    obs.subscribe((response: any) => {
      expect(isMatch(response, mock.EXAMPLE_RESPONSE_MAPPED)).toBe(true);
      done();
    });
  });

});
