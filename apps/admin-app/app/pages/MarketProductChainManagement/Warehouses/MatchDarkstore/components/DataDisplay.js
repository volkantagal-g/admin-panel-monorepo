import { useVirtualizer } from '@tanstack/react-virtual';
import { Collapse, Spin, Tag } from 'antd';
import isEqual from 'lodash/isEqual';
import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Button, Select } from '@shared/components/GUI';
import chevronDown from '@app/pages/MarketProductChainManagement/assets/Icons/chevron-down.svg';
import FilterIcon from '@app/pages/MarketProductChainManagement/assets/Icons/filter.svg';
import PencilIcon from '@app/pages/MarketProductChainManagement/assets/Icons/white-pen.svg';
import WhiteTickIcon from '@app/pages/MarketProductChainManagement/assets/Icons/white-tick.svg';
import { ITEM_TYPES, LEVEL_KEYS, MATCH_FILTER_KEYS } from '@app/pages/MarketProductChainManagement/constants';
import { useMarketTranslation } from '@app/pages/MarketProductChainManagement/hooks/useMarketTranslation';
import { DATASET_OPTIONS } from '../constants';
import useCentralWarehouseOperations from '../hooks/useCentralWarehouseOperations';
import useDarkStoreMatch from '../hooks/useDarkStoreMatch';
import useExpandedPanels from '../hooks/useExpandedPanels';
import useVirtualizerManagement from '../hooks/useVirtualizer';
import { Creators } from '../redux/actions';
import {
  selectCategories,
  selectCentralWarehouses,
  selectCities,
  selectDarkstoreMatchData,
  selectDarkStores,
  selectLoading,
  selectProducts,
  selectSuppliers,
} from '../redux/selectors';
import useStyles from '../styles';
import SaveChangesModal from './SaveChangesModal';

export const productLabelCache = new Map();

const { Panel } = Collapse;

const useDeepCompareMemo = (factory, deps) => {
  const ref = useRef();

  if (!ref.current || !isEqual(deps, ref.current.deps)) {
    ref.current = {
      deps,
      value: factory(),
    };
  }

  return ref.current.value;
};

const VirtualCategoryList = memo(({
  categories,
  darkStore,
  darkStoreIsDeleted,
  getLocalizedName,
  getCentralWarehouseValue,
  isCategoryMarkedForRemoval,
  hasDefaultCentralWarehouse,
  stableCentralWarehouses,
  setFieldValue,
  stableValues,
  handleCentralWarehouseChange,
  handleMasterCategoryRemove,
  expandedCategories,
  handleCategoryExpand,
  renderingCategories,
  loadingVirtualizedProducts,
  t,
  classes,
  isProductMarkedForRemoval,
  handleProductRemove,
  renderCentralWarehouseTags,
  expandIcon,
}) => {
  const categoryListRef = useRef();

  const virtualizer = useVirtualizer({
    count: categories.length,
    getScrollElement: () => categoryListRef.current,
    estimateSize: () => 60,
    overscan: 20,
  });

  return (
    <div ref={categoryListRef} className={classes.virtualCategoryScroll}>
      <div
        className={classes.virtualContainer}
        style={{ height: `${virtualizer.getTotalSize()}px` }}
      >
        {virtualizer.getVirtualItems().map(virtualItem => {
          const category = categories[virtualItem.index];
          const categoryData = {
            id: category.masterCategory.id,
            nameTR: category.masterCategory.nameTR,
            nameEN: category.masterCategory.nameEN,
            defaultCWId: category.masterCategoryWithDefaultCW?.mcDefaultCWVertexId,
            productCount: category.productCount,
            products: category.products,
          };

          const isCategoryExpanded = expandedCategories.current.has(categoryData.id);
          const categoryCurrentValue = getCentralWarehouseValue(categoryData, darkStore, ITEM_TYPES.CATEGORY);

          return (
            <div
              key={virtualItem.key}
              data-index={virtualItem.index}
              ref={virtualizer.measureElement}
              className={classes.virtualItem}
              style={{ transform: `translateY(${virtualItem.start}px)` }}
            >
              <Collapse
                expandIcon={expandIcon}
                expandIconPosition="start"
                destroyInactivePanel
                activeKey={isCategoryExpanded ? [categoryData.id] : []}
                size="small"
                ghost
                onChange={activeKeys => {
                  const key = activeKeys[0];
                  const isExpanded = Boolean(key);
                  const hasVirtualizedProducts = categoryData.products?.length > 15;

                  handleCategoryExpand(categoryData.id, isExpanded, hasVirtualizedProducts);
                }}
              >
                <Panel
                  key={categoryData.id}
                  header={(
                    <div className={classes.categoryRow}>
                      <span>{getLocalizedName(categoryData)}</span>
                      <span>{categoryData.productCount}</span>
                      <div className={classes.categorySelect}>
                        {renderCentralWarehouseTags(categoryData.products)}
                      </div>
                      <div className={classes.selectContainer}>
                        <Select
                          className={classes.categorySelect}
                          autoComplete="off"
                          showSearch
                          label={t('DEFAULT_CENTRAL_WAREHOUSE')}
                          disabled={darkStoreIsDeleted}
                          suffixIcon={<img src={chevronDown} alt="chevron-down" />}
                          optionsData={stableCentralWarehouses}
                          value={darkStoreIsDeleted ? undefined : categoryCurrentValue}
                          onClick={e => e.stopPropagation()}
                          onChange={value => {
                            const selectedCW = value ? stableCentralWarehouses.find(cw => cw.value === value) : null;
                            handleCentralWarehouseChange(darkStore, categoryData, selectedCW, setFieldValue, stableValues);
                          }}
                          filterOption={(input, option) => option.label.toLowerCase().includes(input.toLowerCase())}
                          getPopupContainer={() => document.body}
                        />
                        <Button
                          className={`${classes.removeButton} ${isCategoryMarkedForRemoval(darkStore, categoryData) ? 'active' : ''}`}
                          color="default"
                          onClick={e => {
                            e.stopPropagation();
                            const newChanges = handleMasterCategoryRemove(darkStore, categoryData, stableValues.changes);
                            setFieldValue('changes', newChanges);
                          }}
                          disabled={darkStoreIsDeleted}
                        >
                          {t('REMOVE')}
                        </Button>
                      </div>
                    </div>
                  )}
                >
                  {isCategoryExpanded && (
                    renderingCategories.has(categoryData.id) ? (
                      categoryData.products?.length > 0 && (
                        categoryData.products.length <= 15 ? (
                          categoryData.products.map(product => {
                            const productCurrentValue = getCentralWarehouseValue(product, darkStore, ITEM_TYPES.PRODUCT);
                            const isCategoryDisabled = isCategoryMarkedForRemoval(darkStore, categoryData);
                            const isProductMarkedForDelete = isProductMarkedForRemoval(darkStore, product);
                            const hasDefaultCW = hasDefaultCentralWarehouse(product);
                            const hasSelectedCW = productCurrentValue !== undefined;

                            return (
                              <div key={product.id} className={classes.productRowCollapse}>
                                <div className={classes.productName}>{getLocalizedName(product)}</div>
                                <div />
                                <div className={classes.selectContainer}>
                                  <Select
                                    className={classes.productSelect}
                                    optionsData={stableCentralWarehouses}
                                    autoComplete="off"
                                    label={t('CENTRAL_WAREHOUSE')}
                                    showSearch
                                    disabled={darkStoreIsDeleted || isCategoryDisabled}
                                    suffixIcon={<img src={chevronDown} alt="chevron-down" />}
                                    value={darkStoreIsDeleted || isCategoryDisabled ||
                                      isProductMarkedForDelete ? undefined : productCurrentValue}
                                    onChange={value => {
                                      const selectedCW = value ? stableCentralWarehouses.find(cw => cw.value === value) : null;
                                      handleCentralWarehouseChange(darkStore, product, selectedCW, setFieldValue, stableValues);
                                    }}
                                    filterOption={(input, option) => option.label.toLowerCase().includes(input.toLowerCase())}
                                    getPopupContainer={() => document.body}
                                  />
                                  <Button
                                    className={`${classes.removeButton} ${isProductMarkedForDelete ? 'active' : ''}`}
                                    onClick={() => {
                                      const newChanges = handleProductRemove(darkStore, product, stableValues.changes);
                                      setFieldValue('changes', newChanges);
                                    }}
                                    disabled={darkStoreIsDeleted || isCategoryDisabled || (!hasDefaultCW && !hasSelectedCW)}
                                    color="default"
                                  >
                                    {t('REMOVE')}
                                  </Button>
                                </div>
                              </div>
                            );
                          })
                        ) : (() => {
                          if (loadingVirtualizedProducts.has(categoryData.id)) {
                            const isSingleProduct = categoryData.productCount === 1;
                            const loadingClass = isSingleProduct
                              ? `${classes.loadingContainer} single-product`
                              : `${classes.loadingContainer} multiple-products`;

                            return (
                              <div className={loadingClass}>
                                <Spin size="small" />
                              </div>
                            );
                          }

                          return (
                            <VirtualizedProductList
                              categoryData={categoryData}
                              darkStore={darkStore}
                              darkStoreIsDeleted={darkStoreIsDeleted}
                              handleCentralWarehouseChange={handleCentralWarehouseChange}
                              handleProductRemove={handleProductRemove}
                              values={stableValues}
                              setFieldValue={setFieldValue}
                              centralWarehouses={stableCentralWarehouses}
                              t={t}
                              classes={classes}
                              getLocalizedName={getLocalizedName}
                              getCentralWarehouseValue={getCentralWarehouseValue}
                              isCategoryMarkedForRemoval={isCategoryMarkedForRemoval}
                              isProductMarkedForRemoval={isProductMarkedForRemoval}
                              hasDefaultCentralWarehouse={hasDefaultCentralWarehouse}
                            />
                          );
                        })()
                      )
                    ) : (
                      <div className={`${classes.loadingContainer} single-product`}>
                        <Spin size="small" />
                      </div>
                    )
                  )}
                </Panel>
              </Collapse>
            </div>
          );
        })}
      </div>
    </div>
  );
});

const VirtualizedProductList = memo(({
  categoryData,
  darkStore,
  darkStoreIsDeleted,
  handleCentralWarehouseChange,
  handleProductRemove,
  values,
  setFieldValue,
  centralWarehouses,
  t,
  classes,
  getLocalizedName,
  getCentralWarehouseValue,
  isCategoryMarkedForRemoval,
  isProductMarkedForRemoval,
  hasDefaultCentralWarehouse,
}) => {
  const productListRef = useRef();
  const productCount = categoryData.products.length;
  const productVirtualizer = useVirtualizer({
    count: productCount,
    getScrollElement: () => productListRef.current,
    estimateSize: () => 80,
    overscan: 20,
  });

  const getDynamicContainerStyle = () => {
    if (productCount <= 10) {
      const contentHeight = productCount * 80;
      const maxContentHeight = Math.min(contentHeight, 370);
      return {
        height: `${maxContentHeight}px`,
        minHeight: `${maxContentHeight}px`,
        maxHeight: `${maxContentHeight}px`,
      };
    }

    return {
      height: '370px',
      minHeight: '370px',
      maxHeight: '370px',
    };
  };

  return (
    <div
      ref={productListRef}
      className={classes.productVirtualContainer}
      style={getDynamicContainerStyle()}
    >
      <div
        className={classes.virtualContainer}
        style={{ height: `${productVirtualizer.getTotalSize()}px` }}
      >
        {productVirtualizer.getVirtualItems().map(virtualRow => {
          const product = categoryData.products[virtualRow.index];
          const productCurrentValue = getCentralWarehouseValue(product, darkStore, ITEM_TYPES.PRODUCT);
          const isCategoryDisabled = isCategoryMarkedForRemoval(darkStore, categoryData);
          const isProductMarkedForDelete = isProductMarkedForRemoval(darkStore, product);
          const hasDefaultCW = hasDefaultCentralWarehouse(product);
          const hasSelectedCW = productCurrentValue !== undefined;

          return (
            <div
              key={virtualRow.key}
              ref={productVirtualizer.measureElement}
              data-index={virtualRow.index}
              className={classes.virtualItem}
              style={{ transform: `translateY(${virtualRow.start}px)` }}
            >
              <div className={classes.productRowCollapse}>
                <div className={classes.productName}>{getLocalizedName(product)}</div>
                <div />
                <div className={classes.selectContainer}>
                  <Select
                    className={classes.productSelect}
                    optionsData={centralWarehouses}
                    autoComplete="off"
                    label={t('CENTRAL_WAREHOUSE')}
                    showSearch
                    disabled={darkStoreIsDeleted || isCategoryDisabled}
                    suffixIcon={<img src={chevronDown} alt="chevron-down" />}
                    value={darkStoreIsDeleted || isCategoryDisabled ||
                      isProductMarkedForDelete ? undefined : productCurrentValue}
                    onChange={value => {
                      const selectedCW = value ? centralWarehouses.find(cw => cw.value === value) : null;
                      handleCentralWarehouseChange(darkStore, product, selectedCW, setFieldValue, values);
                    }}
                    filterOption={(input, option) => option.label.toLowerCase().includes(input.toLowerCase())}
                    getPopupContainer={() => document.body}
                  />
                  <Button
                    className={`${classes.removeButton} ${isProductMarkedForDelete ? 'active' : ''}`}
                    onClick={() => {
                      const newChanges = handleProductRemove(darkStore, product, values.changes);
                      setFieldValue('changes', newChanges);
                    }}
                    disabled={darkStoreIsDeleted || isCategoryDisabled || (!hasDefaultCW && !hasSelectedCW)}
                    color="default"
                  >
                    {t('REMOVE')}
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
});

VirtualCategoryList.displayName = 'VirtualCategoryList';

const DataDisplay = ({
  values,
  setFieldValue,
  activeFilters,
  filterValues,
  handleFilterClick,
  handleBulkEditClick,
  handleRemoveFilter,
  getSelectedOptionLabel,
  handleCentralWarehouseChange,
  onExpandedStateChange,
}) => {
  const { t } = useMarketTranslation();
  const classes = useStyles();
  const dispatch = useDispatch();

  const centralWarehouses = useSelector(selectCentralWarehouses);
  const darkstoreMatchData = useSelector(selectDarkstoreMatchData);
  const loading = useSelector(selectLoading);
  const cities = useSelector(selectCities);
  const darkStores = useSelector(selectDarkStores);
  const categories = useSelector(selectCategories);
  const suppliers = useSelector(selectSuppliers);
  const products = useSelector(selectProducts);

  const stableCentralWarehouses = useDeepCompareMemo(() => centralWarehouses, [centralWarehouses]);
  const stableValues = useMemo(() => values, [values]);
  const stableFilterValues = useDeepCompareMemo(() => filterValues, [filterValues]);

  const getLocalizedName = useCallback(item => item?.nameTR || item?.nameEN || item?.name || '', []);

  const { hasDefaultCentralWarehouse, renderCentralWarehouseTags } = useCentralWarehouseOperations(stableCentralWarehouses);

  const {
    isDarkStoreMarkedForRemoval,
    isCategoryMarkedForRemoval,
    isProductMarkedForRemoval,
    getCentralWarehouseValue,
    handleDarkstoreRemove,
    handleMasterCategoryRemove,
    handleProductRemove,
  } = useDarkStoreMatch(stableValues, stableCentralWarehouses);

  const parentRef = useRef();

  const {
    expandedPanels,
    expandedCategories,
    loadingDarkStoreDetails,
    expandedDarkStoreDetails,
    renderingCategories,
    loadingVirtualizedProducts,
    itemSizeCache,
    handlePanelChange,
    handleCategoryExpand,
    clearAllExpanded,
  } = useExpandedPanels(stableFilterValues);

  const { virtualizer } = useVirtualizerManagement(
    darkstoreMatchData,
    expandedPanels,
    expandedCategories,
    loadingDarkStoreDetails,
    expandedDarkStoreDetails,
    itemSizeCache,
    parentRef,
  );

  const updatedHandlePanelChange = useCallback(darkStoreId => async activeKeys => {
    const result = await handlePanelChange(darkStoreId)(activeKeys);
    return result;
  }, [handlePanelChange]);

  const updatedHandleCategoryExpand = useCallback((categoryId, isExpanded, hasVirtualizedProducts = false) => {
    handleCategoryExpand(categoryId, isExpanded, hasVirtualizedProducts);
  }, [handleCategoryExpand]);

  useEffect(() => {
    if (stableValues.dataset && stableValues.selectedValue) {
      dispatch(Creators.fetchDarkStoresMatchRequest(stableValues.dataset, stableValues.selectedValue));
    }
  }, [dispatch, stableValues.dataset, stableValues.selectedValue]);

  useEffect(() => {
    clearAllExpanded();
  }, [darkstoreMatchData, clearAllExpanded]);

  useEffect(() => {
    if (onExpandedStateChange) {
      onExpandedStateChange({
        expandedDarkStoreDetails,
        expandedPanels,
      });
    }
  }, [expandedDarkStoreDetails, expandedPanels, onExpandedStateChange]);

  const getSelectedLabel = useCallback(() => {
    if (!stableValues.selectedValue) return '';

    switch (stableValues.dataset) {
      case DATASET_OPTIONS.CITY: {
        const selected = cities.find(city => city.value === stableValues.selectedValue);
        return selected?.label || '';
      }
      case DATASET_OPTIONS.CENTRAL_WAREHOUSE: {
        const selected = stableCentralWarehouses.find(cw => cw.value === stableValues.selectedValue);
        return selected?.label || '';
      }
      case DATASET_OPTIONS.DARK_STORE: {
        const selected = darkStores.find(ds => ds.value === stableValues.selectedValue);
        return selected?.label || '';
      }
      default:
        return getSelectedOptionLabel(stableValues.dataset, stableValues.selectedValue);
    }
  }, [stableValues, cities, stableCentralWarehouses, darkStores, getSelectedOptionLabel]);

  const expandIcon = ({ isActive }) => (
    <img
      src={chevronDown}
      alt="chevron-down"
      className={`${classes.expandIconImage} ${isActive ? 'active' : 'inactive'}`}
    />
  );

  const getFilterLabelByType = (key, value) => {
    if (!value) return '';

    switch (key) {
      case MATCH_FILTER_KEYS.LEVEL4: {
        const level4Item = categories.level4?.find(item => item.value === value);
        return level4Item?.label || value;
      }
      case MATCH_FILTER_KEYS.DARK_STORE: {
        const darkStoreItem = darkStores.find(item => item.value === value);
        return darkStoreItem?.label || value;
      }
      case MATCH_FILTER_KEYS.SUPPLIER: {
        const supplierItem = suppliers.find(item => item.value === value || item.vertexId === value);
        return supplierItem?.label || supplierItem?.name || value;
      }
      case MATCH_FILTER_KEYS.PRODUCT: {
        const productItem = products.find(item => item.value === value ||
          item.productVertexId === value ||
          item.id === value ||
          (item.value && item.value.toString() === value.toString()) ||
          (item.productVertexId && item.productVertexId.toString() === value.toString()));

        if (productItem) {
          const label = productItem?.label || productItem?.name?.tr || productItem?.name?.en || productItem?.nameTR || productItem?.nameEN;
          if (label && label !== value) {
            productLabelCache.set(value, label);
            return label;
          }
        }

        const cachedLabel = productLabelCache.get(value);
        if (cachedLabel) {
          return cachedLabel;
        }

        return productItem?.label || productItem?.name?.tr || productItem?.name?.en || productItem?.nameTR || productItem?.nameEN || value;
      }
      case LEVEL_KEYS[0]:
      case LEVEL_KEYS[1]:
      case LEVEL_KEYS[2]:
        return '';
      default:
        return value;
    }
  };

  const handleFilterRemove = (key, val = null) => {
    const updatedFilters = { ...stableFilterValues };

    if (Array.isArray(updatedFilters[key]) && val !== null) {
      updatedFilters[key] = updatedFilters[key].filter(v => v !== val);
    }
    else {
      delete updatedFilters[key];
    }

    if (!updatedFilters[key]?.length) {
      delete updatedFilters[key];
    }

    if (key === MATCH_FILTER_KEYS.LEVEL4 && (!updatedFilters.level4 || updatedFilters.level4.length === 0)) {
      delete updatedFilters.level1;
      delete updatedFilters.level2;
      delete updatedFilters.level3;
      delete updatedFilters.level4;
    }

    setFieldValue('changes', []);

    const filterPayload = {
      ...(updatedFilters.level4?.length && { masterCategoryLevel4LegacyIds: updatedFilters.level4 }),
      ...(updatedFilters.darkStore?.length && { darkstoreVertexIds: updatedFilters.darkStore }),
      ...(updatedFilters.supplier?.length && { supplierVertexIds: updatedFilters.supplier }),
      ...(updatedFilters.product?.length && { productVertexIds: updatedFilters.product }),
    };

    const activeFilterCount = Object.entries(updatedFilters).reduce((total, [filterKey, value]) => {
      if (!Array.isArray(value)) return total;
      if (filterKey === LEVEL_KEYS[0] || filterKey === LEVEL_KEYS[1] || filterKey === LEVEL_KEYS[2]) return total;
      if (filterKey === MATCH_FILTER_KEYS.DARK_STORE && stableValues.dataset === DATASET_OPTIONS.DARK_STORE) return total;

      if (filterKey === MATCH_FILTER_KEYS.LEVEL4) {
        return total + value.length;
      }

      return total + (value.length > 0 ? 1 : 0);
    }, 0);

    dispatch(Creators.fetchDarkStoresMatchRequest(stableValues.dataset, stableValues.selectedValue, filterPayload));
    handleRemoveFilter(key, updatedFilters, activeFilterCount);
  };

  const renderSelectedFilters = useDeepCompareMemo(() => {
    if (!stableFilterValues || Object.keys(stableFilterValues).length === 0) {
      return null;
    }

    return (
      <div className={classes.selectedFilters}>
        {Object.entries(stableFilterValues).map(([key, filterItemValues]) => {
          if (!filterItemValues ||
              filterItemValues.length === 0 ||
              (key === LEVEL_KEYS[0]) ||
              (key === LEVEL_KEYS[1]) ||
              (key === LEVEL_KEYS[2]) ||
              (key === MATCH_FILTER_KEYS.DARK_STORE && stableValues.dataset === DATASET_OPTIONS.DARK_STORE)) {
            return null;
          }

          return (
            <div key={key} className={classes.filterGroup}>
              {Array.isArray(filterItemValues) ? (
                filterItemValues.map(value => {
                  const label = getFilterLabelByType(key, value);
                  if (!label) return null;

                  return (
                    <Tag
                      key={`${key}-${value}`}
                      closable
                      onClose={() => handleFilterRemove(key, value)}
                      className={classes.filterTag}
                    >
                      {label}
                    </Tag>
                  );
                })
              ) : (
                <Tag
                  closable
                  onClose={() => handleFilterRemove(key)}
                  className={classes.filterTag}
                >
                  {getFilterLabelByType(key, filterItemValues)}
                </Tag>
              )}
            </div>
          );
        })}
      </div>
    );
  }, [stableFilterValues, stableValues, classes, getFilterLabelByType, handleFilterRemove]);

  const renderDataTable = () => {
    if (loading) {
      return (
        <div className={classes.loadingContainer}>
          <Spin />
        </div>
      );
    }

    if (!darkstoreMatchData?.darkStores || darkstoreMatchData.darkStores.length === 0) {
      return (
        <div className={classes.noDataContainer}>
          {t('NO_DATA')}
        </div>
      );
    }

    return (
      <div className={classes.collapseContainer}>
        <div
          ref={parentRef}
          className={classes.virtualScrollContainer}
        >
          <div
            className={classes.virtualContainer}
            style={{ height: `${virtualizer.getTotalSize()}px` }}
          >
            {virtualizer.getVirtualItems().map(virtualItem => {
              const darkStore = darkstoreMatchData?.darkStores?.[virtualItem.index];
              if (!darkStore?.id) return null;

              const darkStoreIsDeleted = isDarkStoreMarkedForRemoval(darkStore);
              const isExpanded = expandedPanels.current.has(darkStore.id);
              const details = expandedDarkStoreDetails[darkStore.id];
              const isLoadingDetails = loadingDarkStoreDetails[darkStore.id];

              return (
                <div
                  key={virtualItem.key}
                  data-index={virtualItem.index}
                  ref={virtualizer.measureElement}
                  className={classes.virtualItem}
                  style={{ transform: `translateY(${virtualItem.start}px)` }}
                >
                  <Collapse
                    expandIcon={expandIcon}
                    expandIconPosition="end"
                    destroyInactivePanel={false}
                    activeKey={isExpanded ? [darkStore.id] : []}
                    onChange={updatedHandlePanelChange(darkStore.id)}
                  >
                    <Panel
                      key={darkStore.id}
                      header={(
                        <div className={classes.darkStoreHeader}>
                          <span className={classes.darkStoreName}>{darkStore.name}</span>
                          <div className={classes.selectContainer}>
                            <Select
                              className={classes.headerSelect}
                              label={t('CENTRAL_WAREHOUSE')}
                              showSearch
                              autoComplete="off"
                              value={darkStoreIsDeleted
                                ? undefined
                                : stableValues.changes.find(change => change.darkStore === darkStore.name &&
                                  !change.product &&
                                  !change.categoryName &&
                                  !change.productDetails &&
                                  !change.darkstoreIsDelete)?.centralWarehouse || undefined}
                              suffixIcon={<img src={chevronDown} alt="chevron-down" />}
                              optionsData={stableCentralWarehouses}
                              onClick={e => e.stopPropagation()}
                              onChange={value => {
                                const selectedCW = value ? stableCentralWarehouses.find(cw => cw.value === value) : null;
                                handleCentralWarehouseChange(darkStore, null, selectedCW, setFieldValue, stableValues);
                              }}
                              disabled={darkStoreIsDeleted || !isExpanded || isLoadingDetails}
                              filterOption={(input, option) => option.label.toLowerCase().includes(input.toLowerCase())}
                              getPopupContainer={() => document.body}
                            />
                            <Button
                              className={`${classes.removeButton} ${darkStoreIsDeleted ? 'active' : ''}`}
                              color="default"
                              onClick={e => {
                                e.stopPropagation();
                                const newChanges = handleDarkstoreRemove(darkStore, stableValues.changes);
                                setFieldValue('changes', newChanges);
                              }}
                              disabled={!isExpanded || isLoadingDetails}
                            >
                              {t('UNMATCH_ALL')}
                            </Button>
                          </div>
                        </div>
                      )}
                    >
                      {isExpanded && (() => {
                        if (isLoadingDetails) {
                          return <div className={classes.loadingContainer}><Spin /></div>;
                        }

                        if (!details) {
                          return <div className={classes.noDataContainer}>{t('NO_DATA')}</div>;
                        }

                        return (
                          <>
                            <div className={classes.tableHeader}>
                              <div className={classes.headerCell}>{t('LEVEL_4')}</div>
                              <div className={classes.headerCell}>{t('COLUMNS.PRODUCTS')}</div>
                              <div className={classes.headerCell}>{t('CUSTOM_CENTRAL_WAREHOUSE')}</div>
                              <div className={classes.headerCell}>{t('DEFAULT_CENTRAL_WAREHOUSE')}</div>
                            </div>
                            <VirtualCategoryList
                              categories={details.productsWithMasterCategories}
                              darkStore={darkStore}
                              darkStoreIsDeleted={darkStoreIsDeleted}
                              getLocalizedName={getLocalizedName}
                              getCentralWarehouseValue={getCentralWarehouseValue}
                              isCategoryMarkedForRemoval={isCategoryMarkedForRemoval}
                              hasDefaultCentralWarehouse={hasDefaultCentralWarehouse}
                              stableCentralWarehouses={stableCentralWarehouses}
                              setFieldValue={setFieldValue}
                              stableValues={stableValues}
                              handleCentralWarehouseChange={handleCentralWarehouseChange}
                              handleMasterCategoryRemove={handleMasterCategoryRemove}
                              expandedCategories={expandedCategories}
                              handleCategoryExpand={updatedHandleCategoryExpand}
                              renderingCategories={renderingCategories}
                              loadingVirtualizedProducts={loadingVirtualizedProducts}
                              t={t}
                              classes={classes}
                              isProductMarkedForRemoval={isProductMarkedForRemoval}
                              handleProductRemove={handleProductRemove}
                              renderCentralWarehouseTags={renderCentralWarehouseTags}
                              expandIcon={expandIcon}
                            />
                          </>
                        );
                      })()}
                    </Panel>
                  </Collapse>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const saveButtonRef = useRef(null);

  const getActiveChanges = () => {
    return stableValues.changes || [];
  };

  const handleSaveModalClose = () => {
    setIsSaveModalOpen(false);
    if (saveButtonRef.current) {
      saveButtonRef.current.blur();
    }
  };

  const handleSaveSuccess = useCallback(() => {
    clearAllExpanded();
  }, [clearAllExpanded]);

  return (
    <>
      <div className={classes.stepHeader}>
        <div className={classes.filterDisplay}>
          <div>
            {stableValues.dataset === DATASET_OPTIONS.CITY && `${t('CITY')}:`}
            {stableValues.dataset === DATASET_OPTIONS.CENTRAL_WAREHOUSE && `${t('CENTRAL_WAREHOUSE')}:`}
            {stableValues.dataset === DATASET_OPTIONS.DARK_STORE && `${t('DARK_STORE')}:`}
            <span>{getSelectedLabel()}</span>
          </div>
          {renderSelectedFilters}
        </div>
        <div className={classes.actionButtons}>
          <Button onClick={handleFilterClick} color="default">
            <img src={FilterIcon} alt="filter" />
            {activeFilters > 0 ? `${t('FILTER')} (${activeFilters})` : t('FILTER')}
          </Button>
          <Button onClick={handleBulkEditClick} color="primary">
            <img src={PencilIcon} alt="pencil" /> {t('BULK_EDIT')}
          </Button>
          <SaveChangesModal
            isOpen={isSaveModalOpen}
            onClose={handleSaveModalClose}
            onSaveSuccess={handleSaveSuccess}
            changes={stableValues.changes}
            setFieldValue={setFieldValue}
            values={stableValues}
            filterValues={stableFilterValues}
            expandedDarkStoreDetails={expandedDarkStoreDetails}
          />
          <Button
            color="primary"
            className={classes.saveButton}
            onClick={() => setIsSaveModalOpen(true)}
            disabled={!getActiveChanges().length || loading}
            ref={saveButtonRef}
          >
            <img src={WhiteTickIcon} alt="white-tick" />
            {t('SAVE')}
          </Button>
        </div>
      </div>
      {renderDataTable()}
    </>
  );
};

export default DataDisplay;
