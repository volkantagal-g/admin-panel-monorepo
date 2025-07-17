import { useCallback, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';

import { MOCK_PRODUCT_DATA } from '@app/pages/CommerceIntelligence/mockData';
import { Creators } from '../redux/actions';

export const useCheckboxLogic = () => {
  const dispatch = useDispatch();

  const [selectedProducts, setSelectedProducts] = useState(new Set());
  const [childSelectionMap, setChildSelectionMap] = useState(new Map());

  const productData = useMemo(() => MOCK_PRODUCT_DATA.data || [], []);
  const allProductIds = useMemo(() => productData.map(product => product.productId), [productData]);

  const productMap = useMemo(() => new Map(productData.map(p => [p.productId, p])), [productData]);

  const handleMasterCheckboxChange = useCallback(e => {
    if (e.target.checked) {
      setSelectedProducts(new Set(allProductIds));
      setChildSelectionMap(new Map());
    }
    else {
      setSelectedProducts(new Set());
      setChildSelectionMap(new Map());
    }
  }, [allProductIds]);

  const handleParentCheckboxChange = useCallback((productId, checked) => {
    setSelectedProducts(prev => {
      const newSet = new Set(prev);
      if (checked) {
        newSet.add(productId);
      }
      else {
        newSet.delete(productId);
      }
      return newSet;
    });

    if (!checked) {
      setChildSelectionMap(prev => {
        const newMap = new Map(prev);
        newMap.delete(productId);
        return newMap;
      });
    }
  }, []);

  const handleChildCheckboxChange = useCallback((parentProductId, childProductId, checked) => {
    const isParentSelected = selectedProducts.has(parentProductId);

    setChildSelectionMap(prev => {
      const newMap = new Map(prev);
      const currentSelection = newMap.get(parentProductId) || { selected: new Set(), deselected: new Set() };

      if (isParentSelected) {
        if (checked) {
          currentSelection.deselected.delete(childProductId);
        }
        else {
          currentSelection.deselected.add(childProductId);
        }
      }
      else if (checked) {
        currentSelection.selected.add(childProductId);
      }
      else {
        currentSelection.selected.delete(childProductId);
      }

      if (currentSelection.selected.size === 0 && currentSelection.deselected.size === 0) {
        newMap.delete(parentProductId);
      }
      else {
        newMap.set(parentProductId, currentSelection);
      }

      return newMap;
    });
  }, [selectedProducts]);

  const getParentCheckboxState = useCallback(productId => {
    const isParentSelected = selectedProducts.has(productId);
    const product = productMap.get(productId);
    const totalChildren = product?.competitor?.length || 0;

    if (totalChildren === 0) {
      return { checked: isParentSelected, indeterminate: false };
    }

    if (isParentSelected) {
      const childSelection = childSelectionMap.get(productId);
      const deselectedCount = childSelection?.deselected?.size || 0;
      const hasDeselected = deselectedCount > 0;

      return {
        checked: !hasDeselected,
        indeterminate: hasDeselected,
      };
    }

    const childSelection = childSelectionMap.get(productId);
    const selectedCount = childSelection?.selected?.size || 0;

    if (selectedCount === 0) {
      return { checked: false, indeterminate: false };
    }

    return {
      checked: selectedCount === totalChildren,
      indeterminate: selectedCount < totalChildren,
    };
  }, [selectedProducts, childSelectionMap, productMap]);

  const getMasterCheckboxState = useCallback(() => {
    const totalProducts = allProductIds.length;
    const selectedCount = selectedProducts.size;

    if (selectedCount === totalProducts) {
      return { checked: true, indeterminate: false };
    }

    const hasAnySelection = selectedCount > 0 || childSelectionMap.size > 0;

    return {
      checked: false,
      indeterminate: hasAnySelection,
    };
  }, [selectedProducts, childSelectionMap, allProductIds]);

  const getChildCheckboxState = useCallback((parentProductId, childProductId) => {
    const isParentSelected = selectedProducts.has(parentProductId);
    const childSelection = childSelectionMap.get(parentProductId);

    if (isParentSelected) {
      return !childSelection?.deselected?.has(childProductId);
    }

    return childSelection?.selected?.has(childProductId) || false;
  }, [selectedProducts, childSelectionMap]);

  const getTotalSelectedCount = useCallback(() => {
    let totalCount = 0;

    Array.from(selectedProducts).forEach(parentId => {
      const product = productMap.get(parentId);
      const totalChildren = product?.competitor?.length || 0;
      const childSelection = childSelectionMap.get(parentId);
      const deselectedCount = childSelection?.deselected?.size || 0;

      totalCount += totalChildren - deselectedCount;
    });

    Array.from(childSelectionMap.entries()).forEach(([parentId, selection]) => {
      if (!selectedProducts.has(parentId)) {
        totalCount += selection.selected?.size || 0;
      }
    });

    return totalCount;
  }, [selectedProducts, childSelectionMap, productMap]);

  const isRowSelected = useCallback(productId => {
    return selectedProducts.has(productId) || childSelectionMap.has(productId);
  }, [selectedProducts, childSelectionMap]);

  const isChildRowSelected = useCallback((parentProductId, childProductId) => {
    return getChildCheckboxState(parentProductId, childProductId);
  }, [getChildCheckboxState]);

  const clearAllSelections = useCallback(() => {
    setSelectedProducts(new Set());
    setChildSelectionMap(new Map());
  }, []);

  const handleBulkDelete = useCallback(() => {
    dispatch(Creators.bulkDeleteMatches());
    clearAllSelections();
  }, [dispatch, clearAllSelections]);

  const handleBulkMatch = useCallback(() => {
    dispatch(Creators.bulkDirectMatch());
    clearAllSelections();
  }, [dispatch, clearAllSelections]);

  return useMemo(() => ({
    selectedProducts,
    childSelectionMap,
    handleMasterCheckboxChange,
    handleParentCheckboxChange,
    handleChildCheckboxChange,
    getParentCheckboxState,
    getMasterCheckboxState,
    getChildCheckboxState,
    getTotalSelectedCount,
    isRowSelected,
    isChildRowSelected,
    clearAllSelections,
    handleBulkDelete,
    handleBulkMatch,
  }), [
    selectedProducts,
    childSelectionMap,
    handleMasterCheckboxChange,
    handleParentCheckboxChange,
    handleChildCheckboxChange,
    getParentCheckboxState,
    getMasterCheckboxState,
    getChildCheckboxState,
    getTotalSelectedCount,
    isRowSelected,
    isChildRowSelected,
    clearAllSelections,
    handleBulkDelete,
    handleBulkMatch,
  ]);
};
