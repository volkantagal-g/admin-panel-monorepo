import moment from 'moment';

import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

import { getLocalDateFormat, getLocalDateTimeFormat } from '@shared/utils/localization';
import { getirMarketDomainTypes } from '@app/pages/MarketProduct/constantValues';
import { Button, Tag } from '@shared/components/GUI';
import { getLangKey } from '@shared/i18n';
import { SELLING_PRICE_TYPE_NAMES } from '@app/pages/MarketProduct/DetailV2/components/PricingInfo/constants';
import { priceFormatter } from '@app/pages/MarketProduct/utils';
import permKey from '@shared/shared/permKey.json';
import useStyles from './styles';

export const useColumnsForNormalProduct = ({ t, canAccess, warehouses, handleOpenDrawer, handleDelete }) => {
  const classes = useStyles();
  return [
    {
      title: t('CREATED_AT'),
      key: 'createdAt',
      render: ({ createdAt }) => (createdAt ? `${moment(createdAt).format(getLocalDateFormat())} ` : '-'),

    },
    {
      title: t('DATE_RANGE'),
      key: 'dateRange ',
      render: ({ startDate, endDate }) => startDate && endDate &&
      `${moment(startDate).format(getLocalDateTimeFormat())} - ${moment(endDate).format(getLocalDateTimeFormat())}`,
    },
    {
      title: t('WAREHOUSE'),
      key: 'warehouseId',
      render: ({ warehouseId }) => (warehouseId ? warehouses?.find(warehouse => warehouse?._id === warehouseId)?.name : '-'),
    },
    {
      title: t('DOMAIN'),
      key: 'domain',
      render: ({ domainType }) => domainType && <Tag color="secondary">{getirMarketDomainTypes?.[domainType]?.[getLangKey()]}</Tag>,
    },
    {
      title: t('PRICE_TYPE'),
      key: 'priceTypeId',
      render: ({ priceTypeId }) => {
        const type = SELLING_PRICE_TYPE_NAMES?.[priceTypeId]?.[getLangKey()];
        return type;
      },
    },
    {
      title: t('DISCOUNTED'),
      key: 'isDiscounted',
      dataIndex: 'isDiscounted',
      render: isDiscounted => (isDiscounted === true ? t('YES') : t('NO')),
    },
    {
      title: t('PRICE'),
      render: record => (priceFormatter(record?.price)),
      key: 'price',
    },
    {
      title: t('ACTIONS'),
      key: 'action',
      fixed: 'right',
      render: record => {
        if (!canAccess(permKey.PAGE_MARKET_PRODUCT_DETAIL_COMPONENT_FIELD_EDIT)) {
          return null;
        }
        return (
          <div className={classes.iconButtonGroup}>
            <Button
              size="small"
              color="secondary"
              icon={<EditOutlined />}
              onClick={() => handleOpenDrawer(record)}
            />
            {record?.isDiscounted ? (
              <Button
                color="danger"
                size="small"
                icon={<DeleteOutlined />}
                onClick={() => handleDelete(record)}
              />
            ) : null}
          </div>
        );
      },
    },
  ];
};

export const useColumnsForBundleProduct = ({ t, warehouses }) => [
  {
    title: t('CREATED_AT'),
    key: 'createdAt',
    render: ({ createdAt }) => (createdAt ? `${moment(createdAt).format(getLocalDateFormat())} ` : '-'),

  },
  {
    title: t('DOMAIN'),
    key: 'domain',
    render: ({ domainType }) => domainType && <Tag color="secondary">{getirMarketDomainTypes?.[domainType]?.[getLangKey()]}</Tag>,
  },
  {
    title: t('PRICE'),
    render: record => (priceFormatter(record?.price)),
    key: 'price',
  },
  {
    title: t('STRUCK_PRICE'),
    render: record => (priceFormatter(record?.struckPrice)),
    key: 'struckPrice',
  },
  {
    title: t('WAREHOUSE'),
    render: ({ warehouseId }) => (warehouseId ? warehouses?.find(warehouse => warehouse?._id === warehouseId)?.name : '-'),
    key: 'warehouseId',
  },
];
