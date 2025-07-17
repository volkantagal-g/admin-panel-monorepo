import moment from 'moment';
import { NavLink } from 'react-router-dom';
import { Button, Image, Tooltip, Typography, Tag } from 'antd';
import { isEmpty, isNil, get, find } from 'lodash';

import history from '@shared/utils/history';
import { getLangKey } from '@shared/i18n';
import { ENVIRONMENT } from '@shared/config';
import { foodOrderStatuses, orderPlatformTypes } from '@shared/shared/constantValues';
import { COURIER_TRACKABILITY_TYPE, FOOD_ORDER_STATUS, FOOD_TIME_TYPE, PLATFORM_TYPE } from '@shared/shared/constants';
import { getOrderMarkerSrc } from '@app/pages/GetirFood/ActiveOrders/components/DataTable/utils';
import { isNullOrEmpty } from '@shared/utils/common';

const deliveryTypeMap = {
  1: {
    en: 'GD',
    tr: 'GG',
  },
  2: {
    en: 'RD',
    tr: 'RG',
  },
};

const { Text } = Typography;
const { REACT_APP_FOOD_RESTAURANT_PANEL_URL: FOOD_RESTAURANT_PANEL } = ENVIRONMENT;

const orderStatusColorMap = {
  success: 'green',
  active: 'orange',
  cancelled: 'red',
  incomplete: 'magenta',
};

export const getOrderStatus = status => {
  switch (true) {
    case status >= FOOD_ORDER_STATUS.DELIVERED && status <= FOOD_ORDER_STATUS.RATED:
      return 'success';
    case status >= FOOD_ORDER_STATUS.INCOMPLETE && status <= FOOD_ORDER_STATUS.ABORTED:
      return 'incomplete';
    case status >= FOOD_ORDER_STATUS.CANCELED_ADMIN && status <= FOOD_ORDER_STATUS.CANCELED_RESTAURANT:
      return 'cancelled';
    default:
      return 'active';
  }
};

export const transformValuesForApi = values => {
  const queryParams = {};
  queryParams.page = values.page;
  queryParams.count = values.count;
  queryParams.deliveryTypes = values.deliveryTypes;
  queryParams.paymentMethods = values.paymentMethods.map(Number).filter(Boolean);

  if (!isNullOrEmpty(values.isRDU)) {
    queryParams.isRDU = values.isRDU === COURIER_TRACKABILITY_TYPE.TRACKABLE;
  }

  if (values.startDate) {
    queryParams.createdAtStart = moment(values.startDate).toDate();
  }
  if (values.endDate) {
    queryParams.createdAtEnd = moment(values.endDate).toDate();
  }

  if (!isEmpty(values.timeTypes) && values.timeTypes.length < 2) {
    queryParams.onlyScheduled = values.timeTypes[0] === FOOD_TIME_TYPE.SCHEDULED;
  }

  if (!isEmpty(values.platformTypes)) {
    queryParams.deviceType = [];

    if (values.platformTypes.includes(PLATFORM_TYPE.MOBILE)) {
      queryParams.deviceType = ['Android', 'iPhone'];
    }

    if (values.platformTypes.includes(PLATFORM_TYPE.WEB)) {
      queryParams.deviceType.push('Web');
    }
  }

  if (!isNil(values.cityId)) {
    queryParams.cityId = values.cityId;
  }

  if (!isEmpty(values.confirmationCode) && values.confirmationCode.length === 4) {
    queryParams.confirmationId = values.confirmationCode;
  }

  if (values.status === 'SUCCESS_ORDERS') {
    queryParams.statusStart = FOOD_ORDER_STATUS.DELIVERED;
    queryParams.statusEnd = FOOD_ORDER_STATUS.RATED;
  }
  else if (values.status === 'CANCELED_ORDERS') {
    queryParams.statusStart = FOOD_ORDER_STATUS.CANCELED_ADMIN;
    queryParams.statusEnd = FOOD_ORDER_STATUS.CANCELED_RESTAURANT;
  }
  else if (values.status === 'ACTIVE_ORDERS') {
    queryParams.statusStart = FOOD_ORDER_STATUS.VERIFYING;
    queryParams.statusEnd = FOOD_ORDER_STATUS.REACHED;
  }
  else {
    queryParams.statusStart = FOOD_ORDER_STATUS.SCHEDULED_VERIFYING;
    queryParams.statusEnd = FOOD_ORDER_STATUS.CANCELED_RESTAURANT;
  }

  if (values.restaurantId) {
    queryParams.restaurantId = values.restaurantId;
  }

  return queryParams;
};

export const generateColumns = ({ t, cities, dataTimeZone, hasAccessToClientDetailPage }) => {
  const langKey = getLangKey();

  return [
    {
      title: '#',
      width: 20,
      fixed: 'left',
      render: record => {
        const marker = getOrderMarkerSrc(record);
        if (marker) {
          return (
            <>
              <Image width={25} src={marker} preview={false} />
              <Text>{deliveryTypeMap[record.deliveryType][langKey]}</Text>
            </>
          );
        }

        return null;
      },
    },
    {
      title: t('PRICE'),
      key: 'totalPrice',
      width: 50,
      fixed: 'left',
      render: record => `${record.totalPrice && record.totalPrice.toFixed(2)} ₺`,
    },
    {
      title: t('CLIENT'),
      dataIndex: 'client',
      width: 30,
      key: 'client',
      fixed: 'left',
      render: client => {
        const checkedOrganicOrderCount = get(client, 'organicOrderCount', 0);
        const checkedPromoOrderCount = get(client, 'promoOrderCount', 0);
        const clientName = get(client, 'name', '');
        const clientId = get(client, 'id', '');
        let textVal = <Text strong>{clientName}</Text>;
        if (checkedOrganicOrderCount > checkedPromoOrderCount * 3) {
          textVal = (
            <Text strong type="success">
              {clientName}
            </Text>
          );
        }

        if (checkedOrganicOrderCount > 0 && checkedPromoOrderCount > checkedOrganicOrderCount * 3) {
          textVal = (
            <Text strong type="danger">
              {clientName}
            </Text>
          );
        }

        if (checkedOrganicOrderCount === 0 && checkedPromoOrderCount > 0) {
          textVal = (
            <Text strong color="#820014">
              {clientName}
            </Text>
          );
        }

        return (
          hasAccessToClientDetailPage ? (
            <Button onClick={() => history.push(`/client/detail/${clientId}`)} type="link">
              {textVal}
            </Button>
          )
            : textVal
        );
      },
    },
    {
      title: t('RESTAURANT'),
      dataIndex: 'restaurant',
      key: 'restaurant',
      width: 30,
      fixed: 'left',
      render: ({ _id, name } = {}) => {
        if (!name) {
          return null;
        }
        return (
          <a target="_blank" href={`${FOOD_RESTAURANT_PANEL}/r/${_id}/dashboard`} rel="noreferrer">
            <Text strong>{name}</Text>
          </a>
        );
      },
    },
    {
      title: t('PLATFORM'),
      dataIndex: 'deviceInfo',
      key: 'deviceInfo',
      width: 40,
      render: deviceInfo => {
        if (deviceInfo) {
          const platformKey = deviceInfo.deviceType === PLATFORM_TYPE.WEB
            ? orderPlatformTypes.web
            : orderPlatformTypes.mobile;

          return <Text>{platformKey[langKey]}</Text>;
        }
        return '';
      },
    },
    {
      title: t('CITY'),
      dataIndex: 'cityId',
      key: 'cityId',
      width: 30,
      render: cityId => {
        if (cityId) {
          const city = find(cities, { _id: cityId });
          if (city) {
            return <Text strong>{city?.name[langKey]}</Text>;
          }
        }
        return '';
      },
    },
    {
      title: t('COURIER'),
      dataIndex: 'courier',
      key: 'courier',
      width: 30,
      render: courier => {
        const courierName = get(courier, 'name', '');
        const courierId = get(courier, 'id', '');

        return (
          <a
            target="_blank"
            href={courierId !== '' ? `/courier/detail/${courierId}` : `${courier}`}
            rel="noreferrer"
          >
            <Text strong>{courierName}</Text>
          </a>
        );
      },
    },
    {
      title: t('CHECKOUT_DATE'),
      key: 'checkoutDate',
      width: 30,
      render: ({ checkoutDate, status }) => {
        if ([FOOD_ORDER_STATUS.BROWSING, FOOD_ORDER_STATUS.ABORTED].includes(status)) {
          return '';
        }

        return (
          <Tooltip title={checkoutDate} color="#000000" key="#000000">
            <Text>{moment.tz(checkoutDate, dataTimeZone).format('DD/MM/YYYY HH:mm')}</Text>
          </Tooltip>
        );
      },
    },
    {
      title: t('STATUS'),
      dataIndex: 'status',
      key: 'status',
      width: 50,
      render: status => {
        return (
          <Tag color={orderStatusColorMap[getOrderStatus(status)]}>
            {foodOrderStatuses[status][langKey]}
          </Tag>
        );
      },
    },
    {
      title: t('CANCEL_REASON'),
      dataIndex: 'cancelReason',
      key: 'cancel_reason',
      width: 140,
      render: cancelReason => {
        if (cancelReason) {
          return <Text>{cancelReason.messages[langKey]}</Text>;
        }

        return '';
      },
    },
    {
      title: t('ACTIONS'),
      key: 'action',
      width: 100,
      fixed: 'right',
      render: order => {
        let url = `/foodOrder/detail/${order._id}`;

        if (order.isBasket) {
          url = `/baskets/detail/${order._id}`;
        }

        return (
          <NavLink to={url}>
            <Button type="button">{t('DETAILS')}</Button>
          </NavLink>
        );
      },
    },
  ];
};

export const searchSelectOption = ({ inputValue, option }) => option.key.toLowerCase().includes(inputValue?.toLowerCase());
