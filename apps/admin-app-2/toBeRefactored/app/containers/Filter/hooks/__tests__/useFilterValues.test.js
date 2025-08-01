/* eslint-disable */
import useFilterValues from '@app/containers/Filter/hooks/useFilterValues';
import FilterWrapper from '@app/containers/Filter/components/FilterWrapper';
import { renderHookWithProviders } from '@app/utils/test-utils/renderHookWithProviders';

const TestComponent = ({ filterKey, children }) => {
  return (
    <>
      <FilterWrapper filterKey={filterKey} />
      {children}
    </>
  );
};

describe('useFilterValues', () => {
  test('should return default values with given filterKey', () => {
    const filterKey = 'test';
    const wrapperComponent = ({ children }) => <TestComponent filterKey={filterKey}>{children}</TestComponent>;

    const { result } = renderHookWithProviders(() => useFilterValues(filterKey), { wrapper: wrapperComponent });

    expect(result.current.values).toStrictEqual({ [filterKey]: {} });
  });
});
