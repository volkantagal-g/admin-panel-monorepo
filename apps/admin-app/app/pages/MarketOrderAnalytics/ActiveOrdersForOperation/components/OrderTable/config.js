import { Tooltip } from 'antd';
import moment from 'moment-timezone';

import { ROUTE } from '@app/routes';
import RedirectButton from '@shared/components/UI/RedirectButtonV2';
import RedirectText from '@shared/components/UI/RedirectText';
import permKeys from '@shared/shared/permKey.json';
import { numberFormatWithTwoDecimal } from '@shared/utils/localization';

export const tableColumns = ({ pagination, t }) => [
  {
    title: '#',
    key: 'index',
    align: 'right',
    width: 40,
    render: (val, row, index) => {
      const { currentPage, rowsPerPage } = pagination;
      const firstIndex = (currentPage - 1) * rowsPerPage;
      return firstIndex + index + 1;
    },
  },
  {
    title: (
      <Tooltip title={t('activeOrdersForOperationPage:QUEUE_STATUS_TOOLTIP')}>
        <b>{t('activeOrdersForOperationPage:QUEUE_STATUS')}</b>
      </Tooltip>
    ),
    dataIndex: 'queueStatus',
    key: 'queueStatus',
    width: 60,
    render: status => status,
  },
  {
    title: (
      <Tooltip title={t('activeOrdersForOperationPage:SLOTTED_ORDER')}>
        <b>{t('activeOrdersForOperationPage:SLOT_STATE_SHORT')}</b>
      </Tooltip>
    ),
    dataIndex: 'isSlottedDelivery',
    width: 40,
    render: (isSlottedDelivery, record) => {
      if (isSlottedDelivery) {
        const { start, end, timezone } = record?.slottedDeliveryInfo || {};
        let tooltipText = '';
        if (!start || !end || !timezone) {
          tooltipText = 'N/A';
        }
        else {
          // format short month name + day + hour + minute
          const formattedStart = moment(start).tz(timezone).format('MMM D HH:mm');
          const formattedEnd = moment(end).tz(timezone).format('HH:mm');
          tooltipText = `${formattedStart} - ${formattedEnd}`;
        }
        return (
          <Tooltip title={tooltipText}>
            {t('activeOrdersForOperationPage:SLOT_STATE_SHORT')}
          </Tooltip>
        );
      }
      return null;
    },
  },
  {
    title: <b>{t('global:WAREHOUSE')}</b>,
    key: 'warehouseName',
    width: 110,
    render: ({ warehouseId, warehouseName: name }) => {
      const warehouseDetailPath = ROUTE.WAREHOUSE_DETAIL.path.replace(':id', warehouseId);
      return (
        <RedirectText
          to={warehouseDetailPath}
          permKey={permKeys.PAGE_WAREHOUSE_DETAIL}
          text={name}
        />
      );
    },
  },
  {
    title: (
      <Tooltip title={t('activeOrdersForOperationPage:PROMO_USAGE_TOOLTIP')}>
        <b>{t('global:PROMO')}</b>
      </Tooltip>
    ),
    key: 'isPromoUsed',
    width: 80,
    render: ({ isPromoUsed }) => (
      isPromoUsed ? t('activeOrdersForOperationPage:PROMO_USED') : t('activeOrdersForOperationPage:ORGANIC')
    ),
  },
  {
    title: (
      <Tooltip title={t('activeOrdersForOperationPage:CHECKOUT_DATE_TOOLTIP')}>
        <b>{t('activeOrdersForOperationPage:CHECKOUT_DATE')}</b>
      </Tooltip>
    ),
    dataIndex: 'checkoutDate',
    key: 'checkoutDate',
    width: 100,
    render: date => date,
  },
  {
    title: <b>{t('global:CLIENT')}</b>,
    dataIndex: 'clientName',
    key: 'clientName',
    width: 80,
    render: status => status,
  },
  {
    title: <b>{t('global:WORKER_TYPES:COURIER')}</b>,
    dataIndex: 'courierName',
    key: 'courierName',
    width: 120,
    render: name => name,
  },
  {
    title: <b>{t('global:WORKER_TYPES:PICKER')}</b>,
    dataIndex: 'pickerName',
    key: 'pickerName',
    width: 120,
    render: name => name,
  },
  {
    title: (
      <Tooltip title={t('activeOrdersForOperationPage:LAST_ACT_TOOLTIP')}>
        <b>{t('activeOrdersForOperationPage:LAST_ACTIVITY')}</b>
      </Tooltip>
    ),
    dataIndex: 'statusUpdatedAt',
    align: 'right',
    key: 'statusUpdatedAt',
    sorter: () => { },
    width: 50,
    render: statusUpdatedAt => statusUpdatedAt,
  },
  {
    title: (
      <Tooltip title={t('activeOrdersForOperationPage:SUM_TOOLTIP')}>
        {t('global:SUM')}
      </Tooltip>
    ),
    dataIndex: 'sum',
    align: 'right',
    key: 'sum',
    sorter: () => { },
    width: 70,
    render: (sum, order) => {
      if (!order.isSlottedDelivery) {
        return sum;
      }

      const totalDurationText = `${order.slottedOrderDuration} / ${sum}`;

      return (
        <Tooltip title={t('activeOrdersForOperationPage:SLOTTED_TOTAL_DURATION_TOOLTIP')}>
          {totalDurationText}
        </Tooltip>
      );
    },
  },
  {
    title: <b>{t('global:STATUS')}</b>,
    dataIndex: 'status',
    key: 'status',
    width: 70,
    render: status => status,
  },
  {
    title: <b>{t('global:WEIGHT.KG')}</b>,
    dataIndex: 'weight',
    key: 'weight',
    align: 'right',
    width: 70,
    render: weight => {
      const formattedNumber = numberFormatWithTwoDecimal.format((weight / 1000));
      return formattedNumber || 0;
    },
  },
  {
    title: <b>{t('global:VOLUME')}(cm<sup>3</sup>)</b>,
    dataIndex: 'volume',
    key: 'volume',
    align: 'right',
    width: 80,
    render: volume => {
      const formattedNumber = numberFormatWithTwoDecimal.format(volume);
      return formattedNumber || 0;
    },
  },
  {
    title: <b>{t('global:VEHICLE')}</b>,
    dataIndex: 'vehicle',
    key: 'vehicle',
    align: 'right',
    width: 65,
    render: vehicle => {
      const vehicleType = Number(vehicle) ? t(`global:MARKET_VEHICLE_TYPES.${vehicle}`) : '-';
      return vehicleType;
    },
  },
  {
    title: <b>{t('global:ACTION')}</b>,
    align: 'right',
    width: 70,
    render: ({ _id: orderId, domainType }) => {
      const orderDetailPath = ROUTE.GETIR_MARKET_ORDER_DETAIL.path.replace(':orderId', orderId);
      const queryParamAddedLink = `${orderDetailPath}?domainType=${domainType}`;
      return (
        <RedirectButton
          to={queryParamAddedLink}
          text={t('global:DETAIL')}
          permKey={permKeys.PAGE_GETIR_MARKET_ORDER_DETAIL}
          size="small"
          target="_blank"
        />
      );
    },
  },
];
