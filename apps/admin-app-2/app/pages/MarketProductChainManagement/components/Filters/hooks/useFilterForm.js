import { Form } from 'antd';
import { useCallback, useRef } from 'react';

import useDebouncedCallback from '@shared/hooks/useDebouncedCallback';
import { DARKSTORE_TABS, PAGE_TYPES, WAREHOUSE_TABS } from '@app/pages/MarketProductChainManagement/constants';

export const useFilterForm = (setFormValues, activeTab, pageType) => {
  const [form] = Form.useForm();
  const lastFiltersRef = useRef({});

  const handleFilterBase = useCallback(() => {
    const formValues = form.getFieldsValue();
    const filters = {
      cityVertexIds: formValues.city || [],
      demographyVertexIds: formValues.demography || [],
      domainTypeVertexIds: (() => {
        if (Array.isArray(formValues.domain)) {
          return formValues.domain.map(String);
        }
        if (formValues.domain) {
          return [String(formValues.domain)];
        }
        return [];
      })(),
      regionVertexIds: formValues.region || [],
      sizeVertexIds: formValues.size || [],
      warehouseTypeVertexIds: formValues.type || [],
    };

    filters.productName = undefined;
    filters.name = undefined;
    filters.warehouseName = undefined;
    filters.darkstoreName = undefined;
    filters.search = undefined;

    if (pageType === PAGE_TYPES.PRODUCT) {
      const productFilters = {
        search: formValues.search && formValues.search.trim() !== '' ? formValues.search : undefined,
        masterSubClass: formValues.category && formValues.category.trim() !== '' ? formValues.category : undefined,
        segment: formValues.segment ? Number(formValues.segment) : undefined,
        domainType: (() => {
          if (formValues.domain === undefined || formValues.domain === null) {
            return undefined;
          }
          if (Array.isArray(formValues.domain) && formValues.domain.length > 0) {
            return Number(formValues.domain[0]);
          }
          return Number(formValues.domain);
        })(),
        size: formValues.size ? Number(formValues.size) : undefined,
        demography: formValues.demography !== undefined && formValues.demography !== null ? Number(formValues.demography) : undefined,
        warehouseType: formValues.type ? Number(formValues.type) : undefined,
      };

      Object.keys(productFilters).forEach(key => {
        if (productFilters[key] === undefined) {
          delete productFilters[key];
        }
      });

      const lastFilters = lastFiltersRef.current;
      const hasChanged = !isEqual(productFilters, lastFilters);

      if (hasChanged) {
        lastFiltersRef.current = { ...productFilters };
        setFormValues({ filters: productFilters });
      }
      return;
    }

    if (pageType === PAGE_TYPES.DARK_STORE) {
      switch (activeTab) {
        case DARKSTORE_TABS.PRODUCTS:
          filters.cityVertexIds = [];
          filters.regionVertexIds = [];
          filters.sizeVertexIds = [];
          filters.warehouseTypeVertexIds = [];
          break;
        case DARKSTORE_TABS.CENTRAL_WAREHOUSE:
        case DARKSTORE_TABS.SUPPLIERS:
          filters.demographyVertexIds = [];
          filters.regionVertexIds = [];
          filters.sizeVertexIds = [];
          filters.warehouseTypeVertexIds = [];
          break;
        default:
          break;
      }
    }

    if (formValues.search) {
      const searchValue = formValues.search;

      switch (pageType) {
        case PAGE_TYPES.WAREHOUSE:
          switch (activeTab) {
            case WAREHOUSE_TABS.PRODUCTS:
              filters.productName = searchValue;
              break;
            case WAREHOUSE_TABS.SUPPLIERS:
              filters.name = searchValue;
              break;
            case WAREHOUSE_TABS.CENTRAL_WAREHOUSE:
              filters.search = searchValue;
              break;
            case WAREHOUSE_TABS.DARK_STORE:
              filters.search = searchValue;
              break;
            default:
              filters.search = searchValue;
              break;
          }
          break;

        case PAGE_TYPES.DARK_STORE:
          switch (activeTab) {
            case DARKSTORE_TABS.PRODUCTS:
              filters.productName = searchValue;
              break;
            case DARKSTORE_TABS.SUPPLIERS:
              filters.name = searchValue;
              break;
            case DARKSTORE_TABS.CENTRAL_WAREHOUSE:
              filters.warehouseName = searchValue;
              break;
            default:
              filters.warehouseName = searchValue;
              break;
          }
          break;

        case PAGE_TYPES.PRODUCT:
          filters.productName = searchValue;
          break;

        default:
          filters.warehouseName = searchValue;
          break;
      }
    }

    const lastFilters = lastFiltersRef.current;
    const hasChanged = !isEqual(filters, lastFilters);

    if (hasChanged) {
      lastFiltersRef.current = { ...filters };
      setFormValues({ filters });
    }
  }, [form, setFormValues, activeTab, pageType]);

  const { debouncedCallback: handleFilter } = useDebouncedCallback({
    callback: handleFilterBase,
    delay: 300,
  });

  function isEqual(obj1, obj2) {
    const keys = Object.keys(obj1);
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      if (Array.isArray(obj1[key])) {
        if (!Array.isArray(obj2[key]) || obj1[key].length !== obj2[key].length) {
          return false;
        }

        for (let j = 0; j < obj1[key].length; j++) {
          if (obj1[key][j] !== obj2[key][j]) {
            return false;
          }
        }
      }
      else if (obj1[key] !== obj2[key]) {
        return false;
      }
    }

    return true;
  }

  return {
    form,
    handleFilter,
  };
};
