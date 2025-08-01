import _ from 'lodash';
import { Typography, Tooltip, Tag, Button } from 'antd';
import moment from 'moment';
import { Link } from 'react-router-dom';

import PaymentMethodIcon from '@shared/components/UI/PaymentMethodIcon';
import { getLangKey } from '@shared/i18n';
import { currencyFormat, percentFormat } from '@shared/utils/localization';
import {
  GETIR_10_DOMAIN_TYPE,
  GETIR_FOOD_DOMAIN_TYPE,
  GETIR_MARKET_DOMAIN_TYPE,
  GETIR_VOYAGER_DOMAIN_TYPE,
  GETIR_LOCALS_DOMAIN_TYPE,
  ADDRESS_TYPE,
} from '@shared/shared/constants';
import { ROUTE } from '@app/routes';
import permKey from '@shared/shared/permKey.json';
import { ORDER_STATUS_FOR_ACTIVE_ORDERS_PAGES } from '@app/pages/MarketOrderAnalytics/constants';

const ADDRESS_TYPE_SET = new Set(Object.values(ADDRESS_TYPE));

moment.locale(getLangKey());
const { Text } = Typography;

const DEFAULT_PROMO_BG_COLOR = '#4CAF50';
const DEFAULT_PROMO_TEXT_COLOR = '#FFFFFF';

const activeOrderEntriesReversed = Object.entries(ORDER_STATUS_FOR_ACTIVE_ORDERS_PAGES).map(([key, val]) => [val, key]);
const STATUS_CODE_TO_KEY_STRING = Object.fromEntries(activeOrderEntriesReversed);

export const getTableColumns = ({ pagination, classes, orderStats, t, canAccess, hasSelectedClient }) => [
  {
    title: (
      <Text className={classes.lastRightAlignedColumn}>
        #
      </Text>
    ),
    dataIndex: 'index',
    align: 'right',
    width: 46,
    render: (val, row, index) => {
      const { currentPage, rowsPerPage } = pagination;
      const firstIndex = (currentPage - 1) * rowsPerPage;
      const value = firstIndex + index + 1;
      return <span className={classes.lastRightAlignedColumn}>{value}</span>;
    },
  },
  {
    title: (
      <Tooltip title={t('ADDRESS_TYPE')}>
        <Text>{t('ADDRESS_TYPE_SHORT')}</Text>
      </Tooltip>
    ),
    dataIndex: 'addressType',
    width: 20,
    render: addressType => {
      const isKnownAddressType = ADDRESS_TYPE_SET.has(addressType);
      const modifiedAddressType = isKnownAddressType ? addressType : ADDRESS_TYPE.OTHER;
      return (
        <Tooltip title={t(`ADDRESS_TYPES.${modifiedAddressType}`)}>
          {t(`ADDRESS_TYPES_SHORT.${modifiedAddressType}`)}
        </Tooltip>
      );
    },
  },
  {
    title: (
      <Tooltip title={t('QUEUE_STATUS')}>
        <Text>{t('QUEUE_STATUS_SHORT')}</Text>
      </Tooltip>
    ),
    dataIndex: 'queueStatus',
    width: 45,
    render: queueStatus => (
      <Tooltip title={t(`QUEUE_STATUSES.${queueStatus}`)}>
        {t(`QUEUE_STATUSES_SHORT.${queueStatus}`)}
      </Tooltip>
    ),
  },
  {
    title: (
      <Tooltip title={t('SLOTTED_ORDER')}>
        <Text>{t('SLOT_STATE_SHORT')}</Text>
      </Tooltip>
    ),
    dataIndex: 'isSlottedDelivery',
    width: 30,
    render: (isSlottedDelivery, record) => {
      const slottedDay = moment(record?.slottedDeliveryInfo?.start).format('MMM DD');
      const slottedStartTime = moment(record?.slottedDeliveryInfo?.start).format('HH:mm');
      const slottedEndTime = moment(record?.slottedDeliveryInfo?.end).format('HH:mm');

      const slottedTimeRange = `${slottedDay}, ${slottedStartTime}-${slottedEndTime}`;

      return isSlottedDelivery ? (
        <Tooltip title={slottedTimeRange}>
          <Text><b>{t('SLOT_STATE_SHORT')}</b></Text>
        </Tooltip>
      ) : '';
    },
  },
  {
    title: (
      <Tooltip title={t('CLIENT_ORDER_COUNTS.GETIR_10')}>
        <Text>{t('CLIENT_ORDER_COUNTS.GETIR_10_SHORT', { count: 0 })}</Text>
      </Tooltip>
    ),
    align: 'right',
    dataIndex: ['clientOrderCountByDomainTypeMap', GETIR_10_DOMAIN_TYPE],
    // width: 55, // TODO: open this width when order count average is added
    width: 30,
  },
  {
    title: (
      <Tooltip title={t('CLIENT_ORDER_COUNTS.GETIR_30')}>
        <Text>{t('CLIENT_ORDER_COUNTS.GETIR_30_SHORT', { count: 0 })}</Text>
      </Tooltip>
    ),
    align: 'right',
    dataIndex: ['clientOrderCountByDomainTypeMap', GETIR_MARKET_DOMAIN_TYPE],
    // width: 55, // TODO: open this width when order count average is added
    width: 25,
  },
  {
    title: (
      <Tooltip title={t('CLIENT_ORDER_COUNTS.GETIR_WATER')}>
        <Text>{t('CLIENT_ORDER_COUNTS.GETIR_WATER_SHORT', { count: 0 })}</Text>
      </Tooltip>
    ),
    align: 'right',
    dataIndex: ['clientOrderCountByDomainTypeMap', GETIR_VOYAGER_DOMAIN_TYPE],
    // width: 55, // TODO: open this width when order count average is added
    width: 25,
  },
  {
    title: (
      <Tooltip title={t('CLIENT_ORDER_COUNTS.GETIR_FOOD')}>
        <Text>{t('CLIENT_ORDER_COUNTS.GETIR_FOOD_SHORT', { count: 0 })}</Text>
      </Tooltip>
    ),
    align: 'right',
    dataIndex: ['clientOrderCountByDomainTypeMap', GETIR_FOOD_DOMAIN_TYPE],
    // width: 55, // TODO: open this width when order count average is added
    width: 25,
  },
  {
    title: (
      <Tooltip className={classes.lastRightAlignedColumn} title={t('CLIENT_ORDER_COUNTS.GETIR_LOCALS')}>
        <Text>{t('CLIENT_ORDER_COUNTS.GETIR_LOCALS_SHORT', { count: 0 })}</Text>
      </Tooltip>
    ),
    align: 'right',
    dataIndex: ['clientOrderCountByDomainTypeMap', GETIR_LOCALS_DOMAIN_TYPE],
    // width: 55, // TODO: open this width when order count average is added
    width: 30,
    render: value => <span className={classes.lastRightAlignedColumn}>{value}</span>,
  },
  {
    title: () => {
      const title = (
        <>
          {t('global:PROMOTION')}
          <br />
          {t('TOOLTIP_STATS_FILTER_EXPLANATION')}
        </>
      );
      const percentage = orderStats.isPending ? '?' : percentFormat({ maxDecimal: 0 }).format(orderStats.promoOrderRatio);
      return (
        <Tooltip title={title}>
          <Text>{t('PROMOTION_SHORT_W_PERCENTAGE')}{!hasSelectedClient && `(${percentage})`}</Text>
        </Tooltip>
      );
    },
    dataIndex: 'promos',
    width: 160,
    render: promos => {
      if (!promos.length) return t('global:ORGANIC');
      return (
        <div className={classes.promoContainer}>
          {
            promos.map(promoObj => {
              const promoCode = _.get(promoObj, 'promoCode', promoObj._id);
              const tagColor = _.get(promoObj, 'bgColor', DEFAULT_PROMO_BG_COLOR);
              const textColor = _.get(promoObj, 'textColor', DEFAULT_PROMO_TEXT_COLOR);

              return (
                <Tooltip title={promoCode} key={promoCode}>
                  <Tag color={tagColor} className={classes.promoCellTag}>
                    <Text className={classes.promoCodeText} style={{ color: textColor }} ellipsis>
                      {promoCode}
                    </Text>
                  </Tag>
                </Tooltip>
              );
            })
          }
        </div>
      );
    },
  },
  {
    title: <Text>{t('global:WAREHOUSE')}</Text>,
    dataIndex: 'warehouseName',
    width: 95,
    render: warehouseName => (
      <Tooltip title={warehouseName}>
        <Text className={classes.warehouseText} ellipsis>
          {warehouseName}
        </Text>
      </Tooltip>
    ),
  },
  {
    title: () => {
      const title = (
        <>
          {t('BASKET_AMOUNT')}
          <br />
          {t('TOOLTIP_STATS_FILTER_EXPLANATION')}
        </>
      );
      const formattedAverageBasketAmount = orderStats.isPending
        ? '?'
        : currencyFormat({ maxDecimal: 1, minDecimal: 1 }).format(orderStats.averageBasketAmount);
      return (
        <Tooltip title={title}>
          <Text>
            {t('BASKET_AMOUNT_SHORT_W_AVERAGE_AMOUNT')}{!hasSelectedClient && `(${formattedAverageBasketAmount})`}
          </Text>
        </Tooltip>
      );
    },
    align: 'right',
    width: 100,
    key: 'basketAmount',
    render: ({ paymentMethod, basketAmount }) => (
      <>
        <PaymentMethodIcon paymentMethod={paymentMethod} showTooltip />
        <Text className={classes.boldText}>{currencyFormat({ maxDecimal: 1, minDecimal: 1 }).format(basketAmount)}</Text>
      </>
    ),
    // empty because it triggers backend sort by api call
    sorter: () => { },
  },
  {
    title: () => {
      const title = (
        <>
          {t('CHARGED_AMOUNT')}
          <br />
          {t('TOOLTIP_STATS_FILTER_EXPLANATION')}
        </>
      );
      const formattedAverageChargedAmount = orderStats.isPending
        ? '?'
        : currencyFormat({ maxDecimal: 1, minDecimal: 1 }).format(orderStats.averageChargedAmount);
      return (
        <Tooltip title={title}>
          <Text>
            {t('CHARGED_AMOUNT_SHORT_W_AVERAGE_AMOUNT')}{!hasSelectedClient && `(${formattedAverageChargedAmount})`}
          </Text>
        </Tooltip>
      );
    },
    align: 'right',
    dataIndex: 'chargedAmount',
    width: 100,
    render: amount => <Text className={classes.boldText}>{currencyFormat({ maxDecimal: 1, minDecimal: 1 }).format(amount)}</Text>,
    // empty because it triggers backend sort by api call
    sorter: () => { },
  },
  {
    title: (
      <Tooltip title={t('CHECKOUT_DATE')}>
        <Text>{t('CHECKOUT_DATE_SHORT')}</Text>
      </Tooltip>
    ),
    dataIndex: 'checkoutDate',
    align: 'right',
    width: 65,
    // empty because it triggers backend sort by api call
    sorter: () => { },
    defaultSortOrder: 'descend',
    render: date => (
      <Tooltip className={classes.lastRightAlignedColumn2} title={moment(date).format('LLL')}>
        {moment(date).format('HH:mm')}
      </Tooltip>
    ),
  },
  {
    title: <Text>{t('global:CLIENT')}</Text>,
    dataIndex: 'clientName',
    width: 68,
    render: (clientName, { clientShortName }) => (
      <Tooltip title={clientName}>
        <Text>{clientShortName}</Text>
      </Tooltip>
    ),
  },
  {
    title: <Text>{t('global:WORKER_TYPES:COURIER')}</Text>,
    dataIndex: 'courierName',
    width: 62,
    render: (courierName, { courierShortName }) => (
      <Tooltip title={courierName}>
        <Text>{courierShortName}</Text>
      </Tooltip>
    ),
  },
  {
    title: <Text>{t('global:WORKER_TYPES:PICKER')}</Text>,
    dataIndex: 'pickerName',
    width: 62,
    render: (pickerName, { pickerShortName }) => (
      <Tooltip title={pickerName}>
        <Text>{pickerShortName}</Text>
      </Tooltip>
    ),
  },
  {
    title: <Text>{t('global:STATUS')}</Text>,
    dataIndex: 'status',
    width: 70,
    // empty because it triggers backend sort by api call
    sorter: () => { },
    render: status => (
      <Tooltip title={t(`global:MARKET_ORDER_STATUSES:${STATUS_CODE_TO_KEY_STRING[status]}`)}>
        <Text>{t(`global:MARKET_ORDER_STATUSES_SHORT:${STATUS_CODE_TO_KEY_STRING[status]}`)}</Text>
      </Tooltip>
    ),
  },
  {
    title: (
      <Tooltip title={t('LAST_ACTIVITY_DURATION')}>
        <Text>{t('LAST_ACTIVITY_DURATION_SHORT')}</Text>
      </Tooltip>
    ),
    align: 'right',
    dataIndex: 'lastActivityDuration',
    width: 45,
    render: duration => <Text className={classes.boldText}>{duration}</Text>,
  },
  {
    title: (
      <Tooltip className={classes.lastRightAlignedColumn} title={t('TOTAL_DURATION')}>
        <Text>{t('TOTAL_DURATION_SHORT')}</Text>
      </Tooltip>
    ),
    align: 'right',
    dataIndex: 'totalDuration',
    width: 70,
    render: (duration, order) => {
      if (!order.isSlottedDelivery) {
        return (
          <Text className={`${classes.lastRightAlignedColumn} ${classes.boldText}`}>
            {duration}
          </Text>
        );
      }

      const totalDurationText = `${order.slottedOrderDuration} / ${duration}`;

      return (
        <Tooltip title={t('SLOTTED_TOTAL_DURATION_TOOLTIP')}>
          <Text className={`${classes.lastRightAlignedColumn} ${classes.boldText}`}>
            {totalDurationText}
          </Text>
        </Tooltip>
      );
    },
    // empty because it triggers backend sort by api call
    sorter: () => { },
  },
  {
    title: (
      <Tooltip title={t('global:ACTION')}>
        <Text>{t('global:ACTION')}</Text>
      </Tooltip>
    ),
    width: 50,
    render: ({ _id: orderId, domainType }) => {
      if (!canAccess(permKey.PAGE_GETIR_MARKET_ORDER_DETAIL)) {
        return null;
      }
      const orderDetailPath = ROUTE.GETIR_MARKET_ORDER_DETAIL.path.replace(':orderId', orderId);
      const queryParamAddedLink = `${orderDetailPath}?domainType=${domainType}`;
      return (
        <Button size="small">
          <Link target="_blank" to={queryParamAddedLink}>
            {t('global:DETAIL')}
          </Link>
        </Button>
      );
    },
  },
];
