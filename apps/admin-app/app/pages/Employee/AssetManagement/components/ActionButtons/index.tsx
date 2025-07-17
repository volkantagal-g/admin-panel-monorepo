import { Button, Popconfirm } from 'antd';
import { useTranslation } from 'react-i18next';
import { isFunction as _isFunction } from 'lodash';

import useStyles from './styles';

const ActionButtons = ({
  isFormEditable = false,
  isPending = false,
  isSaveDisabled = false,
  isEditButtonDisabled = false,
  onCancel,
  onEdit,
  onSave,
  editBtnText,
}: any) => {
  const { t } = useTranslation(['assetManagement']);
  const classes = useStyles();

  const handleEditClick = () => {
    if (_isFunction(onEdit)) {
      onEdit();
    }
  };

  const handleCancelClick = () => {
    if (_isFunction(onCancel)) {
      onCancel();
    }
  };

  const handleSaveClick = () => {
    if (_isFunction(onSave)) {
      onSave();
    }
  };

  return (
    <div className={classes.actionButtonContainer}>
      {
        isFormEditable ? (
          <>
            <Popconfirm
              onConfirm={handleCancelClick}
              okText={t('button:YES')}
              cancelText={t('button:CANCEL')}
              title={t('assetManagement:CONFIRM_ALL_CHANGES_WILL_BE_LOST_ARE_YOU_SURE')}
            >
              <Button
                danger
                className={classes.cancelActionButton}
                disabled={isPending}
                type="primary"
                size="middle"
                key="cancel"
                htmlType="button"
              >
                {t('CANCEL')}
              </Button>
            </Popconfirm>
            <Popconfirm
              disabled={isSaveDisabled}
              onConfirm={handleSaveClick}
              okText={t('button:YES')}
              cancelText={t('button:CANCEL')}
              title={t('assetManagement:CONFIRM_ALL_CHANGES_APPLY_IMMEDIATELY_AND_LOGGED_ARE_YOU_SURE')}
            >
              <Button
                disabled={isSaveDisabled}
                loading={isPending}
                type="primary"
                size="middle"
                key="save"
                htmlType="submit"
              >
                {t('SAVE')}
              </Button>
            </Popconfirm>
          </>
        ) : (
          <Button
            // disabled={isPending}
            loading={isPending}
            type="primary"
            size="middle"
            key="edit"
            htmlType="button"
            onClick={handleEditClick}
            disabled={isEditButtonDisabled}
          >
            {editBtnText || t('EDIT')}
          </Button>
        )
      }
    </div>
  );
};

export default ActionButtons;
