/* eslint-disable no-inline-styles/no-inline-styles */
/* eslint-disable camelcase */
import { Tooltip, Typography, Input, Button } from 'antd';
import { Link } from 'react-router-dom';
import { SearchOutlined, DoubleRightOutlined } from '@ant-design/icons';
import { get as _get } from 'lodash';

import { numberFormat } from '@shared/utils/localization';
import { isMobile, searchColumnDataByRegex } from '@shared/utils/common';
import AntInputNumber from '@shared/components/UI/AntInputNumber';
import { TOTAL_COLUMN_NAME } from '../../utils';

const { Title, Text } = Typography;
const isMobileDevice = isMobile();
const columnWidth = isMobileDevice ? 80 : 140;

const getMinMaxFilter = ({ dataIndex, classes, t }) => {
  let values = [];
  return ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div className={classes.filterDropdownContainer}>
        <div className={classes.inputSectionContainer}>
          <div>
            <AntInputNumber
              value={selectedKeys[0]}
              placeholder={t('global:MIN')}
              onChange={min => {
                setSelectedKeys([min, selectedKeys[1]]);
              }}
              min={0}
              max={selectedKeys[1]}
            />
          </div>
          <div>
            <AntInputNumber
              value={selectedKeys[1]}
              placeholder={t('global:MAX')}
              onChange={max => {
                setSelectedKeys([selectedKeys[0], max]);
              }}
              min={selectedKeys[0]}
            />
          </div>
        </div>
        <div className={classes.actionSectionContainer}>
          <Button
            key="applyButton"
            onClick={() => {
              values = selectedKeys;
              confirm();
            }}
            size="small"
            type="primary"
          >
            {t('global:APPLY')}
          </Button>
          <Button
            key="resetButton"
            onClick={() => {
              clearFilters();
              values = [];
              confirm();
            }}
            size="small"
          >
            {t('global:RESET')}
          </Button>
        </div>
      </div>
    ),
    onFilter: (value, record) => {
      const [min, max] = values;
      if (min && max) {
        return _get(record, dataIndex) >= min && _get(record, dataIndex) <= max;
      }
      if (min) {
        return _get(record, dataIndex) >= min;
      }
      if (max) {
        return _get(record, dataIndex) <= max;
      }
      return true;
    },
  });
};

export const generateTableColumns = ({
  handleSearch,
  handleReset,
  handleCityClick,
  classes,
  selectedCity,
  searchInputRef,
}, t) => {
  const getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={searchInputRef}
          key="searchInput"
          placeholder={selectedCity ? t('global:SEARCH_WAREHOUSE_NAME') : t('global:SEARCH_CITY_NAME')}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Button
          key="searchButton"
          type="primary"
          onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          <SearchOutlined />
          {t('global:SEARCH')}
        </Button>
        <Button
          key="resetButton"
          onClick={() => handleReset(clearFilters)}
          size="small"
          style={{ width: 90 }}
        >
          {t('global:RESET')}
        </Button>
      </div>
    ),
    filterIcon: () => (
      <SearchOutlined />
    ),
    onFilter: (value, record) => {
      const rowNameData = record[dataIndex].name;
      return searchColumnDataByRegex(rowNameData, value);
    },
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => {
          searchInputRef.current?.select();
        }, 200);
      }
    },
    render: text => text,
  });

  return [
    {
      title: <Title level={5} className="mb-0">{selectedCity ? t('global:WAREHOUSES') : t('global:CITIES')}</Title>,
      titleCSV: selectedCity ? t('global:WAREHOUSES') : t('global:CITIES'),
      dataIndex: 'firstColumn',
      key: 'firstColumn',
      ...getColumnSearchProps('firstColumn'),
      width: 130,
      render: data => {
        if (!data.id) return data.name;
        if (!selectedCity) {
          return (
            <button
              type="button"
              onClick={() => handleCityClick(data.id)}
              className={classes.citySelectButton}
            >
              {data.name === TOTAL_COLUMN_NAME ? t('global:TOTAL') : data.name}
              <DoubleRightOutlined className={classes.selectIcon} />
            </button>
          );
        }
        return <Link to={`/warehouse/detail/${data.id}`} target="_blank">{data.name}</Link>;
      },
      renderCSV: data => data.name,
    },
    {
      title: (
        <Tooltip placement="bottom" title={t('courierLiveMonitoringPage:PLANNED_COURIER_TOOLTIP')}>
          <Text strong>{t('courierLiveMonitoringPage:PLANNED')}</Text>
        </Tooltip>
      ),
      titleCSV: t('courierLiveMonitoringPage:PLANNED'),
      dataIndex: 'planned',
      key: 'planned',
      className: classes.alignRight,
      sorter: (a, b) => (a.planned - b.planned),
      width: columnWidth,
    },
    {
      title: (
        <Tooltip
          placement="bottom"
          title={t('courierLiveMonitoringPage:REALIZED_TOOLTIP')}
        >
          <Text strong>{t('courierLiveMonitoringPage:REALIZED')}</Text>
        </Tooltip>
      ),
      titleCSV: t('courierLiveMonitoringPage:REALIZED'),
      dataIndex: 'realized',
      key: 'realized',
      className: classes.alignRight,
      sorter: (a, b) => (a.realized - b.realized),
      width: columnWidth,
    },
    {
      title: (
        <Tooltip
          placement="bottom"
          title={t('courierLiveMonitoringPage:IDLE_TOOLTIP')}
        >
          <Text strong>{t('courierLiveMonitoringPage:IDLE')}</Text>
        </Tooltip>
      ),
      titleCSV: t('courierLiveMonitoringPage:IDLE'),
      dataIndex: 'idle',
      key: 'idle',
      className: classes.alignRight,
      sorter: (a, b) => (a.idle - b.idle),
      width: columnWidth,
    },
    {
      title: (
        <Tooltip
          placement="bottom"
          title={t('courierLiveMonitoringPage:ON_ORDER_TOOLTIP')}
        >
          <Text strong>{t('courierLiveMonitoringPage:ON_ORDER')}</Text>
        </Tooltip>
      ),
      titleCSV: t('courierLiveMonitoringPage:ON_ORDER'),
      dataIndex: 'onOrder',
      key: 'onOrder',
      className: [classes.alignRight],
      sorter: (a, b) => (a.onOrder - b.onOrder),
      width: columnWidth,
    },
    {
      title: (
        <Tooltip
          placement="bottom"
          title={t('courierLiveMonitoringPage:RETURNING_TOOLTIP')}
        >
          <Text strong>{t('courierLiveMonitoringPage:RETURNING')}</Text>
        </Tooltip>
      ),
      titleCSV: t('courierLiveMonitoringPage:RETURNING'),
      dataIndex: 'returning',
      key: 'returning',
      className: classes.alignRight,
      sorter: (a, b) => a.returning - b.returning,
      width: columnWidth,
    },
    {
      title: (
        <Tooltip
          placement="bottom"
          title={t('courierLiveMonitoringPage:BUSY_TOOLTIP')}
        >
          <Text strong>{t('courierLiveMonitoringPage:BUSY')}</Text>
        </Tooltip>
      ),
      titleCSV: t('courierLiveMonitoringPage:BUSY'),
      dataIndex: 'busy',
      key: 'busy',
      className: classes.alignRight,
      sorter: (a, b) => a.busy - b.busy,
      width: columnWidth,
    },
    {
      title: (
        <Tooltip
          placement="bottom"
          title={t('courierLiveMonitoringPage:UTILIZATION_TOOLTIP')}
        >
          <Text strong>{t('courierLiveMonitoringPage:UTILIZATION')}</Text>
        </Tooltip>
      ),
      titleCSV: t('courierLiveMonitoringPage:UTILIZATION'),
      dataIndex: 'utilization',
      key: 'utilization',
      className: classes.alignRight,
      sorter: (a, b) => a.utilization - b.utilization,
      render: data => numberFormat({ maxDecimal: 0 }).format(data),
      width: columnWidth,
    },
    {
      title: (
        <Tooltip
          placement="bottom"
          title={t('courierLiveMonitoringPage:DIFFERENCE_BETWEEN_REALIZED_AND_PLANNED_TOOLTIP')}
        >
          <Text strong>{t('courierLiveMonitoringPage:DIFFERENCE_BETWEEN_REALIZED_AND_PLANNED')}</Text>
        </Tooltip>
      ),
      titleCSV: t('courierLiveMonitoringPage:DIFFERENCE_BETWEEN_REALIZED_AND_PLANNED'),
      dataIndex: 'differenceBetweenRealizedAndPlanned',
      key: 'differenceBetweenRealizedAndPlanned',
      className: classes.alignRight,
      sorter: (a, b) => a.differenceBetweenRealizedAndPlanned - b.differenceBetweenRealizedAndPlanned,
      render: data => numberFormat({ maxDecimal: 0 }).format(data),
      ...getMinMaxFilter({ dataIndex: 'differenceBetweenRealizedAndPlanned', classes, t }),
      width: columnWidth,
    },
  ];
};
