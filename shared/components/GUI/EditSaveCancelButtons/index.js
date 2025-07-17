import { memo } from 'react';
import PropTypes from 'prop-types';
import { Col, Row } from 'antd';
import { useTheme } from 'react-jss';

import useStyles from './styles';
import { Button } from '../Button';
import { t } from '@shared/i18n';

import edit from '@shared/assets/GUI/Icons/Solid/Edit.svg';

export const EditSaveCancelButtons = memo(function EditSaveCancelButtons({
  disabled, isFormEditable, htmlType, form, editButtonProps,
  loading, onCancelClick, onEditClick, onSaveClick, size, containerClassName,
}) {
  const classes = useStyles();
  const theme = useTheme();
  const buttonGroupClassName = containerClassName === null ? '' : classes.buttonGroup;
  return (
    <div className={buttonGroupClassName}>
      {isFormEditable ? (
        <Row
          justify="end"
          align="middle"
          gutter={[theme.spacing(2)]}
        >
          <Col>
            <Button
              data-testid="cancel-button"
              size={size}
              color="secondary"
              onClick={onCancelClick}
              disabled={loading}
            >{t('global:CANCEL')}
            </Button>
          </Col>
          <Col>
            <Button
              data-testid="save-button"
              size={size}
              form={form}
              htmlType={htmlType}
              loading={loading}
              disabled={disabled}
              onClick={onSaveClick}
            >{t('global:SAVE')}
            </Button>
          </Col>
        </Row>
      )
        : (
          <Button
            data-testid="edit-button"
            size={size}
            icon={(<img src={edit} alt="edit-icon" />)}
            onClick={onEditClick}
            loading={loading}
            className={classes.editButton}
            {...editButtonProps}
          >{t('global:EDIT')}
          </Button>
        )}
    </div>
  );
});

EditSaveCancelButtons.propTypes = {
  disabled: PropTypes.bool,
  form: PropTypes.string,
  htmlType: PropTypes.string,
  isFormEditable: PropTypes.bool,
  loading: PropTypes.bool,
  onCancelClick: PropTypes.func,
  onEditClick: PropTypes.func,
  onSaveClick: PropTypes.func,
  size: PropTypes.oneOf(['small', 'medium']),
};

EditSaveCancelButtons.defaultProps = {
  disabled: false,
  form: undefined,
  htmlType: 'submit',
  isFormEditable: false,
  loading: false,
  onCancelClick: undefined,
  onEditClick: undefined,
  onSaveClick: undefined,
  size: 'small',
};
