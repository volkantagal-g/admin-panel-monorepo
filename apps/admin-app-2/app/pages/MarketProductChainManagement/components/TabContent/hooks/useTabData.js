import { useMemo } from 'react';

import { mockDarkStoreData } from '@app/pages/MarketProductChainManagement/Mock';
import {
  productListMockData,
  productPageData,
  warehouseListPageData,
  warehousePageData,
} from '@app/pages/MarketProductChainManagement/Mock/tableData';
import {
  DARKSTORE_TABS,
  PAGE_TYPES,
  PRODUCT_TABS,
  WAREHOUSE_LIST_TABS,
} from '@app/pages/MarketProductChainManagement/constants';

export const useTabData = (pageType, tabs, isWarehouseList) => {
  const tabData = useMemo(() => {
    if (pageType === PAGE_TYPES.PRODUCT && !tabs) {
      return { data: productListMockData.data };
    }

    let pageDataSource;
    if (isWarehouseList) {
      pageDataSource = warehouseListPageData;
    }
    else if (pageType === PAGE_TYPES.DARK_STORE) {
      pageDataSource = mockDarkStoreData;
    }
    else {
      pageDataSource = pageType === PAGE_TYPES.PRODUCT ? productPageData : warehousePageData;
    }

    if (Array.isArray(tabs)) {
      return tabs.reduce((acc, tab) => ({
        ...acc,
        [tab.key]: pageDataSource[tab.key],
      }), {});
    }

    let tabsToUse;
    if (pageType === PAGE_TYPES.DARK_STORE) {
      tabsToUse = DARKSTORE_TABS;
    }
    else if (pageType === PAGE_TYPES.PRODUCT) {
      tabsToUse = PRODUCT_TABS;
    }
    else {
      tabsToUse = WAREHOUSE_LIST_TABS;
    }

    return Object.values(tabsToUse)
      .reduce((acc, tab) => ({
        ...acc,
        [tab]: pageDataSource[tab],
      }), {});
  }, [pageType, tabs, isWarehouseList]);

  const tabCounts = useMemo(() => {
    if (pageType === PAGE_TYPES.PRODUCT && !tabs) {
      return { count: productListMockData.count };
    }

    let pageDataSource;
    if (isWarehouseList) {
      pageDataSource = warehouseListPageData;
    }
    else if (pageType === PAGE_TYPES.DARK_STORE) {
      pageDataSource = mockDarkStoreData;
    }
    else {
      pageDataSource = pageType === PAGE_TYPES.PRODUCT ? productPageData : warehousePageData;
    }

    if (Array.isArray(tabs)) {
      return tabs.reduce((acc, tab) => ({
        ...acc,
        [tab.key]: pageDataSource[tab.key]?.count || 0,
      }), {});
    }

    return Object.entries(pageDataSource).reduce((acc, [key, value]) => ({
      ...acc,
      [key]: value?.count || 0,
    }), {});
  }, [pageType, tabs, isWarehouseList]);

  return {
    tabData,
    tabCounts,
  };
};
