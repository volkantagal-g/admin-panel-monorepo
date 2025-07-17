import { Button, Modal } from 'antd';

import { useTranslation } from 'react-i18next';

import { useState } from 'react';

import CityForm from './form';

function CityCreate() {
  const { t } = useTranslation('gisCountryCityManagementPage');

  const [isModalOpen, setModalOpen] = useState(false);

  const handleButtonClick = () => {
    setModalOpen(true);
  };

  const onModalCancel = () => {
    setModalOpen(false);
  };

  const renderModalForm = () => {
    return (
      <CityForm onModalChange={setModalOpen} />
    );
  };

  return (
    <>
      <Button data-testid="create-city-button-test" type="primary" onClick={handleButtonClick}> {t('CREATE_CITY')} </Button>
      <Modal
        title={t('CREATE_CITY_FORM')}
        visible={isModalOpen}
        getContainer={false}
        destroyOnClose
        centered
        onCancel={onModalCancel}
      >
        {renderModalForm()}
      </Modal>
    </>
  );
}

export default CityCreate;
