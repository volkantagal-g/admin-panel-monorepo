/* eslint-disable no-inline-styles/no-inline-styles */
import { NavLink } from 'react-router-dom';

import { Button, Tag } from 'antd';
import moment from 'moment';

import { formatDate } from '@shared/utils/dateHelper';

import { ENVIRONMENT } from '@shared/config';
import Constants from '@shared/utils/commonConstants';
import { getLangKey } from '@shared/i18n';
import { localsOrderStatuses } from '@shared/shared/constantValues';
import RedirectText from '@shared/components/UI/RedirectText';
import permKey from '@shared/shared/permKey.json';
import { DELIVERY_TYPE_COLOR_MAP } from '@app/pages/ArtisanOrder/constants';

const { REACT_APP_LOCALS_PANEL_URL: LOCALS_URL } = ENVIRONMENT;

const orderStatusColorMap = {
  success: 'green',
  active: 'orange',
  cancelled: 'red',
  incomplete: 'magenta',
};

const getOrderStatus = status => {
  switch (true) {
    case status >= Constants.ARTISAN_ORDER_STATUS.DELIVERED && status <= Constants.ARTISAN_ORDER_STATUS.RATED:
      return 'success';
    case status >= Constants.ARTISAN_ORDER_STATUS.INCOMPLETE && status <= Constants.ARTISAN_ORDER_STATUS.ABORTED:
      return 'incomplete';
    case status >= Constants.ARTISAN_ORDER_STATUS.CANCELED_ADMIN && status <= Constants.ARTISAN_ORDER_STATUS.CANCELED_SHOP:
      return 'cancelled';
    default:
      return 'active';
  }
};

export const generateArtisanTableColumns = t => {
  const langKey = getLangKey();
  return [
    {
      title: t('ORDER'),
      key: 'order_no',
      width: 90,
      fixed: 'left',
      render: order => (
        <>
          <Tag color={DELIVERY_TYPE_COLOR_MAP[order.delivery_type]}>
            {t(`global:LOCALS_DELIVERY_TYPES.IN_SHORT.${[order.delivery_type]}`)}
          </Tag>
          &nbsp;{order.order_no}
        </>
      ),
    },
    {
      title: t('CONFIRMATION_CODE'),
      dataIndex: 'confirmation_code',
      key: 'confirmation_code',
      width: 80,
    },
    {
      title: t('PRICE'),
      key: 'price',
      width: 100,
      render: order => `${order.price && order.price.toFixed(2)} ₺`,
    },
    {
      title: t('CLIENT'),
      key: 'client',
      width: 100,
      render: order => (
        <RedirectText
          text={order.client}
          to={`/client/detail/${order.client_id}`}
          permKey={permKey.PAGE_CLIENT_DETAIL}
          target="_blank"
        />
      ),
    },
    {
      title: t('ARTISAN'),
      key: 'artisan',
      width: 120,
      render: order => (
        <a target="_blank" href={`${LOCALS_URL}/${order.artisan_id}`} rel="noreferrer">
          {order.artisan}
        </a>
      ),
    },
    {
      title: t('PLATFORM'),
      dataIndex: 'platform',
      key: 'platform',
      width: 100,
    },
    {
      title: t('global:CITY'),
      dataIndex: 'city',
      key: 'city',
      width: 120,
    },
    {
      title: t('STORE'),
      dataIndex: 'warehouse',
      key: 'warehouse',
      width: 100,
    },
    {
      title: t('COURIER'),
      key: 'courier',
      width: 120,
      render: order => (
        <RedirectText
          text={order.courier}
          to={`/courier/detail/${order.courier_id}`}
          permKey={permKey.PAGE_COURIER_DETAIL}
          target="_blank"
        />
      ),
    },
    {
      title: t('CHECKOUT_DATE'),
      key: 'checkout_date',
      width: 100,
      sorter: { compare: (a, b) => moment(a.checkout_date).unix() - moment(b.checkout_date).unix() },
      render: order => formatDate(order.checkout_date),
    },
    {
      title: t('STATUS'),
      key: 'status',
      width: 140,
      fixed: 'right',
      sorter: { compare: (a, b) => a.status - b.status },
      render: order => <Tag color={orderStatusColorMap[getOrderStatus(order.status)]}>{localsOrderStatuses[order.status][langKey]}</Tag>,
    },
    {
      title: t('CANCEL_REASON'),
      dataIndex: 'cancel_reason',
      key: 'cancel_reason',
      width: 140,
      fixed: 'right',
    },
    {
      title: t('ACTIONS'),
      key: 'action',
      width: 100,
      fixed: 'right',
      render: order => (
        <NavLink to={`/artisanOrder/detail/${order._id}`}>
          <Button type="button">{t('DETAILS')}</Button>
        </NavLink>
      ),
    },
  ];
};
