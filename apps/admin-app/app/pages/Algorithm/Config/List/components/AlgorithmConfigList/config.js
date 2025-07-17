import { get } from 'lodash';
import { Button, Tag } from 'antd';

import { ROUTE } from '@app/routes';

export const tableColumns = t => {
  return [
    {
      title: t('algorithmConfigPage:KEY'),
      dataIndex: 'key',
      key: 'key',
      width: 100,
    },
    {
      title: t('algorithmConfigPage:TYPE'),
      dataIndex: 'type',
      key: 'type',
      width: 100,
      render: typeName => {
        return (<Tag key={typeName} color="processing">{typeName}</Tag>);
      },
    },
    {
      title: t('algorithmConfigPage:ALIAS'),
      dataIndex: 'alias',
      key: 'alias',
      width: 100,
    },
    {
      title: t('algorithmConfigPage:PARENT_ALIAS'),
      dataIndex: 'parent',
      key: 'parent',
      width: 80,
      render: parent => {
        return get(parent, 'alias', '');
      },
    },
    {
      title: t('global:ACTION'),
      align: 'right',
      width: 80,
      render: record => {
        const action = {
          onDetailClick: () => {
            const configObjectId = get(record, 'key', '');
            const namespace = get(record, 'namespace', '');
            const path = ROUTE.ALGORITHM_CONFIG_DETAIL.path.replace(':key', configObjectId).replace(':namespace', namespace);
            window.open(path, '_blank');
          },
        };

        return (
          <Button type="default" size="small" onClick={action.onDetailClick}>
            {t('global:DETAIL')}
          </Button>
        );
      },
    },
  ];
};
