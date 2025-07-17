import { Button } from 'antd';
import _ from 'lodash';
import { Link } from 'react-router-dom';

import { getLangKey } from '@shared/i18n';
import { ROUTE } from '@app/routes';

export const tableColumns = t => {
  return [
    {
      title: t('global:NAME'),
      dataIndex: 'name',
      key: 'name',
      width: '80%',
      render: nameObject => {
        return nameObject[getLangKey()];
      },
    },
    {
      title: t('global:ACTION'),
      align: 'right',
      render: record => {
        const transferGroupId = _.get(record, '_id', '');
        const path = ROUTE.TRANSFER_GROUP_DETAIL.path.replace(':id', transferGroupId);

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
};
