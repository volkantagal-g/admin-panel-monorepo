import { createSelector } from 'reselect';

import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.MARKET_GROWTH_OPERATIONS_TOOL_SETTINGS;

export const autoGrowthSelector = {
  selectedDomain: createSelector(
    state => state[reducerKey],
    state => state?.selectedDomain,
  ),
  error: createSelector(
    state => state[reducerKey],
    state => state?.error,
  ),
  hourTypes: createSelector(
    state => state[reducerKey],
    state => state?.hourTypes,
  ),
  hourTypesLoading: createSelector(
    state => state[reducerKey],
    state => state?.hourTypesLoading,
  ),
  dayTypes: createSelector(
    state => state[reducerKey],
    state => state?.dayTypes,
  ),
  dayTypesLoading: createSelector(
    state => state[reducerKey],
    state => state?.dayTypesLoading,
  ),
  changeReasons: createSelector(
    state => state[reducerKey],
    state => state?.changeReasons,
  ),
  changeReasonsLoading: createSelector(
    state => state[reducerKey],
    state => state?.changeReasonsLoading,
  ),
  domainError: createSelector(
    state => state[reducerKey],
    state => state?.domainError,
  ),
};

export const promoSetSelector = {
  promoSetTableData: createSelector(
    state => state[reducerKey],
    state => state?.promoSetTableData,
  ),
  promoSetTableDataLoading: createSelector(
    state => state[reducerKey],
    state => state?.promoSetTableDataLoading,
  ),
  domainTypeList: createSelector(
    state => state[reducerKey],
    state => state?.domainTypeList,
  ),
  domainTypeLoading: createSelector(
    state => state[reducerKey],
    state => state?.domainTypeLoading,
  ),
  promoTypeList: createSelector(
    state => state[reducerKey],
    state => state?.promoTypeList,
  ),
  warehouseTypeList: createSelector(
    state => state[reducerKey],
    state => (state?.warehouseTypeList ?? []).map(item => ({
      value: item,
      label: item,
    })),
  ),
  promoWarehouseTypeLoading: createSelector(
    state => state[reducerKey],
    state => state?.promoWarehouseTypeLoading,
  ),
  aggList: createSelector(
    state => state[reducerKey],
    state => state?.aggList,
  ),
  aggListLoading: createSelector(
    state => state[reducerKey],
    state => state?.aggListLoading,
  ),
  bucketGroups: createSelector(
    state => state[reducerKey],
    state => state?.bucketGroups,
  ),
  updateList: createSelector(
    state => state[reducerKey],
    state => state?.updateList,
  ),
  updateListDelete: createSelector(
    state => state[reducerKey],
    state => state?.updateList?.delete,
  ),
  updateListAdd: createSelector(
    state => state[reducerKey],
    state => state?.updateList?.add,
  ),
  updateListUpdate: createSelector(
    state => state[reducerKey],
    state => state?.updateList?.update,
  ),
  promoWarehouseTypeList: createSelector(
    state => state[reducerKey],
    state => state?.promoWarehouseTypeList,
  ),
  insertPromoLoading: createSelector(
    state => state[reducerKey],
    state => state?.insertPromoLoading,
  ),
  promosetConfigUpdateLoading: createSelector(
    state => state[reducerKey],
    state => state?.promosetConfigUpdateLoading,
  ),
  selectedPromo: createSelector(
    state => state[reducerKey],
    state => state?.selectedPromo,
  ),
  selectedWarehouse: createSelector(
    state => state[reducerKey],
    state => state?.selectedWarehouse,
  ),
  promosetConfigUpdateSuccess: createSelector(
    state => state[reducerKey],
    state => state?.promosetConfigUpdateSuccess,
  ),
  insertPromoSuccess: createSelector(
    state => state[reducerKey],
    state => state?.insertPromoSuccess,
  ),
};

export const targetSelector = {
  targetTableData: createSelector(
    state => state[reducerKey],
    state => state?.targetTableData,
  ),
  targetTableDataLoading: createSelector(
    state => state[reducerKey],
    state => state?.targetTableDataLoading,
  ),
  insertTargetLoading: createSelector(
    state => state[reducerKey],
    state => state?.insertTargetLoading,
  ),
  insertTargetSuccess: createSelector(
    state => state[reducerKey],
    state => state?.insertTargetSuccess,
  ),
  updateTargetList: createSelector(
    state => state[reducerKey],
    state => state?.updateTargetList,
  ),
  year: createSelector(
    state => state[reducerKey],
    state => state?.year,
  ),
  month: createSelector(
    state => state[reducerKey],
    state => state?.month,
  ),
  selectedTargetWarehouse: createSelector(
    state => state[reducerKey],
    state => state?.selectedTargetWarehouse,
  ),
};

export const packetSelector = {
  packetTableData: createSelector(
    state => state[reducerKey],
    state => state?.packetTableData,
  ),
  packetTableDataLoading: createSelector(
    state => state[reducerKey],
    state => state?.packetTableDataLoading,
  ),
  updatePacketList: createSelector(
    state => state[reducerKey],
    state => state?.updatePacketList,
  ),
  updatePacketLoading: createSelector(
    state => state[reducerKey],
    state => state?.updatePacketLoading,
  ),
  updatePacketSuccess: createSelector(
    state => state[reducerKey],
    state => state?.updatePacketSuccess,
  ),
};

export const actionSelector = {
  actionTableData: createSelector(
    state => state[reducerKey],
    state => state?.actionTableData,
  ),
  actionTableDataLoading: createSelector(
    state => state[reducerKey],
    state => state?.actionTableDataLoading,
  ),
  updateActionLoading: createSelector(
    state => state[reducerKey],
    state => state?.updateActionLoading,
  ),
  updateActionSuccess: createSelector(
    state => state[reducerKey],
    state => state?.updateActionSuccess,
  ),
  updateActionList: createSelector(
    state => state[reducerKey],
    state => state?.updateActionList,
  ),
  updateActionListDelete: createSelector(
    state => state[reducerKey],
    state => state?.updateActionList?.delete,
  ),
  updateActionListAdd: createSelector(
    state => state[reducerKey],
    state => state?.updateActionList?.add,
  ),
  updateActionListUpdate: createSelector(
    state => state[reducerKey],
    state => state?.updateActionList?.update,
  ),
  actionWarehouseList: createSelector(
    state => state[reducerKey],
    state => state?.actionWarehouseList,
  ),
  actionWarehouseListLoading: createSelector(
    state => state[reducerKey],
    state => state?.actionWarehouseListLoading,
  ),
  actionPacketList: createSelector(
    state => state[reducerKey],
    state => state?.actionPacketList,
  ),
  actionPacketListLoading: createSelector(
    state => state[reducerKey],
    state => state?.actionPacketListLoading,
  ),
};

export const limitSelector = {
  limitTableData: createSelector(
    state => state[reducerKey],
    state => state?.limitTableData,
  ),
  limitTableDataLoading: createSelector(
    state => state[reducerKey],
    state => state?.limitTableDataLoading,
  ),
  updateLimitLoading: createSelector(
    state => state[reducerKey],
    state => state?.updateLimitLoading,
  ),
  updateLimitSuccess: createSelector(
    state => state[reducerKey],
    state => state?.updateLimitSuccess,
  ),
  updateLimitList: createSelector(
    state => state[reducerKey],
    state => state?.updateLimitList,
  ),
  updateLimitListDelete: createSelector(
    state => state[reducerKey],
    state => state?.updateLimitList?.delete,
  ),
  updateLimitListAdd: createSelector(
    state => state[reducerKey],
    state => state?.updateLimitList?.add,
  ),
  updateLimitListUpdate: createSelector(
    state => state[reducerKey],
    state => state?.updateLimitList?.update,
  ),
  limitDayTypesList: createSelector(
    state => state[reducerKey],
    state => state?.limitDayTypesList,
  ),
  limitDayTypesListLoading: createSelector(
    state => state[reducerKey],
    state => state?.limitDayTypesListLoading,
  ),
  limitPromoTypesList: createSelector(
    state => state[reducerKey],
    state => state?.limitPromoTypesList,
  ),
  limitPromoTypesListLoading: createSelector(
    state => state[reducerKey],
    state => state?.limitPromoTypesListLoading,
  ),
  limitMetricsList: createSelector(
    state => state[reducerKey],
    state => state?.limitMetricsList,
  ),
  limitMetricsListLoading: createSelector(
    state => state[reducerKey],
    state => state?.limitMetricsListLoading,
  ),
  thresholdTypeList: createSelector(
    state => state[reducerKey],
    state => state?.thresholdTypeList,
  ),
  thresholdTypeListLoading: createSelector(
    state => state[reducerKey],
    state => state?.thresholdTypeListLoading,
  ),
  limitWarehouseList: createSelector(
    state => state[reducerKey],
    state => state?.limitWarehouseList,
  ),
  limitWarehouseListLoading: createSelector(
    state => state[reducerKey],
    state => state?.limitWarehouseListLoading,
  ),
  limitEffectList: createSelector(
    state => state[reducerKey],
    state => state?.limitEffectList,
  ),
  limitEffectListLoading: createSelector(
    state => state[reducerKey],
    state => state?.limitEffectListLoading,
  ),
};
