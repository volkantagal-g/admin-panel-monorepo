import moment from 'moment';
import { Typography, Button, Tag } from 'antd';
import _ from 'lodash';
import { Link } from 'react-router-dom';

import { ENVIRONMENT } from '@shared/config';
import { getLangKey } from '@shared/i18n';
import Constants from '@shared/utils/commonConstants';
import { waterOrderStatuses } from '@shared/shared/constantValues';
import { ROUTE } from '@app/routes';
import permKey from '@shared/shared/permKey.json';
import { waterOrderCancelReasons } from '@app/pages/GetirWater/utils/constants';
import { MOBILE_WIDTH_IN_PX } from '@shared/shared/constants';

const { Text } = Typography;

const traPrefix = 'getirWaterOrderFilter:DATA_TABLE';
const traPaymentStatusPrefix = 'getirWaterOrderFilter:PAYMENT_STATUS';
const { REACT_APP_WATER_PANEL_URL: WATER_URL } = ENVIRONMENT;

const dateFormat = 'DD MM YYYY, HH:mm:ss';

const orderStatusColorMap = {
  success: 'green',
  active: 'orange',
  cancelled: 'red',
  incomplete: 'magenta',
};

export const getOrderStatus = status => {
  switch (true) {
    case status >= Constants.WATER_ORDER_STATUS.DELIVERED &&
      status <= Constants.WATER_ORDER_STATUS.RATED:
      return 'success';
    case status >= Constants.WATER_ORDER_STATUS.INCOMPLETE &&
      status <= Constants.WATER_ORDER_STATUS.ABORTED:
      return 'incomplete';
    case status >= Constants.WATER_ORDER_STATUS.CANCELED_ADMIN &&
      status <= Constants.WATER_ORDER_STATUS.CANCELED_VENDOR:
      return 'cancelled';
    default:
      return 'active';
  }
};

export const generateColumns = (Can, t, width) => {
  const isMobileWidth = width < MOBILE_WIDTH_IN_PX;
  const columns = [
    {
      title: t(`${traPrefix}.ORDER`),
      dataIndex: 'order',
      key: 'order',
    },
    {
      title: t(`${traPrefix}.CONFIRMATION_CODE`),
      dataIndex: 'confirmationCode',
      key: 'confirmationCode',
    },
    {
      title: t(`${traPrefix}.PRICE`),
      dataIndex: 'price',
      key: 'price',
      render: price => `${price && price.toFixed(2)} ₺`,
    },
    {
      title: t(`${traPrefix}.CUSTOMER_NAME`),
      dataIndex: 'customer',
      key: 'customer',
      render: customer => (
        <a target="_blank" rel="noreferrer" href={`/client/detail/${customer?.customerId}`}>
          {customer?.customerName}
        </a>
      ),
    },
    {
      title: t(`${traPrefix}.BRAND`),
      dataIndex: 'brandName',
      key: 'brandName',
    },
    {
      title: t(`${traPrefix}.VENDOR`),
      dataIndex: 'vendorOrderFilterResponse',
      key: 'vendorOrderFilterResponse',
      render: vendor => (
        <a
          target="_blank"
          rel="noreferrer"
          href={`${WATER_URL}/${vendor?.vendorId}`}
        >
          {vendor?.vendorName}
        </a>
      ),
    },
    {
      title: t(`${traPrefix}.CITY`),
      dataIndex: 'cityName',
      key: 'cityName',
      width: 60,
    },
    {
      title: t(`${traPrefix}:CREATED_DATE`),
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 100,
      render: createdAt => moment(createdAt).format(dateFormat),
    },
    {
      title: t(`${traPrefix}.PAYMENT_DATE`),
      dataIndex: 'paymentDate',
      key: 'paymentDate',
      sorter: { compare: (a, b) => moment(a.paymentDate).unix() - moment(b.paymentDate).unix() },
      width: 100,
      render: paymentDate => moment(paymentDate).format(dateFormat),
    },
    {
      title: t(`${traPrefix}.SCHEDULED_DATE`),
      dataIndex: 'scheduledDeliveryDateStart',
      key: 'scheduledDeliveryDateStart',
      sorter: { compare: (a, b) => moment(a.scheduledDeliveryDateStart).unix() - moment(b.scheduledDeliveryDateStart).unix() },
      width: 90,
      render: (a, record) => {
        if (record.scheduledDeliveryDateStart && record.scheduledDeliveryDateEnd) {
          return `${moment(record.scheduledDeliveryDateStart).format('DD.MM.YYYY HH:mm')}
-${moment(record.scheduledDeliveryDateEnd).format('HH:mm')}`;
        }
        return '';
      },
    },
    {
      title: t(`${traPrefix}.STATUS`),
      dataIndex: 'status',
      key: 'status',
      sorter: (a, b) => a.status - b.status,
      render: (status, record) => {
        const { isPartialRefund, isRefunded } = record;

        return (
          <Tag color={orderStatusColorMap[getOrderStatus(status)]}>
            {(isPartialRefund &&
              t(`${traPaymentStatusPrefix}.PARTIAL_REFUNDED`)) ||
              (isRefunded && t(`${traPaymentStatusPrefix}.REFUNDED`)) ||
              waterOrderStatuses[status][getLangKey()]}
          </Tag>
        );
      },
      ...(!isMobileWidth && { fixed: 'right' }),
      width: 150,
    },
    {
      title: t(`${traPrefix}.CANCEL_REASON`),
      dataIndex: 'cancelReason',
      key: 'cancelReason',
      ...(!isMobileWidth && { fixed: 'right' }),
      width: 100,
      sorter: (a, b) => {
        if (a.cancelReason === undefined && b.cancelReason === undefined) return 0;
        if (a.cancelReason === undefined) return -1;
        if (b.cancelReason === undefined) return 1;
        return b.cancelReason.toLowerCase().localeCompare(a.cancelReason.toLowerCase());
      },
      render: cancelReason => _.get(waterOrderCancelReasons, [cancelReason, getLangKey()], ''),
    },
    {
      title: t(`${traPrefix}.ACTION`),
      dataIndex: '',
      key: '',
      width: 60,
      render: record => {
        const badgeId = _.get(record, 'orderId', '');
        const path = ROUTE.GETIR_WATER_ORDER_DETAIL.path.replace(
          ':waterOrderId',
          badgeId,
        );

        return (
          <Can permKey={permKey.PAGE_GETIR_WATER_ORDER_DETAIL}>
            <Link target="_blank" to={path}>
              <Button
                type="default"
                size="small"
                variant="contained"
              >
                <Text>{t('global:DETAIL')}</Text>
              </Button>
            </Link>
          </Can>
        );
      },
      ...(!isMobileWidth && { fixed: 'right' }),
    },
  ];

  return columns;
};
