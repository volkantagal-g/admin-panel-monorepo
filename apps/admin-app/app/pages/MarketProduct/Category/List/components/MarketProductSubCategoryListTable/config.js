import { Button, Tag } from 'antd';
import _ from 'lodash';
import { Link } from 'react-router-dom';

import { getLangKey, t } from '@shared/i18n';
import { ROUTE } from '@app/routes';
import { marketProductCategoryStatuses } from '@shared/shared/constantValues';
import { MARKET_PRODUCT_CATEGORY_STATUS } from '@shared/shared/constants';
import Image from '@shared/components/UI/Image';

export const tableColumns = [
  {
    title: t('global:ACTIVENESS'),
    dataIndex: 'status',
    key: 'status',
    width: 60,
    render: status => {
      const tagColor = MARKET_PRODUCT_CATEGORY_STATUS.ACTIVE === status ? 'success' : 'error';
      const statusText = _.get(marketProductCategoryStatuses, [status, getLangKey()], '');
      return (
        <Tag key={status} color={tagColor}>
          {statusText}
        </Tag>
      );
    },
  },
  {
    title: t('global:IMAGE'),
    dataIndex: 'picURL',
    key: 'picURL',
    width: 60,
    render: (picURL, { _id, parent }) => {
      const parentPicUrl = _.get(parent, ['picURL', getLangKey()]);
      const _picURL = _.get(picURL, [getLangKey()]);
      return (
        <Image src={_picURL || parentPicUrl} height={32} alt={`marketProductImage-${_id}`}/>
      );
    },
  },
  {
    title: t('marketProductCategoryPage:PARENT_CATEGORY'),
    dataIndex: 'parent',
    key: 'parent',
    width: 120,
    render: parent => {
      const parentName = _.get(parent, ['name', getLangKey()], '');
      return parentName;
    },
  },
  {
    title: t('global:NAME_1'),
    dataIndex: 'name',
    key: 'name',
    width: 160,
    render: name => {
      return _.get(name, [getLangKey()], '');
    },
  },
  {
    title: t('global:DESCRIPTION'),
    dataIndex: 'description',
    key: 'description',
    width: 160,
    render: description => {
      return description;
    },
  },
  {
    title: t('marketProductCategoryPage:POSITION_ORDER'),
    dataIndex: 'order',
    key: 'order',
    width: 80,
    render: order => {
      return order;
    },
  },
  {
    title: t('global:ACTION'),
    align: 'right',
    width: 80,
    render: record => {
      const marketProductCategoryId = _.get(record, '_id', '');
      const path = ROUTE.MARKET_PRODUCT_CATEGORY_DETAIL.path.replace(':id', marketProductCategoryId);

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
