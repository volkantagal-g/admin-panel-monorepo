import { Button, Col, Descriptions, Space } from 'antd';
import { useTranslation } from 'react-i18next';

import { usePermission } from '@shared/hooks';
import Card from '@shared/components/UI/AntCard';
import { PICKER_WORKING_TYPES, PICKER_STATUSES } from '@shared/shared/constants';
import permKey from '@shared/shared/permKey.json';

import useStyles from './styles';

function CurrentJob({ onPickerRelease, job }) {
  const { t } = useTranslation('pickerDetailPage');
  const { canAccess } = usePermission();
  const classes = useStyles();

  const isReleasable = job?.status === PICKER_STATUSES.WORKING;
  const isAuthorizedToSetPickerFree = canAccess(permKey.PAGE_PICKER_DETAIL_SET_PICKER_FREE);

  const isCurrentJobPickingForOrder = job?.workingType === PICKER_WORKING_TYPES.PICKING_FOR_ORDER;
  const isCurrentJobInventoryCheck = job?.workingType === PICKER_WORKING_TYPES.INVENTORY_CHECK;
  const inventoryCheckProduct = job?.inventoryCheck?.product?._id;
  const inventoryCheckLocation = job?.inventoryCheck?.locationBarcode;
  const isCurrentJobTransfer = job?.workingType === PICKER_WORKING_TYPES.TRANSFER;
  const isCurrentJobRemoveFromSale = job?.workingType === PICKER_WORKING_TYPES.REMOVE_FROM_SALE;
  const isCurrentJobSupplyInboundDelivery = job?.workingType === PICKER_WORKING_TYPES.SUPPLY_INBOUND_DELIVERY;
  const isCurrentJobCorporateSalesOBD = job?.workingType === PICKER_WORKING_TYPES.CORPORATE_SALES_OBD;
  const isCurrentJobGstoreInventoryCheck = job?.workingType === PICKER_WORKING_TYPES.GSTORE_INVENTORY_CHECK;
  const isCurrentJobTransferInboundDelivery = job?.workingType === PICKER_WORKING_TYPES.TRANSFER_INBOUND_DELIVERY;
  const isCurrentJobTransferOutboundDelivery = job?.workingType === PICKER_WORKING_TYPES.TRANSFER_OUTBOUND_DELIVERY;

  return (
    <Col span={24}>
      <Card title={t('CURRENT_JOB')}>
        <Descriptions column={{ xs: 1, md: 1 }} bordered size="small">
          {isCurrentJobPickingForOrder && (
          <Descriptions.Item label={t('PICKING_FOR_MARKET_ORDER')}>
            {job?.marketOrder?._id}
          </Descriptions.Item>
          )}
          {isCurrentJobInventoryCheck && (
            <Descriptions.Item label={t('INVENTORY_CHECK')}>
              {job?.inventoryCheck?._id}
            </Descriptions.Item>
          )}
          {inventoryCheckProduct && (
            <Descriptions.Item label={t('PRODUCT')}>
              {inventoryCheckProduct}
            </Descriptions.Item>
          )}
          {inventoryCheckLocation && (
            <Descriptions.Item label={t('LOCATION')}>
              {inventoryCheckLocation}
            </Descriptions.Item>
          )}
          {isCurrentJobTransfer && (
            <>
              <Descriptions.Item label={t('TRANSFER')}>
                {job?.transfer?.palletBarcode ||
                  job?.transfer?.palletBarcodes.join(', ')}
              </Descriptions.Item>
              <Descriptions.Item label={t('ID')}>
                {job?.transfer?._id}
              </Descriptions.Item>
            </>
          )}
          {isCurrentJobRemoveFromSale && (
          <Descriptions.Item label={t('REMOVE_FROM_SALE')}>
            {job?.removeFromSale?._id}
          </Descriptions.Item>
          )}
          {isCurrentJobSupplyInboundDelivery && (
            <Descriptions.Item label={t('SUPPLY_INBOUND_DELIVERY')}>
              {job?.inboundDelivery?._id}
            </Descriptions.Item>
          )}
          {isCurrentJobCorporateSalesOBD && (
            <Descriptions.Item label={t('CORPORATE_SALES_OBD')}>
              {job?.outboundDelivery?._id}
            </Descriptions.Item>
          )}
          {isCurrentJobGstoreInventoryCheck && (
          <Descriptions.Item label={t('GSTORE_INVENTORY_CHECK')}>
            {job?.inventoryCheck?._id}
          </Descriptions.Item>
          )}
          {isCurrentJobTransferInboundDelivery && (
            <Descriptions.Item label={t('TRANSFER_INBOUND_DELIVERY')}>
              {job?.transferInboundDelivery?._id}
            </Descriptions.Item>
          )}
          {isCurrentJobTransferOutboundDelivery && (
          <Descriptions.Item label={t('TRANSFER_OUTBOUND_DELIVERY')}>
            {job?.transferOutboundDelivery?._id}
          </Descriptions.Item>
          )}
        </Descriptions>
        {isAuthorizedToSetPickerFree && (
        <Space align="end" className={classes.alignEnd}>
          <Button disabled={!isReleasable} onClick={onPickerRelease}>
            {t('RELEASE_PICKER')}
          </Button>
        </Space>
        )}
      </Card>
    </Col>
  );
}

export default CurrentJob;
