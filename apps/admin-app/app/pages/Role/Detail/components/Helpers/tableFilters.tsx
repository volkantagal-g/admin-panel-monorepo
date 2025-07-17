import React from 'react';
import { get } from 'lodash';
import { Button, Input, Tag, Tooltip } from 'antd';
import { GlobalOutlined, SearchOutlined, StopOutlined } from '@ant-design/icons';
import { FilterDropdownProps } from 'antd/lib/table/interface';

import { t } from '@shared/i18n';
import { searchColumnDataByRegex } from '@shared/utils/common';
import SelectCountry from '@shared/containers/Select/Country';

type GetColumnInputSearchProps = {
  dataIndex: string;
  searchPath?: string;
  classes: Record<string, string>;
}

export const getColumnInputSearchProps = ({ dataIndex, searchPath, classes }: GetColumnInputSearchProps) => {
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
            clearFilters?.();
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
      <SearchOutlined />
    ),
    onFilter: (value: string, record: UserType) => {
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

type GetCountriesColumnFilterProps = {
  dataIndex: string;
  countriesMap?: Record<string, ICountry>;
  classes: Record<string, string>;
}

export const getCountriesColumnFilterProps = ({ dataIndex, countriesMap, classes }: GetCountriesColumnFilterProps) => {
  return ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }: FilterDropdownProps) => (
      <div className={classes.tableSearchWrapper}>
        <SelectCountry
          value={selectedKeys[0]}
          onChange={(selectedCountry: React.Key) => {
            if (selectedCountry) {
              setSelectedKeys([selectedCountry]);
            }
            else {
              setSelectedKeys([]);
            }
            confirm();
          }}
          labelInValue
          className={classes.tableSearchInput}
          showGlobalOption
          showOldCountries
        />
        <Button
          key="resetButton"
          onClick={() => {
            clearFilters?.();
            confirm();
          }}
          size="small"
          className={classes.tableSearchOnlyResetButton}
        >
          {t('global:RESET')}
        </Button>
      </div>
    ),
    onFilter: (value: { value: string }, record: UserType) => {
      if (value) {
        return record.hasGlobalAccess || (get(record, dataIndex, []) as string[]).includes((value).value);
      }
      return true;
    },
    render: (countries: MongoIDType[], row: UserType) => {
      if (row?.hasGlobalAccess) {
        return (
          <Tooltip title={t('global:GLOBAL_ACCESS')} color="blue">
            <Tag>
              <GlobalOutlined />
            </Tag>
          </Tooltip>
        );
      }

      if (countries.length > 0) {
        return (
          countries?.map(country => {
            const countryCode = get(countriesMap, `${country}.code.alpha3`) || country;
            const countryFlag = get(countriesMap, `${country}.flag`) || '??';
            return (
              <Tooltip
                title={countryCode}
                key={countryCode as string}
              >
                <Tag>
                  {countryFlag}
                </Tag>
              </Tooltip>
            );
          })
        );
      }

      return (
        <Tooltip title={t('NO_ACCESS')}>
          <Tag>
            <StopOutlined className={classes.noAccessIcon} />
          </Tag>
        </Tooltip>
      );
    },
  });
};
