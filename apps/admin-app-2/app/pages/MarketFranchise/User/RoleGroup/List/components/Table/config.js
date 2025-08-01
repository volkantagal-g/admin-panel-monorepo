import { get } from 'lodash';

import { getLangKey } from '@shared/i18n';
import { DetailButton } from '@shared/components/UI/List';

export const tableColumns = t => {
  return ([
    {
      title: t('ROLE_GROUP_NAME'),
      dataIndex: 'name',
      key: 'name',
      width: 200,
      render: name => name?.[getLangKey()],
    },
    {
      title: t('global:DESCRIPTION'),
      dataIndex: 'description',
      key: 'description',
      width: 200,
      render: description => description?.[getLangKey()],
    },
    {
      title: t('global:ACTION'),
      align: 'right',
      key: 'detailButton',
      render: record => {
        const roleGroupId = get(record, '_id', '');
        const path = '/marketFranchise/user/roleGroup/detail/';
        return DetailButton({
          _id: roleGroupId,
          urlPath: path,
        });
      },
    },
  ]);
};
