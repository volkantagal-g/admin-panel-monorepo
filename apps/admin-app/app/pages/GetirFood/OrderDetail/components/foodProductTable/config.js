import { isNumber } from 'lodash';

import { getLangKey } from '@shared/i18n';
import { currency, formatNumber } from '@shared/utils/common';

export const getDefaultText = text => text || '-';

export const getProductPrice = (price, defaultValue = null) => {
  if (!isNumber(price)) {
    return defaultValue;
  }

  return `${formatNumber(price)} ${currency()}`;
};

export const generateColumns = ({ t }) => [
  {
    title: '#',
    dataIndex: 'imageURL',
    key: 'image',
    width: 40,
    render: imageURL => <img src={imageURL} alt={t('PRODUCT.IMAGE_NOT_AVAILABLE')} height="24" />,
  },
  {
    title: t('PRODUCT.NAME'),
    dataIndex: 'name',
    key: 'name',
    width: 100,
    render: name => name[getLangKey()],
  },
  {
    title: t('PRODUCT.NOTE'),
    dataIndex: 'note',
    key: 'note',
    width: 100,
    render: getDefaultText,
  },
  {
    title: t('PRODUCT.PRICE'),
    dataIndex: 'price',
    key: 'price',
    width: 100,
    render: getProductPrice,
  },
  {
    title: t('PRODUCT.COUNT'),
    dataIndex: 'count',
    key: 'count',
    width: 100,
    render: getDefaultText,
  },
  {
    title: t('PRODUCT.TOTAL_PRICE'),
    dataIndex: 'totalPriceWithOption',
    key: 'totalPriceWithOption',
    width: 100,
    render: totalPriceWithOption => getProductPrice(totalPriceWithOption, '-'),
  },
];
