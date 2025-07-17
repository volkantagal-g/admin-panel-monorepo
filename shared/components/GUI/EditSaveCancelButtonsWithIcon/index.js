import { memo } from 'react';
import { EditOutlined, CheckOutlined, CloseOutlined, DeleteOutlined } from '@ant-design/icons';

import { Popconfirm } from 'antd';

import { useTranslation } from 'react-i18next';

import PropTypes from 'prop-types';

import { Button } from '@shared/components/GUI';

import useStyles from './styles';

export const EditSaveCancelButtonsWithIcon = memo(function EditSaveCancelButtonsWithIcon({
  record,
  editingKey,
  setEditingKey,
  isEditing,
  onSave,
  isUpdatePending,
  onDelete,
  editingKeyProp,
  disableDelete,
}) {
  const { t } = useTranslation('marketProductPageV2');
  const classes = useStyles();
  const keyId = record?.[editingKeyProp];

  const handleEdit = () => {
    setEditingKey(keyId);
    isEditing(record);
  };

  const handleCancel = () => {
    setEditingKey('');
  };

  if (editingKey === keyId) {
    return (
      <div className={classes.iconButtonGroup}>
        <Button
          size="small"
          color="danger"
          icon={(<CloseOutlined />)}
          onClick={handleCancel}
          disabled={isUpdatePending}
        />
        <Button
          size="small"
          color="active"
          icon={(<CheckOutlined />)}
          onClick={onSave}
          loading={isUpdatePending}
        />
      </div>
    );
  }
  return (
    <div className={classes.iconButtonGroup}>
      <Button
        color="secondary"
        size="small"
        icon={(
          <EditOutlined />
        )}
        onClick={handleEdit}
        disabled={(editingKey !== '' || isUpdatePending)}
      />
      {!disableDelete && (
      <Popconfirm
        title={t('ARE_YOU_SURE')}
        okText={t('YES')}
        cancelText={t('NO')}
        onConfirm={() => onDelete(keyId, record)}
      >
        <Button
          color="danger"
          size="small"
          icon={(
            <DeleteOutlined />
          )}
          disabled={editingKey !== ''}
          loading={isUpdatePending}
        />
      </Popconfirm>
      )}
    </div>
  );
});

EditSaveCancelButtonsWithIcon.propTypes = {
  disableDelete: PropTypes.bool,
  editingKey: PropTypes.string.isRequired,
  editingKeyProp: PropTypes.string,
  isEditing: PropTypes.func,
  isUpdatePending: PropTypes.bool,
  onDelete: PropTypes.func,
  onSave: PropTypes.func,
  record: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.func,
    PropTypes.bool, PropTypes.number, PropTypes.element])),
  setEditingKey: PropTypes.func,
};

EditSaveCancelButtonsWithIcon.defaultProps = {
  disableDelete: false,
  editingKeyProp: 'id',
  isEditing: undefined,
  isUpdatePending: false,
  onDelete: undefined,
  onSave: undefined,
  record: {},
  setEditingKey: undefined,
};
