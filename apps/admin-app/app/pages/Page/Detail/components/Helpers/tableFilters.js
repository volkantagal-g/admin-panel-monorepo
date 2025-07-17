import { get } from 'lodash';
import { Button, Input, Tag, Tooltip } from 'antd';
import { SearchOutlined, GlobalOutlined } from '@ant-design/icons';

import { t } from '@shared/i18n';
import { searchColumnDataByRegex } from '@shared/utils/common';
import SelectCountry from '@shared/containers/Select/Country';

export const getColumnInputSearchProps = (dataIndex, { searchPath, classes } = {}) => {
  let searchInputRef;
  return ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div className={classes.tableSearchWrapper}>
        <Input
          ref={node => {
            searchInputRef = node;
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
            clearFilters();
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
    onFilter: (value, record) => {
      const rowData = get(record, `${searchPath || dataIndex}`);
      return searchColumnDataByRegex(rowData, value);
    },
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => {
          searchInputRef?.select();
        }, 250);
      }
    },
  });
};

export const getCountriesColumnFilterProps = (dataIndex, { countriesMap, classes } = {}) => {
  return ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div className={classes.tableSearchWrapper}>
        <SelectCountry
          value={selectedKeys[0]}
          onChange={selectedCountry => {
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
            clearFilters();
            confirm();
          }}
          size="small"
          className={classes.tableSearchOnlyResetButton}
        >
          {t('global:RESET')}
        </Button>
      </div>
    ),
    onFilter: (value, record) => {
      const isGloballyPermitted = record.hasGlobalAccess || false;
      if (value) {
        return get(record, dataIndex, []).includes(value.value) || isGloballyPermitted;
      }
      return true;
    },
    render: (permittedCountries, record) => {
      const isGloballyPermitted = record.hasGlobalAccess || false;
      if (isGloballyPermitted) {
        return (
          <Tooltip title={t('global:GLOBAL_ACCESS')} color="blue">
            <Tag>
              <GlobalOutlined />
            </Tag>
          </Tooltip>
        );
      }

      return (
        permittedCountries?.map(country => {
          const countryCode = get(countriesMap, `${country}.code.alpha3`);
          const countryFlag = get(countriesMap, `${country}.flag`);
          return (
            <Tooltip
              title={countryCode}
              key={countryCode}
            >
              <Tag>
                {countryFlag}
              </Tag>
            </Tooltip>
          );
        })
      );
    },
  });
};
