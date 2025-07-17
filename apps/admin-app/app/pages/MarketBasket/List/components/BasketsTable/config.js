import { Link } from 'react-router-dom';
import { GlobalOutlined, MobileOutlined } from '@ant-design/icons';

import { ROUTE } from '@app/routes';
import permKey from '@shared/shared/permKey.json';
import { getLangKey } from '@shared/i18n';
import { marketBasketStatuses } from '@shared/shared/constantValues';
import { Tag } from '@shared/components/GUI';
import { basketStatusColorCodes } from '../../../constants';
import { formatDate } from '@shared/utils/dateHelper';
import RedirectButtonV2 from '@shared/components/UI/RedirectButtonV2';
import { maskText } from './utils';

export const getTableColumns = (t, canAccess) => [
  {
    title: t('orderFilterPage:CLIENT'),
    dataIndex: 'client',
    render: ({ name, id }) => {
      const clientPath = ROUTE.CLIENT_DETAIL.path.replace(':id', id);
      return (
        <Link
          to={canAccess(permKey.PAGE_CLIENT_DETAIL) ? clientPath : '#'}
          target="_blank"
        >
          {name}
        </Link>
      );
    },
  },
  {
    title: t('orderFilterPage:STORE'),
    dataIndex: 'warehouse',
    render: ({ name, id }) => {
      const warehousePath = ROUTE.WAREHOUSE_DETAIL.path.replace(':id', id);
      return (
        <Link
          to={canAccess(permKey.PAGE_WAREHOUSE_DETAIL) ? warehousePath : '#'}
          target="_blank"
        >
          {name}
        </Link>
      );
    },
  },
  { title: t('global:AMOUNT'), dataIndex: 'totalPriceText' },
  {
    title: t('DEVICE_TYPE'),
    dataIndex: 'deviceType',
    render: deviceType => {
      return (
        <Tag color="default">
          {deviceType?.toLowerCase() === 'web' ? (
            <GlobalOutlined />
          ) : (
            <MobileOutlined />
          )}
          <span className="ml-1">
            {deviceType}
          </span>
        </Tag>
      );
    },
  },
  {
    title: t('orderFilterPage:CLIENT_ID'),
    dataIndex: 'client',
    render: ({ id }) => {
      const clientIdPath = ROUTE.CLIENT_DETAIL.path.replace(':id', id);

      return (
        canAccess(permKey.PAGE_CLIENT_DETAIL) ? (
          <Link
            to={clientIdPath}
            target="_blank"
          >
            {maskText({ text: id })}
          </Link>
        ) : (
          <>
            {maskText({ text: id })}
          </>
        )
      );
    },
  },
  {
    title: t('global:CREATION_DATE'),
    dataIndex: 'createdAt',
    render: createdAt => formatDate(createdAt),
  },
  {
    title: t('global:STATUS'),
    dataIndex: 'status',
    render: status => {
      const color = basketStatusColorCodes?.[status] || 'default';
      return (
        <Tag
          className="py-1"
          color={color}
        >
          {marketBasketStatuses?.[status]?.[getLangKey()]}
        </Tag>
      );
    },
  },
  {
    title: t('global:ACTION'),
    render: ({ id }) => {
      const basketDetailsUrl = ROUTE.MARKET_BASKET_DETAIL.path.replace(
        ':basketId',
        id,
      );
      return (
        <RedirectButtonV2
          text={t('global:DETAIL')}
          to={basketDetailsUrl}
          permKey={permKey.PAGE_MARKET_BASKET_DETAIL}
          data-testid="market-basket-detail-link"
          size="small"
          type="primary"
        />
      );
    },
  },
];
