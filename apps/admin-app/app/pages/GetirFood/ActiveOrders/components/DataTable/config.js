import { Button, Tag, Typography, Tooltip, Image } from 'antd';
import { get, find, isNumber, join, isEmpty } from 'lodash';
import moment from 'moment-timezone';

import history from '@shared/utils/history';
import { currency, formatNumber } from '@shared/utils/common';
import { getLangKey } from '@shared/i18n';
import { ENVIRONMENT } from '@shared/config';
import { ROUTE } from '@app/routes';
import { PLATFORM_TYPES, FOOD_PROMO_DISCOUNT_REASON } from '@shared/shared/constants';
import { makeTotalsCalculator, getOrderMarkerSrc, CALCULATION_AREA, formatPromoCode } from './utils';
import { orderPlatformTypes, foodOrderStatuses, foodOrderPaymentMethods } from '@shared/shared/constantValues';

const traPrefix = 'foodOrderActivePage:DATA_TABLE';
const { Text } = Typography;

const DEFAULT_ARGUMENTS = {
  arrangedTotal: {},
  hasAccessToClientDetailPage: false,
  t: () => null,
};

export const getActionButton = (record, t) => {
  const orderId = get(record, '_id', '');
  const { path } = ROUTE.GETIR_FOOD_ORDER_DETAIL;
  const detailPageUrl = path.replace(':orderDetailId', orderId);

  if (!orderId) {
    return null;
  }

  return (
    <Button key={orderId} type="default" size="small" variant="contained" target="_blank" href={`${detailPageUrl}`}>
      <Text>{t('global:DETAIL')}</Text>
    </Button>
  );
};

export const getRestaurantLink = ({ _id, name } = {}) => {
  if (!_id || !name) {
    return null;
  }

  return (
    <a target="_blank" href={`${ENVIRONMENT.REACT_APP_FOOD_RESTAURANT_PANEL_URL}/r/${_id}/dashboard`} rel="noreferrer">
      <Text strong>{name}</Text>
    </a>
  );
};

export const getFormattedPrice = price => {
  if (!isNumber(price)) {
    return null;
  }

  return <Text strong>{`${formatNumber(price)} ${currency()}`}</Text>;
};

export const getClientInfo = (client, hasAccessToClientDetailPage) => {
  const checkedOrganicOrderCount = get(client, 'organicOrderCount', 0);
  const checkedPromoOrderCount = get(client, 'promoOrderCount', 0);
  const clientName = get(client, 'name', '');
  const clientId = get(client, 'id', '');

  if (!clientName) {
    return null;
  }

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

  if (hasAccessToClientDetailPage) {
    textVal = (
      <Button onClick={() => history.push(`/client/detail/${clientId}`)} type="link">
        {textVal}
      </Button>
    );
  }

  return textVal;
};

export const getCourierInfo = courier => {
  const courierName = get(courier, 'name', '');
  const courierId = get(courier, 'id', '');

  const href = courierId !== '' ? `/courier/detail/${courierId}` : '#';

  return (
    <a target="_blank" href={href} rel="noreferrer">
      <Text strong>{courierName}</Text>
    </a>
  );
};

export const getOrderExtraProps = ({ isRed, lastActivityDiffStr } = {}) => {
  if (!lastActivityDiffStr) {
    return null;
  }

  return isRed ? <Tag color="volcano">{lastActivityDiffStr}</Tag> : <Text strong>{lastActivityDiffStr}</Text>;
};

export const getDeviceInfo = deviceInfo => {
  if (!deviceInfo) {
    return null;
  }

  const platformKey = deviceInfo?.deviceType === PLATFORM_TYPES[0] ? orderPlatformTypes.web : orderPlatformTypes.mobile;

  return <Text>{platformKey === orderPlatformTypes.web ? 'W' : 'M'}</Text>;
};

export const getPaymentInfo = order => {
  const additionalPaymentInfo = get(order, 'additionalPaymentInfo');
  const paymentInfo = get(order, 'paymentInfo');
  if (!paymentInfo || !foodOrderPaymentMethods[paymentInfo?.paymentMethod]) {
    return null;
  }
  const paymentMethodString = foodOrderPaymentMethods[paymentInfo?.paymentMethod][getLangKey()];
  if (!isEmpty(additionalPaymentInfo)) {
    const additionalPaymentMethodsName = additionalPaymentInfo.map(additionalPayment => {
      const additionalPaymentMethod = get(additionalPayment, 'paymentMethod', '');
      return foodOrderPaymentMethods[additionalPaymentMethod][getLangKey()];
    });
    const additionalPaymentMethodsNameString = join(additionalPaymentMethodsName, ' + ');
    return <Text>{`${paymentMethodString} + ${additionalPaymentMethodsNameString}`}</Text>;
  }
  return <Text>{paymentMethodString}</Text>;
};

export const generateColumns = (args = DEFAULT_ARGUMENTS) => {
  const { cities, dataTimeZone, arrangedTotal, hasAccessToClientDetailPage, t } = args;
  const makeCalc = makeTotalsCalculator(arrangedTotal);

  const rules = [
    {
      title: '#',
      width: 20,
      fixed: 'left',
      render: record => {
        const marker = getOrderMarkerSrc(record);

        return marker ? <Image width={25} src={marker} preview={false} /> : null;
      },
    },
    {
      title: `${t(`${traPrefix}:G10`)} (${makeCalc(CALCULATION_AREA.G10)})`,
      dataIndex: 'client',
      key: 'client',
      width: 50,
      fixed: 'left',
      render: client => get(client, 'sucOrderCount', 0),
    },
    {
      title: `${t(`${traPrefix}:GL`)} (${makeCalc(CALCULATION_AREA.GL)})`,
      dataIndex: 'client',
      key: 'client',
      width: 40,
      fixed: 'left',
      render: client => get(client, 'sucFoodOrderCount', 0) + 1,
    },
    {
      title: `${t(`${traPrefix}:PROMO`)} ${makeCalc(CALCULATION_AREA.PROMO)}%`,
      dataIndex: 'promo',
      key: 'promo',
      width: 50,
      fixed: 'left',
      sorter: (a, b) => get(a.promo, 'promoCode', '').localeCompare(get(b.promo, 'promoCode', '')),
      render: promo => {
        const backgroundPromo = get(promo, 'bgColor', '#4CAF50');
        const backgroundSubsPromo = get(promo, 'bgColor', '#5D3EBC');
        const codePromo = get(promo, 'promoCode', null);
        const discountReason = get(promo, 'discountReason', null);
        if (codePromo) {
          if (discountReason === FOOD_PROMO_DISCOUNT_REASON.SUBS) {
            return <Tag title={codePromo} color={backgroundSubsPromo}>{formatPromoCode(codePromo)}</Tag>;
          }
          return <Tag title={codePromo} color={backgroundPromo}>{formatPromoCode(codePromo)}</Tag>;
        }
        return null;
      },
    },
    {
      title: t(`${traPrefix}:RESTAURANT`),
      dataIndex: 'restaurant',
      key: 'restaurant',
      width: 30,
      fixed: 'left',
      align: 'left',
      render: getRestaurantLink,
    },
    {
      title: t(`${traPrefix}:CITY`),
      dataIndex: 'cityId',
      key: 'cityId',
      width: 30,
      render: cityId => {
        const city = find(cities, { _id: cityId });

        return (city && city.name) ? <Text strong>{city?.name[getLangKey()]}</Text> : null;
      },
    },
    {
      title: `${t(`${traPrefix}:RESTAURANT_ORDER_SHORT`)} (${makeCalc(CALCULATION_AREA.RESTAURANT_ORDER)})`,
      dataIndex: 'restaurantTotalFoodOrderCount',
      key: 'restaurantTotalFoodOrderCount',
      width: 30,
      render: totalCount => totalCount || 0,
    },
    {
      title: `${t(`${traPrefix}:BASKET_SHORT`)} (${makeCalc(CALCULATION_AREA.BSKT)})`,
      dataIndex: 'totalPrice',
      key: 'totalPrice',
      width: 80,
      render: getFormattedPrice,
    },
    {
      title: `${t(`${traPrefix}:CHARGE_SHORT`)} (${makeCalc(CALCULATION_AREA.CHRG)})`,
      dataIndex: 'totalChargedAmount',
      key: 'totalChargedAmount',
      width: 80,
      render: getFormattedPrice,
    },
    {
      title: t(`${traPrefix}:TIME`),
      dataIndex: 'checkoutDate',
      key: 'checkoutDate',
      width: 30,
      defaultSortOrder: 'descend',
      sorter: (a, b) => moment(a.checkoutDate).unix() - moment(b.checkoutDate).unix(),
      render: checkoutDate => (
        <Tooltip title={checkoutDate} color="#000000" key="#000000">
          <Text>{moment.tz(checkoutDate, dataTimeZone).format('HH:mm')}</Text>
        </Tooltip>
      ),
    },
    {
      title: t(`${traPrefix}:CUSTOMER`),
      dataIndex: 'client',
      width: 30,
      key: 'client',
      render: client => getClientInfo(client, hasAccessToClientDetailPage),
    },
    {
      title: t(`${traPrefix}:GATE`),
      dataIndex: 'dropOffAtDoor',
      key: 'dropOffAtDoor',
      width: 30,
      render: dropOffAtDoor => {
        const dropOffDesc = dropOffAtDoor ? t(`${traPrefix}:STRINGS.DROP_OFF_AT_DOOR.YES`) : t(`${traPrefix}:STRINGS.DROP_OFF_AT_DOOR.NO`);

        return <Text>{dropOffDesc}</Text>;
      },
    },
    {
      title: t(`${traPrefix}:COURIER`),
      dataIndex: 'courier',
      key: 'courier',
      width: 30,
      render: getCourierInfo,
    },
    {
      title: t(`${traPrefix}:PAYMENT_METHOD`),
      key: 'paymentInfo',
      width: 80,
      defaultSortOrder: 'descend',
      sorter: (a, b) => get(a, 'paymentInfo.paymentMethod', '') - get(b, 'paymentInfo.paymentMethod', ''),
      render: getPaymentInfo,
    },
    {
      title: t(`${traPrefix}:PLATFORM_SHORT`),
      dataIndex: 'deviceInfo',
      key: 'deviceInfo',
      width: 40,
      render: getDeviceInfo,
    },
    {
      title: t(`${traPrefix}:QUEUE_INFO`),
      dataIndex: 'isQueued',
      key: 'isQueued',
      width: 40,
      render: isQueued => {
        return isQueued ? <Text>{t('DATA_TABLE.QUEUED')}</Text> : <Text>{t('DATA_TABLE.NOT_QUEUED')}</Text>;
      },
    },
    {
      title: t(`${traPrefix}:STATUS`),
      dataIndex: 'status',
      key: 'status',
      width: 50,
      fixed: 'right',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.status - b.status,
      render: status => {
        return status ? <Text>{foodOrderStatuses[status][getLangKey()]}</Text> : null;
      },
    },
    {
      title: t(`${traPrefix}:LAST_ACT_SHORT`),
      dataIndex: 'orderExtraProps',
      width: 40,
      fixed: 'right',
      defaultSortOrder: 'descend',
      sorter: (a, b) => get(a, 'orderExtraProps.lastActivityDiff', 0) - get(b, 'orderExtraProps.lastActivityDiff', 0),
      render: getOrderExtraProps,
    },
    {
      title: t(`${traPrefix}:SUM`),
      dataIndex: 'orderExtraProps',
      key: 'orderExtraProps',
      width: 50,
      fixed: 'right',
      defaultSortOrder: 'descend',
      sorter: (a, b) => get(a, 'orderExtraProps.totalTimeDiff', 0) - get(b, 'orderExtraProps.totalTimeDiff', 0),
      render: ({ totalTimeDiffStr } = {}) => <Text strong>{totalTimeDiffStr}</Text>,
    },
    {
      title: t('global:ACTION'),
      width: 40,
      fixed: 'right',
      render: render => getActionButton(render, t),
    },
  ];

  return rules;
};
