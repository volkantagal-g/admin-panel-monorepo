import { SearchOutlined } from '@ant-design/icons';
import { Button, Input } from 'antd';
import { get, isFunction } from 'lodash';
import { TFunction } from 'react-i18next';
import { FilterDropdownProps } from 'antd/lib/table/interface';

import SelectCountry from '@shared/containers/Select/Country';
import { searchColumnDataByRegex } from '@shared/utils/common';

export const getUnionPermissionByPermKey = (permissionsArrayByPermKey: Record<string, PermissionType[]>) => {
  const result: Record<string, PermissionType> = {};
  Object.keys(permissionsArrayByPermKey).forEach(permKey => {
    const permissions = permissionsArrayByPermKey[permKey];
    const unionPermission = permissions.reduce((acc, permission) => {
      if (acc === null) return permission;
      return {
        permKey: permission.permKey,
        // for countries, we need to union them and remove duplicates
        countries: [...new Set([...acc.countries, ...permission.countries])],
        hasGlobalAccess: !!(acc.hasGlobalAccess || permission.hasGlobalAccess),
      };
    }, null as unknown as PermissionType);
    result[permKey] = unionPermission;
  });
  return result;
};
type ColumnInputSearchProps = { searchPath: string, classes: Record<string, string>, t: TFunction };

export const getColumnInputSearchProps = (
  dataIndex: string,
  { searchPath, classes, t }: ColumnInputSearchProps = {} as ColumnInputSearchProps,
) => {
  let searchInputRef: HTMLInputElement;
  return ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }: FilterDropdownProps) => (
      <div className={classes.tableSearchWrapper}>
        <Input
          ref={node => {
            searchInputRef = node as unknown as HTMLInputElement;
          }}
          key="searchInput"
          placeholder={t('global:SEARCH')}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => confirm()}
          className={classes.tableSearchInput}
        />
        <Button
          key="searchButton"
          type="primary"
          onClick={() => confirm()}
          size="small"
          className={classes.tableSearchButton}
        >
          <SearchOutlined />
          {t('global:SEARCH')}
        </Button>
        <Button
          key="resetButton"
          onClick={() => {
            if (isFunction(clearFilters)) clearFilters();
            confirm();
          }}
          size="small"
          className={classes.tableSearchResetButton}
        >
          {t('global:RESET')}
        </Button>
      </div>
    ),
    filterIcon: () => (
      <SearchOutlined className={classes.filterIcon} />
    ),
    onFilter: (value: string | { value: string }, record: ComponentType) => {
      const rowData = get(record, `${searchPath || dataIndex}`);
      return searchColumnDataByRegex(rowData, value);
    },
    onFilterDropdownVisibleChange: (visible: boolean) => {
      if (visible) {
        setTimeout(() => {
          searchInputRef?.select();
        }, 250);
      }
    },
  });
};

export const getCountriesColumnFilterProps = (
  { unionPermissionByPermKey, classes, t }: { unionPermissionByPermKey: Record<string, PermissionType>, classes: Record<string, string>, t: TFunction },
) => {
  return ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }: FilterDropdownProps) => (
      <div className={classes.tableSearchWrapper}>
        <SelectCountry
          value={selectedKeys[0]}
          onChange={(selectedCountry: React.Key) => {
            if (selectedCountry) {
              setSelectedKeys([selectedCountry]);
              confirm();
            }
            else {
              setSelectedKeys([]);
            }
          }}
          labelInValue
          className={classes.tableSearchInput}
          showGlobalOption
        />
        <Button
          key="resetButton"
          onClick={() => {
            if (isFunction(clearFilters)) clearFilters();
            confirm();
          }}
          size="small"
          className={classes.tableSearchOnlyResetButton}
        >
          {t('global:RESET')}
        </Button>
      </div>
    ),
    onFilter: (value: string | { value: string }, record: ComponentType) => {
      const { permKey } = record;
      const { countries, hasGlobalAccess } = unionPermissionByPermKey[permKey];
      if (hasGlobalAccess) return true;

      return countries.includes((value as { value: string })?.value || value as string);
    },
  });
};
