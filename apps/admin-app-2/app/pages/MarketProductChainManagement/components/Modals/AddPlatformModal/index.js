import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { Modal, Select } from '@shared/components/GUI';
import { getSelectFilterOption } from '@shared/utils/common';

import { Creators } from '@app/pages/MarketProductChainManagement/redux/actions';
import {
  selectModalCentralWarehouses,
  selectIsFetchingModalCentralWarehouses,
  selectModalCentralWarehousesError,
  selectIsCreatingPlatform,
  selectCreatePlatformError,
} from '@app/pages/MarketProductChainManagement/redux/reducer';

import useStyles from '../styles';

const AddPlatformModal = ({ openAddPlatformModal, setOpenAddPlatformModal }) => {
  const { t } = useTranslation('marketProductChainManagement');
  const dispatch = useDispatch();
  const classes = useStyles();

  const [selectedCentralWarehouse, setSelectedCentralWarehouse] = useState(null);

  const centralWarehouses = useSelector(selectModalCentralWarehouses);
  const isLoading = useSelector(selectIsFetchingModalCentralWarehouses);
  const error = useSelector(selectModalCentralWarehousesError);
  const isCreating = useSelector(selectIsCreatingPlatform);
  const createError = useSelector(selectCreatePlatformError);

  useEffect(() => {
    if (openAddPlatformModal) {
      dispatch(Creators.fetchModalCentralWarehousesRequest());
    }
  }, [dispatch, openAddPlatformModal]);

  const handleCancel = () => {
    setSelectedCentralWarehouse(null);
    setOpenAddPlatformModal(false);
  };

  const handleAddPlatform = () => {
    if (selectedCentralWarehouse) {
      const request = { centralWarehouses: [{ vertexId: selectedCentralWarehouse }] };
      dispatch(Creators.createPlatformRequest(request));
    }
  };

  const handleCentralWarehouseChange = value => {
    setSelectedCentralWarehouse(value);
  };

  const centralWarehouseOptions = centralWarehouses.map(warehouse => ({
    value: warehouse.id,
    label: warehouse.name,
    data: warehouse,
  }));

  return (
    <Modal
      visible={openAddPlatformModal}
      centered
      title={t('ADD_PLATFORM')}
      onCancel={handleCancel}
      okText={t('BUTTONS.SAVE')}
      className={classes.modal}
      closable={false}
      onOk={handleAddPlatform}
      okButtonProps={{ disabled: !selectedCentralWarehouse, loading: isCreating }}
    >
      <div className={classes.modalSubtitle}>
        {t('ADD_PLATFORM_SUBTITLE')}
      </div>
      <Select
        label={t('SELECT_A_CW_OR_DS')}
        name="addPlatform"
        autoComplete="off"
        allowClear
        showSearch
        loading={isLoading}
        disabled={isLoading || isCreating}
        error={error || createError}
        filterOption={getSelectFilterOption}
        optionsData={centralWarehouseOptions}
        value={selectedCentralWarehouse}
        onChange={handleCentralWarehouseChange}
      />
    </Modal>
  );
};

export default AddPlatformModal;
