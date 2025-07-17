import { isFragment } from '@shared/utils/isFragment';

describe('#isFragment', () => {
  it('should return true if React node is Fragment', () => {
    // eslint-disable-next-line react/jsx-no-useless-fragment
    const fragments = [<></>, <><span /></>, <><><span /></></>];
    fragments.forEach(fragment => {
      expect(isFragment(fragment)).toBe(true);
    });
  });

  it('should return false if React node is not Fragment', () => {
    const fragments = [<span />, 'Hello', 2, false, null, [], {}, undefined];
    fragments.forEach(fragment => {
      expect(isFragment(fragment)).toBe(false);
    });
  });
});
