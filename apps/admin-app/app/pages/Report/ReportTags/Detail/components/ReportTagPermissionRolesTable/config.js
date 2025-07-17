import { Button } from 'antd';
import { Link } from 'react-router-dom';

import confirm from 'antd/lib/modal/confirm';
import { ExclamationCircleOutlined } from '@ant-design/icons';

import { getLangKey } from '@shared/i18n';
import { ROUTE } from '@app/routes';

export const getColumns = (t, onDelete, isDeletePending, canAccessEdit, canAccessRoleDetail) => {
  const columns = [
    {
      title: '#',
      key: 'index',
      align: 'right',
      width: 40,
      render: (val, row, index) => {
        return index + 1;
      },
    },
    {
      title: <b>{t('global:NAME_1')}</b>,
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => {
        return a.name.localeCompare(b.name);
      },
      defaultSortOrder: 'ascend',
      render: name => name,
    },
    {
      title: <b>{t('global:DESCRIPTION')}</b>,
      dataIndex: 'description',
      key: 'description',
      render: desc => desc[getLangKey()],
    },
    ...(
      canAccessEdit ? [
        {
          title: <b>{t('global:ACTION')}</b>,
          dataIndex: '_id',
          key: 'delete',
          align: 'center',
          width: 80,
          render: id => (
            <Button danger onClick={() => confirmDelete(id, onDelete, t)} loading={isDeletePending}>
              {t('global:DELETE')}
            </Button>
          ),
        },
      ] : []
    ),
    ...(
      canAccessRoleDetail ? [
        {
          title: <b>{t('global:DETAIL')}</b>,
          dataIndex: '_id',
          key: 'detail',
          align: 'center',
          width: 80,
          render: id => (
            <Link to={ROUTE.ROLE_DETAIL.path.replace(':id', id)} target="_blank">
              <Button>
                {t('global:DETAIL')}
              </Button>
            </Link>
          ),
        },
      ] : []
    ),
  ];

  return columns;
};

function confirmDelete(id, onConfirm, t) {
  const confirmOptions = {
    title: t('DELETE_ROLE_CONFIRM_TITLE'),
    icon: <ExclamationCircleOutlined />,
    width: '50%',
    content: t('CONFIRMATION.REMOVE_ROLE'),
    onOk() {
      onConfirm(id);
    },
  };
  confirm(confirmOptions);
}
