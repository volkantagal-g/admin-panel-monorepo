import { Tooltip, Typography, Input, Button } from 'antd';
import { Link } from 'react-router-dom';
import { SearchOutlined, DoubleRightOutlined } from '@ant-design/icons';
import { isNaN } from 'lodash';

import { numberFormat } from '@shared/utils/localization';
import { searchColumnDataByRegex } from '@shared/utils/common';
import { TOTAL_COLUMN_NAME } from '../../constants';
import { getLangKey } from '@shared/i18n';

const { Title, Text } = Typography;

export const generateTableColumns = (
  { handleSearch, handleReset, handleCityClick, classes, selectedCity, searchInputRef },
  t,
) => {
  const getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ selectedKeys, setSelectedKeys, confirm, clearFilters }) => (
      <div className={classes.searchBox}>
        <Input
          ref={searchInputRef}
          key="searchInput"
          size="small"
          placeholder={
            selectedCity ? t('global:SEARCH_WAREHOUSE_NAME') : t('global:SEARCH_CITY_NAME')
          }
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
        />
        <div className={classes.actionButtonContainer}>
          <Button
            key="searchButton"
            size="small"
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            prefix={() => <SearchOutlined />}
          >
            {t('global:SEARCH')}
          </Button>
          <Button key="resetButton" size="small" onClick={() => handleReset(clearFilters)}>
            {t('global:RESET')}
          </Button>
        </div>
      </div>
    ),
    filterIcon: () => <SearchOutlined />,
    onFilter: (value, record) => {
      const rowNameData = record[dataIndex]?.[getLangKey()] || '';

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
      title: (
        <Title level={5} className="mb-0">
          {selectedCity ? t('global:WAREHOUSES') : t('global:CITIES')}
        </Title>
      ),
      key: 'name',
      ...getColumnSearchProps('name'),
      width: 130,
      render: data => {
        const name = data?.name?.[getLangKey()] || data?.name;
        if (!name) return data?.key ?? '';

        if (!selectedCity) {
          return (
            <Button type="button" onClick={() => handleCityClick(data.key)} size="small">
              {data.name === TOTAL_COLUMN_NAME ? t('global:TOTAL') : name}
              <DoubleRightOutlined className={classes.selectIcon} />
            </Button>
          );
        }
        return (
          <Link to={`/warehouse/detail/${data.key}`} target="_blank">
            {name}
          </Link>
        );
      },
    },
    {
      title: (
        <Tooltip
          placement="bottom"
          title={t('localsCourierLiveMonitoringPage:PLANNED_COURIER_TOOLTIP')}
        >
          <Text strong>{t('localsCourierLiveMonitoringPage:PLANNED')}</Text>
        </Tooltip>
      ),
      dataIndex: 'planned',
      key: 'planned',
      className: classes.alignRight,
      sorter: (a, b) => a.planned - b.planned,
    },
    {
      title: (
        <Tooltip placement="bottom" title={t('localsCourierLiveMonitoringPage:REALIZED_TOOLTIP')}>
          <Text strong>{t('localsCourierLiveMonitoringPage:REALIZED')}</Text>
        </Tooltip>
      ),
      dataIndex: 'total',
      key: 'total',
      className: classes.alignRight,
      sorter: (a, b) => Number(a.total) - Number(b.total),
      render: data => {
        if (isNaN(data)) return '0';
        return numberFormat({ maxDecimal: 0 }).format(data);
      },
    },
    {
      title: (
        <Tooltip placement="bottom" title={t('localsCourierLiveMonitoringPage:DIFFERENCE_TOOLTIP')}>
          <Text strong>{t('localsCourierLiveMonitoringPage:DIFFERENCE')}</Text>
        </Tooltip>
      ),
      key: 'diff',
      className: classes.alignRight,
      sorter: (a, b) => {
        const calculatedA = a.planned - a.total;
        const calculatedB = b.planned - b.total;
        return Number(calculatedA) - Number(calculatedB);
      },
      render: data => {
        const calculated = data.planned - data.total;
        if (isNaN(calculated)) return '0';
        return numberFormat({ maxDecimal: 0 }).format(calculated);
      },
    },
    {
      title: (
        <Tooltip placement="bottom" title={t('localsCourierLiveMonitoringPage:FREE_TOOLTIP')}>
          <Text strong>{t('localsCourierLiveMonitoringPage:FREE')}</Text>
        </Tooltip>
      ),
      dataIndex: 'free',
      key: 'free',
      className: classes.alignRight,
      sorter: (a, b) => Number(a.free) - Number(b.free),
    },
    {
      title: (
        <Tooltip placement="bottom" title={t('localsCourierLiveMonitoringPage:ON_GF_ORDER_TOOLTIP')}>
          <Text strong>{t('localsCourierLiveMonitoringPage:ON_ORDER_FOOD')}</Text>
        </Tooltip>
      ),
      dataIndex: 'onGFLOrder',
      key: 'onGFLOrder',
      className: classes.alignRight,
      sorter: (a, b) => a.onGFLOrder - b.onGFLOrder,
    },
    {
      title: (
        <Tooltip placement="bottom" title={t('localsCourierLiveMonitoringPage:ON_GL_ORDER_TOOLTIP')}>
          <Text strong>{t('localsCourierLiveMonitoringPage:ON_ORDER_LOCALS')}</Text>
        </Tooltip>
      ),
      dataIndex: 'onGLOrder',
      key: 'onGLOrder',
      className: classes.alignRight,
      sorter: (a, b) => a.onGLOrder - b.onGLOrder,
    },
    {
      title: (
        <Tooltip placement="bottom" title={t('localsCourierLiveMonitoringPage:CANCELED_TOOLTIP')}>
          <Text strong>{t('localsCourierLiveMonitoringPage:CANCELED')}</Text>
        </Tooltip>
      ),
      dataIndex: 'canceled',
      key: 'canceled',
      className: classes.alignRight,
      sorter: (a, b) => a.canceled - b.canceled,
    },
    {
      title: (
        <Tooltip placement="bottom" title={t('localsCourierLiveMonitoringPage:BUSY_TOOLTIP')}>
          <Text strong>{t('localsCourierLiveMonitoringPage:BUSY')}</Text>
        </Tooltip>
      ),
      dataIndex: 'busy',
      key: 'busy',
      className: [classes.alignRight],
      sorter: (a, b) => a.busy - b.busy,
    },
    {
      title: (
        <Tooltip
          placement="bottom"
          title={t('localsCourierLiveMonitoringPage:UTILIZATION_TOOLTIP')}
        >
          <Text strong>{t('localsCourierLiveMonitoringPage:UTILIZATION')}</Text>
        </Tooltip>
      ),
      key: 'utilization',
      className: classes.alignRight,
      sorter: (a, b) => {
        const utilizationA = ((a.utilized / a.utilizableTotal) * 100) || 0;
        const utilizationB = ((b.utilized / b.utilizableTotal) * 100) || 0;
        return Number(utilizationA) - Number(utilizationB);
      },
      render: data => {
        const utilization = (data.utilized / data.utilizableTotal) * 100;
        return numberFormat({ maxDecimal: 0 }).format(isNaN(utilization) ? 0 : utilization);
      },
    },
  ];
};
