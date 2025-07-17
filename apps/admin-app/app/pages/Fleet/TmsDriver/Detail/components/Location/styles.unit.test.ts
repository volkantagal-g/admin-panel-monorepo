import { renderHook } from '@testing-library/react-hooks';

import styles from './styles';

describe('styles', () => {
  it('should have correct styles', () => {
    const { result } = renderHook(styles);
    const classes = result.current;
    expect(classes).toMatchObject({ mapContainer: expect.stringMatching(/^mapContainer/) });
  });
});
