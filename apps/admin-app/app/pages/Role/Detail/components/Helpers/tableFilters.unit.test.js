import { getColumnInputSearchProps, getCountriesColumnFilterProps } from './tableFilters';

describe('/Role/Detail/components/Helpers/tableFilters', () => {
  it('getColumnInputSearchProps', () => {
    const props = getColumnInputSearchProps({ dataIndex: 'name', searchPath: 'path', classes: {} });

    expect(props).toHaveProperty('filterDropdown');
    expect(props).toHaveProperty('filterIcon');
    expect(props).toHaveProperty('onFilter');
    expect(props).toHaveProperty('onFilterDropdownVisibleChange');
  });

  it('getCountriesColumnFilterProps', () => {
    const props = getCountriesColumnFilterProps({ dataIndex: 'name', searchPath: 'path', classes: {} });

    expect(props).toHaveProperty('filterDropdown');
    expect(props).toHaveProperty('onFilter');
    expect(props).toHaveProperty('render');
  });
});
