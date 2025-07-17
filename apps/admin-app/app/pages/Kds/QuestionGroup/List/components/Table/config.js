import { get } from 'lodash';
import { Tag } from 'antd';

import { usePermission } from '@shared/hooks';
import { getLangKey } from '@shared/i18n';
import { DetailButton } from '@shared/components/UI/List';
import { StatusEnum } from '@app/pages/Kds/constant';
import permKey from '@shared/shared/permKey.json';

export const _getTableColumns = t => {
  const { Can } = usePermission();

  return [
    {
      title: t('GROUP_NAME'),
      dataIndex: 'name',
      key: 'name',
      width: '120px',
      render: name => {
        return get(name, getLangKey(), '-');
      },
    },
    {
      title: t('FORM_TYPE'),
      dataIndex: 'auditFormType',
      key: 'auditFormType',
      width: '120px',
      render: auditFormType => {
        return (
          auditFormType.map(type => {
            const value = get(type, ['name', getLangKey()], '-');
            return <Tag key={value}>{value}</Tag>;
          })
        );
      },
    },
    {
      title: t('global:STATUS'),
      dataIndex: 'status',
      key: 'status',
      width: '120px',
      render: status => {
        return get(StatusEnum, [status, getLangKey()], '-');
      },
    },
    {
      dataIndex: '_id',
      key: '_id',
      align: 'right',
      width: '120px',
      render: (_id, _row) => {
        const urlPath = `/kds/questionGroup/detail/`;
        return (
          <Can permKey={permKey.PAGE_KDS_QUESTION_GROUP_DETAIL}>
            {
              DetailButton({ _id, urlPath })
            }
          </Can>
        );
      },
    },
  ];
};
