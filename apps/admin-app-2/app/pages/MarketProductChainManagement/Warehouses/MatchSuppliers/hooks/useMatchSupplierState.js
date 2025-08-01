import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Creators } from '../redux/actions';
import { matchSupplierSelector } from '../redux/selectors';

export const useMatchSupplierState = resetForms => {
  const dispatch = useDispatch();

  const warehouses = useSelector(matchSupplierSelector.getWarehouses);
  const editingPlatform = useSelector(matchSupplierSelector.getEditingPlatform);
  const selectedPlatforms = useSelector(matchSupplierSelector.getSelectedPlatforms);
  const matchedSuppliers = useSelector(matchSupplierSelector.getMatchedSuppliers);
  const unmatchedSuppliers = useSelector(matchSupplierSelector.getUnmatchedSuppliers);
  const initialMatchedSuppliers = useSelector(matchSupplierSelector.getInitialMatchedSuppliers);
  const matchedSearchValue = useSelector(matchSupplierSelector.getMatchedSearchValue);
  const unmatchedSearchValue = useSelector(matchSupplierSelector.getUnmatchedSearchValue);
  const selectedWarehouse = useSelector(matchSupplierSelector.getSelectedWarehouse);
  const loading = useSelector(matchSupplierSelector.getLoading);
  const error = useSelector(matchSupplierSelector.getError);

  const handleWarehouseChange = useCallback(value => {
    if (!value) {
      resetForms();
      return;
    }
    resetForms();
    dispatch(Creators.fetchWarehouseDataRequest(value));
  }, [dispatch, resetForms]);

  const handlePlatformChange = useCallback((value, recordId) => {
    const platformId = value ? String(value) : null;
    dispatch(Creators.updatePlatform(recordId, platformId));
  }, [dispatch]);

  const handleMoveToMatched = useCallback(record => {
    dispatch(Creators.moveSupplier(record.id, 'TO_MATCHED'));
  }, [dispatch]);

  const handleMoveToUnmatched = useCallback(record => {
    dispatch(Creators.moveSupplier(record.id, 'TO_UNMATCHED'));
  }, [dispatch]);

  const handleEditClick = useCallback(recordId => {
    dispatch(Creators.setEditingPlatform(recordId));
  }, [dispatch]);

  const handleSaveChanges = useCallback(() => {
    dispatch(Creators.saveChanges({
      matchedSuppliers,
      unmatchedSuppliers,
      selectedPlatforms,
    }));
  }, [dispatch, matchedSuppliers, unmatchedSuppliers, selectedPlatforms]);

  const hasChanges = useMemo(() => {
    if (matchedSuppliers.length !== initialMatchedSuppliers.length) return true;

    return matchedSuppliers.some(supplier => {
      const initialSupplier = initialMatchedSuppliers.find(s => s.id === supplier.id);
      const currentPlatform = supplier.selectedPlatform?.id || selectedPlatforms[supplier.id];
      return currentPlatform !== initialSupplier?.selectedPlatform?.id;
    });
  }, [matchedSuppliers, initialMatchedSuppliers, selectedPlatforms]);

  return {
    warehouses,
    editingPlatform,
    selectedPlatforms,
    matchedSuppliers,
    unmatchedSuppliers,
    initialMatchedSuppliers,
    matchedSearchValue,
    unmatchedSearchValue,
    selectedWarehouse,
    loading,
    error,
    hasChanges,

    handleWarehouseChange,
    handlePlatformChange,
    handleMoveToMatched,
    handleMoveToUnmatched,
    handleEditClick,
    handleSaveChanges,
  };
};
