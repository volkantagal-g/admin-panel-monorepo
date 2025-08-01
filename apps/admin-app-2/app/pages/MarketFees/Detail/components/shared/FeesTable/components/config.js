import { Button } from 'antd';
import { EditOutlined, DeleteOutlined, CheckOutlined } from '@ant-design/icons';

import { t } from '@shared/i18n';

export const getTableColumns = ({ editingRowId, updateRow, removeRow, editRow, disabled, isOnlyRow }) => [
  {
    title: t('warehousePage:MIN'),
    key: 'min',
    dataIndex: 'min',
    width: 200,
    editable: true,
  },
  {
    title: t('global:FEE'),
    width: 200,
    dataIndex: 'fee',
    editable: true,
    key: 'fee',
  },
  {
    width: 150,
    render: (_, data) => {
      const key = data?.key;
      const isFirstRow = key && key?.[key.length - 1] === '0';

      return disabled ? null : (
        <div>
          {editingRowId === data.key ? (
            <Button onClick={() => updateRow(data.key)} icon={<CheckOutlined />} />
          ) : (
            <Button onClick={() => editRow(data)} icon={<EditOutlined />} />
          )}
          <Button onClick={() => removeRow(data.key)} icon={<DeleteOutlined />} disabled={data.min === 0 && (isOnlyRow && isFirstRow)} />
        </div>
      );
    },
  },
];
