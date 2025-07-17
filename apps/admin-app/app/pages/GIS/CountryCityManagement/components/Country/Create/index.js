import { Button, Modal } from 'antd';

import { useTranslation } from 'react-i18next';

import { useState } from 'react';

import CountryForm from './form';

function CountryCreate() {
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
      <CountryForm onModalChange={setModalOpen} />
    );
  };

  return (
    <>
      <Button data-testid="create-country-button-test" type="primary" onClick={handleButtonClick}> {t('CREATE_COUNTRY')} </Button>
      <Modal
        title={t('CREATE_COUNTRY_FORM')}
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

export default CountryCreate;
