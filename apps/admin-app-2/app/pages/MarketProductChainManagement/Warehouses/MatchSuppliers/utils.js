export const INITIAL_STATE = {
  warehouses: [],
  editingPlatform: null,
  selectedPlatforms: {},
  matchedSuppliers: [],
  unmatchedSuppliers: [],
  initialMatchedSuppliers: [],
  matchedSearchValue: '',
  unmatchedSearchValue: '',
  selectedWarehouse: null,
  loading: {
    fetch: false,
    save: false,
  },
  error: null,
};

export const getResetState = () => ({
  selectedWarehouse: null,
  editingPlatform: null,
  selectedPlatforms: {},
  matchedSearchValue: '',
  unmatchedSearchValue: '',
  matchedSuppliers: [],
  unmatchedSuppliers: [],
  initialMatchedSuppliers: [],
});

export const filterSuppliers = (suppliers, searchValue) => {
  if (!searchValue) return suppliers;
  const searchTerm = searchValue.toLowerCase();
  return suppliers.filter(supplier => supplier.name.toLowerCase().includes(searchTerm));
};

export const checkHasChanges = (matchedSuppliers, initialMatchedSuppliers, selectedPlatforms) => {
  if (matchedSuppliers.length !== initialMatchedSuppliers.length) return true;

  const currentIds = [...matchedSuppliers].map(s => s.id).sort();
  const initialIds = [...initialMatchedSuppliers].map(s => s.id).sort();

  if (!currentIds.every((id, index) => id === initialIds[index])) return true;

  return matchedSuppliers.some(supplier => {
    const initialSupplier = initialMatchedSuppliers.find(s => s.id === supplier.id);
    const currentPlatform = supplier.selectedPlatform?.id || selectedPlatforms[supplier.id];
    return currentPlatform !== initialSupplier?.selectedPlatform?.id;
  });
};

export const getUpdatedPlatformState = (matchedSuppliers, selectedPlatforms, supplierId, value) => {
  const updatedSuppliers = matchedSuppliers.map(supplier => {
    if (supplier.id === supplierId) {
      return {
        ...supplier,
        selectedPlatform: supplier.relatedPlatform.find(p => p.id === value),
      };
    }
    return supplier;
  });

  const updatedPlatforms = {
    ...selectedPlatforms,
    [supplierId]: value,
  };

  return {
    matchedSuppliers: updatedSuppliers,
    selectedPlatforms: updatedPlatforms,
    editingPlatform: null,
  };
};

export const getUpdatedMoveState = (matchedSuppliers, unmatchedSuppliers, record, isMovingToMatched) => {
  if (isMovingToMatched) {
    return {
      unmatchedSuppliers: unmatchedSuppliers.filter(item => item.id !== record.id),
      matchedSuppliers: [...matchedSuppliers, record],
    };
  }

  return {
    matchedSuppliers: matchedSuppliers.filter(item => item.id !== record.id),
    unmatchedSuppliers: [...unmatchedSuppliers, record],
  };
};

export const getUpdatedStateForWarehouse = selectedWarehouse => ({
  selectedWarehouse,
  editingPlatform: null,
  selectedPlatforms: {},
  matchedSearchValue: '',
  unmatchedSearchValue: '',
  matchedSuppliers: [],
  unmatchedSuppliers: [],
  initialMatchedSuppliers: [],
});
