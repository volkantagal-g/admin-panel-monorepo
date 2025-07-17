import { Divider } from 'antd';

import { getLangKey } from '@shared/i18n';

export const getTableColumns = ({ t, productMap, currencyFormatter }) => [
  {
    title: t('PARTIAL_REFUND.PRODUCT'),
    dataIndex: 'products',
    render: products => {
      const lastIndex = products.length - 1;
      return products?.map((productItem, index) => {
        return (
          <span key={productItem?.product}>
            <p>{ productMap?.[productItem?.product]?.name?.[getLangKey()]}</p>
            {index !== lastIndex && <Divider plain dashed style={{ margin: 0 }} />}
          </span>
        );
      });
    },
  },
  {
    title: t('PARTIAL_REFUND.COUNT'),
    dataIndex: 'products',
    render: products => {
      const lastIndex = products.length - 1;
      return products.map((productItem, index) => {
        return (
          <span key={productItem.product}>
            <p>{productItem?.count}</p>
            {index !== lastIndex && <Divider plain dashed style={{ margin: 0 }} />}
          </span>
        );
      });
    },
  },
  {
    title: t('PARTIAL_REFUND.AMOUNT'),
    dataIndex: 'products',
    render: products => {
      const lastIndex = products.length - 1;
      return products.map((productItem, index) => {
        return (
          <span key={productItem?.product}>
            <p data-testid={`refund-amount-${index}`}>{`${currencyFormatter(productItem?.refundAmount || 0)}`}</p>
            {index !== lastIndex && <Divider plain dashed style={{ margin: 0 }} />}
          </span>
        );
      });
    },
  },
  { title: t('PARTIAL_REFUND.DATE') },
];
