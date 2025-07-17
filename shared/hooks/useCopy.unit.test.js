import { act } from '@testing-library/react-hooks';

import renderHook from '@test/publicUtils/renderHookWithProviders';
import useCopy from './useCopy';

const testText = 'Hi!';

describe('useCopy', () => {
  it('should copy successfully', () => {
    const { result } = renderHook(() => useCopy(testText));
    const [initialState, copy] = result.current;
    expect(initialState).toBe(false);
    act(() => copy(testText));
    const [nextState] = result.current;
    expect(nextState).toBe(true);
  });
});
