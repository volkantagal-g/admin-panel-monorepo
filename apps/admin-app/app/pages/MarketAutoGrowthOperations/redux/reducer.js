import { createReducer } from 'reduxsauce';
import _, { uniqueId } from 'lodash';

import moment from 'moment';

import { Types } from '@app/pages/MarketAutoGrowthOperations/redux/actions';
import { findBucketGroups } from '@app/pages/MarketAutoGrowthOperations/util';
import {
  COLUMN_TYPES,
  GB_COUNTRY_CODE,
  SPECIFIC_AFFECTED,
  UK_COUNTRY_CODE,
  UPPER_CASE_FORMAT,
} from '@app/pages/MarketAutoGrowthOperations/constants';

export const INITIAL_STATE = {
  /* PROMO SET */
  promoSetTableData: [],
  promoSetBackupData: [],
  promoSetTableDataLoading: null,

  domainTypeList: [],
  domainTypeLoading: null,

  promoTypeList: [],
  warehouseTypeList: [],
  promoWarehouseTypeLoading: null,
  promosetConfigUpdateSuccess: null,
  promoWarehouseTypeList: {},

  aggList: [],
  aggListLoading: null,

  bucketGroups: [],
  insertPromoLoading: null,
  insertPromoSuccess: null,
  updateList: {
    delete: [],
    update: [],
    add: [],
  },
  selectedPromo: '',
  selectedWarehouse: '',
  selectedTargetWarehouse: '',

  /* TARGET */
  endOfMonth: 0,
  month: 0,
  year: 0,
  countryCode: '',

  targetTableData: [],
  targetBackupData: [],
  targetTableDataLoading: null,

  insertTargetLoading: null,
  insertTargetSuccess: null,
  updateTargetList: [], // Only update

  /* PACKET */
  packetTableData: [],
  packetBackupData: [],
  packetTableDataLoading: null,

  updatePacketLoading: null,
  updatePacketSuccess: null,
  updatePacketList: [], // Only update

  /* ACTION */
  actionTableData: [],
  actionBackupData: [],
  actionTableDataLoading: null,

  updateActionLoading: null,
  updateActionSuccess: null,
  updateActionList: {
    delete: [],
    update: [],
    add: [],
  },

  actionWarehouseList: [],
  actionWarehouseListLoading: null,
  actionPacketList: [],
  actionPacketListLoading: null,

  /* LİMİT */
  limitTableData: [],
  limitBackupData: [],
  limitTableDataLoading: null,

  updateLimitLoading: null,
  updateLimitSuccess: null,
  updateLimitList: {
    delete: [],
    update: [],
    add: [],
  },
  limitDayTypesList: [],
  limitDayTypesListLoading: null,
  limitPromoTypesList: [],
  limitPromoTypesListLoading: null,
  limitMetricsList: [],
  limitMetricsListLoading: null,
  thresholdTypeList: {},
  thresholdTypeListLoading: null,
  limitWarehouseList: [],
  limitWarehouseListLoading: null,
  limitEffectList: [],
  limitEffectListLoading: null,

  /* GENERAL */
  error: null,
  selectedDomain: '',
  hourTypes: [],
  hourTypesLoading: null,
  dayTypes: [],
  dayTypesLoading: null,
  logLoading: null,
  logStatus: null,
  changeReasons: {},
  changeReasonsLoading: null,
  domainError: null,
};

/* PROMO SET */
export const addBucketLine = (state = INITIAL_STATE, { data }) => {
  const tempPromoSetTableData = state.promoSetTableData.map(item => ({ ...item }));
  tempPromoSetTableData.push(data);
  const bucketGroups = findBucketGroups(tempPromoSetTableData) || [];

  return {
    ...state,
    promoSetTableData: tempPromoSetTableData,
    bucketGroups,
  };
};

export const updatePromoSetTableData = (state = INITIAL_STATE, { data, affected }) => {
  const tempPromoSetTableData = state.promoSetTableData.map(item => ({ ...item }));
  tempPromoSetTableData.forEach((element, index) => {
    data?.forEach((dataElement, dataIndex) => {
      if (element._id === dataElement._id) {
        tempPromoSetTableData[index].is_updated = 1;
        tempPromoSetTableData[index].isBucketNameChanged = affected === SPECIFIC_AFFECTED.BUCKET_TYPE;
        tempPromoSetTableData[index][affected] = data[dataIndex][affected] !== undefined
          ? data[dataIndex][affected]
          : '';
      }
    });
  });
  const bucketGroups = findBucketGroups(tempPromoSetTableData) || [];

  return {
    ...state,
    promoSetTableData: tempPromoSetTableData,
    bucketGroups,
  };
};

export const deleteBucketLine = (state = INITIAL_STATE, { data }) => {
  const result = state.promoSetTableData.map(item => ({ ...item }));
  const tempResult = result.filter(
    element => element._id !== data._id,
  );
  const bucketGroups = findBucketGroups(tempResult) || [];
  return {
    ...state,
    promoSetTableData: tempResult,
    bucketGroups,
  };
};

export const deleteBucket = (state = INITIAL_STATE, { data }) => {
  const tempPromoSetTableData = state.promoSetTableData.map(item => ({ ...item }));
  const result = tempPromoSetTableData?.filter(x => data?.every(x2 => x2.bucketType !== x.bucketType));
  const bucketGroups = findBucketGroups(result) || [];

  return {
    ...state,
    promoSetTableData: result,
    bucketGroups,
  };
};

export const setSelectedPromoWarehouse = (state = INITIAL_STATE, { selectedPromo, selectedWarehouse }) => {
  if (selectedWarehouse !== '') {
    const promoTypeList = state.promoWarehouseTypeList[selectedWarehouse];
    const [greeting] = Object.keys(promoTypeList);
    return {
      ...state,
      selectedWarehouse,
      promoTypeList,
      selectedPromo: greeting || '',
    };
  }

  return {
    ...state,
    selectedPromo,
  };
};

export const setCancelChanges = (state = INITIAL_STATE) => {
  const bucketGroups = findBucketGroups(state.promoSetBackupData) || [];
  return {
    ...state,
    promoSetTableData: state.promoSetBackupData,
    updateList: { delete: [], update: [], add: [] },
    bucketGroups,
  };
};

export const setUpdateList = (state = INITIAL_STATE) => {
  const changedPromoSetData = state.promoSetTableData.map(item => ({ ...item }));
  const basePromoSetData = state.promoSetBackupData.map(item => ({ ...item }));

  const arrayBaseId = basePromoSetData.map(item => item._id);
  const arrayChangedId = changedPromoSetData.map(item => item._id);

  // ADD
  const newLinesId = arrayChangedId.filter(item => !arrayBaseId.includes(item));
  const newLines = changedPromoSetData.filter(element => newLinesId.includes(element._id));

  // DELETE
  const linesToDeleteId = arrayBaseId.filter(item => !arrayChangedId.includes(item));
  const linesToDelete = basePromoSetData.filter(element => linesToDeleteId.includes(element._id));

  // UPDATE
  const linesToUpdate = [];
  basePromoSetData.forEach(baseElement => {
    changedPromoSetData.forEach(changedElement => {
      if (baseElement._id === changedElement._id) {
        const difference = _.reduce(baseElement, (result, value, key) => (_.isEqual(value, changedElement[key]) ? result : result.concat(key)), []);
        if (difference?.length > 0 && difference.includes(COLUMN_TYPES.IS_UPDATED)) difference.pop(COLUMN_TYPES.IS_UPDATED);
        if (difference?.length > 0 && difference.includes(COLUMN_TYPES.IS_BUCKET_NAME_CHANGED)) difference.pop(COLUMN_TYPES.IS_BUCKET_NAME_CHANGED);
        if (difference?.length > 0) linesToUpdate.push({ ...changedElement, affected: difference });
      }
    });
  });
  return {
    ...state,
    updateList: {
      ...state.updateList,
      delete: linesToDelete,
      add: newLines,
      update: linesToUpdate,
    },
  };
};

export const getPromoSetRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    promoSetTableData: [...INITIAL_STATE.promoSetTableData],
    promoSetBackupData: [...INITIAL_STATE.promoSetBackupData],
    bucketGroups: [...INITIAL_STATE.bucketGroups],
    promoSetTableDataLoading: true,
  };
};

export const getPromoSetSuccess = (state = INITIAL_STATE, { data }) => {
  const tempData = [];
  data.map(element => tempData.push({ ...element, is_updated: 0, _id: uniqueId() }));
  const bucketGroups = findBucketGroups(tempData) || [];

  return {
    ...state,
    promoSetTableData: tempData,
    promoSetBackupData: tempData,
    promoSetTableDataLoading: false,
    bucketGroups,
  };
};

export const getPromoSetFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    promoSetTableData: [...INITIAL_STATE.promoSetTableData],
    promoSetBackupData: [...INITIAL_STATE.promoSetBackupData],
    bucketGroups: [...INITIAL_STATE.bucketGroups],
    promoSetTableDataLoading: false,
    error,
  };
};

export const getPromoWarehouseTypeListRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    promoTypeList: [...INITIAL_STATE.promoTypeList],
    warehouseTypeList: [...INITIAL_STATE.warehouseTypeList],
    selectedPromo: '',
    selectedWarehouse: '',
    promoWarehouseTypeLoading: true,
    promoWarehouseTypeList: { ...INITIAL_STATE.promoWarehouseTypeList },
  };
};

export const getPromoWarehouseTypeListSuccess = (state = INITIAL_STATE, { data }) => {
  const promoWarehouseTypeList = data;
  const warehouseTypeList = Object.keys(data);

  const defaultWarehouseType = warehouseTypeList[0];
  const defaultPromoType = Object.keys(promoWarehouseTypeList[defaultWarehouseType])[0];

  const promoTypeList = promoWarehouseTypeList[defaultWarehouseType];

  return {
    ...state,
    promoTypeList,
    promoWarehouseTypeList,
    warehouseTypeList,
    selectedPromo: state.selectedPromo ? state.selectedPromo : defaultPromoType,
    selectedWarehouse: state.selectedWarehouse ? state.selectedWarehouse : defaultWarehouseType,
    selectedTargetWarehouse: state.selectedWarehouse ? state.selectedWarehouse : defaultWarehouseType,
    promoWarehouseTypeLoading: false,
  };
};

export const getPromoWarehouseTypeListFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    promoTypeList: [...INITIAL_STATE.promoTypeList],
    warehouseTypeList: [...INITIAL_STATE.warehouseTypeList],
    promoWarehouseTypeLoading: false,
    promoWarehouseTypeList: { ...INITIAL_STATE.promoWarehouseTypeList },
    selectedPromo: '',
    selectedWarehouse: '',
    error,
  };
};

export const getAggListRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    aggList: [...INITIAL_STATE.aggList],
    aggListLoading: true,
  };
};

export const getAggListSuccess = (state = INITIAL_STATE, { data }) => {
  const tempAggList = [];
  data?.map(element => (tempAggList?.includes(element) ? '' : tempAggList.push(element)));
  return {
    ...state,
    aggList: tempAggList,
    aggListLoading: false,
  };
};

export const getAggListFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    aggList: [...INITIAL_STATE.aggList],
    aggListLoading: false,
    error,
  };
};

export const insertPackageConfigRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    insertPromoLoading: true,
  };
};

export const insertPackageConfigSuccess = (state = INITIAL_STATE) => {
  return {
    ...state,
    insertPromoLoading: false,
    insertPromoSuccess: true,
  };
};

export const insertPackageConfigFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    insertPromoLoading: false,
    insertPromoSuccess: false,
    error,
  };
};

export const promosetConfigUpdateRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    promosetConfigUpdateLoading: true,
  };
};

export const promosetConfigUpdateSuccess = (state = INITIAL_STATE) => {
  return {
    ...state,
    promosetConfigUpdateLoading: false,
    promosetConfigUpdateSuccess: true,
    updateList: { delete: [], update: [], add: [] },
  };
};

export const promosetConfigUpdateFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    promosetConfigUpdateLoading: false,
    promosetConfigUpdateSuccess: false,
    error,
  };
};

/* TARGET */
export const setCancelTargetChanges = (state = INITIAL_STATE) => {
  return {
    ...state,
    targetTableData: state.targetBackupData,
    updateTargetList: [],
  };
};

export const updateTargetData = (state = INITIAL_STATE, { data, affected }) => {
  const targetTableData = state.targetTableData.map(item => ({ ...item }));
  const updateTargetList = state.updateTargetList.map(item => ({ ...item }));

  targetTableData.forEach((targetItem, targetIndex) => {
    if (targetItem.date === data.date) {
      targetTableData[targetIndex] = data;
    }
  });

  const hasUpdate = updateTargetList.some(updateItem => updateItem.date === data.date);
  if (hasUpdate) {
    updateTargetList.forEach((updateItem, updateIndex) => {
      if (updateItem.date === data.date) {
        updateTargetList[updateIndex][affected] = data[affected];
        updateTargetList[updateIndex]?.affected?.push(affected);
      }
    });
  }
  else updateTargetList.push({ ...data, affected: [affected] });
  return {
    ...state,
    targetTableData,
    updateTargetList,
  };
};

export const getTargetRequest = (state = INITIAL_STATE, { month, year, endOfMonth, countryCode }) => {
  return {
    ...state,
    targetTableData: [...INITIAL_STATE.targetTableData],
    targetBackupData: [...INITIAL_STATE.targetBackupData],
    updateTargetList: [...INITIAL_STATE.updateTargetList],
    targetTableDataLoading: true,
    endOfMonth,
    month,
    year,
    countryCode,
  };
};

export const getTargetSuccess = (state = INITIAL_STATE, { data }) => {
  const tempData = [...data];
  const tempMonth = state.month < 10 ? `0${state.month}` : state.month;
  const startDate = `${state.year}-${tempMonth}-01`;
  const getDateByIndex = index => moment(startDate).add(index, 'days').format(UPPER_CASE_FORMAT);
  const allDates = Array.from({ length: state.endOfMonth }).map((__, index) => getDateByIndex(index));
  const missingDates = allDates.filter(date => !tempData.some(item => item.date === date));
  tempData.push(...missingDates.map(date => ({
    date,
    orderTarget: 0,
    cpTarget: 0,
    countryCode: state.countryCode === GB_COUNTRY_CODE ? UK_COUNTRY_CODE : state.countryCode,
    domainType: state.selectedDomain,
    is_updated: 0,
  })));

  const tempDataWithUpdatedAt = tempData.map(item => ({ ...item, is_updated: 0 }));

  tempDataWithUpdatedAt.sort((a, b) => new Date(a.date) - new Date(b.date));

  return {
    ...state,
    targetTableData: tempDataWithUpdatedAt,
    targetBackupData: tempDataWithUpdatedAt,
    targetTableDataLoading: false,
  };
};

export const getTargetFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    targetTableData: [...INITIAL_STATE.targetTableData],
    targetBackupData: [...INITIAL_STATE.targetBackupData],
    updateTargetList: [...INITIAL_STATE.updateTargetList],
    targetTableDataLoading: false,
    error,
  };
};

export const insertTargetConfigRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    insertTargetLoading: true,
  };
};

export const insertTargetConfigSuccess = (state = INITIAL_STATE) => {
  const targetTableData = state.targetTableData.map(item => ({ ...item, is_updated: 0 }));

  return {
    ...state,
    insertTargetLoading: false,
    insertTargetSuccess: true,
    updateTargetList: [...INITIAL_STATE.updateTargetList],
    targetTableData,
    targetBackupData: targetTableData,
  };
};

export const insertTargetConfigFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    insertTargetLoading: false,
    insertTargetSuccess: false,
    targetTableData: state.targetBackupData,
    error,
  };
};

/* PACKET */

export const getPacketRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    packetBackupData: [...INITIAL_STATE.packetBackupData],
    packetTableData: [...INITIAL_STATE.packetTableData],
    packetTableDataLoading: true,
  };
};

export const getPacketSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    packetBackupData: data.sort((a, b) => a.packet - b.packet),
    packetTableData: data.sort((a, b) => a.packet - b.packet),
    packetTableDataLoading: false,
  };
};

export const getPacketFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    packetTableDataLoading: false,
    error,
  };
};

export const setCancelPacketChanges = (state = INITIAL_STATE) => {
  return {
    ...state,
    packetTableData: state.packetBackupData,
    updatePacketList: [],
  };
};

export const updatePacketData = (state = INITIAL_STATE, { data, affected }) => {
  const packetTableData = state.packetTableData.map(item => ({ ...item }));
  const updatePacketList = state.updatePacketList.map(item => ({ ...item }));

  packetTableData.forEach((packetItem, packetIndex) => {
    if (packetItem.id === data.id) {
      packetTableData[packetIndex] = data;
    }
  });

  const hasUpdate = updatePacketList.some(updateItem => updateItem.id === data.id);
  if (hasUpdate) {
    updatePacketList.forEach((updateItem, updateIndex) => {
      if (updateItem.id === data.id) {
        updatePacketList[updateIndex][affected] = data[affected];
        updatePacketList[updateIndex]?.affected?.push(affected);
      }
    });
  }
  else updatePacketList.push({ ...data, affected: [affected] });
  return {
    ...state,
    packetTableData,
    updatePacketList,
  };
};

export const updatePacketConfigRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    updatePacketLoading: true,
  };
};

export const updatePacketConfigSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    updatePacketLoading: false,
    updatePacketSuccess: true,
    packetBackupData: data.sort((a, b) => a.packet - b.packet),
    packetTableData: data.sort((a, b) => a.packet - b.packet),
    updatePacketList: [...INITIAL_STATE.updatePacketList],
  };
};

export const updatePacketConfigFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    updatePacketLoading: false,
    updatePacketSuccess: false,
    updatePacketList: [...INITIAL_STATE.updatePacketList],
    error,
  };
};

/* ACTION */
export const getActionRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    actionTableData: [...INITIAL_STATE.actionTableData],
    actionBackupData: [...INITIAL_STATE.actionBackupData],
    actionTableDataLoading: true,
  };
};

export const getActionSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    actionTableData: data.sort((a, b) => a.action - b.action),
    actionBackupData: data.sort((a, b) => a.action - b.action),
    actionTableDataLoading: false,
  };
};

export const getActionFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    actionTableData: [...INITIAL_STATE.actionTableData],
    actionBackupData: [...INITIAL_STATE.actionBackupData],
    actionTableDataLoading: false,
    error,
  };
};

export const getPacketListRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    actionPacketList: [...INITIAL_STATE.actionPacketList],
    actionPacketListLoading: true,
  };
};

export const getPacketListSuccess = (state = INITIAL_STATE, { data }) => {
  const tempData = [];
  data.forEach(element => (tempData.includes(element.toString()) ? '' : tempData.push(element.toString())));
  return {
    ...state,
    actionPacketList: tempData.sort((a, b) => a - b),
    actionPacketListLoading: false,
  };
};

export const getPacketListFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    actionPacketList: [...INITIAL_STATE.actionPacketList],
    actionPacketListLoading: false,
    error,
  };
};

export const getWarehouseListRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    actionWarehouseList: [...INITIAL_STATE.actionWarehouseList],
    actionWarehouseListLoading: true,
  };
};

export const getWarehouseListSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    actionWarehouseList: data,
    actionWarehouseListLoading: false,
  };
};

export const getWarehouseListFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    actionWarehouseList: [...INITIAL_STATE.actionWarehouseList],
    actionWarehouseListLoading: false,
    error,
  };
};

export const actionConfigUpdateRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    updateActionLoading: true,
  };
};

export const actionConfigUpdateSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    updateActionLoading: false,
    updateActionSuccess: true,
    actionBackupData: data?.sort((a, b) => a.action - b.action),
    actionTableData: data?.sort((a, b) => a.action - b.action),
    updateActionList: { delete: [], update: [], add: [] },
  };
};

export const actionConfigUpdateFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    updateActionLoading: false,
    updateActionSuccess: false,
    actionBackupData: [...state, state.actionBackupData],
    actionTableData: [...state, state.actionBackupData],
    updateActionList: { delete: [], update: [], add: [] },
    error,
  };
};

export const setCancelActionChanges = (state = INITIAL_STATE) => {
  return {
    ...state,
    actionTableData: state.actionBackupData,
    updateActionList: { delete: [], update: [], add: [] },
  };
};

export const deleteActionLine = (state = INITIAL_STATE, { data }) => {
  const result = state.actionTableData.map(item => ({ ...item }));
  const actionTableData = result.filter(
    element => element.id !== data.id,
  );
  return {
    ...state,
    actionTableData,
  };
};

export const addActionLine = (state = INITIAL_STATE, { data }) => {
  const actionTableData = state.actionTableData.map(item => ({ ...item }));
  actionTableData.push(data);
  return {
    ...state,
    actionTableData: actionTableData?.sort((a, b) => a.action - b.action),
  };
};

export const updateActionLine = (state = INITIAL_STATE, { data }) => {
  const actionTableData = state.actionTableData.map(item => ({ ...item }));
  actionTableData.forEach((actionItem, actionIndex) => {
    if (actionItem.id === data.id) {
      actionTableData[actionIndex] = data;
    }
  });
  return {
    ...state,
    actionTableData,
  };
};

export const setActionUpdateList = (state = INITIAL_STATE) => {
  const changedActionData = state.actionTableData.map(item => ({ ...item }));
  const baseActionData = state.actionBackupData.map(item => ({ ...item }));

  const arrayBaseId = baseActionData.map(item => item.id);
  const arrayChangedId = changedActionData.map(item => item.id);

  // ADD
  const newLinesId = arrayChangedId.filter(item => !arrayBaseId.includes(item));
  const newLines = changedActionData.filter(element => newLinesId.includes(element.id));

  // DELETE
  const linesToDeleteId = arrayBaseId.filter(item => !arrayChangedId.includes(item));
  const linesToDelete = baseActionData.filter(element => linesToDeleteId.includes(element.id));

  // UPDATE
  const linesToUpdate = [];
  baseActionData.forEach(baseElement => {
    changedActionData.forEach(changedElement => {
      if (baseElement.id === changedElement.id) {
        const difference = _.reduce(baseElement, (result, value, key) => (_.isEqual(value, changedElement[key]) ? result : result.concat(key)), []);
        if (difference?.length > 0 && difference.includes(COLUMN_TYPES.IS_UPDATED)) difference.pop(COLUMN_TYPES.IS_UPDATED);
        if (difference?.length > 0) linesToUpdate.push({ ...changedElement, affected: difference });
      }
    });
  });
  return {
    ...state,
    updateActionList: {
      ...state.updateActionList,
      delete: linesToDelete,
      add: newLines,
      update: linesToUpdate,
    },
  };
};

/* LİMİT */
export const getLimitsRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    limitTableData: [...INITIAL_STATE.limitTableData],
    limitBackupData: [...INITIAL_STATE.limitBackupData],
    limitTableDataLoading: true,
  };
};

export const getLimitsSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    limitTableData: data,
    limitBackupData: data,
    limitTableDataLoading: false,
  };
};

export const getLimitsFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    limitTableData: [...INITIAL_STATE.limitTableData],
    limitBackupData: [...INITIAL_STATE.limitBackupData],
    limitTableDataLoading: false,
    error,
  };
};

export const getLimitDayTypesRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    limitDayTypesList: [...INITIAL_STATE.limitDayTypesList],
    limitDayTypesListLoading: true,
  };
};

export const getLimitDayTypesSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    limitDayTypesList: data,
    limitDayTypesListLoading: false,
  };
};

export const getLimitDayTypesFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    limitDayTypesList: [...INITIAL_STATE.limitDayTypesList],
    limitDayTypesListLoading: false,
    error,
  };
};

export const getLimitMetricsRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    limitMetricsList: [...INITIAL_STATE.limitMetricsList],
    limitMetricsListLoading: true,
  };
};

export const getLimitMetricsSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    limitMetricsList: data,
    limitMetricsListLoading: false,
  };
};

export const getLimitMetricsFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    limitMetricsList: [...INITIAL_STATE.limitMetricsList],
    limitMetricsListLoading: false,
    error,
  };
};

export const getLimitPromoTypesRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    limitPromoTypesList: [...INITIAL_STATE.limitPromoTypesList],
    limitPromoTypesListLoading: true,
  };
};

export const getLimitPromoTypesSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    limitPromoTypesList: data,
    limitPromoTypesListLoading: false,
  };
};

export const getLimitPromoTypesFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    limitPromoTypesList: [...INITIAL_STATE.limitPromoTypesList],
    limitPromoTypesListLoading: false,
    error,
  };
};

export const getTresholdTypesRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    thresholdTypeList: { ...INITIAL_STATE.thresholdTypeList },
    thresholdTypeListLoading: true,
  };
};

export const getTresholdTypesSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    thresholdTypeList: data,
    thresholdTypeListLoading: false,
  };
};

export const getTresholdTypesFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    thresholdTypeList: { ...INITIAL_STATE.thresholdTypeList },
    thresholdTypeListLoading: false,
    error,
  };
};

export const getLimitWarehouseListRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    limitWarehouseList: [...INITIAL_STATE.limitWarehouseList],
    limitWarehouseListLoading: true,
  };
};

export const getLimitWarehouseListSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    limitWarehouseList: data,
    limitWarehouseListLoading: false,
  };
};

export const getLimitWarehouseListFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    limitWarehouseList: [...INITIAL_STATE.limitWarehouseList],
    limitWarehouseListLoading: false,
    error,
  };
};

export const getLimitEffectListRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    limitEffectList: [...INITIAL_STATE.limitEffectList],
    limitEffectListLoading: true,
  };
};

export const getLimitEffectListSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    limitEffectList: data,
    limitEffectListLoading: false,
  };
};

export const getLimitEffectListFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    limitEffectList: [...INITIAL_STATE.limitEffectList],
    limitEffectListLoading: false,
    error,
  };
};

export const limitConfigUpdateRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    updateLimitLoading: false,
    updateLimitSuccess: null,
  };
};

export const limitConfigUpdateSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    updateLimitLoading: false,
    updateLimitSuccess: true,
    limitBackupData: data,
    limitTableData: data,
    updateLimitList: { delete: [], update: [], add: [] },
  };
};

export const limitConfigUpdateFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    updateLimitLoading: false,
    updateLimitSuccess: false,
    error,
  };
};

export const setCancelLimitChanges = (state = INITIAL_STATE) => {
  return {
    ...state,
    limitTableData: state.limitBackupData,
    updateLimitList: { delete: [], update: [], add: [] },
  };
};

export const deleteLimitLine = (state = INITIAL_STATE, { data }) => {
  const result = state.limitTableData.map(item => ({ ...item }));
  const hasUpdate = [];
  const hasAdd = [];

  const currentDeleteList = state.updateLimitList?.delete;
  let currentAddList = state.updateLimitList?.add;
  let currentUpdateList = state.updateLimitList?.update;

  currentUpdateList?.forEach(update => (update.id === data.id ? hasUpdate.push(update.id) : ''));
  currentAddList?.forEach(add => (add.id === data.id ? hasAdd.push(add.id) : ''));

  if (hasUpdate?.length > 0) {
    currentUpdateList.forEach(update => hasUpdate.forEach(curr => {
      if (curr === update?.id) {
        currentUpdateList = currentUpdateList.filter(item => !hasUpdate.includes(item?.id));
      }
    }));
    currentDeleteList.push(data);
  }
  else if (hasAdd?.length > 0) {
    currentAddList.forEach(add => hasAdd.forEach(curr => {
      if (curr === add?.id) {
        currentAddList = currentAddList.filter(item => !hasAdd.includes(item?.id));
      }
    }));
  }
  else currentDeleteList.push(data);

  const limitTableData = result.filter(
    element => element.id !== data.id,
  );
  return {
    ...state,
    limitTableData,
    updateLimitList: { delete: currentDeleteList, update: currentUpdateList, add: currentAddList },
  };
};

export const addLimitLine = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    limitTableData: [...state.limitTableData, data],
    updateLimitList: {
      ...state.updateLimitList,
      add: [...state.updateLimitList.add, data],
    },
  };
};

export const updateLimitLine = (state = INITIAL_STATE, { data, affected }) => {
  const limitListUpdate = state.updateLimitList?.update;
  const limitTableData = state.limitTableData.map(item => ({ ...item }));
  limitTableData.forEach((actionItem, actionIndex) => {
    if (actionItem.id === data.id) {
      limitTableData[actionIndex] = data;
    }
  });

  const hasUpdate = limitListUpdate.some(updateItem => updateItem.id === data.id);
  if (hasUpdate) {
    limitListUpdate.forEach((updateItem, updateIndex) => {
      if (updateItem.id === data.id) {
        limitListUpdate[updateIndex][affected] = data[affected];
        limitListUpdate[updateIndex]?.affected?.push(affected);
      }
    });
  }
  else limitListUpdate.push({ ...data, affected: [affected] });

  return {
    ...state,
    limitTableData,
    updateLimitList: {
      ...state.updateLimitList,
      update: limitListUpdate,
    },
  };
};

export const deleteAllLimits = (state = INITIAL_STATE) => {
  return {
    ...state,
    limitTableData: [],
    updateLimitList: {
      add: [],
      update: [],
      delete: state.limitBackupData,
    },
  };
};

/* GENERAL */
export const getDomainTypeListRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    domainTypeList: [...INITIAL_STATE.domainTypeList],
    domainTypeLoading: true,
    selectedPromo: '',
    selectedWarehouse: '',
    selectedDomain: '',
    domainError: null,

  };
};

export const getDomainTypeListSuccess = (state = INITIAL_STATE, { data, defaultDomainType }) => {
  return {
    ...state,
    selectedDomain: defaultDomainType,
    domainTypeList: data,
    domainTypeLoading: false,
    domainError: false,
  };
};

export const getDomainTypeListFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    selectedDomain: '',
    domainTypeList: [...INITIAL_STATE.domainTypeList],
    domainTypeLoading: false,
    actionTableDataLoading: false,
    targetTableDataLoading: false,
    packetTableDataLoading: false,
    limitTableDataLoading: false,
    domainError: true,
    error,
  };
};

export const setSelectedDomain = (state = INITIAL_STATE, { selectedDomain }) => {
  return {
    ...state,
    selectedDomain,
  };
};

export const getHourTypesRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    hourTypes: [...INITIAL_STATE.hourTypes],
    hourTypesLoading: true,
  };
};

export const getHourTypesSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    hourTypes: data,
    hourTypesLoading: false,
  };
};

export const getHourTypesFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    hourTypes: [...INITIAL_STATE.hourTypes],
    hourTypesLoading: false,
    error,
  };
};

export const getDayTypesRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    dayTypes: [...INITIAL_STATE.dayTypes],
    dayTypesLoading: true,
  };
};

export const getDayTypesSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    dayTypes: data,
    dayTypesLoading: false,
  };
};

export const getDayTypesFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    dayTypes: [...INITIAL_STATE.dayTypes],
    dayTypesLoading: false,
    error,
  };
};

export const logUpdatesRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    logLoading: true,
  };
};

export const logUpdatesSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    logLoading: false,
    logStatus: data,
  };
};

export const logUpdatesFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    logLoading: false,
    logStatus: false,
    error,
  };
};

export const getChangeReasonsRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    changeReasons: { ...INITIAL_STATE.changeReasons },
    changeReasonsLoading: true,
  };
};

export const getChangeReasonsSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    changeReasons: data,
    changeReasonsLoading: false,
  };
};

export const getChangeReasonsFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    changeReasons: { ...INITIAL_STATE.changeReasons },
    changeReasonsLoading: false,
    error,
  };
};
export const destroy = () => {
  return { ...INITIAL_STATE };
};

const setSelectedTargetWarehouse = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    selectedTargetWarehouse: data,
  };
};

const importTargetsCSVRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    targetTableDataLoading: true,
  };
};

const importTargetsCSVSuccess = (state = INITIAL_STATE, { data }) => {
  const importedTargetsForSelectedSegment = data.filter(item => item.warehouseType === state.selectedTargetWarehouse);
  if (importedTargetsForSelectedSegment.length === 0) {
    return state;
  }

  const tableData = state.targetBackupData.map(item => {
    const importedItem = importedTargetsForSelectedSegment.find(elem => item.date === elem.date);
    if (importedItem) {
      return {
        date: importedItem.date,
        orderTarget: importedItem.orderTarget,
        cpTarget: importedItem.cpTarget,
        countryCode: state.countryCode === GB_COUNTRY_CODE ? UK_COUNTRY_CODE : state.countryCode,
        domainType: state.selectedDomain,
        is_updated: 0,
      };
    }
    return item;
  });

  const tempDataWithUpdatedAt = tableData.map(item => ({ ...item, is_updated: 0 }));

  tempDataWithUpdatedAt.sort((a, b) => new Date(a.date) - new Date(b.date));

  return {
    ...state,
    targetTableData: tableData,
    targetBackupData: tempDataWithUpdatedAt,
    targetTableDataLoading: false,
  };
};

const importTargetsCSVFailure = (state = INITIAL_STATE) => {
  return {
    ...state,
    targetTableDataLoading: false,
  };
};

export const HANDLERS = {
  [Types.GET_PROMO_SET_REQUEST]: getPromoSetRequest,
  [Types.GET_PROMO_SET_SUCCESS]: getPromoSetSuccess,
  [Types.GET_PROMO_SET_FAILURE]: getPromoSetFailure,
  [Types.GET_PROMO_WAREHOUSE_TYPE_LIST_REQUEST]: getPromoWarehouseTypeListRequest,
  [Types.GET_PROMO_WAREHOUSE_TYPE_LIST_SUCCESS]: getPromoWarehouseTypeListSuccess,
  [Types.GET_PROMO_WAREHOUSE_TYPE_LIST_FAILURE]: getPromoWarehouseTypeListFailure,
  [Types.GET_DOMAIN_TYPE_LIST_REQUEST]: getDomainTypeListRequest,
  [Types.GET_DOMAIN_TYPE_LIST_SUCCESS]: getDomainTypeListSuccess,
  [Types.GET_DOMAIN_TYPE_LIST_FAILURE]: getDomainTypeListFailure,
  [Types.GET_AGG_LIST_REQUEST]: getAggListRequest,
  [Types.GET_AGG_LIST_SUCCESS]: getAggListSuccess,
  [Types.GET_AGG_LIST_FAILURE]: getAggListFailure,
  [Types.INSERT_PACKAGE_CONFIG_REQUEST]: insertPackageConfigRequest,
  [Types.INSERT_PACKAGE_CONFIG_SUCCESS]: insertPackageConfigSuccess,
  [Types.INSERT_PACKAGE_CONFIG_FAILURE]: insertPackageConfigFailure,
  [Types.PROMOSET_CONFIG_UPDATE_REQUEST]: promosetConfigUpdateRequest,
  [Types.PROMOSET_CONFIG_UPDATE_SUCCESS]: promosetConfigUpdateSuccess,
  [Types.PROMOSET_CONFIG_UPDATE_FAILURE]: promosetConfigUpdateFailure,
  [Types.DELETE_BUCKET_LINE]: deleteBucketLine,
  [Types.DELETE_BUCKET]: deleteBucket,
  [Types.SET_UPDATE_LIST]: setUpdateList,
  [Types.SET_CANCEL_CHANGES]: setCancelChanges,
  [Types.ADD_BUCKET_LINE]: addBucketLine,
  [Types.UPDATE_PROMO_SET_TABLE_DATA]: updatePromoSetTableData,
  [Types.SET_SELECTED_PROMO_WAREHOUSE]: setSelectedPromoWarehouse,
  [Types.SET_SELECTED_DOMAIN]: setSelectedDomain,
  [Types.SET_CANCEL_TARGET_CHANGES]: setCancelTargetChanges,
  [Types.UPDATE_TARGET_DATA]: updateTargetData,
  [Types.GET_TARGET_REQUEST]: getTargetRequest,
  [Types.GET_TARGET_SUCCESS]: getTargetSuccess,
  [Types.GET_TARGET_FAILURE]: getTargetFailure,
  [Types.INSERT_TARGET_CONFIG_REQUEST]: insertTargetConfigRequest,
  [Types.INSERT_TARGET_CONFIG_SUCCESS]: insertTargetConfigSuccess,
  [Types.INSERT_TARGET_CONFIG_FAILURE]: insertTargetConfigFailure,
  [Types.GET_PACKET_REQUEST]: getPacketRequest,
  [Types.GET_PACKET_SUCCESS]: getPacketSuccess,
  [Types.GET_PACKET_FAILURE]: getPacketFailure,
  [Types.GET_HOUR_TYPES_REQUEST]: getHourTypesRequest,
  [Types.GET_HOUR_TYPES_SUCCESS]: getHourTypesSuccess,
  [Types.GET_HOUR_TYPES_FAILURE]: getHourTypesFailure,
  [Types.GET_DAY_TYPES_REQUEST]: getDayTypesRequest,
  [Types.GET_DAY_TYPES_SUCCESS]: getDayTypesSuccess,
  [Types.GET_DAY_TYPES_FAILURE]: getDayTypesFailure,
  [Types.UPDATE_PACKET_CONFIG_REQUEST]: updatePacketConfigRequest,
  [Types.UPDATE_PACKET_CONFIG_SUCCESS]: updatePacketConfigSuccess,
  [Types.UPDATE_PACKET_CONFIG_FAILURE]: updatePacketConfigFailure,
  [Types.UPDATE_PACKET_DATA]: updatePacketData,
  [Types.SET_CANCEL_PACKET_CHANGES]: setCancelPacketChanges,
  [Types.GET_ACTION_REQUEST]: getActionRequest,
  [Types.GET_ACTION_SUCCESS]: getActionSuccess,
  [Types.GET_ACTION_FAILURE]: getActionFailure,
  [Types.GET_PACKET_LIST_REQUEST]: getPacketListRequest,
  [Types.GET_PACKET_LIST_SUCCESS]: getPacketListSuccess,
  [Types.GET_PACKET_LIST_FAILURE]: getPacketListFailure,
  [Types.GET_WAREHOUSE_LIST_REQUEST]: getWarehouseListRequest,
  [Types.GET_WAREHOUSE_LIST_SUCCESS]: getWarehouseListSuccess,
  [Types.GET_WAREHOUSE_LIST_FAILURE]: getWarehouseListFailure,
  [Types.DELETE_ACTION_LINE]: deleteActionLine,
  [Types.ADD_ACTION_LINE]: addActionLine,
  [Types.SET_CANCEL_ACTION_CHANGES]: setCancelActionChanges,
  [Types.UPDATE_ACTION_LINE]: updateActionLine,
  [Types.ACTION_CONFIG_UPDATE_REQUEST]: actionConfigUpdateRequest,
  [Types.ACTION_CONFIG_UPDATE_SUCCESS]: actionConfigUpdateSuccess,
  [Types.ACTION_CONFIG_UPDATE_FAILURE]: actionConfigUpdateFailure,
  [Types.GET_LIMITS_REQUEST]: getLimitsRequest,
  [Types.GET_LIMITS_SUCCESS]: getLimitsSuccess,
  [Types.GET_LIMITS_FAILURE]: getLimitsFailure,
  [Types.GET_LIMIT_DAY_TYPES_REQUEST]: getLimitDayTypesRequest,
  [Types.GET_LIMIT_DAY_TYPES_SUCCESS]: getLimitDayTypesSuccess,
  [Types.GET_LIMIT_DAY_TYPES_FAILURE]: getLimitDayTypesFailure,
  [Types.GET_LIMIT_METRICS_REQUEST]: getLimitMetricsRequest,
  [Types.GET_LIMIT_METRICS_SUCCESS]: getLimitMetricsSuccess,
  [Types.GET_LIMIT_METRICS_FAILURE]: getLimitMetricsFailure,
  [Types.GET_LIMIT_PROMO_TYPES_REQUEST]: getLimitPromoTypesRequest,
  [Types.GET_LIMIT_PROMO_TYPES_SUCCESS]: getLimitPromoTypesSuccess,
  [Types.GET_LIMIT_PROMO_TYPES_FAILURE]: getLimitPromoTypesFailure,
  [Types.GET_TRESHOLD_TYPES_REQUEST]: getTresholdTypesRequest,
  [Types.GET_TRESHOLD_TYPES_SUCCESS]: getTresholdTypesSuccess,
  [Types.GET_TRESHOLD_TYPES_FAILURE]: getTresholdTypesFailure,
  [Types.LIMIT_CONFIG_UPDATE_REQUEST]: limitConfigUpdateRequest,
  [Types.LIMIT_CONFIG_UPDATE_SUCCESS]: limitConfigUpdateSuccess,
  [Types.LIMIT_CONFIG_UPDATE_FAILURE]: limitConfigUpdateFailure,
  [Types.SET_CANCEL_LIMIT_CHANGES]: setCancelLimitChanges,
  [Types.ADD_LIMIT_LINE]: addLimitLine,
  [Types.DELETE_LIMIT_LINE]: deleteLimitLine,
  [Types.UPDATE_LIMIT_LINE]: updateLimitLine,
  [Types.DELETE_ALL_LIMITS]: deleteAllLimits,
  [Types.GET_CHANGE_REASONS_REQUEST]: getChangeReasonsRequest,
  [Types.GET_CHANGE_REASONS_SUCCESS]: getChangeReasonsSuccess,
  [Types.GET_CHANGE_REASONS_FAILURE]: getChangeReasonsFailure,
  [Types.LOG_UPDATES_REQUEST]: logUpdatesRequest,
  [Types.LOG_UPDATES_SUCCESS]: logUpdatesSuccess,
  [Types.LOG_UPDATES_FAILURE]: logUpdatesFailure,
  [Types.GET_LIMIT_WAREHOUSE_LIST_REQUEST]: getLimitWarehouseListRequest,
  [Types.GET_LIMIT_WAREHOUSE_LIST_SUCCESS]: getLimitWarehouseListSuccess,
  [Types.GET_LIMIT_WAREHOUSE_LIST_FAILURE]: getLimitWarehouseListFailure,
  [Types.GET_LIMIT_EFFECT_LIST_REQUEST]: getLimitEffectListRequest,
  [Types.GET_LIMIT_EFFECT_LIST_SUCCESS]: getLimitEffectListSuccess,
  [Types.GET_LIMIT_EFFECT_LIST_FAILURE]: getLimitEffectListFailure,
  [Types.SET_ACTION_UPDATE_LIST]: setActionUpdateList,
  [Types.SET_SELECTED_TARGET_WAREHOUSE]: setSelectedTargetWarehouse,
  [Types.IMPORT_TARGETS_CSV_REQUEST]: importTargetsCSVRequest,
  [Types.IMPORT_TARGETS_CSV_SUCCESS]: importTargetsCSVSuccess,
  [Types.IMPORT_TARGETS_CSV_FAILURE]: importTargetsCSVFailure,
  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
