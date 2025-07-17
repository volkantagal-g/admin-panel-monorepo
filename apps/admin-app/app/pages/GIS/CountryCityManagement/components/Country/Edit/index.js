import { Button, Col, Input, Modal, Row } from 'antd';
import { useDispatch } from 'react-redux';

import { useTranslation } from 'react-i18next';

import { useState } from 'react';

import { Creators } from '@app/pages/GIS/CountryCityManagement/redux/actions';

const { TextArea } = Input;

const CountryEdit = props => {
  const { t } = useTranslation('gisCountryCityManagementPage');

  const { record } = props;
  const { id, operational, _id, center, wasOperational, ...restOfRecord } = record;

  const updatedCenter = {
    center: {
      geometry: {
        type: 'Point',
        coordinates: center.coordinates,
      },
    },
  };

  const updatedRecord = { ...restOfRecord, ...updatedCenter };

  const dispatch = useDispatch();

  const [jsonInputCountry, setJsonInputCountry] = useState(JSON.stringify(updatedRecord, null, 2));
  const [isFormModalOpen, setFormModalOpen] = useState(false);
  const [isConfirmModalOpen, setConfirmModalOpen] = useState(false);

  const handleEditButtonClick = () => {
    setFormModalOpen(true);
  };

  const onEditModalCancel = () => {
    setFormModalOpen(false);
  };

  const updateCountry = () => {
    setConfirmModalOpen(true);
  };

  const handleConfirmOkButton = () => {
    try {
      const editedJSON = JSON.parse(jsonInputCountry);
      setJsonInputCountry(JSON.stringify(editedJSON, null, 2));
      dispatch(Creators.updateCountryRequest({ id: record.id, updatedData: editedJSON }));
      setFormModalOpen(false);
      setConfirmModalOpen(false);
    }
    catch (error) {
      setConfirmModalOpen(true);
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
            data-testid="edit-country-textArea-test"
            value={jsonInputCountry}
            autoSize={{ minRows: 18, maxRows: 18 }}
            onChange={e => setJsonInputCountry(e.target.value)}
          />
          <Button
            data-testid="update-country-button"
            onClick={updateCountry}
            type="default"
            block
          >
            {t('UPDATE_COUNTRY')}
          </Button>
        </Col>
        <Modal
          data-testid="confirm-modal-update-country"
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
        data-testid={`country-info-button-${record.id}`}
        type="primary"
        onClick={handleEditButtonClick}
      >
        {t('INFO')}
      </Button>
      <Modal
        title={t('Update_Country')}
        visible={isFormModalOpen}
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

export default CountryEdit;
