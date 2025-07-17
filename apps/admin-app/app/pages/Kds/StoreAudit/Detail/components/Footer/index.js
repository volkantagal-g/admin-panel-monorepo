import { Form, Row, Col, Button, Popconfirm } from 'antd';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'react-jss';

import { usePermission } from '@shared/hooks';
import permKey from '@shared/shared/permKey.json';

import { AUDIT_FORM_STATUSES } from '../../constant';
import { BUTTON } from './constants';

const Footer = ({
  status,
  handleSave,
  handleComplete,
  handleSendToFranchise,
  handleInactivate,
  handleCancelClick,
  handleEditClick,
  handleInProgress,
  isFormEditable,
  isSendToFranchise,
}) => {
  const theme = useTheme();
  const { t } = useTranslation('storeAuditPage');
  const { canAccess } = usePermission();

  const renderButton = buttonType => {
    switch (buttonType) {
      case BUTTON.SAVE:
        return (
          <Row justify="end">
            <Popconfirm placement="topRight" title={t('COMMON_CONFIRM_TEXT')} onConfirm={handleSave}>
              <Button size="small" type="primary" htmlType="submit">{t('button:SAVE')}</Button>
            </Popconfirm>
          </Row>
        );
      case BUTTON.CANCEL:
        return (<Button size="small" onClick={handleCancelClick}>{t('button:CANCEL')}</Button>);
      case BUTTON.EDIT:
        return (<Button size="small" onClick={handleEditClick}>{t('button:EDIT')}</Button>);
      case BUTTON.COMPLETE:
        return (<Button size="small" type="success" onClick={handleComplete}>{t('button:COMPLETE')}</Button>);
      case BUTTON.INACTIVATE:
        return (
          <Popconfirm placement="topRight" title={t('COMMON_CONFIRM_TEXT')} onConfirm={handleInactivate}>
            <Button size="small" type="danger" htmlType="submit">{t('button:INACTIVATE')}</Button>
          </Popconfirm>
        );
      case BUTTON.SEND_TO_FRANCHISE:
        return (<Button size="small" type="warning" onClick={handleSendToFranchise}>{t('button:SEND_TO_FRANCHISE')}</Button>);
      case BUTTON.IN_PROGRESS:
        return (<Button size="small" type="primary" onClick={handleInProgress}>{t('button:IN_PROGRESS')}</Button>);
      default:
        return null;
    }
  };

  const renderButtonGroup = (buttonTypes = []) => {
    return buttonTypes.filter(type => type !== null).map(buttonType => (
      <Col key={buttonType}>
        <Form.Item className="mb-0 mt-0">
          {renderButton(buttonType)}
        </Form.Item>
      </Col>
    ));
  };

  const renderButtonGroupByStatus = () => {
    // When user has POWER_AUDIT_USER role (or PAGE_STORE_AUDIT_DETAIL_COMPONENT_UPDATE access)
    // we show all possible statuses

    if (status === AUDIT_FORM_STATUSES.INACTIVE || status === AUDIT_FORM_STATUSES.SENT_TO_FRANCHISE) {
      if (canAccess(permKey.PAGE_STORE_AUDIT_DETAIL_COMPONENT_UPDATE)) {
        return renderButtonGroup([
          BUTTON.IN_PROGRESS,
        ]);
      }
      return null;
    }

    // When Audit is in IN_PROGRESS status, we show EDIt, COMPLETE, INACTIVATE buttons
    if (status === AUDIT_FORM_STATUSES.IN_PROGRESS) {
      return renderButtonGroup([
        BUTTON.EDIT,
        BUTTON.COMPLETE,
        BUTTON.INACTIVATE,
      ]);
    }

    // When Audit is in COMPLETE status, we show every button
    if (status === AUDIT_FORM_STATUSES.COMPLETE) {
      return renderButtonGroup([
        BUTTON.EDIT,
        isSendToFranchise ? BUTTON.SEND_TO_FRANCHISE : null,
        BUTTON.INACTIVATE,
      ]);
    }

    return null;
  };

  const renderButtonGroupByEditable = () => {
    return renderButtonGroup([
      BUTTON.CANCEL,
      BUTTON.SAVE,
    ]);
  };

  return (
    <Row justify="end" gutter={[theme.spacing(2)]}>
      {
        isFormEditable ? renderButtonGroupByEditable() : renderButtonGroupByStatus()
      }
    </Row>
  );
};

export default Footer;
