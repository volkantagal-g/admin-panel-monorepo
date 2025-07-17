import { useCallback, useState } from 'react';

import { MATCH_DARKSTORE } from '@app/pages/MarketProductChainManagement/constants';
import { useMarketTranslation } from '@app/pages/MarketProductChainManagement/hooks/useMarketTranslation';

const { STEPS, CENTRAL_WAREHOUSE_OPTIONS } = MATCH_DARKSTORE;

export const useMatchDarkstore = () => {
  const { t } = useMarketTranslation();
  const [currentStep, setCurrentStep] = useState(STEPS.DATASET_SELECTION);
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isBulkEditModalOpen, setIsBulkEditModalOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState(0);
  const [filterValues, setFilterValues] = useState({});

  const handleCentralWarehouseChange = useCallback((darkStore, product, value, setFieldValue) => {
    const selectedCW = CENTRAL_WAREHOUSE_OPTIONS.find(cw => cw.value === value);
    setFieldValue('changes', prevChanges => {
      const filteredChanges = prevChanges.filter(change => {
        if (product?.id) {
          return !(change.darkStore === darkStore.name && change.product === product.nameTR);
        } if (product && !product.id) {
          return !(change.darkStore === darkStore.name && change.categoryName === product.nameTR);
        }
        return !(change.darkStore === darkStore.name && !change.product && !change.categoryName);
      });

      const newChange = {
        darkStore: darkStore.name,
        centralWarehouse: selectedCW?.label || value,
        product: product?.id ? product.nameTR : '',
        timestamp: new Date().toISOString(),
        isCategory: Boolean(product && !product.id),
        categoryName: (product && !product.id) ? product.nameTR : '',
      };

      return [...filteredChanges, newChange];
    });
  }, []);

  const handleSubmit = useCallback((values, { setSubmitting }) => {
    setSubmitting(false);
    setIsSaveModalOpen(false);
  }, []);

  const handleSaveClick = values => {
    if (values.changes.length > 0) {
      setIsSaveModalOpen(true);
    }
  };

  const handleFilterClick = useCallback(() => {
    setIsFilterModalOpen(true);
  }, []);

  const handleFilter = useCallback((filters, activeFilterCount) => {
    setFilterValues(filters);
    setActiveFilters(activeFilterCount);
    setIsFilterModalOpen(false);
  }, []);

  const handleRemoveFilter = useCallback((key, updatedFilters, activeFilterCount) => {
    setFilterValues(updatedFilters);
    setActiveFilters(activeFilterCount);
  }, []);

  const handleBulkEditClick = useCallback(() => {
    setIsBulkEditModalOpen(true);
  }, []);

  const handleChangeCW = useCallback(() => {
    setIsBulkEditModalOpen(false);
  }, []);

  return {
    currentStep,
    setCurrentStep,
    isSaveModalOpen,
    setIsSaveModalOpen,
    isFilterModalOpen,
    setIsFilterModalOpen,
    isBulkEditModalOpen,
    setIsBulkEditModalOpen,
    activeFilters,
    filterValues,
    handleSubmit,
    handleSaveClick,
    handleFilterClick,
    handleFilter,
    handleRemoveFilter,
    handleBulkEditClick,
    handleChangeCW,
    handleCentralWarehouseChange,
    t,
  };
};
