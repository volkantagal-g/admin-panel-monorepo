import { Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { get } from 'lodash';

import ProductForm from '../ProductForm';
import CommentForm from '../CommentForm';

import { getLangKey, t } from '@shared/i18n';
import { CopyToClipboard } from '@shared/components/UI/CopyToClipboard';
import { PRODUCT_STOCK_UNIT_TYPE } from '@shared/shared/constants';

export const getTableColumns = ({ updateProductRow, removeProductRow }) => [
  {
    title: t('writeOffPage:PRODUCT_ID'),
    dataIndex: '_id',
    key: 'productId',
    render: id => <CopyToClipboard message={id} />,
    width: 200,
  },
  {
    title: t('writeOffPage:PRODUCT_NAME'),
    key: 'fullName',
    render: product => get(product, ['fullName', getLangKey()], ''),
    width: 200,
  },
  {
    title: t('writeOffPage:UNIT'),
    dataIndex: 'unit',
    key: 'unit',
    render: unit => {
      if (unit === PRODUCT_STOCK_UNIT_TYPE.PIECE) {
        return t('writeOffPage:PIECE');
      } if (unit === PRODUCT_STOCK_UNIT_TYPE.KILOGRAM) {
        return t('writeOffPage:KILOGRAM');
      }

      return '-';
    },
    width: 150,
  },
  {
    title: t('writeOffPage:TOTAL_COUNT'),
    key: 'available',
    dataIndex: 'available',
    width: 150,
  },
  {
    title: t('writeOffPage:REMOVED_AMOUNT'),
    key: 'deleted',
    render: product => (
      <ProductForm
        product={product}
        onUpdateProduct={updateProductRow}
      />
    ),
    width: 200,
  },
  {
    title: t('writeOffPage:COMMENT'),
    key: 'comment',
    render: product => (
      <CommentForm
        product={product}
        onUpdateProduct={updateProductRow}
      />
    ),
    width: 200,
  },
  {
    dataIndex: 'actions',
    width: 150,
    render: (_, product) => {
      return (
        <Button
          onClick={() => removeProductRow(product._id)}
          icon={<DeleteOutlined />}
        />
      );
    },
  },
];
