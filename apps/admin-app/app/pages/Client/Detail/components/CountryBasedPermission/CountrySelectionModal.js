import { memo } from 'react';
import { Modal } from 'antd';
import { useTranslation } from 'react-i18next';

import ClientDetailCountrySelection from './ClientDetailCountrySelection';

const CountrySelectionModal = ({
  countries,
  isModalVisible,
  setIsModalVisible,
}) => {
  const { t } = useTranslation('clientDetail');

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <Modal
      title={t("COUNTRY_SELECTION.SELECT_COUNTRY")}
      visible={isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={false}
      closable={false}
      maskClosable={false}
    >
      <p>
        {t("COUNTRY_SELECTION.NO_DATA_MESSAGE")}
      </p>
      <ClientDetailCountrySelection countries={countries} />
    </Modal>
  );
};

export default memo(CountrySelectionModal);