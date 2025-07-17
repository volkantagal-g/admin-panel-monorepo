import { Button, Col, Input, Modal, Row } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import { useTranslation } from 'react-i18next';

import { useState } from 'react';

import { Creators } from '@app/pages/GIS/CountryCityManagement/redux/actions';
import { countryCityManagementSelector } from '../../../redux/selectors';

const { TextArea } = Input;

const CityEdit = props => {
  const { record } = props;
  const countryId = useSelector(countryCityManagementSelector.selectedCountryId);

  const transformedCity = {
    countryId: countryId.id || '',
    name: record.name,
    center: {
      geometry: {
        type: record.center.geometry.type,
        coordinates: record.center.coordinates,
      },
      zoomRatio: record.center.zoomRatio,
    },
    timezone: record.timezone,
    plate: record.plate,
    operationalDomainTypes: record.operationalDomainTypes || [],
    wasOperationalDomainTypes: record.wasOperationalDomainTypes || [],
  };

  const { t } = useTranslation('gisCountryCityManagementPage');
  const dispatch = useDispatch();

  const [jsonInputCity, setJsonInputCity] = useState(JSON.stringify(transformedCity, null, 2));
  const [isFormModalOpen, setFormModalOpen] = useState(false);
  const [isConfirmModalOpen, setConfirmModalOpen] = useState(false);

  const handleEditButtonClick = () => {
    setFormModalOpen(true);
  };

  const onEditModalCancel = () => {
    setFormModalOpen(false);
  };

  const updateCity = () => {
    setConfirmModalOpen(true);
  };

  const handleConfirmOkButton = () => {
    try {
      const editedJSON = JSON.parse(jsonInputCity);
      setJsonInputCity(JSON.stringify(editedJSON, null, 2));
      dispatch(Creators.updateCityRequest({ id: record.id, updatedData: editedJSON }));
      setFormModalOpen(false);
      setConfirmModalOpen(false);
    }
    catch (error) {
      setFormModalOpen(true);
    }
  };

  const handleConfirmCancelButton = () => {
    setConfirmModalOpen(false);
  };

  const renderUpdateModalForm = () => {
    return (
      <Row gutter={[16]}>
        <Col span={24}>
          <TextArea
            data-testid="edit-city-textArea-test"
            value={jsonInputCity}
            autoSize={{ minRows: 18, maxRows: 18 }}
            onChange={e => {
              setJsonInputCity(e.target.value);
            }}
          />
          <Button
            data-testid="update-city-button"
            onClick={updateCity}
            type="default"
            block
          >
            {t('UPDATE_CITY')}
          </Button>
        </Col>
        <Modal
          data-testid="confirm-modal-update-city"
          title={t('CONFIRM_MODAL_TITLE')}
          visible={isConfirmModalOpen}
          onOk={handleConfirmOkButton}
          onCancel={handleConfirmCancelButton}
        />
      </Row>
    );
  };

  return (
    <>
      <Button
        data-testid={`city-info-button-${record.id}`}
        type="primary"
        onClick={handleEditButtonClick}
      >
        {t('INFO')}
      </Button>
      <Modal
        data-testid="create-modal"
        title={t('UPDATE_CITY')}
        visible={isFormModalOpen}
        footer={[]}
        getContainer={false}
        destroyOnClose
        centered
        onCancel={onEditModalCancel}
      >
        {renderUpdateModalForm()}
      </Modal>
    </>

  );
};

export default CityEdit;
