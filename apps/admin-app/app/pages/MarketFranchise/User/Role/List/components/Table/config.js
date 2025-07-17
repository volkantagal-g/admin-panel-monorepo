import { getLangKey, t } from '@shared/i18n';

import { DetailButton } from '@shared/components/UI/List';

export const tableColumns = () => {
  return ([
    {
      title: t('marketFranchiseUserRolePage:ROLE_NAME'),
      dataIndex: 'key',
      key: 'key',
      width: 200,
    },
    {
      title: t('global:DESCRIPTION'),
      dataIndex: 'descriptions',
      key: 'descriptions',
      width: 200,
      render: descriptions => descriptions?.[getLangKey()],
    },
    {
      title: t('global:ACTION'),
      align: 'right',
      key: 'detailButton',
      render: record => {
        const path = "/marketFranchise/user/role/detail/";
        return DetailButton({
          _id: record._id,
          urlPath: path,
        });
      },
    },
  ]);
};
