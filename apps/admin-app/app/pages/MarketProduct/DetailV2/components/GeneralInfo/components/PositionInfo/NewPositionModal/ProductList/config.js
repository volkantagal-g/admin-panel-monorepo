import { get } from 'lodash';

import { getLangKey, t } from '@shared/i18n';

export const getProductTableColumns = () => {
  const columns = [
    {
      title: t('marketProductPageV2:POSITION_INFO.PRODUCT_NAME'),
      dataIndex: 'item',
      key: 'item',
      width: 90,
      render: item => {
        return get(item, ['fullName', getLangKey()], '');
      },
    },
    {
      title: t('marketProductPageV2:POSITION_INFO.POSITION'),
      dataIndex: 'position',
      key: 'position',
      width: 20,
      align: 'right',
    },
  ];
  return columns;
};
