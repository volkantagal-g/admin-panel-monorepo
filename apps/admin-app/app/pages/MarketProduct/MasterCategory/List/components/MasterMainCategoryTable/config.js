import { Button, Tag } from 'antd';
import _ from 'lodash';
import { Link } from 'react-router-dom';

import { getLangKey, t } from '@shared/i18n';
import { ROUTE } from '@app/routes';
import { marketProductMasterCategoryStatuses } from '@shared/shared/constantValues';
import { PRODUCT_MASTER_CATEGORY_STATUS } from '@shared/shared/constants';

const langKey = getLangKey();

export const tableColumns = [
  {
    title: t('global:ACTIVENESS'),
    dataIndex: 'status',
    key: 'status',
    width: 60,
    render: status => {
      const tagColor = PRODUCT_MASTER_CATEGORY_STATUS.ACTIVE === status ? 'success' : 'error';
      return (
        <Tag key={status} color={tagColor}>
          {_.get(marketProductMasterCategoryStatuses, [status, langKey])}
        </Tag>
      );
    },
  },
  {
    title: t('global:NAME_1'),
    dataIndex: 'name',
    key: 'name',
    width: 160,
    render: name => {
      return _.get(name, [langKey], '');
    },
  },
  {
    title: t('global:ACTION'),
    align: 'right',
    width: 80,
    render: record => {
      const masterCategoryId = _.get(record, '_id', '');
      const path = ROUTE.MARKET_PRODUCT_MASTER_CATEGORY_DETAIL.path.replace(':id', masterCategoryId);

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
