import { useState } from 'react';
import { Form, Row, Col, Button, Popconfirm } from 'antd';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

import { usePermission } from '@shared/hooks';

const StoreInformationFooter = ({
  isPending,
  isFormEditable,
  isShowReleaseButton,
  permKey,
  handleSubmit,
  handleReleaseClick,
  handleEditClick,
  handleCancelClick,
}) => {
  const { t } = useTranslation(['courierPage', 'button']);
  const { Can } = usePermission();

  const [saveButtonPopconfirmText, setSaveButtonPopconfirmText] = useState(t('STORE_INFORMATION_FIRST_CONFIRM_TEXT'));
  const [saveButtonPopconfirmState, setSaveButtonPopconfirmState] = useState(0);
  const [isVisibleSaveButtonPopconfirm, setIsVisibleSaveButtonPopconfirm] = useState(false);

  const handleSaveClick = () => {
    if (saveButtonPopconfirmState === 0) {
      setSaveButtonPopconfirmText(t('STORE_INFORMATION_SECOND_CONFIRM_TEXT'));
      setSaveButtonPopconfirmState(1);
    }
    if (saveButtonPopconfirmState === 1) {
      handleSubmit();
      setSaveButtonPopconfirmState(0);
      setSaveButtonPopconfirmText(t('STORE_INFORMATION_FIRST_CONFIRM_TEXT'));
    }
  };

  const handleCancelButtonPopconfirmClick = () => {
    setSaveButtonPopconfirmText(t('STORE_INFORMATION_FIRST_CONFIRM_TEXT'));
    setIsVisibleSaveButtonPopconfirm(false);
    setSaveButtonPopconfirmState(0);
  };

  const handleSaveButtonPopconfirmVisibleChange = newVisible => {
    if (saveButtonPopconfirmState === 0) {
      setIsVisibleSaveButtonPopconfirm(true);
    }
    if (saveButtonPopconfirmState === 1 && !newVisible) {
      setIsVisibleSaveButtonPopconfirm(newVisible);
    }
  };

  const showReleaseButton = () => (
    <Col>
      <Form.Item className="mb-0 mt-0">
        <Popconfirm
          key="submit"
          placement="topRight"
          title={t('RELEASE_CONFIRM_TEXT')}
          onConfirm={handleReleaseClick}
        >
          <Button size="small" type="primary" loading={isPending}>
            {t('RELEASE')}
          </Button>
        </Popconfirm>
      </Form.Item>
    </Col>
  );

  const showEditButtons = () => (isFormEditable ? (
    <>
      <Col>
        <Form.Item className="mb-0 mt-0">
          <Button size="small" onClick={handleCancelClick}>
            {t('CANCEL')}
          </Button>
        </Form.Item>
      </Col>
      <Col>
        <Form.Item className="mb-0 mt-0">
          <Popconfirm
            key="submit"
            placement="topRight"
            visible={isVisibleSaveButtonPopconfirm}
            onVisibleChange={handleSaveButtonPopconfirmVisibleChange}
            title={saveButtonPopconfirmText}
            onConfirm={handleSaveClick}
            onCancel={handleCancelButtonPopconfirmClick}
          >
            <Button
              id="storeInformationSaveButton"
              size="small"
              type="primary"
              loading={isPending}
            >
              {t('SAVE')}
            </Button>
          </Popconfirm>
        </Form.Item>
      </Col>
    </>
  ) : (
    <Col>
      <Form.Item className="mb-0 mt-0">
        <Button size="small" onClick={handleEditClick} loading={isPending}>
          {t('EDIT')}
        </Button>
      </Form.Item>
    </Col>
  ));

  return (
    <Can permKey={permKey}>
      <Row justify="end" gutter={[4, 4]}>
        {isShowReleaseButton ? showReleaseButton() : showEditButtons()}
      </Row>
    </Can>
  );
};

StoreInformationFooter.defaultProps = {
  isPending: false,
  isFormEditable: false,
  isShowReleaseButton: false,
  permKey: '',
  handleSubmit: () => null,
  handleReleaseClick: () => null,
  handleEditClick: () => null,
  handleCancelClick: () => null,
};

StoreInformationFooter.propTypes = {
  isPending: PropTypes.bool,
  isFormEditable: PropTypes.bool,
  isShowReleaseButton: PropTypes.bool,
  permKey: PropTypes.string,
  handleSubmit: PropTypes.func,
  handleReleaseClick: PropTypes.func,
  handleEditClick: PropTypes.func,
  handleCancelClick: PropTypes.func,
};

export default StoreInformationFooter;
