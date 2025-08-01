import { Button, Popconfirm } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

import { getLangKey } from '@shared/i18n';

export const tableColumns = (t, isFormEditable, deleteReport) => {
  return [
    {
      title: t('OWNED_REPORTS'),
      key: 'name',
      render: report => (
        <div>{report.name[getLangKey()]}</div>
      ),
    },
    {
      width: 60,
      render: report => isFormEditable && (
        <Popconfirm
          placement="topRight"
          title={t('COMMON_CONFIRM_TEXT')}
          onConfirm={() => deleteReport(report._id)}
          okButtonProps={{ type: 'danger' }}
        >
          <Button type="danger" icon={<DeleteOutlined />} />
        </Popconfirm>
      ),
    },
  ];
};
