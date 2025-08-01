import React from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { AddRemoveRelationalPromosModal } from '@app/pages/Promo/components/AddRemoveRelationalPromosModal';
import { ChildrenPromosSlice } from '@app/pages/Promo/Detail/components/ChildPromos/slice';
import { SelectionMode } from '@app/pages/Promo/components/AddRemoveRelationalPromosModal/PromoSelectionPane';

export function AddRemoveChildPromosModal() {
  const dispatch = useDispatch();

  const children = useSelector(ChildrenPromosSlice.selectors.children);
  const isPending = useSelector(ChildrenPromosSlice.selectors.isPending);
  const isModalVisible = useSelector(ChildrenPromosSlice.selectors.modalVisible);

  const onCancel = () => {
    if (!isPending) {
      dispatch(ChildrenPromosSlice.actions.setResultModalVisible(false));
    }
  };

  const onOk = (mode: SelectionMode) => {
    if (mode === 'add') {
      dispatch(ChildrenPromosSlice.actions.addSelectedPromos());
    }
    else {
      dispatch(ChildrenPromosSlice.actions.removeSelectedPromos('modal'));
    }
  };

  const onModeChange = () => {
    dispatch(ChildrenPromosSlice.actions.setSelectedAddRemoveOptions([]));
  };

  const onOpen = () => {
    dispatch(ChildrenPromosSlice.actions.setResultModalVisible(true));
  };

  const onChange = (values: MongoIDType[]) => {
    dispatch(ChildrenPromosSlice.actions.setSelectedAddRemoveOptions(values));
  };

  const value = useSelector(ChildrenPromosSlice.selectors.addRemoveSelected);

  return (
    <AddRemoveRelationalPromosModal
      slice="add-remove-child-promos"
      onOk={onOk}
      onCancel={onCancel}
      onModeChange={onModeChange}
      onOpen={onOpen}
      visible={isModalVisible}
      loading={isPending}
      onChange={onChange}
      value={value}
      existingOptions={children ?? []}
      isParentPromo={false}
    />
  );
}
