import { useMemo } from 'react';

import {
  productListMockData,
  productPageData,
  warehouseListPageData,
  warehousePageData,
} from '@app/pages/MarketProductChainManagement/Mock/tableData';
import { PAGE_TYPES } from '@app/pages/MarketProductChainManagement/constants';

export const useTabData = (pageType, tabs, isWarehouseList) => {
  return useMemo(() => {
    if (pageType === PAGE_TYPES.PRODUCT && !tabs) {
      return {
        tabData: { data: productListMockData.data },
        tabCounts: { total: productListMockData.count },
      };
    }

    let data;
    if (pageType === PAGE_TYPES.PRODUCT) {
      data = productPageData;
    }
    else {
      data = isWarehouseList ? warehouseListPageData : warehousePageData;
    }

    const tabCounts = Object.entries(data).reduce((acc, [key, value]) => {
      acc[key] = value.count;
      return acc;
    }, {});

    return {
      tabData: data,
      tabCounts,
    };
  }, [pageType, tabs, isWarehouseList]);
};
