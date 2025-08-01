import { Button, Row, Typography } from 'antd';

import { DeleteOutlined, EditOutlined, SaveOutlined, CloseOutlined } from '@ant-design/icons';

import { t } from '@shared/i18n';

const { Text } = Typography;

export const tableColumns = (isEditing, save, edit, cancel, handleDelete) => {
  return [
    {
      title: t('NAME'),
      editable: true,
      dataIndex: 'name',
      render: areaName => {
        return (
          <Text>
            {areaName}
          </Text>
        );
      },
    },
    {
      title: t('ACTION'),
      align: 'right',
      dataIndex: '_id',
      width: '120px',
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <Row justify="space-between">
            <Button
              type="primary"
              name="Save"
              aria-label="save-franchise-area"
              onClick={() => save(record._id)}
              icon={<SaveOutlined />}
            />
            <Button
              type="primary"
              aria-label="delete-franchise-area"
              danger
              onClick={() => handleDelete(record._id)}
              icon={<DeleteOutlined />}
            />
            <Button
              type="primary"
              aria-label="cancel-franchise-area"
              danger
              onClick={cancel}
              icon={<CloseOutlined />}
            />
          </Row>
        ) : (
          <Button
            type="primary"
            aria-label="edit-franchise-area"
            onClick={() => edit(record)}
            icon={<EditOutlined />}
          />
        );
      },
    },
  ];
};
