import { Tag } from 'antd';
import _ from 'lodash';

import { getLangKey, t } from '@shared/i18n';
import { marketProductStatuses } from '@shared/shared/constantValues';
import { MARKET_PRODUCT_STATUS } from '@shared/shared/constants';
import Image from '@shared/components/UI/Image';
import Excel from '@shared/utils/excel';

export const tableColumns = [
  {
    title: t('global:IMAGE'),
    dataIndex: ["product", "picURL"],
    key: ["product", "picURL"],
    width: 60,
    render: (picURL, { _id }) => {
      const image = _.get(picURL, [getLangKey()], '');
      return (
        <Image src={image} height={32} alt={`marketProductImage-${_id}`}/>
      );
    },
  },
  {
    title: t('global:NAME_1'),
    dataIndex: ["product", "name"],
    key: ["product", "name"],
    width: 160,
    render: nameObject => {
      const name = _.get(nameObject, [getLangKey()], '');
      return name;
    },
  },
  {
    title: t('global:DESCRIPTION'),
    dataIndex: ["product", "description"],
    key: ["product", "description"],
    width: 240,
    render: descriptionObject => {
      const description = _.get(descriptionObject, [getLangKey()], '');
      return description;
    },
  },
  {
    title: t('marketProductBadgePage:STATUS'),
    dataIndex: ["product", "status"],
    key: ["product", "status"],
    width: 60,
    render: status => {
      const tagColor = MARKET_PRODUCT_STATUS.ACTIVE === status ? 'success' : 'error';
      const statusText = _.get(marketProductStatuses, [status, getLangKey()], '');
      return (
        <Tag key={status} color={tagColor}>
          {statusText}
        </Tag>
      );
    },
  },
];

export const exampleCsv = { "product_id": "5f462f3912009117d823901c" };

const excelConfig = {
  fields: [
    {
      key: 'product_id',
      title: 'product_id',
      default: '',
    },
  ],
};

export const exportProductsToExcel = (productIds, badgeId) => {
  const data = productIds.map(id => {
    return { product_id: id };
  });
  return new Excel({
    name: `badgeAddedProducts_${badgeId}_`,
    fields: excelConfig.fields,
    data,
  }).export();
};
