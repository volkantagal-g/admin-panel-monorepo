import { get } from 'lodash';

import { getLangKey, t } from '@shared/i18n';
import { ROUTE } from '@app/routes';
import ActionButtonGroup from '../ActionButtonGroup';

export const getTableColumns = (hasAccessToDetailPage, hasDeleteConfigTypeAccess, deleteConfigType) => {
  const columns = [
    {
      title: t('franchiseConfigType:LIST.CONFIG_NAME'),
      dataIndex: 'name',
      key: 'name',
      width: '40px',
      render: name => name || '-',
    },
    {
      title: t('franchiseConfigType:LIST.CONFIG_DESCRIPTION'),
      dataIndex: 'description',
      key: 'description',
      width: '40px',
      render: description => get(description, [getLangKey()], '-'),
    },
  ];

  if (hasAccessToDetailPage || hasDeleteConfigTypeAccess) {
    columns.push({
      title: t('ACTION'),
      align: 'right',
      width: 60,
      render: record => {
        const id = get(record, '_id', '');
        const path = ROUTE.FRANCHISE_CONFIG_TYPE_DETAIL.path.replace(':configId', '');

        return (
          <ActionButtonGroup
            hasAccessToDetailPage={hasAccessToDetailPage}
            hasDeleteConfigTypeAccess={hasDeleteConfigTypeAccess}
            id={id}
            path={path}
            deleteConfigType={deleteConfigType}
          />
        );
      },
    });
  }

  return columns;
};
