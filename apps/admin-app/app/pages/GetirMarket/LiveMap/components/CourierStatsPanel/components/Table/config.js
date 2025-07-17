import { Tooltip } from 'antd';

import { marketVehicleTypes } from '@shared/shared/constantValues';
import { numberFormat } from '@shared/utils/localization';

import AnalyticsService from '@shared/services/analytics';
import { LIVE_MAP_EVENTS } from '@app/pages/GetirMarket/LiveMap/mixPanelEvents';

const isParent = data => typeof data === 'number' || data === 'TOTAL';

export const generateTableColumns = ({ classes, onExpandClick, sortable, sortOptions, handleSortChange }, t) => {
  const defaultCellClasses = [
    classes.cell,
    classes.alignRight,
    ...(sortable ? [classes.sortableCell] : []),
  ];
  return [
    {
      dataIndex: 'name',
      key: 'name',
      fixed: 'left',
      className: `${classes.cell} ${classes.name} ${!onExpandClick && classes.noClick}`,
      onCell: ({ name }) => ({
        onClick: () => {
          let marketVehicleTypeName;
          if (name === 'TOTAL') {
            marketVehicleTypeName = 'Total';
          }
          else {
            marketVehicleTypeName = marketVehicleTypes[name]?.en;
          }
          AnalyticsService.track(LIVE_MAP_EVENTS.BUTTON_CLICK, {
            button: LIVE_MAP_EVENTS.COURIER_TYPES.NAME,
            type: marketVehicleTypeName,
          });
          return onExpandClick && isParent(name) && onExpandClick(name);
        },
      }),
      render: data => {
        const title = typeof data === 'number' ?
          t(`global:MARKET_VEHICLE_TYPES.${data.toString()}`, { defaultValue: '-' }) :
          t(`global:${data}`);

        return (
          <span className={`nameColumn ${classes.nameSpan} ${!isParent(data) && classes.childName}`}>
            {title}
          </span>
        );
      },
    },
    {
      dataIndex: 'planned',
      key: 'planned',
      width: 31,
      className: [...defaultCellClasses, ...(sortOptions.sortKey === 'planned' ? [classes.activeSorted] : []), classes.planned],
      onCell: () => ({ ...(sortable && { onClick: () => handleSortChange('planned') }) }),
      render: data => (
        <Tooltip title={t('getirMarketLiveMapPage:PLANNED')}>
          <span>{data}</span>
        </Tooltip>
      ),
    },
    {
      dataIndex: 'total',
      key: 'totalCourier',
      width: 29,
      className: [...defaultCellClasses, ...(sortOptions.sortKey === 'total' ? [classes.activeSorted] : []), classes.totalCourier],
      onCell: () => ({ ...(sortable && { onClick: () => handleSortChange('total') }) }),
      render: data => (
        <Tooltip title={t('getirMarketLiveMapPage:REALIZED')}>
          <span>{data}</span>
        </Tooltip>
      ),
    },
    {
      dataIndex: 'free',
      key: 'freeCourier',
      width: 29,
      className: [...defaultCellClasses, ...(sortOptions.sortKey === 'free' ? [classes.activeSorted] : []), classes.freeCourier],
      onCell: () => ({ ...(sortable && { onClick: () => handleSortChange('free') }) }),
      render: data => (
        <Tooltip title={t('getirMarketLiveMapPage:FREE_COURIER')}>
          <span>{data}</span>
        </Tooltip>
      ),
    },
    {
      dataIndex: 'onDuty',
      key: 'onDuty',
      width: 29,
      className: [...defaultCellClasses, ...(sortOptions.sortKey === 'onDuty' ? [classes.activeSorted] : []), classes.onDuty],
      onCell: () => ({ ...(sortable && { onClick: () => handleSortChange('onDuty') }) }),
      render: data => (
        <Tooltip title={t('getirMarketLiveMapPage:ON_ORDER')}>
          <span>{data}</span>
        </Tooltip>
      ),
    },
    {
      dataIndex: 'returning',
      key: 'returning',
      width: 29,
      className: [...defaultCellClasses, ...(sortOptions.sortKey === 'returning' ? [classes.activeSorted] : []), classes.returning],
      onCell: () => ({ ...(sortable && { onClick: () => handleSortChange('returning') }) }),
      render: data => (
        <Tooltip title={t('getirMarketLiveMapPage:RETURNING')}>
          <span>{data}</span>
        </Tooltip>
      ),
    },
    {
      dataIndex: 'busy',
      key: 'busy',
      width: 22,
      className: [...defaultCellClasses, ...(sortOptions.sortKey === 'busy' ? [classes.activeSorted] : []), classes.busy],
      onCell: () => ({ ...(sortable && { onClick: () => handleSortChange('busy') }) }),
      render: data => (
        <Tooltip title={t('getirMarketLiveMapPage:BUSY')}>
          <span>{data}</span>
        </Tooltip>
      ),
    },
    {
      dataIndex: 'utilization',
      key: 'utilization',
      width: 22,
      className: [...defaultCellClasses, ...(sortOptions.sortKey === 'utilization' ? [classes.activeSorted] : []), classes.utilization],
      onCell: () => ({ ...(sortable && { onClick: () => handleSortChange('utilization') }) }),
      render: data => (
        <Tooltip title={t('getirMarketLiveMapPage:UTILIZATION')}>
          <span>{numberFormat({ maxDecimal: 0 }).format(data)}</span>
        </Tooltip>
      ),
    },
  ];
};
