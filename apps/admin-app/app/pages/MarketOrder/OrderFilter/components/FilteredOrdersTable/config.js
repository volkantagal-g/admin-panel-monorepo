import { Tag, Tooltip } from 'antd';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { get, isEmpty, isEqual } from 'lodash';

import { getLangKey } from '@shared/i18n';
import { marketOrderStatuses } from '@shared/shared/constantValues';
import { formatUTCDate } from '@shared/utils/dateHelper';
import { currency } from '@shared/utils/common';
import { ROUTE } from '@app/routes';
import permKey from '@shared/shared/permKey.json';
import { MARKET_ORDER_STATUS } from '@shared/shared/constants';
import { MARKET_ORDER_ACTIVE_STATUS_TO_DATE_FIELD, MARKET_ORDER_SUCCESS_DATE_FIELD } from '@shared/constants/marketOrder';

import { getDeviceType, getPlatforms } from '../Filter/utils';
import RedirectButtonV2 from '@shared/components/UI/RedirectButtonV2';

export const getTableColumns = ({ t, canAccess = false, pagination = {}, hasIntegration, lastUsedFilters }) => [
  {
    title: '#',
    key: 'index',
    width: 40,
    render: (val, row, index) => {
      const { currentPage, rowsPerPage } = pagination;
      if (currentPage && rowsPerPage) {
        const firstIndex = (currentPage - 1) * rowsPerPage;
        return firstIndex + index + 1;
      }
      return index + 1;
    },
  },
  {
    title: t('G10_ORDER'),
    dataIndex: 'sucG10OrderCount',
    width: 50,
  },
  {
    title: t('FOOD_ORDER'),
    dataIndex: 'sucFoodOrderCount',
    width: 50,
  },
  {
    title: t('GETIR_MARKET_ORDER'),
    dataIndex: 'sucMarketOrderCount',
    width: 50,
  },
  {
    title: t('GETIR_VOYAGER'),
    dataIndex: 'sucGetirVoyagerOrderCount',
    width: 70,
  },
  {
    title: t('PROMO'),
    dataIndex: 'promo',
    width: 250,
    render: promo => {
      const promotion = promo?.applied?.[0];
      return (
        promotion?.promoCode ? (
          <Tag
            title={promotion?.promoCode}
            style={{
              backgroundColor: promotion?.bgColor || '#4caf50',
              color: promotion?.textColor || '#ffffff',
              borderRadius: '5px',
              overflow: 'scroll',
              maxWidth: '100%',
            }}
          >
            {promotion.promoCode}
          </Tag>
        ) : null
      );
    },
  },
  {
    title: t('AMOUNT'),
    dataIndex: 'basket',
    render: basket => `${(basket?.calculation?.totalAmount || 0).toFixed(2)}${currency()}`,
  },
  {
    title: t('CLIENT'),
    dataIndex: 'client',
    render: ({ client }) => {
      const clientPath = ROUTE.CLIENT_DETAIL.path.replace(':id', client?._id);
      return (
        <Link to={canAccess(permKey.PAGE_CLIENT_DETAIL) ? clientPath : '#'} target="_blank" rel="noreferrer">
          {client?.name}
        </Link>
      );
    },
  },
  {
    title: t('STORE'),
    dataIndex: 'warehouse',
    render: ({ warehouse }) => {
      const warehousePath = ROUTE.WAREHOUSE_DETAIL.path.replace(':id', warehouse?.id);
      return (
        <Link to={canAccess(permKey.PAGE_WAREHOUSE_DETAIL) ? warehousePath : '#'} target="_blank" rel="noreferrer">
          {warehouse?.name}
        </Link>
      );
    },
  },
  {
    title: t('COURIER'),
    dataIndex: 'courier',
    render: ({ courier }) => {
      const courierPath = ROUTE.COURIER_DETAIL.path.replace(':id', courier?._id);
      return (
        <Link to={canAccess(permKey.PAGE_COURIER_DETAIL) ? courierPath : '#'} target="_blank" rel="noreferrer">
          {courier?.name}
        </Link>
      );
    },
  },
  {
    title: t('ERRORS'),
    dataIndex: 'checkoutErrorTexts',
  },
  {
    title: t('PLATFORM'),
    hidden: !hasIntegration,
    render: ({ integrations }) => {
      return (!isEmpty(integrations?.types) ? getPlatforms(integrations?.types) : null);
    },
  },
  {
    title: hasIntegration ? t('DEVICE_TYPES') : t('PLATFORM'),
    render: ({ client }) => getDeviceType(client),
  },
  {
    title: t('REFERENCE_ID'),
    dataIndex: 'integrations',
    hidden: !hasIntegration,
    render: integrations => integrations?.referenceIds?.join(', '),
  },
  {
    title: t('CHECKOUT_DATE'),
    dataIndex: 'checkoutDateL',
    sorter: (a, b) => moment(a.checkoutDateL).valueOf() - moment(b.checkoutDateL).valueOf(),
    defaultSortOrder: 'descend',
    render: date => formatUTCDate(date),
  },
  ...optionalDurationColum(lastUsedFilters, t),
  {
    title: t('global:STATUS'),
    dataIndex: 'status',
    sorter: (a, b) => a.status - b.status,
    render: status => marketOrderStatuses[status]?.[getLangKey()],
  },
  {
    title: t('global:ACTION'),
    render: ({ _id: orderId, domainType }) => {
      const orderDetailPath = ROUTE.GETIR_MARKET_ORDER_DETAIL.path.replace(':orderId', orderId);
      const queryParamAddedLink = `${orderDetailPath}?domainType=${domainType}`;

      return (
        <RedirectButtonV2
          text={t('global:DETAIL')}
          to={queryParamAddedLink}
          permKey={permKey.PAGE_GETIR_MARKET_ORDER_DETAIL}
          data-testid="market-order-detail-link"
          size="small"
          type="primary"
        />
      );
    },
  },
].filter(record => !record?.hidden);

function optionalDurationColum(lastUsedFilters, t) {
  const { initialStatusForSuccessDuration, statuses } = lastUsedFilters;
  const columns = [];
  // FILTER_STATUSES.SUCCESS
  if (!isEqual(statuses, [MARKET_ORDER_STATUS.DELIVERED, MARKET_ORDER_STATUS.RATED]) || !initialStatusForSuccessDuration) {
    return columns;
  }

  const initialStatusDateField = MARKET_ORDER_ACTIVE_STATUS_TO_DATE_FIELD[initialStatusForSuccessDuration];
  const finalDateField = MARKET_ORDER_SUCCESS_DATE_FIELD;

  columns.push({
    title: (
      <Tooltip title={t('DURATION_TOOLTIP')}>
        <span style={{ marginRight: '4px' }}>
          {`${t('DURATION')} (${t('TIME.ABBR.MINUTE')})`}
        </span>
      </Tooltip>
    ),
    dataIndex: 'durationAsMinutes',
    align: 'right',
    render: (durationAsMinutes, row) => {
      const initialStatusDate = get(row, initialStatusDateField);
      const finalDate = get(row, finalDateField);
      // show only as minutes
      const duration = moment.duration(moment(finalDate).diff(moment(initialStatusDate)));
      return <span style={{ marginRight: '4px' }}>{duration.asMinutes().toFixed(0)}</span>;
    },
  });

  return columns;
}
