/* eslint-disable no-inline-styles/no-inline-styles */
import { Button, Tooltip, Typography } from 'antd';
import moment from 'moment';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { toUpper } from 'lodash';

import { ROUTE } from '@app/routes';
import { GETIR_10_DOMAIN_TYPE, GETIR_FOOD_DOMAIN_TYPE, GETIR_MARKET_DOMAIN_TYPE, GETIR_VOYAGER_DOMAIN_TYPE } from '@shared/shared/constants';
import permKey from '@shared/shared/permKey.json';
import { currency } from '@shared/utils/common';
import { numberFormat } from '@shared/utils/localization';

const { Text } = Typography;
const appendCurrency = str => `${str} (${currency()})`;

export const tableColumns = ({ pagination, t, canAccess, classes, doesSelectedCountryHaveAnyActiveIntegration }) => [
  {
    title: '#',
    key: 'index',
    width: 40,
    render: (val, row, index) => {
      const { currentPage, rowsPerPage } = pagination;
      const firstIndex = (currentPage - 1) * rowsPerPage;
      return firstIndex + index + 1;
    },
  },
  {
    title: <b>{t('activeOrdersForGrowthPage:PROMO_CODE')}</b>,
    dataIndex: 'promo',
    key: 'promo',
    width: 150,
    render: promos => (
      <div className={classes.promoContainer}>
        {promos.map(promo => (
          <Fragment key={promo.code}>
            <Text
              style={{
                backgroundColor: promo.code && promo.bgColor,
                color: promo.textColor,
              }}
            >
              {promo.code}
            </Text>
            <br />
          </Fragment>
        ))}
      </div>
    ),
  },
  {
    title: <b>{t('activeOrdersForGrowthPage:G10')}</b>,
    dataIndex: ['domainTypesCount', GETIR_10_DOMAIN_TYPE],
    align: 'right',
    width: 40,
  },
  {
    title: <b>{t('activeOrdersForGrowthPage:GF')}</b>,
    dataIndex: ['domainTypesCount', GETIR_FOOD_DOMAIN_TYPE],
    align: 'right',
    width: 40,
  },
  {
    title: <b>{t('activeOrdersForGrowthPage:GM')}</b>,
    dataIndex: ['domainTypesCount', GETIR_MARKET_DOMAIN_TYPE],
    align: 'right',
    width: 40,
  },
  {
    title: <b>{t('activeOrdersForGrowthPage:GW')}</b>,
    dataIndex: ['domainTypesCount', GETIR_VOYAGER_DOMAIN_TYPE],
    align: 'right',
    width: 40,
  },
  {
    title: (
      <Tooltip title={t('activeOrdersForGrowthPage:ORDER_CHANNEL_TOOLTIP')}>
        <b>{t('activeOrdersForGrowthPage:ORDER_CHANNEL')}</b>
      </Tooltip>
    ),
    dataIndex: 'deviceType',
    align: 'left',
    width: 58,
  },
  ...(doesSelectedCountryHaveAnyActiveIntegration ? [{
    title: (
      <Tooltip title={t('global:INTEGRATION_TYPE')}>
        <b>{t('activeOrdersForGrowthPage:INTEGRATION_TYPE_SHORT')}</b>
      </Tooltip>
    ),
    dataIndex: 'integrationTypes',
    align: 'left',
    key: 'integrationTypes',
    width: 46,
    render: integrationTypesData => (
      integrationTypesData.map((type, index) => (
        <Text key={type}>
          {/* used activeOrdersForGrowthPage:GETIR_MARKET_INTEGRATION_TYPES translation */}
          {/* in the order, n11 field is used for integration types, not n11quick */}
          {t(`activeOrdersForGrowthPage:GETIR_MARKET_INTEGRATION_TYPES.${toUpper(type)}`)}
          {index !== integrationTypesData.length - 1 && ', '}
        </Text>
      ))
    ),
  }] : []),
  {
    title: (
      <Tooltip title={t('activeOrdersForGrowthPage:SLOTTED_STATE_COLUMN_TOOLTIP')}>
        <b>{t('activeOrdersForGrowthPage:SLOTTED_STATE_SHORT')}</b>
      </Tooltip>
    ),
    dataIndex: 'isSlottedDelivery',
    key: 'isSlottedDelivery',
    align: 'left',
    width: 45,
    render: (isSlotted, record) => {
      const slottedDay = moment(record?.slottedDeliveryInfo?.start).format('MMM DD');
      const slottedStartTime = moment(record?.slottedDeliveryInfo?.start).format('HH:mm');
      const slottedEndTime = moment(record?.slottedDeliveryInfo?.end).format('HH:mm');

      const slottedTimeRange = `${slottedDay}, ${slottedStartTime}-${slottedEndTime}`;

      return isSlotted ? (
        <Tooltip title={slottedTimeRange}>
          <b>{t('activeOrdersForGrowthPage:SLOTTED_STATE_SHORT')}</b>
        </Tooltip>
      ) : '';
    },
  },
  {
    title: <b>{t('activeOrdersForGrowthPage:PAYMENT_TYPE_SHORT')}</b>,
    dataIndex: 'paymentType',
    align: 'left',
    key: 'paymentType',
    width: 70,
  },
  {
    title: <b>{t('global:WAREHOUSE')}</b>,
    dataIndex: 'warehouse',
    key: 'warehouse',
    width: 110,
  },
  {
    title: (
      <Tooltip title={t('activeOrdersForGrowthPage:AGGRESSION_LEVEL_TOOLTIP')}>
        <b>{t('activeOrdersForGrowthPage:AGGRESSION_LEVEL')}</b>
      </Tooltip>
    ),
    dataIndex: 'aggressionLevel',
    align: 'right',
    key: 'aggressionLevel',
    width: 50,
  },
  {
    title: (
      <Tooltip title={t('activeOrdersForGrowthPage:DELIVERY_FEE_TOOLTIP')}>
        <b>{appendCurrency(t('activeOrdersForGrowthPage:DELIVERY_FEE'))}</b>
      </Tooltip>
    ),
    dataIndex: 'deliveryFee',
    align: 'right',
    key: 'deliveryFee',
    width: 65,
    render: deliveryFee => (deliveryFee ? numberFormat({ maxDecimal: 2 }).format(deliveryFee) : '-'),
  },
  {
    title: (
      <Tooltip title={t('activeOrdersForGrowthPage:BASKET_TOOLTIP')}>
        <b>{appendCurrency(t('activeOrdersForGrowthPage:BASKET'))}</b>
      </Tooltip>
    ),
    dataIndex: 'totalBasketAmount',
    align: 'right',
    key: 'totalBasketAmount',
    width: 80,
    render: total => numberFormat({ maxDecimal: 2 }).format(total),
  },
  {
    title: <b>{appendCurrency(t('activeOrdersForGrowthPage:CHARGE'))}</b>,
    dataIndex: 'totalChargedAmount',
    align: 'right',
    key: 'totalChargedAmount',
    width: 80,
    render: amount => numberFormat({ maxDecimal: 2 }).format(amount),
  },
  {
    title: (
      <Tooltip title={t('activeOrdersForGrowthPage:CHECKOUT_DATE_TOOLTIP')}>
        <b>{t('activeOrdersForGrowthPage:CHECKOUT_DATE')}</b>
      </Tooltip>
    ),
    dataIndex: 'date',
    key: 'date',
    align: 'right',
    width: 45,
    render: date => moment(date).format('HH:mm'),
  },
  {
    title: (
      <Tooltip title={t('activeOrdersForGrowthPage:LAST_ACT_TOOLTIP')}>
        <b>{t('activeOrdersForGrowthPage:LAST_ACT')}</b>
      </Tooltip>
    ),
    // empty because it triggers backend sort by api call
    sorter: () => { },
    dataIndex: 'lastActivity',
    align: 'right',
    key: 'lastActivity',
    width: 55,
  },
  {
    title: (
      <Tooltip title={t('activeOrdersForGrowthPage:TOTAL_DURATION_COLUMN_TOOLTIP')}>
        <b>{t('global:SUM')}</b>
      </Tooltip>
    ),
    dataIndex: 'sum',
    align: 'right',
    key: 'sum',
    width: 85,
    // empty because it triggers backend sort by api call
    sorter: () => { },
    render: (sum, record) => {
      return (
        <Tooltip title={record?.isSlottedDelivery ? t('activeOrdersForGrowthPage:SLOTTED_TOTAL_DURATION_TOOLTIP') : ''}>
          {record?.isSlottedDelivery ? `${record.slottedOrderDuration}/${sum}` : sum}
        </Tooltip>
      );
    },
  },
  {
    title: <b>{t('global:STATUS')}</b>,
    dataIndex: 'status',
    key: 'status',
    width: 80,
  },
  ...(canAccess(permKey.PAGE_GETIR_MARKET_ORDER_DETAIL) ? [{
    title: <b>{t('global:ACTION')}</b>,
    width: 60,
    render: ({ _id: orderId, domainType }) => {
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
  }] : []),

];
