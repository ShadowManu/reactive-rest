import { isMatch } from 'lodash';

import { combine, fromCombine } from './combine';

type Case = { l, r, exp };

function checkExpectations(values: Case[]) {
  values.forEach(({ l, r, exp}) => {
    let result = combine(l, r);
    expect(isMatch(result, exp)).toBe(true);

    // TODO DEBUG
    console.log(result, exp);
  });
}

describe('combine', () => {

  describe('default append', () => {

    it('should replace values', () => {
      checkExpectations([
        { l: 5, r: 2, exp: 2 },
        { l: 'hola', r: 'bale', exp: 'bale' },
        { l: [2], r: [5], exp: [5] }
      ]);
    });

    it('should replace left if right will not combine', () => {
      checkExpectations([
        { l: { combine: 'Obama' }, r: 'Trump', exp: 'Trump' }
      ]);
    });

    it('should concat arrays on combine', () => {
      checkExpectations([
        { l: { combine: [2] }, r: { combine: [5] }, exp: { combine: [2, 5] } },
        { l: { combine: [{ a: 1 }] }, r: { combine: [{ b: 2 }] }, exp: { combine: [{ a: 1 }, { b: 2}]} }
      ]);
    });

    it('should concat strings on combine', () => {
      checkExpectations([
        { l: { combine: 'hello' }, r: { combine: ' world' }, exp: { combine: 'hello world' } },
        { l: { combine: 'Donald ' }, r: { combine: 'Trump' }, exp: { combine: 'Donald Trump' } }
      ]);
    });

    it('should combine object properties on combine, right priority', () => {
      checkExpectations([
        { l: { combine: { a: 1 } }, r: { combine: { b: 2 } }, exp: { combine: { a: 1, b: 2} } },
        { l: { combine: { a: 1, b: [1] } }, r: { combine: { b: 2, c: 2 } }, exp: { combine: { a: 1, b: 2, c: 2} } }
      ]);
    });

    it('should recursively use combine rules', () => {
      checkExpectations([
        {
          l: { combine: { a: { combine: [1] } } },
          r: { combine: { a: { combine: [2] } } },
          exp: { combine: { a: { combine: [1, 2] } } }
        },
        {
          l: { combine: { a: { combine: [1] }, b: 3 } },
          r: { combine: { a: { combine: [2] }, b: 4 } },
          exp: { combine: { a: { combine: [1, 2] }, b: 4 } }
        }
      ]);
    });

  });

});
