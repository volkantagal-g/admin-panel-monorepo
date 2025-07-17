import { Button, Popconfirm } from 'antd';
import { useTranslation } from 'react-i18next';
import { isFunction as _isFunction } from 'lodash';

import useStyles from '../styles';
import { ActionButtonPropTypes } from '../types';

const ActionButtons = ({
  isFormEditable = false,
  isPending = false,
  onCancel,
  onEdit,
  onSave,
  editBtnText,
}: ActionButtonPropTypes) => {
  const { t } = useTranslation(['employeePage']);
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
              title={t('employeePage:CONFIRM_ALL_CHANGES_WILL_BE_LOST_ARE_YOU_SURE')}
            >
              <Button
                danger
                className={classes.cancelActionButton}
                disabled={isPending}
                type="primary"
                size="small"
                key="cancel"
                htmlType="button"
              >
                {t('CANCEL')}
              </Button>
            </Popconfirm>
            <Popconfirm
              onConfirm={handleSaveClick}
              okText={t('button:YES')}
              cancelText={t('button:CANCEL')}
              title={t('employeePage:CONFIRM_ALL_CHANGES_APPLY_IMMEDIATELY_AND_LOGGED_ARE_YOU_SURE')}
            >
              <Button
                loading={isPending}
                type="primary"
                size="small"
                key="save"
                htmlType="submit"
              >
                {t('SAVE')}
              </Button>
            </Popconfirm>
          </>
        ) : (
          <Button
            disabled={isPending}
            loading={isPending}
            type="primary"
            size="small"
            key="edit"
            htmlType="button"
            onClick={handleEditClick}
          >
            {editBtnText || t('EDIT')}
          </Button>
        )
      }
    </div>
  );
};

export default ActionButtons;
