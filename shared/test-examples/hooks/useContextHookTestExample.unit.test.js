// TESTING_PRACTICE_EXAMPLE CUSTOM_HOOK_UNIT_TEST
import renderHook from '@test/publicUtils/renderHookWithProviders';
import useContextHookTestExample, { FakeContext } from './useContextHookTestExample';

const fakeContextValue = 2;
const fakeParamValue = 10;

const expectedResult = fakeContextValue + fakeParamValue;

// If you want to test a custom hook / component that consumes a custom context, you need to provide it
const ContextWrapper = ({ children }) => (
  <FakeContext.Provider value={fakeContextValue}>
    {children}
  </FakeContext.Provider>
);

describe('useContextHookTestExample', () => {
  it('should work', () => {
    const { result } = renderHook(
      () => useContextHookTestExample(),
      { path: '/:fakeParamValue', url: `/${fakeParamValue}` },
      { wrapper: ContextWrapper },
    );

    expect(result.current).toBe(expectedResult);
  });
});
