import { getLangKey, t } from '@shared/i18n';
import { CopyToClipboard } from '@shared/components/UI/CopyToClipboard';

export const getTableColumns = () => [
  {
    title: t('writeOffPage:PRODUCT_ID'),
    dataIndex: 'productId',
    key: 'productId',
    render: id => <CopyToClipboard message={id} />,
    width: 200,
  },
  {
    title: t('writeOffPage:PRODUCT_NAME'),
    key: 'productName',
    dataIndex: 'productName',
    render: productName => productName[getLangKey()],
    width: 200,
  },
  {
    title: t('writeOffPage:TOTAL_COUNT'),
    key: 'locationStock',
    dataIndex: 'locationStock',
    width: 200,
  },
  {
    title: t('writeOffPage:REMOVED_AMOUNT'),
    dataIndex: 'quantity',
    key: 'quantity',
    width: 200,
  },
  {
    title: t('writeOffPage:COMMENT'),
    dataIndex: 'comment',
    key: 'comment',
    width: 200,
  },
];
