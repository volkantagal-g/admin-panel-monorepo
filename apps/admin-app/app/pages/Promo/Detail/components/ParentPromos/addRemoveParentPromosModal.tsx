import React from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { AddRemoveRelationalPromosModal } from '@app/pages/Promo/components/AddRemoveRelationalPromosModal';
import { SelectionMode } from '@app/pages/Promo/components/AddRemoveRelationalPromosModal/PromoSelectionPane';
import { PromoDetailSlice } from '@app/pages/Promo/Detail/redux/slice';
import { ParentPromosSlice } from '@app/pages/Promo/Detail/components/ParentPromos/slice';

export function AddRemoveParentPromosModal() {
  const dispatch = useDispatch();

  const parents = useSelector(PromoDetailSlice.selectors.parents);
  const isPending = useSelector(ParentPromosSlice.selectors.isPending);
  const isModalVisible = useSelector(ParentPromosSlice.selectors.modalVisible);

  const onCancel = () => {
    if (!isPending) {
      dispatch(ParentPromosSlice.actions.setResultModalVisible(false));
    }
  };

  const onOk = (mode: SelectionMode) => {
    if (mode === 'add') {
      dispatch(ParentPromosSlice.actions.addSelectedPromos());
    }
    else {
      dispatch(ParentPromosSlice.actions.removeSelectedPromos('modal'));
    }
  };

  const onModeChange = () => {
    dispatch(ParentPromosSlice.actions.setSelectedAddRemoveOptions([]));
  };

  const onOpen = () => {
    dispatch(ParentPromosSlice.actions.setResultModalVisible(true));
  };

  const onChange = (values: MongoIDType[]) => {
    dispatch(ParentPromosSlice.actions.setSelectedAddRemoveOptions(values));
  };

  const value = useSelector(ParentPromosSlice.selectors.addRemoveSelected);

  return (
    <AddRemoveRelationalPromosModal
      slice="add-remove-parent-promos"
      onOk={onOk}
      onCancel={onCancel}
      onModeChange={onModeChange}
      onOpen={onOpen}
      visible={isModalVisible}
      loading={isPending}
      onChange={onChange}
      value={value}
      existingOptions={parents}
      isParentPromo
    />
  );
}
