import { isMatch } from 'lodash';

import { RxRest } from './rx-rest';
import { RxResource } from './rx-resource';
import * as mock from './rx-mocks';

describe('RxResource', () => {
  let rest: RxRest;
  let resource = new RxResource<any, any[]>('users', mock.EXAMPLE_CONFIG);

  beforeEach(() => {
    rest = new RxRest();
  });

  it('can be created with minimum requirements', () => {
    expect(resource).toBeDefined();
  });

  describe('find', () => {

    it('can get a resource', (done) => {
      let res = new RxResource('users', { requester: new mock.MockRequester(), urlBuilder: mock.mockUrlBuilder });
      let obs = res.find('1');

      obs.subscribe((response: any) => {
        expect(isMatch(response, mock.EXAMPLE_GET_RESPONSE)).toBe(true);
        done();
      });
    });

    it('can transform the response with config.responseMaps', (done) => {
      let obs = resource.find('1');

      obs.subscribe((response: any) => {
        expect(isMatch(response, mock.EXAMPLE_GET_RESPONSE_MAPPED)).toBe(true);
        done();
      });
    });

  });

  describe('findAll', () => {

    it('customizes the url with the urlBuilder, using given extra args', (done) => {
      let obs = resource.findAll({ url: '/extra'});

      obs.subscribe(() => {
        expect((resource as any).config.requester.url).toBe('http://example.com/users/extra');
        done();
      });
    });

  });

  describe('update', () => {

    it('can transform the request body with config.requestMaps', (done) => {
      let obs = resource.update(1, { some: 'prop' });

      obs.subscribe((response: any) => {
        expect(isMatch(response, { reqFun: true, reqObs: true})).toBe(true);
        done();
      });
    });

    it('runs the requester even when not subscribing to the resulting observable', (done) => {
      resource.update(1, { hotKey: 'hotValue'});

      setTimeout(() => {
        expect((resource as any).config.requester.hotKey).toBe('hotValue');
        done();
      }, 10);
    });

  });

  describe('create', () => {

    it('can post a resource', (done) => {
      let res = new RxResource('users', { requester: new mock.MockRequester(), urlBuilder: mock.mockUrlBuilder });
      let obs = res.create({ some: 'res' });

      obs.subscribe((response: any) => {
        expect(isMatch(response, mock.EXAMPLE_GET_RESPONSE)).toBe(true);
        done();
      });
    });

  });

  describe('delete', () => {

    it('should delete', (done) => {
      expect((resource as any).config.requester.deleted).toBe(false);

      resource.delete('5').subscribe(() => {
        expect((resource as any).config.requester.deleted).toBe(true);
        done();
      });
    });
  });

});
