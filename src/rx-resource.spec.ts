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

  it('can get a resource', (done) => {
    let resource = new RxResource('users', { requester: new mock.MockRequester() });
    let obs = resource.find('1');

    obs.subscribe((response: any) => {
      expect(isMatch(response, mock.EXAMPLE_GET_RESPONSE)).toBe(true);
      done();
    });
  });

  it('can transform the response with config.responseMaps', (done) => {
    let resource = new RxResource('users', mock.EXAMPLE_CONFIG);
    let obs = resource.find('1');

    obs.subscribe((response: any) => {
      expect(isMatch(response, mock.EXAMPLE_GET_RESPONSE_MAPPED)).toBe(true);
      done();
    });
  });

  it('can transform the request body with config.requestMaps', (done) => {
    let resource = new RxResource('users', mock.EXAMPLE_CONFIG);
    let obs = resource.update(1, { some: 'prop' });

    obs.subscribe((response: any) => {
      expect(isMatch(response, { reqFun: true, reqObs: true})).toBe(true);
      done();
    });
  });

});
