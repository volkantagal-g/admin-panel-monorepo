import { useCallback, useRef, useState } from 'react';

import { marketProductChainManagementAPI } from '@shared/api/marketProductChainManagement';

const useExpandedPanels = (filterValues = {}) => {
  const expandedPanels = useRef(new Set());
  const expandedCategories = useRef(new Set());
  const [, forceUpdate] = useState(0);
  const [loadingDarkStoreDetails, setLoadingDarkStoreDetails] = useState({});
  const [expandedDarkStoreDetails, setExpandedDarkStoreDetails] = useState({});
  const [renderingCategories, setRenderingCategories] = useState(new Set());
  const [loadingVirtualizedProducts, setLoadingVirtualizedProducts] = useState(new Set());
  const itemSizeCache = useRef(new Map());

  const fetchDarkStoreDetail = useCallback(async darkStoreId => {
    if (!darkStoreId) return;

    setLoadingDarkStoreDetails(prev => ({ ...prev, [darkStoreId]: true }));
    try {
      const filterPayload = {
        darkstoreVertexIds: [darkStoreId],
        ...(filterValues.level4?.length && { masterCategoryLevel4LegacyIds: filterValues.level4 }),
        ...(filterValues.supplier?.length && { supplierVertexIds: filterValues.supplier }),
        ...(filterValues.product?.length && { productVertexIds: filterValues.product }),
      };

      const response = await marketProductChainManagementAPI.darkstores.getDarkStoresForMatch(filterPayload);
      if (response.success && response.data?.darkStoresWithProducts?.length > 0) {
        const darkStore = response.data.darkStoresWithProducts[0];

        const transformedDarkStore = {
          ...darkStore,
          productsWithMasterCategories: darkStore.productsWithMasterCategories?.map(category => ({
            masterCategory: category.masterCategoryWithDefaultCW?.masterCategory,
            masterCategoryWithDefaultCW: {
              masterCategory: category.masterCategoryWithDefaultCW?.masterCategory,
              mcDefaultCWVertexId: category.masterCategoryWithDefaultCW?.mcDefaultCWVertexId || null,
            },
            productCount: category.productCount || 0,
            products: category.products?.map(product => ({
              ...product,
              centralWarehouse: product.centralWarehouse || null,
            })) || [],
          })) || [],
        };

        setExpandedDarkStoreDetails(prev => ({
          ...prev,
          [darkStoreId]: transformedDarkStore,
        }));
      }
      else {
        setExpandedDarkStoreDetails(prev => ({ ...prev, [darkStoreId]: null }));
      }
    }
    catch (error) {
      setExpandedDarkStoreDetails(prev => ({ ...prev, [darkStoreId]: null }));
    }
    finally {
      setLoadingDarkStoreDetails(prev => ({ ...prev, [darkStoreId]: false }));
    }
  }, [filterValues]);

  const handlePanelChange = useCallback(darkStoreId => async activeKeys => {
    if (!darkStoreId) return;

    const isExpanding = activeKeys.length > 0;

    if (isExpanding) {
      const currentlyExpanded = Array.from(expandedPanels.current);
      currentlyExpanded.forEach(expandedId => {
        if (expandedId !== darkStoreId) {
          expandedPanels.current.delete(expandedId);
          expandedDarkStoreDetails[expandedId]?.productsWithMasterCategories?.forEach(category => {
            if (category.masterCategory?.id) {
              expandedCategories.current.delete(category.masterCategory.id);
            }
          });
        }
      });

      expandedPanels.current.add(darkStoreId);
    }
    else {
      expandedPanels.current.delete(darkStoreId);
      expandedDarkStoreDetails[darkStoreId]?.productsWithMasterCategories?.forEach(category => {
        if (category.masterCategory?.id) {
          expandedCategories.current.delete(category.masterCategory.id);
        }
      });
    }

    forceUpdate(v => v + 1);

    if (isExpanding && !expandedDarkStoreDetails[darkStoreId]) {
      await fetchDarkStoreDetail(darkStoreId);
    }
  }, [expandedDarkStoreDetails, fetchDarkStoreDetail]);

  const handleCategoryExpand = useCallback((categoryId, isExpanded, hasVirtualizedProducts = false) => {
    if (!categoryId) return;

    itemSizeCache.current.clear();

    if (isExpanded) {
      expandedCategories.current.add(categoryId);

      setLoadingVirtualizedProducts(prev => new Set([...prev, categoryId]));

      const loadingDelay = hasVirtualizedProducts ? 150 : 80;

      setTimeout(() => {
        setRenderingCategories(prev => new Set([...prev, categoryId]));

        if (!hasVirtualizedProducts) {
          setLoadingVirtualizedProducts(prev => {
            const newSet = new Set(prev);
            newSet.delete(categoryId);
            return newSet;
          });
        }
        else {
          setTimeout(() => {
            setLoadingVirtualizedProducts(prev => {
              const newSet = new Set(prev);
              newSet.delete(categoryId);
              return newSet;
            });
          }, 80);
        }
      }, loadingDelay);
    }
    else {
      expandedCategories.current.delete(categoryId);
      setRenderingCategories(prev => {
        const newSet = new Set(prev);
        newSet.delete(categoryId);
        return newSet;
      });
      setLoadingVirtualizedProducts(prev => {
        const newSet = new Set(prev);
        newSet.delete(categoryId);
        return newSet;
      });
    }

    forceUpdate(v => v + 1);
  }, []);

  const clearAllExpanded = useCallback(() => {
    expandedPanels.current.clear();
    expandedCategories.current.clear();
    setExpandedDarkStoreDetails({});
    setRenderingCategories(new Set());
    setLoadingVirtualizedProducts(new Set());
    forceUpdate(v => v + 1);
  }, []);

  return {
    expandedPanels,
    expandedCategories,
    loadingDarkStoreDetails,
    expandedDarkStoreDetails,
    renderingCategories,
    loadingVirtualizedProducts,
    itemSizeCache,
    fetchDarkStoreDetail,
    handlePanelChange,
    handleCategoryExpand,
    clearAllExpanded,
    forceUpdate,
  };
};

export default useExpandedPanels;
