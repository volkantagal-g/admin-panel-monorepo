import { Button, Typography, Tooltip, Tag } from 'antd';
import moment from 'moment-timezone';
import _ from 'lodash';
import { Link } from 'react-router-dom';

import { getLangKey } from '@shared/i18n';
import { currency, normalizeNumber } from '@shared/utils/common';
import { waterOrderPaymentMethods, waterOrderStatuses } from '@shared/shared/constantValues';
import { ROUTE } from '@app/routes';
import permKey from '@shared/shared/permKey.json';
import { MOBILE_WIDTH_IN_PX } from '@shared/shared/constants';

import { makeTotalsCalculator } from './utils';

const { Text } = Typography;
const traPrefix = 'waterOrderActivePage:DATA_TABLE';

const dateFormat = 'DD MM YYYY, HH:mm:ss';

export const generateColumns = (dataTimeZone, activeOrders, Can, t, width) => {
  const isMobileWidth = width < MOBILE_WIDTH_IN_PX;
  const makeCalc = makeTotalsCalculator(activeOrders);
  const titleG10 = `${t(`${traPrefix}:G10`)} (${makeCalc.totalG10Count})`;
  const titleGSU = `${t(`${traPrefix}:GSU`)} (${makeCalc.totalGWCount})`;
  const titleKuzeyden = `${t(`${traPrefix}:KUZEYDEN`)} (${makeCalc.kuzeydenOrderCount})`;
  const titlePromo = `${t(`${traPrefix}:PROMOTION`)} ${makeCalc.totalPromoCount}%`;
  const titleVendorOrders = `${t(`${traPrefix}:VENDORS_ORDERS`)} (${makeCalc.totalVendorOrderCount})`;
  const titleBskt = `${t(`${traPrefix}:BASKET`)} (${makeCalc.totalBasket()})`;
  const titleChrg = `${t(`${traPrefix}:CHARGED_AMOUNT`)} (${makeCalc.totalCharged()})`;
  const orderNo = t(`${traPrefix}:ORDER_NO`);

  const columns = [
    {
      title: orderNo,
      dataIndex: 'orderNumber',
      key: 'orderNumber',
    },
    {
      title: titleG10,
      dataIndex: 'g10OrderCount',
      key: 'g10OrderCount',
    },
    {
      title: titleGSU,
      dataIndex: 'gsuOrderCount',
      key: 'gsuOrderCount',
    },
    {
      title: titleKuzeyden,
      dataIndex: 'kuzeydenOrderCount',
      key: 'kuzeydenOrderCount',
    },
    {
      title: titlePromo,
      dataIndex: 'promoCode',
      key: 'promoCode',
      sorter: (a, b) => {
        return a.promoCode.localeCompare(b.promoCode.localeCompare);
      },
      render: promoCode => {
        if (promoCode) {
          return <Tag>{promoCode}</Tag>;
        }

        return '';
      },
    },
    {
      title: t(`${traPrefix}:BRAND`),
      dataIndex: 'brandName',
      key: 'brandName',
    },
    {
      title: t(`${traPrefix}:VENDOR`),
      dataIndex: 'vendorName',
      key: 'vendorName',
    },
    {
      title: t(`${traPrefix}:CITY`),
      dataIndex: 'cityName',
      key: 'cityName',
    },
    {
      title: titleVendorOrders,
      dataIndex: 'vendorOrderCount',
      key: 'vendorOrderCount',
    },
    {
      title: titleBskt,
      dataIndex: 'basket',
      key: 'basket',
      width: 80,
      render: basket => {
        const displayPrice = _.isNumber(basket) && `${normalizeNumber(basket)} ${currency()}`;

        return <Text strong>{displayPrice}</Text>;
      },
    },
    {
      title: titleChrg,
      dataIndex: 'chargedAmount',
      key: 'chargedAmount',
      width: 80,
      render: chargedAmount => {
        const displayCharged = _.isNumber(chargedAmount) && `${normalizeNumber(chargedAmount)} ${currency()}`;
        return <Text strong>{displayCharged}</Text>;
      },
    },
    {
      title: t(`${traPrefix}:CREATED_DATE`),
      dataIndex: 'createdAt',
      key: 'createdAt',
      defaultSortOrder: 'descend',
      sorter: (a, b) => {
        return moment(a.createdAt).unix() - moment(b.createdAt).unix();
      },
      render: createdAt => {
        return (
          <Tooltip title={moment(createdAt).format(dateFormat)} color="#000000" key="#000000">
            <Text>{moment.tz(createdAt, dataTimeZone).format('HH:mm:ss')}</Text>
          </Tooltip>
        );
      },
    },
    {
      title: t(`${traPrefix}:PAYMENT_DATE`),
      dataIndex: 'paymentDate',
      key: 'paymentDate',
      render: paymentDate => {
        return (
          <Tooltip title={moment(paymentDate).format(dateFormat)} color="#000000" key="#000000">
            <Text>{moment.tz(paymentDate, dataTimeZone).format('HH:mm:ss')}</Text>
          </Tooltip>
        );
      },
    },
    {
      title: t(`${traPrefix}:CUSTOMER_NAME`),
      dataIndex: 'customerName',
      key: 'customerName',
      width: 30,
    },
    {
      title: t(`${traPrefix}:GATE`),
      dataIndex: 'doNotKnock',
      key: 'doNotKnock',
      width: 30,
      render: doNotKnock => {
        const dropOffDesc = doNotKnock ? t(`${traPrefix}:DROP_OFF_AT_DOOR.YES`) : t(`${traPrefix}:DROP_OFF_AT_DOOR.NO`);

        return <Text>{dropOffDesc}</Text>;
      },
    },
    {
      title: t(`${traPrefix}:PAYMENT_METHOD`),
      dataIndex: 'paymentType',
      key: 'paymentType',
      render: paymentType => _.get(waterOrderPaymentMethods, [paymentType?.type, getLangKey()], ''),
    },
    {
      title: t(`${traPrefix}:STATUS`),
      dataIndex: 'orderStatus',
      key: 'orderStatus',
      width: 50,
      ...(!isMobileWidth && { fixed: 'right' }),
      sorter: (a, b) => a.orderStatus - b.orderStatus,
      defaultSortOrder: 'descend',
      render: orderStatus => waterOrderStatuses[orderStatus][getLangKey()],
    },
    {
      title: t(`${traPrefix}:LAST_STATUS`),
      dataIndex: 'timeAfterLastStatus',
      key: 'timeAfterLastStatus',
      width: 40,
      ...(!isMobileWidth && { fixed: 'right' }),
      sorter: (a, b) => a.timeAfterLastStatus - b.timeAfterLastStatus,
      defaultSortOrder: 'descend',
    },
    {
      title: t(`${traPrefix}:TOTAL_TIME`),
      dataIndex: 'totalTime',
      key: 'totalTime',
      width: 50,
      ...(!isMobileWidth && { fixed: 'right' }),
      sorter: (a, b) => a.totalTime - b.totalTime,
      defaultSortOrder: 'descend',
    },
    {
      title: t(`${traPrefix}:ACTION`),
      dataIndex: '',
      key: '',
      width: 50,
      ...(!isMobileWidth && { fixed: 'right' }),
      render: record => {
        const badgeId = _.get(record, 'orderId', '');
        const path = ROUTE.GETIR_WATER_ORDER_DETAIL.path.replace(':waterOrderId', badgeId);

        return (
          <Can permKey={permKey.PAGE_GETIR_WATER_ORDER_DETAIL}>
            <Link target="_blank" to={path}>
              <Button type="default" size="small" variant="contained">
                <Text>{t('global:DETAIL')}</Text>
              </Button>
            </Link>
          </Can>
        );
      },
    },
  ];

  return columns;
};
