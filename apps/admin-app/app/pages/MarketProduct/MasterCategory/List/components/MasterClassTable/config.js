import { Button, Tag } from 'antd';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import { sortableHandle } from 'react-sortable-hoc';
import { MenuOutlined } from '@ant-design/icons';

import { getLangKey, t } from '@shared/i18n';
import { ROUTE } from '@app/routes';
import { marketProductMasterCategoryStatuses } from '@shared/shared/constantValues';
import { PRODUCT_MASTER_CATEGORY_STATUS } from '@shared/shared/constants';
import { getParentNameOfMasterCategory } from '@app/pages/MarketProduct/utils';
import jssTheme from '@shared/jssTheme';

const langKey = getLangKey();

const DragHandle = sortableHandle(({ isSortable }) => {
  return (
    // eslint-disable-next-line no-inline-styles/no-inline-styles
    <MenuOutlined style={{ cursor: 'grab', color: isSortable ? jssTheme.color.primary : jssTheme.color.disabled }} />
  );
});

export const getTableColumns = isSortable => {
  const columns = [
    {
      title: t('global:SORT'),
      dataIndex: 'sort',
      width: 60,
      className: 'drag-visible',
      render: () => <DragHandle isSortable={isSortable} />,
    },
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
      title: t('marketProductMasterCategoryPage:PARENT_CATEGORY'),
      dataIndex: 'name',
      key: 'name',
      width: 160,
      render: (name, item) => {
        const parentName = getParentNameOfMasterCategory(item);
        return parentName;
      },
    },
    {
      title: t('marketProductMasterCategoryPage:PICKING_ORDER'),
      dataIndex: 'pickingOrder',
      key: 'pickingOrder',
      width: 80,
      render: pickingOrder => {
        return pickingOrder;
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
  return columns;
};
