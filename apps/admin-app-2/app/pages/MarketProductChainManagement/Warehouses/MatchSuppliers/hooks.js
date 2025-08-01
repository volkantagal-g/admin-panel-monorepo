import { useCallback, useMemo, useState } from 'react';

import {
  INITIAL_STATE,
  getResetState,
  getUpdatedMoveState,
  getUpdatedPlatformState,
  getUpdatedStateForWarehouse,
} from './utils';

export const useMatchSuppliers = (form, unmatchedForm) => {
  const [state, setState] = useState(INITIAL_STATE);

  const stateValues = useMemo(() => ({
    matchedSuppliers: state.matchedSuppliers,
    unmatchedSuppliers: state.unmatchedSuppliers,
    selectedPlatforms: state.selectedPlatforms,
  }), [state.matchedSuppliers, state.unmatchedSuppliers, state.selectedPlatforms]);

  const handleStateUpdate = useCallback(updates => {
    setState(prev => ({
      ...prev,
      ...updates,
    }));
  }, []);

  const handleWarehouseChange = useCallback(value => {
    form.resetFields();
    unmatchedForm.resetFields();

    handleStateUpdate(
      value ? getUpdatedStateForWarehouse(value) : getResetState(),
    );
  }, [form, unmatchedForm, handleStateUpdate]);

  const handlePlatformChange = useCallback((value, supplierId) => {
    if (!value) return;

    const { matchedSuppliers, selectedPlatforms } = stateValues;
    handleStateUpdate(
      getUpdatedPlatformState(matchedSuppliers, selectedPlatforms, supplierId, value),
    );
  }, [stateValues, handleStateUpdate]);

  const handleMoveToMatched = useCallback(record => {
    const { matchedSuppliers, unmatchedSuppliers } = stateValues;
    handleStateUpdate(
      getUpdatedMoveState(matchedSuppliers, unmatchedSuppliers, record, true),
    );
  }, [stateValues, handleStateUpdate]);

  const handleMoveToUnmatched = useCallback(record => {
    const { matchedSuppliers, unmatchedSuppliers } = stateValues;
    handleStateUpdate(
      getUpdatedMoveState(matchedSuppliers, unmatchedSuppliers, record, false),
    );
  }, [stateValues, handleStateUpdate]);

  const handleMatchedFormChange = useCallback((_, allValues) => {
    handleStateUpdate({ matchedSearchValue: allValues.matchedSearch || '' });
  }, [handleStateUpdate]);

  const handleUnmatchedFormChange = useCallback((_, allValues) => {
    handleStateUpdate({ unmatchedSearchValue: allValues.unmatchedSearch || '' });
  }, [handleStateUpdate]);

  const handleEditClick = useCallback(recordId => {
    handleStateUpdate({ editingPlatform: recordId });
  }, [handleStateUpdate]);

  const handlers = useMemo(() => ({
    handleWarehouseChange,
    handlePlatformChange,
    handleMoveToMatched,
    handleMoveToUnmatched,
    handleMatchedFormChange,
    handleUnmatchedFormChange,
    handleEditClick,
  }), [
    handleWarehouseChange,
    handlePlatformChange,
    handleMoveToMatched,
    handleMoveToUnmatched,
    handleMatchedFormChange,
    handleUnmatchedFormChange,
    handleEditClick,
  ]);

  return {
    state,
    handlers,
  };
};
