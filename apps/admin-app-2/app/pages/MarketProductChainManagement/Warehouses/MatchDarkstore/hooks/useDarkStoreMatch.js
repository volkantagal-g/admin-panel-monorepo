import { useCallback } from 'react';

import { ITEM_TYPES } from '@app/pages/MarketProductChainManagement/constants';

const useDarkStoreMatch = (stableValues, stableCentralWarehouses) => {
  const getOriginalDefaultValue = useCallback((item, darkStore, type = ITEM_TYPES.PRODUCT) => {
    const isCategory = type === ITEM_TYPES.CATEGORY;
    const defaultId = isCategory ? item.defaultCWId : item.centralWarehouse?.id;
    if (!defaultId) return undefined;

    const matchedWarehouse = stableCentralWarehouses.find(cw => cw.value === defaultId ||
      cw.warehouseDetails?.id === defaultId ||
      cw.warehouseDetails?.warehouseId === defaultId);

    return matchedWarehouse?.value;
  }, [stableCentralWarehouses]);

  const isDarkStoreMarkedForRemoval = useCallback(darkStore => {
    return stableValues.changes.some(change => change.darkStore === darkStore.name &&
      !change.product &&
      !change.categoryName &&
      change.darkstoreIsDelete === true);
  }, [stableValues.changes]);

  const isCategoryMarkedForRemoval = useCallback((darkStore, category) => {
    return stableValues.changes.some(change => change.darkStore === darkStore.name &&
      change.productDetails?.id === category.id &&
      change.isCategory === true &&
      change.masterCategoryIsDelete === true);
  }, [stableValues.changes]);

  const isProductMarkedForRemoval = useCallback((darkStore, product) => {
    return stableValues.changes.some(change => change.darkStore === darkStore.name &&
      change.productDetails?.id === product.id &&
      !change.isCategory &&
      change.productIsDelete === true);
  }, [stableValues.changes]);

  const getCentralWarehouseValue = useCallback((item, darkStore, type = ITEM_TYPES.PRODUCT) => {
    const isCategory = type === ITEM_TYPES.CATEGORY;
    const itemId = item.id;

    const existingChange = stableValues.changes.find(change => change.darkStore === darkStore.name &&
      change.productDetails?.id === itemId &&
      change.isCategory === isCategory);

    if (existingChange) {
      if (existingChange.productIsDelete === true || existingChange.masterCategoryIsDelete === true) {
        return undefined;
      }

      if (existingChange.centralWarehouse === null || existingChange.centralWarehouse === undefined) {
        return undefined;
      }
      return existingChange.centralWarehouse;
    }

    const defaultId = isCategory ? item.defaultCWId : item.centralWarehouse?.id;
    if (!defaultId) return undefined;

    const matchedWarehouse = stableCentralWarehouses.find(cw => cw.value === defaultId ||
      cw.warehouseDetails?.id === defaultId ||
      cw.warehouseDetails?.warehouseId === defaultId);

    return matchedWarehouse?.value;
  }, [stableValues.changes, stableCentralWarehouses]);

  const handleDarkstoreRemove = useCallback((darkStore, changes) => {
    const existingChangeIndex = changes.findIndex(change => change.darkStore === darkStore.name &&
      !change.product &&
      !change.categoryName &&
      change.darkstoreIsDelete === true);

    if (existingChangeIndex !== -1) {
      const newChanges = [...changes];
      const deletionChange = newChanges[existingChangeIndex];
      newChanges.splice(existingChangeIndex, 1);

      if (deletionChange.previousCentralWarehouse !== undefined) {
        newChanges.push({
          darkStore: darkStore.name,
          darkStoreDetails: darkStore,
          centralWarehouse: deletionChange.previousCentralWarehouse,
          timestamp: new Date().toISOString(),
        });
      }

      if (deletionChange.preservedChanges && deletionChange.preservedChanges.length > 0) {
        deletionChange.preservedChanges.forEach(change => {
          newChanges.push({
            ...change,
            timestamp: new Date().toISOString(),
          });
        });
      }

      return newChanges;
    }

    const darkstoreChange = changes.find(change => change.darkStore === darkStore.name &&
      !change.product &&
      !change.categoryName &&
      !change.productDetails &&
      !change.darkstoreIsDelete);

    if (darkstoreChange) {
      const filteredChanges = changes.filter(change => !(
        change.darkStore === darkStore.name &&
        !change.product &&
        !change.categoryName &&
        !change.productDetails &&
        !change.darkstoreIsDelete
      ));

      return filteredChanges;
    }

    const currentChanges = changes.filter(change => change.darkStore === darkStore.name);

    return [...changes, {
      darkStore: darkStore.name,
      darkStoreDetails: darkStore,
      darkstoreIsDelete: true,
      centralWarehouse: null,
      previousCentralWarehouse: darkstoreChange?.centralWarehouse,
      preservedChanges: currentChanges,
      timestamp: new Date().toISOString(),
    }];
  }, []);

  const handleMasterCategoryRemove = useCallback((darkStore, category, changes) => {
    const existingDeleteChangeIndex = changes.findIndex(change => change.darkStore === darkStore.name &&
      change.productDetails?.id === category.id &&
      change.isCategory === true &&
      change.masterCategoryIsDelete === true);

    if (existingDeleteChangeIndex !== -1) {
      const newChanges = [...changes];
      const deletionChange = newChanges[existingDeleteChangeIndex];
      newChanges.splice(existingDeleteChangeIndex, 1);

      if (deletionChange.previousCentralWarehouse !== undefined) {
        const originalDefaultValue = getOriginalDefaultValue(category, darkStore, ITEM_TYPES.CATEGORY);

        if (deletionChange.previousCentralWarehouse !== originalDefaultValue) {
          newChanges.push({
            darkStore: darkStore.name,
            darkStoreDetails: darkStore,
            productDetails: category,
            isCategory: true,
            centralWarehouse: deletionChange.previousCentralWarehouse,
            timestamp: new Date().toISOString(),
          });
        }
      }

      if (deletionChange.preservedProductChanges && deletionChange.preservedProductChanges.length > 0) {
        deletionChange.preservedProductChanges.forEach(change => {
          let shouldRestore = true;

          if (change.productDetails && !change.isCategory) {
            const originalProductValue = getOriginalDefaultValue(change.productDetails, darkStore, ITEM_TYPES.PRODUCT);
            shouldRestore = change.centralWarehouse !== originalProductValue;
          }

          if (shouldRestore) {
            newChanges.push({
              ...change,
              timestamp: new Date().toISOString(),
            });
          }
        });
      }

      return newChanges;
    }

    const currentCWChange = changes.find(change => (
      change.darkStore === darkStore.name &&
      change.productDetails?.id === category.id &&
      change.isCategory === true &&
      !change.masterCategoryIsDelete
    ));

    if (currentCWChange) {
      const filteredChanges = changes.filter(change => !(
        change.darkStore === darkStore.name &&
        change.productDetails?.id === category.id &&
        change.isCategory === true &&
        !change.masterCategoryIsDelete
      ));

      return filteredChanges;
    }

    const productChangesToPreserve = changes.filter(change => (
      change.darkStore === darkStore.name &&
      !change.isCategory &&
      category.products?.some(product => {
        const productHasDefaultCW = product.centralWarehouse?.id !== undefined && product.centralWarehouse?.id !== null;
        return product.id === change.productDetails?.id && productHasDefaultCW;
      })
    ));

    const filteredChanges = changes.filter(change => {
      if (change.darkStore !== darkStore.name) return true;
      if (change.isCategory) return change.productDetails?.id !== category.id;
      return !category.products?.some(product => product.id === change.productDetails?.id);
    });

    const currentCentralWarehouse = getCentralWarehouseValue(category, darkStore, ITEM_TYPES.CATEGORY);

    filteredChanges.push({
      darkStore: darkStore.name,
      darkStoreDetails: darkStore,
      productDetails: category,
      isCategory: true,
      centralWarehouse: null,
      masterCategoryIsDelete: true,
      previousCentralWarehouse: currentCentralWarehouse,
      preservedProductChanges: productChangesToPreserve,
      timestamp: new Date().toISOString(),
    });

    return filteredChanges;
  }, [getCentralWarehouseValue, getOriginalDefaultValue]);

  const handleProductRemove = useCallback((darkStore, product, changes) => {
    const existingChangeIndex = changes.findIndex(change => (
      change.darkStore === darkStore.name &&
      change.productDetails?.id === product.id &&
      !change.isCategory &&
      change.productIsDelete === true
    ));

    if (existingChangeIndex !== -1) {
      const newChanges = [...changes];
      const deletionChange = newChanges[existingChangeIndex];
      newChanges.splice(existingChangeIndex, 1);

      if (deletionChange.previousCentralWarehouse !== undefined) {
        const originalDefaultValue = getOriginalDefaultValue(product, darkStore, ITEM_TYPES.PRODUCT);

        if (deletionChange.previousCentralWarehouse !== originalDefaultValue) {
          newChanges.push({
            darkStore: darkStore.name,
            darkStoreDetails: darkStore,
            productDetails: product,
            isCategory: false,
            centralWarehouse: deletionChange.previousCentralWarehouse,
            timestamp: new Date().toISOString(),
          });
        }
      }

      return newChanges;
    }

    const hasDefaultCW = product.centralWarehouse?.id !== undefined && product.centralWarehouse?.id !== null;

    const currentCWChange = changes.find(change => (
      change.darkStore === darkStore.name &&
      change.productDetails?.id === product.id &&
      !change.isCategory &&
      !change.productIsDelete
    ));

    if (!hasDefaultCW && currentCWChange) {
      const newChanges = changes.filter(change => !(
        change.darkStore === darkStore.name &&
        change.productDetails?.id === product.id &&
        !change.isCategory &&
        !change.productIsDelete
      ));
      return newChanges;
    }

    const newChange = {
      darkStore: darkStore.name,
      darkStoreDetails: darkStore,
      productDetails: product,
      isCategory: false,
      centralWarehouse: null,
      productIsDelete: true,
      previousCentralWarehouse: currentCWChange ? currentCWChange.centralWarehouse : getCentralWarehouseValue(product, darkStore, ITEM_TYPES.PRODUCT),
      timestamp: new Date().toISOString(),
    };

    return [...changes, newChange];
  }, [getCentralWarehouseValue, getOriginalDefaultValue]);

  return {
    isDarkStoreMarkedForRemoval,
    isCategoryMarkedForRemoval,
    isProductMarkedForRemoval,
    getCentralWarehouseValue,
    getOriginalDefaultValue,
    handleDarkstoreRemove,
    handleMasterCategoryRemove,
    handleProductRemove,
  };
};

export default useDarkStoreMatch;
