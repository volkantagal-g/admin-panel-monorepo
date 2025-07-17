import { Button, Image, InputNumber } from 'antd';
import { get } from 'lodash';

import { getLangKey, t } from '@shared/i18n';

export const getTableColumns = ({ onChange, addProduct, products }) => [
  {
    title: t('customerSatisfactionPage:PICTURE'),
    key: 'picURL',
    render: product => (
      <Image width={60} height={60} src={get(product, ['picURL', getLangKey()], '')} alt="product" />
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
    title: t('customerSatisfactionPage:BARCODE'),
    key: 'barcode',
    dataIndex: 'barcodes',
    width: 200,
    render: barcodes => barcodes.map(barcode => <div>{barcode}</div>),
  },
  {
    title: t('customerSatisfactionPage:QUANTITY'),
    dataIndex: 'actions',
    width: 150,
    render: (_, product) => {
      return (
        <InputNumber
          value={products[product._id]}
          onChange={e => {
            onChange({
              productId: product._id,
              quantity: e,
            });
          }}
          min={0}
        />
      );
    },
  },
  {
    dataIndex: 'action',
    width: 150,
    render: (_, product) => {
      return (
        <Button
          disabled={!products[product._id]}
          onClick={() => {
            addProduct(product._id);
          }}
        >
          {t('global:ADD')}
        </Button>
      );
    },
  },
];
