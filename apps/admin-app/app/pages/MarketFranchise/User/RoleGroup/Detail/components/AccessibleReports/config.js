import { DeleteOutlined } from '@ant-design/icons';
import { Button, Popconfirm } from 'antd';

import { getLangKey } from '@shared/i18n';

export const tableColumns = ({ t, handleOnRemove, isEditable }) => {
  return [
    {
      title: t('OWNED_REPORTS'),
      key: 'name',
      render: ({ name }) => {
        return name && name[getLangKey()];
      },
    },
    {
      title: '',
      key: '_id',
      width: '10%',
      render: reportItem => {
        return (
          <Popconfirm
            disabled={!isEditable}
            placement="topRight"
            title={t('COMMON_CONFIRM_TEXT')}
            onConfirm={() => handleOnRemove(reportItem._id)}
          >
            <Button disabled={!isEditable} type="danger" icon={<DeleteOutlined />} />
          </Popconfirm>
        );
      },
    },
  ];
};
