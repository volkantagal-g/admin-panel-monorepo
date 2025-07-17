import { Button, Image } from 'antd';
import { get } from 'lodash';

import { getLangKey, t } from '@shared/i18n';

export const getTableColumns = ({ onDelete }) => [
  {
    title: t('customerSatisfactionPage:PICTURE'),
    key: 'productPicture',
    render: product => (
      <Image width={60} height={60} src={get(product, ['picURL', getLangKey()], '')} />
    ),
    width: 200,
  },
  {
    title: t('global:PRODUCT'),
    key: 'fullName',
    render: product => get(product, ['fullName', getLangKey()], ''),
    width: 200,
  },
  {
    title: t('customerSatisfactionPage:QUANTITY'),
    key: 'quantity',
    dataIndex: 'quantity',
    width: 80,
  },
  {
    title: t('customerSatisfactionPage:OPERATION'),
    dataIndex: 'actions',
    width: 150,
    render: (_, product) => {
      return (
        <Button
          onClick={() => {
            onDelete(product.productId);
          }}
        >
          {t('REMOVE')}
        </Button>
      );
    },
  },
];
