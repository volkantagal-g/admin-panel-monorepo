import { useState } from 'react';
import { Button } from 'antd';
import { useTranslation } from 'react-i18next';

import { useParams } from 'react-router-dom';

import AssetRepairHistoryModal from '../AssetRepairHistoryModal';

const AssetRepairHistoryButton = ({ record }) => {
  const { t } = useTranslation(['assetPage', 'global']);
  const [showModal, setShowModal] = useState(false);
  const { assetId } = useParams();

  const showAssetRepairHistoryModal = () => {
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <>
      <Button onClick={showAssetRepairHistoryModal}>{t('DETAIL')}</Button>
      { showModal && <AssetRepairHistoryModal assetId={assetId} handleClose={handleClose} record={record} isEditMode /> }
    </>
  );
};

export default AssetRepairHistoryButton;
