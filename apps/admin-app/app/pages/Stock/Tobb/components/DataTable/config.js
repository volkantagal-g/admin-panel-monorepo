import { get } from 'lodash';
import { Button, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

import { t } from '@shared/i18n';
import { searchColumnDataByRegex } from '@shared/utils/common';
import { columns } from '../../utils';

export const getColumnInputSearchProps = ({ dataIndex, classes = {} }) => {
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
      const rowData = get(record, `${dataIndex}`);
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

export const getTableColumns = ({ classes }) => {
  return columns.map(({ title, key }) => ({
    title,
    dataIndex: key,
    key,
    render: value => value,
    width: key === 'adresBilgileri' ? 250 : 100,
    ...(key === 'vkn' || key === 'tckn' ? getColumnInputSearchProps({ dataIndex: key, classes }) : undefined),
  }));
};
