import { Button, Tag, Typography, Tooltip } from 'antd';
import { get as _get, isNumber as _isNumber } from 'lodash';
import moment from 'moment-timezone';

import { currency, formatNumber } from '@shared/utils/common';
import { getLangKey, t } from '@shared/i18n';
import { ROUTE } from '@app/routes';
import { ENVIRONMENT } from '@shared/config';
import { PLATFORM_TYPES } from '@shared/shared/constants';
import {
  makeTotalsCalculator,
  CALCULATION_AREA,
  getCityNameById,
  getPaymentMethodById,
} from './utils';
import permKey from '@shared/shared/permKey.json';
import {
  orderPlatformTypes,
  localsOrderStatuses,
} from '@shared/shared/constantValues';
import RedirectText from '@shared/components/UI/RedirectText';
import { DELIVERY_TYPE_COLOR_MAP } from '@app/pages/ArtisanOrder/constants';

const traPrefix = 'artisanOrderActivePage:DATA_TABLE';
const { Text } = Typography;

export const generateColumns = ({ cities, dataTimeZone, arrangedTotal }) => {
  const makeCalc = makeTotalsCalculator(arrangedTotal);
  const titleG10 = `${t(`${traPrefix}:G10`)} (${makeCalc(CALCULATION_AREA.G10)})`;
  const titleGL = `${t(`${traPrefix}:GL`)} (${makeCalc(CALCULATION_AREA.GL)})`;
  const titlePromo = `${t(`${traPrefix}:PROMO`)} ${makeCalc(CALCULATION_AREA.PROMO)}%`;
  const titleLocalsOrder = `${t(`${traPrefix}:LOCALS_ORDER`)} (${makeCalc(CALCULATION_AREA.LOCAL_ORDER)})`;
  const titleBskt = `${t(`${traPrefix}:BASKET`)} (${makeCalc(CALCULATION_AREA.BSKT)})`;
  const titleChrg = `${t(`${traPrefix}:CHARGE`)} (${makeCalc(CALCULATION_AREA.CHRG)})`;

  const rules = [
    {
      title: '#',
      width: 20,
      fixed: 'left',
      render: record => {
        const { courier, deliveryType } = record ?? {};

        if (!deliveryType) {
          return null;
        }

        return (
          <Tooltip title={t(`global:COURIER_TYPES.${courier?.courierType}`)}>
            <Tag color={DELIVERY_TYPE_COLOR_MAP[deliveryType]}>{t(`global:LOCALS_DELIVERY_TYPES.IN_SHORT.${deliveryType}`)}</Tag>
          </Tooltip>
        );
      },
    },
    {
      title: titleG10,
      dataIndex: 'client',
      key: 'client',
      width: 50,
      fixed: 'left',
      render: client => {
        const checkedSucOrderCount = _get(client, 'sucOrderCount', 0);
        return checkedSucOrderCount;
      },
    },
    {
      title: titleGL,
      dataIndex: 'client',
      key: 'client',
      width: 40,
      fixed: 'left',
      render: client => {
        const checkedSucArtisanOrderCount = _get(client, 'sucArtisanOrderCount', 0);
        return checkedSucArtisanOrderCount + 1;
      },
    },
    {
      title: titlePromo,
      dataIndex: 'promo',
      key: 'promo',
      width: 50,
      fixed: 'left',
      sorter: (a, b) => {
        return _get(a.promo, 'promoCode', '').localeCompare(_get(b.promo, 'promoCode', ''));
      },
      render: promo => {
        const backgroundPromo = _get(promo, 'bgColor', '#4CAF50');
        const codePromo = _get(promo, 'promoCode', null);
        if (codePromo) {
          return (
            <Tag color={backgroundPromo}>{codePromo}</Tag>
          );
        }
        return '';
      },
    },
    {
      title: t(`${traPrefix}:LOCALS`),
      dataIndex: 'shop',
      key: 'shop',
      width: 30,
      fixed: 'left',
      align: 'left',
      sorter: (a, b) => _get(a.shop, 'name', '').localeCompare(_get(b.shop, 'name', '')),
      render: ({ _id, name } = {}) => {
        return (
          <a target="_blank" href={`${ENVIRONMENT.REACT_APP_LOCALS_PANEL_URL}/${_id}`} rel="noreferrer">
            <Text strong>{name}</Text>
          </a>
        );
      },
    },
    {
      title: t(`${traPrefix}:CITY`),
      dataIndex: 'cityId',
      key: 'cityId',
      width: 30,
      sorter: (a, b) => getCityNameById(cities, a.cityId).localeCompare(getCityNameById(cities, b.cityId)),
      render: cityId => {
        if (cityId) {
          return (
            <Text strong>{getCityNameById(cities, cityId)}</Text>
          );
        }
        return '';
      },

    },
    {
      title: titleLocalsOrder,
      dataIndex: 'shopTotalArtisanOrderCount',
      key: 'shopTotalArtisanOrderCount',
      width: 30,
      render: totalCount => {
        return totalCount || 0;
      },
    },
    {
      title: titleBskt,
      dataIndex: 'totalPrice',
      key: 'totalPrice',
      width: 80,
      render: totalPrice => {
        const displayPrice = _isNumber(totalPrice) && `${formatNumber(totalPrice)} ${currency()}`;

        return (
          <Text strong>{displayPrice}</Text>
        );
      },
    },
    {
      title: titleChrg,
      dataIndex: 'totalChargedAmount',
      key: 'totalChargedAmount',
      width: 80,
      render: charged => {
        const displayCharged = _isNumber(charged) && `${formatNumber(charged)} ${currency()}`;
        return (
          <Text strong>{displayCharged}</Text>
        );
      },
    },
    {
      title: t(`${traPrefix}:TIME`),
      dataIndex: 'checkoutDate',
      key: 'checkoutDate',
      width: 30,
      sorter: (a, b) => {
        return (
          moment(a.checkoutDate).unix() - moment(b.checkoutDate).unix()
        );
      },
      defaultSortOrder: 'descend',
      render: checkoutDate => {
        return (
          <Tooltip title={checkoutDate} color="#000000" key="#000000">
            <Text>{moment.tz(checkoutDate, dataTimeZone).format('HH:mm')}</Text>
          </Tooltip>

        );
      },
    },
    {
      title: t(`${traPrefix}:CUSTOMER`),
      dataIndex: 'client',
      width: 30,
      key: 'client',
      sorter: (a, b) => _get(a.client, 'name', '').localeCompare(_get(b.client, 'name', '')),
      render: client => {
        const checkedOrganicOrderCount = _get(client, 'organicOrderCount', 0);
        const checkedPromoOrderCount = _get(client, 'promoOrderCount', 0);
        const clientName = _get(client, 'name', '');
        const clientId = _get(client, '_id', '');
        let textVal = <Text strong>{clientName}</Text>;
        if (checkedOrganicOrderCount > (checkedPromoOrderCount * 3)) {
          textVal = <Text strong type="success">{clientName}</Text>;
        }

        if (checkedOrganicOrderCount > 0 && checkedPromoOrderCount > (checkedOrganicOrderCount * 3)) {
          textVal = <Text strong type="danger">{clientName}</Text>;
        }

        if (checkedOrganicOrderCount === 0 && checkedPromoOrderCount > 0) {
          textVal = <Text strong color="#820014">{clientName}</Text>;
        }

        return (
          <RedirectText
            text={textVal}
            to={(clientId !== '') ?
              `/client/detail/${clientId}` :
              `${clientName}`}
            permKey={permKey.PAGE_CLIENT_DETAIL}
            target="_blank"
          />
        );
      },
    },
    {
      title: t(`${traPrefix}:GATE`),
      dataIndex: 'dropOffAtDoor',
      key: 'dropOffAtDoor',
      width: 30,
      render: dropOffAtDoor => {
        const dropOffDesc = (dropOffAtDoor) ?
          t(`${traPrefix}:STRINGS.DROP_OFF_AT_DOOR.YES`) :
          t(`${traPrefix}:STRINGS.DROP_OFF_AT_DOOR.NO`);

        return (
          <Text>{dropOffDesc}</Text>
        );
      },
    },
    {
      title: t(`${traPrefix}:COURIER`),
      dataIndex: 'courier',
      key: 'courier',
      width: 30,
      sorter: (a, b) => _get(a.courier, 'name', '').localeCompare(_get(b.courier, 'name', '')),
      render: (courier, order) => {
        const courierName = _get(courier, 'name', '');
        const courierId = _get(courier, 'id', '');

        if (order?.assignmentType && !order?.courierVerifyAfterCheckoutDate) {
          return <Text>{courierName}</Text>;
        }
        return (
          <RedirectText
            text={courierName}
            to={(courierId !== '') ?
              `/courier/detail/${courierId}` :
              `${courier}`}
            permKey={permKey.PAGE_COURIER_DETAIL}
            target="_blank"
          />
        );
      },
    },
    {
      title: t(`${traPrefix}:PAYMENT_METHOD`),
      dataIndex: 'paymentInfo',
      key: 'paymentInfo',
      width: 80,
      sorter: (a, b) => getPaymentMethodById(a.paymentInfo?.paymentMethod).localeCompare(getPaymentMethodById(b.paymentInfo?.paymentMethod)),
      render: paymentInfo => {
        if (paymentInfo) {
          return (
            <Text>{getPaymentMethodById(paymentInfo?.paymentMethod)}</Text>
          );
        }
        return '';
      },
    },
    {
      title: t(`${traPrefix}:PLATFORM`),
      dataIndex: 'deviceInfo',
      key: 'deviceInfo',
      width: 40,
      render: deviceInfo => {
        if (deviceInfo) {
          const platformKey = (deviceInfo.deviceType === PLATFORM_TYPES[0]) ?
            orderPlatformTypes.web :
            orderPlatformTypes.mobile;

          return (
            <Text>{(platformKey === orderPlatformTypes.web) ? 'W' : 'M'}</Text>
          );
        }
        return '';
      },
    },
    {
      title: t(`${traPrefix}:STATUS`),
      dataIndex: 'status',
      key: 'status',
      width: 50,
      fixed: 'right',
      sorter: (a, b) => a.status - b.status,
      defaultSortOrder: 'descend',
      render: (status, order) => {
        return (
          order?.isInQueue ?
            <Text>{t('global:ORDER_IN_QUEUE')}</Text> :
            <Text>{localsOrderStatuses[status]?.[getLangKey()]}</Text>
        );
      },
    },
    {
      title: t(`${traPrefix}:LAST`),
      dataIndex: 'orderExtraProps',
      width: 40,
      fixed: 'right',
      sorter: (a, b) => a.orderExtraProps.lastActivityDiff - b.orderExtraProps.lastActivityDiff,
      defaultSortOrder: 'descend',
      render: ({ isRed, lastActivityDiffStr }) => {
        return (
          isRed ?
            <Tag color="volcano">{lastActivityDiffStr}</Tag>
            :
            <Text strong>{lastActivityDiffStr}</Text>
        );
      },
    },
    {
      title: t(`${traPrefix}:LAST_COURIER_ACTIVITY_DIFF_SHORT`),
      dataIndex: 'orderExtraProps',
      width: 40,
      fixed: 'right',
      sorter: (a, b) => a.orderExtraProps.courierLastActivityDiff - b.orderExtraProps.courierLastActivityDiff,
      defaultSortOrder: 'descend',
      render: ({ isRedCourierLAct, courierLastActivityDiffStr }) => {
        return (
          isRedCourierLAct ?
            <Tag color="volcano">{courierLastActivityDiffStr}</Tag>
            :
            <Text strong>{courierLastActivityDiffStr}</Text>
        );
      },
    },
    {
      title: t(`${traPrefix}:SUM`),
      dataIndex: 'orderExtraProps',
      key: 'orderExtraProps',
      width: 50,
      fixed: 'right',
      sorter: (a, b) => a.orderExtraProps.totalTimeDiff - b.orderExtraProps.totalTimeDiff,
      defaultSortOrder: 'descend',
      render: ({ totalTimeDiffStr }) => {
        return (
          <Text strong>{totalTimeDiffStr}</Text>
        );
      },
    },
    {
      title: t('global:ACTION'),
      width: 40,
      fixed: 'right',
      render: record => {
        const orderId = _get(record, '_id', '');

        const { path } = ROUTE.ARTISAN_ORDER_DETAIL;
        const detailPageUrl = path.replace(':orderDetailId', orderId);

        return (
          <Button
            key={orderId}
            type="default"
            size="small"
            variant="contained"
            target="_blank"
            href={`${detailPageUrl}`}
          >
            <Text>{t('global:DETAIL')}</Text>
          </Button>
        );
      },
    },
  ];

  return rules;
};
