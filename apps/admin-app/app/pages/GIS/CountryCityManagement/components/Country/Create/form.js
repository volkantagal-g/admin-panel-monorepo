import { useState } from 'react';
import { Row, Col, Button, Input, Modal } from 'antd';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import { defaultValues } from './formHelper';
import { Creators } from '@app/pages/GIS/CountryCityManagement/redux/actions';

const { TextArea } = Input;

const CountryForm = ({ onModalChange }) => {
  const [jsonInput, setJsonInput] = useState(JSON.stringify(defaultValues, null, 2));
  const [isConfirmModalOpen, setConfirmModalOpen] = useState(false);
  const [isInvalidJSON, setIsInvalidJSON] = useState(false);

  const dispatch = useDispatch();
  const { t } = useTranslation('gisCountryCityManagementPage');

  const handleCreateButtonClick = () => {
    setConfirmModalOpen(true);
  };

  const handleConfirmOkButton = () => {
    try {
      const editedJSON = JSON.parse(jsonInput);
      setJsonInput(JSON.stringify(editedJSON, null, 2));
      dispatch(Creators.createCountryRequest({ body: editedJSON }));
      setConfirmModalOpen(false);
      onModalChange(false);
      setIsInvalidJSON(false);
    }
    catch (error) {
      setIsInvalidJSON(true);
    }
  };

  const handleConfirmCancelButton = () => {
    setConfirmModalOpen(false);
  };

  return (
    <Row gutter={[16]}>
      <Col span={24}>
        <TextArea
          data-testid="create-country-textArea-test"
          value={jsonInput}
          autoSize={{ minRows: 18, maxRows: 18 }}
          onChange={e => {
            setJsonInput(e.target.value);
            setIsInvalidJSON(false);
          }}
        />
        <Button
          data-testid="create-country-button"
          onClick={handleCreateButtonClick}
          type="default"
          block
          disabled={isInvalidJSON}
        >
          {t('CREATE_COUNTRY')}
        </Button>
      </Col>
      <Modal
        title={t('CONFIRM_MODAL_TITLE')}
        visible={isConfirmModalOpen}
        onOk={handleConfirmOkButton}
        onCancel={handleConfirmCancelButton}
        data-testid="confirm-modal-create-country"
      />
    </Row>
  );
};

export default CountryForm;
