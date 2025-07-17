import { message, Modal, Spin } from 'antd';
import debounce from 'lodash/debounce';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Button, Select } from '@shared/components/GUI';
import chevronDown from '@app/pages/MarketProductChainManagement/assets/Icons/chevron-down.svg';
import { LEVEL_KEYS, MATCH_DARKSTORE } from '@app/pages/MarketProductChainManagement/constants';
import { useMarketTranslation } from '@app/pages/MarketProductChainManagement/hooks/useMarketTranslation';
import { Creators } from '../redux/actions';
import { productLabelCache } from './DataDisplay';
import SelectAllButton from './SelectAllButton';
import useStyles from './styles';

const { DATASET_OPTIONS } = MATCH_DARKSTORE;

const FilterModal = ({ isOpen, onClose, onFilter, initialFilters = {}, dataset, selectedValue }) => {
  const { t } = useMarketTranslation();
  const classes = useStyles();
  const dispatch = useDispatch();
  const [localFilters, setLocalFilters] = useState({});
  const [lastSearchTerm, setLastSearchTerm] = useState('');
  const isDarkStoreSelected = dataset === DATASET_OPTIONS.DARK_STORE;

  const loadingContent = (
    <div className={classes.loadingContainer}>
      <Spin size="small" />
    </div>
  );

  const getNotFoundContent = (loading, items) => {
    if (loading) return loadingContent;
    if (items?.length) return null;
    return t('NO_DATA');
  };

  const {
    darkStores,
    suppliers,
    products,
    categories,
    loading,
  } = useSelector(state => {
    const reduxState = state?.PAGE_MARKET_PRODUCT_CHAIN_MANAGEMENT_MATCH_CW_DS;
    return {
      darkStores: reduxState?.darkStores || [],
      suppliers: reduxState?.suppliers?.data?.suppliers || [],
      products: reduxState?.products || [],
      categories: reduxState?.categories || {},
      loading: reduxState?.loading || {},
    };
  });

  const loadingLevels = useMemo(() => ({
    level2: loading.categories && !categories.level2?.length,
    level3: loading.categories && !categories.level3?.length,
    level4: loading.categories && !categories.level4?.length,
  }), [loading.categories, categories]);

  const debouncedProductSearch = useMemo(() => debounce(searchText => {
    if (searchText && searchText.length > 2) {
      setLastSearchTerm(searchText);
      dispatch(Creators.clearProductSearchResults());
      dispatch(Creators.searchProductsRequest(searchText));
    }
    else if (!searchText) {
      setLastSearchTerm('');
      dispatch(Creators.clearProductSearchResults());
    }
  }, 300), [dispatch]);

  const handleProductSearch = useCallback(value => {
    debouncedProductSearch(value);
  }, [debouncedProductSearch]);

  const supplierOptions = Array.isArray(suppliers) ? suppliers.map(supplier => ({
    value: supplier.value || supplier.vertexId,
    label: supplier.label || supplier.name,
  })) : [];

  const productOptions = useMemo(() => (Array.isArray(products) ? products : []), [products]);

  const filteredProductOptions = useMemo(() => {
    if (lastSearchTerm && lastSearchTerm.length > 2 && loading.productSearch) {
      return [];
    }
    return productOptions;
  }, [productOptions, lastSearchTerm, loading.productSearch]);

  const renderProductNotFoundContent = useCallback(() => {
    if (loading.productSearch) {
      return (
        <div className={classes.productNotFoundContent}>
          <Spin size="small" />
        </div>
      );
    }

    let displayMessage = t('PRODUCTS.NO_RESULTS_FOUND');
    if (filteredProductOptions.length === 0 && !lastSearchTerm) {
      displayMessage = t('PRODUCTS.TYPE_TO_SEARCH');
    }

    return (
      <div className={classes.productNotFoundContent}>
        {displayMessage}
      </div>
    );
  }, [loading.productSearch, filteredProductOptions.length, lastSearchTerm, t, classes]);

  useEffect(() => {
    if (isOpen) {
      dispatch(Creators.fetchSuppliersRequest());
      dispatch(Creators.fetchLevelsRequest());
      setLocalFilters(initialFilters);
    }
  }, [isOpen, initialFilters, dispatch]);

  useEffect(() => {
    setLocalFilters(initialFilters);
  }, [initialFilters]);

  useEffect(() => {
    if (!isOpen) {
      setLastSearchTerm('');
      dispatch(Creators.clearProductSearchResults());
    }
  }, [isOpen, dispatch]);

  const currentFilters = useMemo(() => ({
    ...initialFilters,
    ...localFilters,
  }), [initialFilters, localFilters]);

  const handleFilterChange = (key, value) => {
    if (key === 'product' && Array.isArray(value)) {
      value.forEach(productValue => {
        const productItem = productOptions.find(item => item.value === productValue ||
          item.productVertexId === productValue ||
          item.id === productValue ||
          (item.value && item.value.toString() === productValue.toString()) ||
          (item.productVertexId && item.productVertexId.toString() === productValue.toString()));

        if (productItem) {
          const label = productItem?.label || productItem?.name?.tr || productItem?.name?.en || productItem?.nameTR || productItem?.nameEN;
          if (label && label !== productValue) {
            productLabelCache.set(productValue, label);
          }
        }
      });
    }

    setLocalFilters(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSelectAll = (key, options) => {
    const currentValues = currentFilters[key] || [];
    const allValues = options.map(option => option.value);

    if (currentValues.length === allValues.length) {
      handleFilterChange(key, []);
    }
    else {
      handleFilterChange(key, allValues);
    }
  };

  const isAllSelected = (key, options) => {
    const currentValues = currentFilters[key] || [];
    return options.length > 0 && currentValues.length === options.length;
  };

  const handleApplyFilter = () => {
    const isAnyLevelSelected = LEVEL_KEYS.slice(0, -1).some(key => currentFilters[key]?.length > 0);

    if (isAnyLevelSelected && (!currentFilters.level4 || currentFilters.level4.length === 0)) {
      message.error(t('LEVEL_4_REQUIRED'));
      return;
    }

    const activeFilters = Object.entries(currentFilters).reduce((total, [key, value]) => {
      if (!Array.isArray(value)) return total;
      if (LEVEL_KEYS.slice(0, -1).includes(key)) return total;
      if (key === 'darkStore' && isDarkStoreSelected) return total;

      if (key === LEVEL_KEYS[LEVEL_KEYS.length - 1]) {
        return total + value.length;
      }

      return total + (value.length > 0 ? 1 : 0);
    }, 0);

    const filterPayload = {
      darkstoreVertexIds: isDarkStoreSelected ? [selectedValue] : currentFilters.darkStore,
      productVertexIds: currentFilters.product,
      supplierVertexIds: currentFilters.supplier,
      masterCategoryLevel4LegacyIds: currentFilters[LEVEL_KEYS[LEVEL_KEYS.length - 1]],
    };

    Object.keys(filterPayload).forEach(filterKey => {
      if (!filterPayload[filterKey] || filterPayload[filterKey].length === 0) {
        delete filterPayload[filterKey];
      }
    });

    const filtersToPass = {
      ...currentFilters,
      darkStore: isDarkStoreSelected ? [selectedValue] : currentFilters.darkStore,
      level1: currentFilters.level1 || [],
      level2: currentFilters.level2 || [],
      level3: currentFilters.level3 || [],
      level4: currentFilters.level4 || [],
    };

    onFilter(filtersToPass, activeFilters);

    let finalFilterPayload = { ...filterPayload };
    if (currentFilters.level4?.length > 0 && Object.keys(filterPayload).length === 1) {
      finalFilterPayload = { masterCategoryLevel4LegacyIds: currentFilters.level4 };
    }

    dispatch(Creators.fetchDarkStoresMatchRequest(dataset, selectedValue, finalFilterPayload));
    onClose();
  };

  const handleCancel = () => {
    setLocalFilters({});
    setLastSearchTerm('');
    dispatch(Creators.clearProductSearchResults());
    onClose();
  };

  const handleLevelChange = (level, value) => {
    const currentLevel = parseInt(level.replace('level', ''), 10);
    const updatedFilters = { ...currentFilters };

    if (!value?.length) {
      LEVEL_KEYS.slice(currentLevel - 1).forEach(key => {
        delete updatedFilters[key];
      });
      setLocalFilters(updatedFilters);

      if (currentLevel === 1) {
        dispatch(Creators.fetchLevelsRequest());
      }
      return;
    }

    updatedFilters[level] = value;

    LEVEL_KEYS.slice(currentLevel).forEach(key => {
      if (key !== level) {
        delete updatedFilters[key];
      }
    });

    setLocalFilters(updatedFilters);

    const previousValue = currentFilters[level] || [];
    const newSelections = value.filter(v => !previousValue.includes(v));

    if (newSelections.length > 0) {
      const selectedId = newSelections[newSelections.length - 1];
      dispatch(Creators.fetchAllChildrenOfMasterCategoryRequest(selectedId));
    }
  };

  const isAnyLevelSelected = currentFilters.level1?.length > 0 || currentFilters.level2?.length > 0 || currentFilters.level3?.length > 0;

  return (
    <Modal
      title={t('FILTER')}
      visible={isOpen}
      onCancel={handleCancel}
      footer={null}
      width={600}
      className={classes.modal}
      centered
    >
      <div className={classes.filterContainer}>
        <Select
          className={classes.filterSelect}
          label={t('DARK_STORE')}
          optionsData={darkStores}
          showSearch
          value={isDarkStoreSelected ? [selectedValue] : (currentFilters.darkStore || [])}
          onChange={value => handleFilterChange('darkStore', value)}
          disabled={isDarkStoreSelected}
          autoComplete="off"
          mode="multiple"
          suffixIcon={<img src={chevronDown} alt="chevron-down" />}
          loading={loading.darkStores}
          notFoundContent={loading.darkStores ? loadingContent : t('NO_DATA')}
          filterOption={(input, option) => {
            if (!option || !option.label || typeof option.label !== 'string') return false;
            return option.label.toLowerCase().includes(input.toLowerCase());
          }}
        />
        <div className={classes.selectWithClearContainer}>
          <Select
            className={classes.filterSelect}
            label={t('PRODUCT')}
            optionsData={filteredProductOptions}
            showSearch
            value={currentFilters.product || []}
            onChange={value => handleFilterChange('product', value)}
            autoComplete="off"
            mode="multiple"
            suffixIcon={<img src={chevronDown} alt="chevron-down" />}
            filterOption={false}
            onSearch={handleProductSearch}
            loading={loading.productSearch}
            notFoundContent={renderProductNotFoundContent()}
            virtual
            listHeight={256}
          />
          {currentFilters.product?.length > 0 && (
          <span
            className={classes.customClearIcon}
            onClick={() => {
              handleFilterChange('product', []);
              setLastSearchTerm('');
              dispatch(Creators.clearProductSearchResults());
            }}
            onKeyDown={e => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleFilterChange('product', []);
                setLastSearchTerm('');
                dispatch(Creators.clearProductSearchResults());
              }
            }}
            role="button"
            tabIndex="0"
            aria-label={t('CLEAR_SELECTION')}
          >
            ✕
          </span>
          )}
        </div>
        <div className={classes.selectWithButtonContainer}>
          <div className={classes.selectContainer}>
            <Select
              className={classes.filterSelect}
              label={t('SUPPLIER')}
              optionsData={supplierOptions}
              showSearch
              value={currentFilters.supplier || []}
              onChange={value => handleFilterChange('supplier', value)}
              autoComplete="off"
              mode="multiple"
              suffixIcon={<img src={chevronDown} alt="chevron-down" />}
              filterOption={(input, option) => {
                if (!option || !option.label || typeof option.label !== 'string') return false;
                return option.label.toLowerCase().includes(input.toLowerCase());
              }}
              loading={loading.suppliers}
              notFoundContent={loading.suppliers ? loadingContent : t('NO_DATA')}
            />
          </div>
          <SelectAllButton
            onClick={() => handleSelectAll('supplier', supplierOptions)}
            disabled={!supplierOptions.length}
            isAllSelected={isAllSelected('supplier', supplierOptions)}
          />
        </div>
        {LEVEL_KEYS.map((levelKey, index) => (
          <div key={levelKey} className={classes.selectWithButtonContainer}>
            <div className={classes.selectContainer}>
              <Select
                className={classes.filterSelect}
                label={index === LEVEL_KEYS.length - 1 && isAnyLevelSelected ? `${t(`LEVEL_${index + 1}`)} *` : t(`LEVEL_${index + 1}`)}
                optionsData={categories[levelKey] || []}
                showSearch
                showArrow
                value={currentFilters[levelKey] || []}
                onChange={value => handleLevelChange(levelKey, value)}
                autoComplete="off"
                mode="multiple"
                suffixIcon={<img src={chevronDown} alt="chevron-down" />}
                loading={index === 0 ? loading.categories : loadingLevels[levelKey]}
                filterOption={(input, option) => {
                  if (!option || !option.label || typeof option.label !== 'string') return false;
                  return option.label.toLowerCase().includes(input.toLowerCase());
                }}
                notFoundContent={getNotFoundContent(
                  index === 0 ? loading.categories : loadingLevels[levelKey],
                  categories[levelKey],
                )}
                required={index === LEVEL_KEYS.length - 1 && isAnyLevelSelected}
              />
            </div>
            <SelectAllButton
              onClick={() => handleSelectAll(levelKey, categories[levelKey] || [])}
              disabled={!categories[levelKey]?.length || (index > 0 && loadingLevels[levelKey])}
              isAllSelected={isAllSelected(levelKey, categories[levelKey] || [])}
            />
          </div>
        ))}
      </div>

      <div className={classes.modalFooter}>
        <Button color="default" onClick={handleCancel}>{t('CANCEL')}</Button>
        <Button type="primary" onClick={handleApplyFilter}>{t('FILTER')}</Button>
      </div>
    </Modal>
  );
};

export default FilterModal;
