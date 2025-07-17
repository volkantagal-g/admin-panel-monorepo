import { Button, Tag } from 'antd';
import _ from 'lodash';
import { Link } from 'react-router-dom';

import { t } from '@shared/i18n';
import { ROUTE } from '@app/routes';

export const tableColumns = [
  {
    title: t('global:ACTIVENESS'),
    dataIndex: 'isActive',
    key: 'isActive',
    width: 100,
    render: isActive => {
      const color = isActive ? "success" : "error";
      const text = isActive ? t('global:ACTIVE') : t('global:INACTIVE');
      return (
        <Tag color={color}>
          {text}
        </Tag>
      );
    },
  },
  {
    title: t('global:NAME'),
    dataIndex: 'name',
    key: 'name',
    width: 200,
    render: name => {
      return name;
    },
  },
  {
    title: t('global:ACTION'),
    align: 'right',
    render: record => {
      const brandId = _.get(record, '_id', '');
      const path = ROUTE.BRAND_DETAIL.path.replace(':id', brandId);

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
