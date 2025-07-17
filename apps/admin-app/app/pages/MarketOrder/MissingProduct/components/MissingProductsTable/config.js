import { Space } from 'antd';
import moment from 'moment-timezone';
import { Link } from 'react-router-dom';
import { CustomerServiceFilled, PhoneOutlined } from '@ant-design/icons';

import { getLangKey } from '@shared/i18n';
import { domainTypes, marketOrderStatuses } from '@shared/shared/constantValues';
import { formatDate } from '@shared/utils/dateHelper';
import { ROUTE } from '@app/routes';
import permKey from '@shared/shared/permKey.json';
import { GETIR_MARKET_ORDER } from '@shared/shared/constants';
import { Button } from '@shared/components/GUI';

export const getTableColumns = (
  t,
  canAccess,
  onAddMhProblem,
  onOpenDetailModal,
) => [
  {
    title: 'ID',
    width: 200,
    render: ({ _id, domainType }) => {
      const orderDetailPath = ROUTE.GETIR_MARKET_ORDER_DETAIL.path.replace(
        ':orderId',
        _id,
      );
      return (
        <Link
          to={
            canAccess(permKey.PAGE_GETIR_MARKET_ORDER_DETAIL) &&
            `${orderDetailPath}?domainType=${domainType}`
          }
        >
          {_id}
        </Link>
      );
    },
  },
  {
    title: t('DOMAIN'),
    dataIndex: 'domainType',
    render: domainType => domainTypes[domainType]?.[getLangKey()],
  },
  {
    title: t('CLIENT_NAME'),
    dataIndex: 'clientName',
  },
  {
    title: t('PHONE_NUMBER'),
    dataIndex: 'gsm',
  },
  {
    title: t('WAREHOUSE'),
    dataIndex: 'warehouseName',
  },
  {
    title: t('ARRIVAL_DATE_TIME'),
    dataIndex: 'enteredAt',
    sorter: (a, b) => moment(a.enteredAt).valueOf() - moment(b.enteredAt).valueOf(),
    defaultSortOrder: 'descend',
    render: date => formatDate(date),
  },
  {
    title: t('BASKET_AMOUNT'),
    dataIndex: 'basketAmount',
  },
  {
    title: t('MISSING_PRODUCT_AMOUNT'),
    dataIndex: 'missingProductAmount',
    sorter: (a, b) => (a || 0) - (b || 0),
  },
  {
    title: t('INTERESTED_USER'),
    dataIndex: 'mhProblem',
    render: mhProblem => mhProblem?.adminUser?.name,
  },
  {
    title: t('WAIT_TIME'),
    dataIndex: 'waitTime',
  },
  {
    title: t('global:STATUS'),
    dataIndex: 'status',
    sorter: (a, b) => a.status - b.status,
    render: status => marketOrderStatuses[status]?.[getLangKey()],
  },
  {
    title: t('global:ACTION'),
    render: ({ _id, mhProblem }) => {
      const canAddMhProblem = canAccess(permKey.PAGE_MISSING_PRODUCT_ORDERS_ADD_MH_PROBLEM);
      return (
        <Space align="baseline">
          <Button size="extra-small" onClick={() => onOpenDetailModal(_id)}>
            {t('global:DETAIL')}
          </Button>
          {!mhProblem?.status && (
            <PhoneOutlined onClick={canAddMhProblem ? () => onAddMhProblem(_id) : null} />
          )}
          {mhProblem?.status ===
            GETIR_MARKET_ORDER.MH.PROBLEMS.STATUS.ACTIVE && (
            <CustomerServiceFilled title={mhProblem?.adminUser?.name} />
          )}
        </Space>
      );
    },
  },
];
