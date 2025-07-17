import { useState, useEffect } from 'react';
import { Row, Col, Button, Input, Modal } from 'antd';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { defaultCityValues } from './formHelper';
import { Creators } from '@app/pages/GIS/CountryCityManagement/redux/actions';
import { countryCityManagementSelector } from '../../../redux/selectors';

const { TextArea } = Input;

const CityForm = ({ onModalChange }) => {
  const countryId = useSelector(countryCityManagementSelector.selectedCountryId);

  const [jsonInput, setJsonInput] = useState('');
  const [isConfirmModalOpen, setConfirmModalOpen] = useState(false);

  const dispatch = useDispatch();
  const { t } = useTranslation('gisCountryCityManagementPage');

  useEffect(() => {
    const defaultValuesWithCountryId = {
      countryId: countryId.id || '',
      ...defaultCityValues,
    };
    setJsonInput(JSON.stringify(defaultValuesWithCountryId, null, 2));
  }, [countryId]);

  const handleCreateButtonClick = () => {
    setConfirmModalOpen(true);
  };

  const handleConfirmOkButton = () => {
    try {
      const editedJSON = JSON.parse(jsonInput);
      setJsonInput(JSON.stringify(editedJSON, null, 2));
      dispatch(Creators.createCityRequest({ body: editedJSON }));
      setConfirmModalOpen(false);
      onModalChange(false);
    }
    catch (error) {
      setConfirmModalOpen(true);
    }
  };

  const handleConfirmCancelButton = () => {
    setConfirmModalOpen(false);
  };

  return (
    <Row gutter={[16]}>
      <Col span={24}>
        <TextArea
          data-testid="create-city-textArea-test"
          value={jsonInput}
          autoSize={{ minRows: 18, maxRows: 18 }}
          onChange={e => {
            setJsonInput(e.target.value);
          }}
        />
        <Button
          data-testid="create-city-test-submit"
          onClick={handleCreateButtonClick}
          type="default"
          block
        >
          {t('CREATE_CITY')}
        </Button>
      </Col>
      <Modal
        title={t('CONFIRM_MODAL_TITLE')}
        visible={isConfirmModalOpen}
        onOk={handleConfirmOkButton}
        onCancel={handleConfirmCancelButton}
        data-testid="confirm-create-modal-city"
      />
    </Row>
  );
};

export default CityForm;
