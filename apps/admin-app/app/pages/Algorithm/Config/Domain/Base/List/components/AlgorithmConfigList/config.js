import { find, get } from 'lodash';
import { Button, Tag } from 'antd';

import { DOMAIN_DETAIL_ROUTES_BY_NAMESPACES } from '@app/pages/Algorithm/Config/Domain/constants';

export const tableColumns = ({ t, constants }) => {
  return [
    {
      title: t('algorithmConfigPage:ID'),
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
        const type = find(constants.typeOptions, { value: typeName })?.label || typeName;
        return (<Tag key={type} color="processing">{t(`algorithmConfigPage:${type}`)}</Tag>);
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
            const route = get(DOMAIN_DETAIL_ROUTES_BY_NAMESPACES, record?.namespace);
            const path = route?.path.replace(':key', configObjectId);
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
