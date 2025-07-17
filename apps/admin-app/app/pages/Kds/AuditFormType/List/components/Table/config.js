import { get } from 'lodash';

import { usePermission } from '@shared/hooks';
import { getLangKey } from '@shared/i18n';
import { DetailButton } from '@shared/components/UI/List';
import permKey from '@shared/shared/permKey.json';

export const _getTableColumns = t => {
  const { Can } = usePermission();

  return [
    {
      title: t('NAME'),
      dataIndex: 'name',
      key: 'name',
      width: '120px',
      render: name => {
        return get(name, getLangKey(), '-');
      },
    },
    {
      dataIndex: '_id',
      key: '_id',
      align: 'right',
      width: '120px',
      render: (_id, _row) => {
        const urlPath = `/kds/auditFormType/detail/`;
        return (
          <Can permKey={permKey.PAGE_KDS_AUDIT_FORM_TYPE_DETAIL}>
            {DetailButton({ _id, urlPath })}
          </Can>
        );
      },
    },
  ];
};
