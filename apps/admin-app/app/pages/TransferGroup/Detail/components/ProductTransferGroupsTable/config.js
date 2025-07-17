import { Button } from 'antd';
import _ from 'lodash';
import { Link } from 'react-router-dom';

import { getLangKey, t } from '@shared/i18n';
import { ROUTE } from '@app/routes';
import Excel from '@shared/utils/excel';

export const getTableColumns = () => {
  const columns = [
    {
      title: t('global:NAME'),
      dataIndex: 'product',
      key: 'product',
      width: '80%',
      render: product => {
        return _.get(product, ['fullName', getLangKey()], '');
      },
    },
    {
      title: t('global:ACTION'),
      align: 'right',
      render: record => {
        const productId = _.get(record, 'product._id', _.get(record, 'product', ''));
        const path = ROUTE.MARKET_PRODUCT_DETAIL.path.replace(':id', productId);

        return (
          <Link to={path}>
            <Button type="default" size="small">
              {t('global:DETAIL')}
            </Button>
          </Link>
        );
      },
    },
  ];
  return columns;
};

export const excelConfig = {
  fields: [
    {
      key: 'product',
      title: t('transferGroupPage:PRODUCT_ID'),
      default: '',
    },
    {
      key: 'fullName',
      title: t('transferGroupPage:PRODUCT_NAME'),
      default: '',
    },
    {
      key: 'transferGroup',
      title: t('transferGroupPage:TRANSFER_GROUP_ID'),
      default: '',
    },
    {
      key: 'transferGroupName',
      title: t('transferGroupPage:TRANSFER_GROUP_NAME'),
      default: '',
    },
  ],
};

export const exportProductTransferGroupsToExcel = (productTransferGroups, transferGroup) => {
  const newProductTransferGroups = productTransferGroups.map(item => {
    return {
      ...item,
      fullName: _.get(item.product, ['fullName', getLangKey()], '') || item.product,
      transferGroupName: _.get(transferGroup, ['name', getLangKey()], ''),
    };
  });
  return new Excel({
    fields: excelConfig.fields,
    data: newProductTransferGroups,
  }).export();
};

export const exampleCsv = { "product_id": "5f462f3912009117d823901c" };
