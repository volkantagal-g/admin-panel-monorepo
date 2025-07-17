// TESTING_PRACTICE_EXAMPLE CUSTOM_HOOK_UNIT_TEST
import { act } from '@testing-library/react-hooks';

import renderHook from '@test/publicUtils/renderHookWithProviders';
import useToggle from './useToggle';

describe('useToggle', () => {
  it('should toggle successfully', () => {
    const { result } = renderHook(() => useToggle(false));
    const [initialState, toggle] = result.current;
    expect(initialState).toBe(false);
    act(() => toggle());
    const [nextState] = result.current;
    expect(nextState).toBe(true);
  });
  it('should have default false value', () => {
    const { result } = renderHook(() => useToggle());
    const [initialState, toggle] = result.current;
    expect(initialState).toBe(false);
    act(() => toggle());
    const [nextState] = result.current;
    expect(nextState).toBe(true);
  });
});
