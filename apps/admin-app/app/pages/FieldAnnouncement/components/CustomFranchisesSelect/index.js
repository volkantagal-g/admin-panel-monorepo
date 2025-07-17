import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { createMap } from '@shared/utils/common';
import { Creators as CommonCreators } from '@shared/redux/actions/common';
import { getMarketFranchisesSelector, getWarehousesSelector } from '@shared/redux/selectors/common';
import {
  GETIR_10_DOMAIN_TYPE,
  GETIR_MARKET_DOMAIN_TYPE,
  GETIR_VOYAGER_DOMAIN_TYPE,
  SC_GROCER_WAREHOUSE_TYPE,
  WAREHOUSE_ACTIVE_STATE,
  REGULAR_WAREHOUSE_TYPE,
  STORE_CONVERSION_MARKET_FRANCHISE_TYPE,
} from '@shared/shared/constants';
import {
  SELECT_ALL_KEY,
  GETIR_10_DOMAIN_TYPE_KEY,
  GETIR_MARKET_DOMAIN_TYPE_KEY,
  GETIR_WATER_DOMAIN_TYPE_KEY,
  STORE_CONVERSION_MARKET_FRANCHISE_TYPE_KEY,
  MAX_TAG_COUNT_FOR_CUSTOM_FRANCHISE_SELECT,
  MAIN_WAREHOUSE_TYPE_KEY,
} from '../constants';
import { getActiveFranchises } from '../utils';
import ComboboxTree from '../ComboboxTree';

const CustomFranchisesSelect = ({ onChange, disabled }) => {
  const { t } = useTranslation('fieldAnnouncementPage');
  const dispatch = useDispatch();
  const franchises = useSelector(getMarketFranchisesSelector.getData);
  const isFranchisesPending = useSelector(getMarketFranchisesSelector.getIsPending);
  const warehouses = useSelector(getWarehousesSelector.getData);
  const isWarehousesPending = useSelector(getWarehousesSelector.getIsPending);

  const [activeFranchises, setActiveFranchises] = useState([]);
  const franchiseMap = useMemo(() => createMap(franchises), [franchises]);
  const warehouseMap = useMemo(() => createMap(warehouses), [warehouses]);

  useEffect(() => {
    setActiveFranchises(getActiveFranchises(franchises));
  }, [franchises]);

  const franchisesTreeData = useMemo(() => {
    let franchisesGetir10Map = {};
    let franchisesGetirMoreMap = {};
    let franchisesGetirWaterMap = {};
    let franchisesStoreConversionMap = {};

    activeFranchises.forEach(franchise => {
      franchise?.warehouses?.forEach(warehouse => {
        if (warehouse?.domainTypes.includes(GETIR_10_DOMAIN_TYPE) && warehouse?.state === WAREHOUSE_ACTIVE_STATE) {
          franchisesGetir10Map = {
            ...franchisesGetir10Map,
            [franchise?._id]: franchise?.name,
          };
        }
        if (warehouse?.domainTypes.includes(GETIR_MARKET_DOMAIN_TYPE) && warehouse?.state === WAREHOUSE_ACTIVE_STATE) {
          franchisesGetirMoreMap = {
            ...franchisesGetirMoreMap,
            [franchise?._id]: franchise?.name,
          };
        }
        if (warehouse?.domainTypes.includes(GETIR_VOYAGER_DOMAIN_TYPE) && warehouse?.state === WAREHOUSE_ACTIVE_STATE) {
          franchisesGetirWaterMap = {
            ...franchisesGetirWaterMap,
            [franchise?._id]: franchise?.name,
          };
        }
        if (warehouse?.warehouseType === SC_GROCER_WAREHOUSE_TYPE && warehouse?.state === WAREHOUSE_ACTIVE_STATE) {
          franchisesStoreConversionMap = {
            ...franchisesStoreConversionMap,
            [franchise?._id]: franchise?.name,
          };
        }
      });
    });

    const result = [{
      value: SELECT_ALL_KEY,
      title: t('ALL_FRANCHISES'),
      children: activeFranchises.map(franchise => ({
        parentKey: SELECT_ALL_KEY,
        value: franchise._id,
        title: franchise.name,
      })),
    }];

    const getUpdatedResult = (selectedMap, selectedType, key) => {
      const returnParentItemTitle = () => {
        if (key === STORE_CONVERSION_MARKET_FRANCHISE_TYPE_KEY) {
          return t(`MARKET_FRANCHISE_TYPES.${selectedType}`);
        }

        return t(`GETIR_MARKET_DOMAIN_TYPES.${selectedType}`);
      };

      return result.push({
        value: key,
        title: returnParentItemTitle(),
        children: Object.keys(selectedMap).map(franchiseId => ({
          value: franchiseId,
          title: selectedMap[franchiseId],
        })),
      });
    };

    if (Object.keys(franchisesGetir10Map).length) {
      getUpdatedResult(franchisesGetir10Map, GETIR_10_DOMAIN_TYPE, GETIR_10_DOMAIN_TYPE_KEY);
    }

    if (Object.keys(franchisesGetirMoreMap).length) {
      getUpdatedResult(franchisesGetirMoreMap, GETIR_MARKET_DOMAIN_TYPE, GETIR_MARKET_DOMAIN_TYPE_KEY);
    }

    if (Object.keys(franchisesGetirWaterMap).length) {
      getUpdatedResult(franchisesGetirWaterMap, GETIR_VOYAGER_DOMAIN_TYPE, GETIR_WATER_DOMAIN_TYPE_KEY);
    }

    if (Object.keys(franchisesStoreConversionMap).length) {
      getUpdatedResult(franchisesStoreConversionMap, STORE_CONVERSION_MARKET_FRANCHISE_TYPE, STORE_CONVERSION_MARKET_FRANCHISE_TYPE_KEY);
    }

    // For main warehouse grouped franchises first we create a map with ids
    // { main_warehouse_id: [franchise_id, franchise_id, ...]}
    const mainWarehouseFranchiseMap = {};

    if (Object.keys(franchiseMap).length && Object.keys(warehouseMap).length) {
      warehouses.forEach(warehouse => {
        // If Regular or SC Warehouse
        if ([REGULAR_WAREHOUSE_TYPE, SC_GROCER_WAREHOUSE_TYPE].includes(warehouse.warehouseType)) {
          // Does warehouse have a main store/warehouse, franchise and, is it a proper domain type we're looking for
          if (warehouse.franchise && warehouse.mainStore) {
            if (!mainWarehouseFranchiseMap[warehouse.mainStore]) {
              mainWarehouseFranchiseMap[warehouse.mainStore] = new Set();
            }
            // Add franchise under main store/warehouse
            mainWarehouseFranchiseMap[warehouse.mainStore].add(warehouse.franchise);
          }
        }
      });

      // Create main warehouse option for dropdown
      const mainWarehouses = {
        value: MAIN_WAREHOUSE_TYPE_KEY,
        title: t('MAIN_WAREHOUSES'),
        children: [],
      };

      // Map through the map and replace ids with names
      Object.keys(mainWarehouseFranchiseMap).forEach(mainStoreId => {
        const mainStore = warehouseMap[mainStoreId];

        if (mainStore) {
          mainWarehouses.children.push({
            value: mainStoreId,
            title: mainStore.name,
            children: Object.values([...mainWarehouseFranchiseMap[mainStoreId]])
              .filter(franchiseId => {
                const franchise = franchiseMap[franchiseId];
                return franchise && franchise.isActivated;
              })
              .map(franchiseId => {
                // Most of the dev data is malformed, some keys don't exist and warehouses have relations to non-existent franchises
                // that's why we require optional chaining here
                return {
                  value: franchiseMap?.[franchiseId]?._id,
                  title: franchiseMap?.[franchiseId]?.name,
                };
              }),
          });
        }
      });

      result.push(mainWarehouses);
    }

    return result;
  }, [activeFranchises, warehouses, franchiseMap, warehouseMap, t]);

  useEffect(() => {
    dispatch(CommonCreators.getMarketFranchisesRequest());
  }, [dispatch]);

  return (
    <ComboboxTree
      data={franchisesTreeData}
      placeholder={t('SELECT_FRANCHISES')}
      onChange={onChange}
      loading={isFranchisesPending || isWarehousesPending}
      disabled={disabled || isFranchisesPending}
      allowSelectAll
      maxTagCount={MAX_TAG_COUNT_FOR_CUSTOM_FRANCHISE_SELECT}
    />
  );
};

export default CustomFranchisesSelect;
