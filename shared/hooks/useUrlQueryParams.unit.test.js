// TESTING_PRACTICE_EXAMPLE CUSTOM_HOOK_UNIT_TEST
import renderHook from '@test/publicUtils/renderHookWithProviders';
import useUrlQueryParams from './useUrlQueryParams';

const paramName = 'currency';
const paramValue = 'USD';

const initialRouteOptions = { path: '/somePage', url: `/somePage?${paramName}=${paramValue}` };
describe('useUrlQueryParams', () => {
  it('should correctly read url query param', () => {
    const { result } = renderHook(() => useUrlQueryParams(), initialRouteOptions);
    const urlSearchParams = result.current;
    expect(urlSearchParams.get(paramName)).toBe(paramValue);
  });
});
