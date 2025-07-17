/* eslint-disable react/jsx-no-useless-fragment */
import { Fragment, isValidElement } from 'react';
import { render } from '@testing-library/react';

import { flattenChildren } from '@shared/utils/flattenChildren';

const Assert = ({ assert, children }) => {
  const result = flattenChildren(children);
  assert(result);

  return <div>{result}</div>;
};

describe('#flattenChildren', () => {
  describe('should return React children into an array, flattening fragments', () => {
    it('with simple children', () => {
      render(
        <Assert
          assert={children => {
            expect(children.length).toBe(4);
            expect(isValidElement(children[0])).toBe(true);
            expect(children[0].key).toBe('.0');
            expect(children[1]).toBe('two');
            expect(isValidElement(children[2])).toBe(true);
            expect(children[2].key).toBe('.2');
            expect(children[3]).toBe('10');
          }}
        >
          <span>one</span>
          two
          <span>three</span>
          10
        </Assert>,
      );
    });

    it('with conditional children', () => {
      render(
        <Assert
          assert={children => {
            expect(children.length).toBe(3);
            expect(isValidElement(children[0])).toBe(true);
            expect(children[0].key).toBe('.0');
            expect(isValidElement(children[1])).toBe(true);
            expect(children[1].key).toBe('.2');
            expect(isValidElement(children[2])).toBe(true);
            expect(children[2].key).toBe('.4');
          }}
        >
          <span>one</span>
          {false}
          <span>three</span>
          {null}
          <span>five</span>
        </Assert>,
      );
    });

    it('with keyed children', () => {
      const keys = ['.$one', '.$two', undefined, '.$four', '.4'];

      render(
        <Assert
          assert={children => {
            expect(children.length).toBe(5);

            keys.forEach((key, i) => {
              expect(children[i].key).toBe(key);
            });
          }}
        >
          <span key="one">one</span>
          <span key="two">two</span>
          three
          <span key="four">four</span>
          <span>five</span>
        </Assert>,
      );
    });

    it('with fragment children', () => {
      const keys = ['.0..$one', '.0..$two', '.1..$three'];

      render(
        <Assert
          assert={children => {
            expect(children.length).toBe(3);

            keys.forEach((key, i) => {
              expect(children[i].key).toBe(key);
            });
          }}
        >
          <>
            <span key="one">one</span>
            <span key="two">two</span>
          </>
          <>
            <span key="three">three</span>
          </>
        </Assert>,
      );
    });

    it('with keyed fragment children', () => {
      const keys = ['.$apple..$one', '.$apple..$two', '.$banana..$three'];

      render(
        <Assert
          assert={children => {
            expect(children.length).toBe(3);

            keys.forEach((key, i) => {
              expect(children[i].key).toBe(key);
            });
          }}
        >
          <Fragment key="apple">
            <span key="one">one</span>
            <span key="two">two</span>
          </Fragment>
          <Fragment key="banana">
            <span key="three">three</span>
          </Fragment>
        </Assert>,
      );
    });

    it('with array children', () => {
      const keys = ['.0', undefined, '.1:$apple', '.1:2', '.2'];

      render(
        <Assert
          assert={children => {
            expect(children.length).toBe(5);

            keys.forEach((key, i) => {
              expect(children[i].key).toBe(key);
            });
          }}
        >
          <span>one</span>
          {['two', <span key="apple">three</span>, <span>four</span>]}
          <span>five</span>
        </Assert>,
      );
    });
  });
});
