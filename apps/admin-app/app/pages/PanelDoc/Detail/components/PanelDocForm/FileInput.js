import { useState } from 'react';
import { Button, Input, Tooltip } from 'antd';
import { useTranslation } from 'react-i18next';
import { EditOutlined, UndoOutlined } from '@ant-design/icons';

import useStyles from './styles';

export default function FileInput({ onChange, onSoftRemove, onCancelEdit, fileKey, onBlur }) {
  const [isEditing, setIsEditing] = useState(false);
  const styles = useStyles();
  const { t } = useTranslation();

  if (!fileKey) {
    return (
      <Input
        className={styles.formFileInput}
        type="file"
        autoComplete="off"
        onChange={onChange}
        onBlur={onBlur}
      />
    );
  }

  const fileName = (fileKey || '').replace('panel-docs-files/', '');
  return isEditing ? (
    <>
      <Input
        className={styles.formFileInput}
        type="file"
        autoComplete="off"
        onChange={onChange}
      />
      <Button
        htmlType="button"
        onClick={() => {
          onCancelEdit();
          setIsEditing(false);
        }}
      >
        <Tooltip title={t('CANCEL')}>
          <UndoOutlined size="small" style={{ color: 'red' }} />
        </Tooltip>
      </Button>
    </>

  ) : (
    <>
      <Input
        className={`${styles.formFileName} ${styles.formFileInput}}`}
        type="text"
        value={fileName}
        title={fileName}
        readOnly
      />
      <Button
        htmlType="button"
        onClick={() => {
          onSoftRemove(); // don't fully clear the file input in order to allow the user to cancel the edit
          setIsEditing(true);
        }}
      >
        <Tooltip title={t('EDIT')}>
          <EditOutlined size="small" style={{ color: 'green' }} />
        </Tooltip>
      </Button>
    </>
  );
}
