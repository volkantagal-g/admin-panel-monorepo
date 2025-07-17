import { useTranslation } from 'react-i18next';

import { Button, Row } from 'antd';

import { useState } from 'react';

import Card from '@shared/components/UI/AntCard';
import { transferPrepColumns, shippingFreqColumns } from './config';
import AntTableV2 from '@shared/components/UI/AntTableV2';
import ShipmentFrequenciesModal from './ShipmentFrequenciesModal';
import ShipmentPreparationModal from './ShipmentPreparationModal';
import { getLangKey } from '@shared/i18n';
import { usePermission } from '@shared/hooks';
import permKey from '@shared/shared/permKey.json';

function ShippingData({
  shippingFrequency,
  transferPreparation,
  onCreateShipmentFrequency,
  onCreateShipmentPreparation,
  onUpdateShipmentFrequency,
  onUpdateShipmentPreparation,
}) {
  const { t } = useTranslation();
  const { canAccess } = usePermission();

  const [currentShipFreq, setCurrentShipFreq] = useState();
  const [currentShipPrep, setCurrentShipPrep] = useState();
  const [isFrequencyModalVisible, setIsFrequencyModalVisible] = useState(false);
  const [isPreparationModalVisible, setIsPreparationModalVisible] = useState(false);

  const hasPermission = canAccess(permKey.PAGE_WAREHOUSE_DETAIL_UPDATE_SHIPMENT_DATA);

  const createNewShippingFrequency = () => {
    setCurrentShipFreq(null);
    setIsFrequencyModalVisible(true);
  };
  const createNewShipmentPreparation = () => {
    setCurrentShipPrep(null);
    setIsPreparationModalVisible(true);
  };
  const closeModal = () => {
    setIsFrequencyModalVisible(false);
    setIsPreparationModalVisible(false);
  };

  const submitFreqRequest = value => {
    if (currentShipFreq) {
      onUpdateShipmentFrequency({ ...value, id: currentShipFreq._id });
    }
    else {
      onCreateShipmentFrequency(value);
    }
  };

  const submitPrepRequest = value => {
    if (currentShipPrep) {
      onUpdateShipmentPreparation({ ...value, id: currentShipPrep._id });
    }
    else {
      onCreateShipmentPreparation(value);
    }
  };

  const editShippingFrequency = value => {
    setCurrentShipFreq(value);
    setIsFrequencyModalVisible(true);
  };

  const editTransferPreparation = value => {
    setCurrentShipPrep(value);
    setIsPreparationModalVisible(true);
  };
  return (
    <Card title={t('warehousePage:SHIPPING_DATA')}>
      { hasPermission && (
        <Row gutter={[8, 8]} justify="end">
          <Button onClick={createNewShippingFrequency}>{t('warehousePage:NEW_SHIPPING_FREQUENCY')}</Button>
        </Row>
      )}

      <AntTableV2
        title={t('warehousePage:SHIPPING_FREQUENCY')}
        data={shippingFrequency}
        columns={shippingFreqColumns({ disabled: !hasPermission, editShippingFrequency, lang: getLangKey() })}
      />
      { hasPermission && (
        <Row gutter={[8, 8]} justify="end">
          <Button disabled={!hasPermission} onClick={createNewShipmentPreparation}>{t('warehousePage:NEW_SHIPPING_PREPARATION')}</Button>
        </Row>
      )}
      <AntTableV2
        title={t('warehousePage:SHIPPING_PREPARATION')}
        data={transferPreparation}
        columns={transferPrepColumns({ disabled: !hasPermission, editTransferPreparation })}
      />
      <ShipmentFrequenciesModal data={currentShipFreq} isModalVisible={isFrequencyModalVisible} closeModal={closeModal} submitRequest={submitFreqRequest} />
      <ShipmentPreparationModal data={currentShipPrep} isModalVisible={isPreparationModalVisible} closeModal={closeModal} submitRequest={submitPrepRequest} />
    </Card>
  );
}

export default ShippingData;
