import _ from 'lodash';

import { Image } from 'antd';

import { getLangKey, t } from '@shared/i18n';

import notFound from '@shared/assets/images/not-found.png';
import { currency, formatNumber } from '@shared/utils/common';

export const tableColumns = [
  {
    title: '#',
    dataIndex: 'imageURL',
    key: 'imageURL',
    width: 100,
    render: imageURL => {
      return (
        <Image
          src={imageURL}
          height={50}
          preview={false}
          fallback={notFound}
        />
      );
    },
  },
  {
    title: t('artisanOrderPage:PRODUCT.NAME'),
    dataIndex: 'name',
    key: 'name',
    width: 100,
    render: name => {
      return name[getLangKey()];
    },
  },
  {
    title: t('artisanOrderPage:PRODUCT.NOTE'),
    dataIndex: 'note',
    key: 'note',
    width: 100,
    render: note => {
      return note || '-';
    },
  },
  {
    title: t('artisanOrderPage:PRODUCT.PRICE'),
    dataIndex: 'price',
    key: 'price',
    width: 100,
    render: price => {
      return _.isNumber(price) && `${formatNumber(price)} ${currency()}`;
    },
  },
  {
    title: t('artisanOrderPage:PRODUCT.COUNT'),
    dataIndex: 'count',
    key: 'count',
    width: 100,
    render: count => {
      return count || '-';
    },
  },
  {
    title: t('artisanOrderPage:PRODUCT.TOTAL_PRICE'),
    dataIndex: 'totalPriceWithOption',
    key: 'totalPriceWithOption',
    width: 100,
    render: totalPriceWithOption => {
      return _.isNumber(totalPriceWithOption) && `${formatNumber(totalPriceWithOption)} ${currency()}`;
    },
  },
];
