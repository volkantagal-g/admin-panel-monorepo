import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions({

  /* PROMO SET */
  getPromoSetRequest: { promoObjectiveType: '', warehouseType: '', domainType: '' },
  getPromoSetSuccess: { data: [] },
  getPromoSetFailure: { error: null },

  getPromoWarehouseTypeListRequest: { domainType: '' },
  getPromoWarehouseTypeListSuccess: { data: [] },
  getPromoWarehouseTypeListFailure: { error: null },

  getDomainTypeListRequest: { data: {} },
  getDomainTypeListSuccess: { data: [], defaultDomainType: null },
  getDomainTypeListFailure: { error: null },

  getAggListRequest: { domainType: '', warehouseType: '', promoObjectiveType: '' },
  getAggListSuccess: { data: [] },
  getAggListFailure: { error: null },

  insertPackageConfigRequest: { insertData: {}, changeReason: '', afterSuccess: null },
  insertPackageConfigSuccess: { data: null },
  insertPackageConfigFailure: { error: null },

  promosetConfigUpdateRequest: {
    promoObjectiveType: '',
    warehouseType: '',
    domainType: '',
    updateData: {},
    changeReason: '',
  },
  promosetConfigUpdateSuccess: { data: [] },
  promosetConfigUpdateFailure: { error: null },

  deleteBucketLine: { data: {} },
  deleteBucket: { data: [] },

  setUpdateList: {},
  setCancelChanges: {},
  setSelectedPromoWarehouse: { selectedPromo: '', selectedWarehouse: '' },
  setSelectedTargetWarehouse: { data: {} },
  setSelectedDomain: { selectedDomain: '' },
  updatePromoSetTableData: { data: [], affected: '' },
  addBucketLine: { data: {} },

  /* TARGET */
  setCancelTargetChanges: {},
  updateTargetData: { data: {}, affected: '' },
  getTargetRequest: { year: '', month: '', domainType: '', endOfMonth: 0, countryCode: '', warehouseType: '' },
  getTargetSuccess: { data: [] },
  getTargetFailure: { error: null },

  insertTargetConfigRequest: { year: '', month: '', domainType: '', updateData: {}, changeReason: '', warehouseType: '' },
  insertTargetConfigSuccess: { data: null },
  insertTargetConfigFailure: { error: null },

  /* PACKET */
  getPacketRequest: { domainType: '' },
  getPacketSuccess: { data: [] },
  getPacketFailure: { error: null },

  setCancelPacketChanges: {},
  updatePacketData: { data: {}, affected: '' },

  updatePacketConfigRequest: { domainType: '', updateData: {}, changeReason: '' },
  updatePacketConfigSuccess: { data: [] },
  updatePacketConfigFailure: { error: null },

  /* ACTION */
  getActionRequest: { domainType: '' },
  getActionSuccess: { data: [] },
  getActionFailure: { error: null },

  getPacketListRequest: { domainType: '' },
  getPacketListSuccess: { data: [] },
  getPacketListFailure: { error: null },

  getWarehouseListRequest: { domainType: '' },
  getWarehouseListSuccess: { data: [] },
  getWarehouseListFailure: { error: null },

  actionConfigUpdateRequest: { domainType: '', updateData: {}, changeReason: '' },
  actionConfigUpdateSuccess: { data: [] },
  actionConfigUpdateFailure: { error: null },

  setCancelActionChanges: {},
  addActionLine: { data: {} },
  deleteActionLine: { data: {} },
  updateActionLine: { data: {} },
  setActionUpdateList: {},

  /* LİMİT */
  getLimitsRequest: { domainType: '' },
  getLimitsSuccess: { data: [] },
  getLimitsFailure: { error: null },

  getLimitDayTypesRequest: { domainType: '' },
  getLimitDayTypesSuccess: { data: [] },
  getLimitDayTypesFailure: { error: null },

  getLimitMetricsRequest: { domainType: '' },
  getLimitMetricsSuccess: { data: [] },
  getLimitMetricsFailure: { error: null },

  getLimitPromoTypesRequest: { domainType: '' },
  getLimitPromoTypesSuccess: { data: [] },
  getLimitPromoTypesFailure: { error: null },

  getTresholdTypesRequest: { domainType: '' },
  getTresholdTypesSuccess: { data: [] },
  getTresholdTypesFailure: { error: null },

  getLimitWarehouseListRequest: { domainType: '' },
  getLimitWarehouseListSuccess: { data: [] },
  getLimitWarehouseListFailure: { error: null },

  getLimitEffectListRequest: { domainType: '' },
  getLimitEffectListSuccess: { data: [] },
  getLimitEffectListFailure: { error: null },

  limitConfigUpdateRequest: { domainType: '', updateData: {}, changeReason: '' },
  limitConfigUpdateSuccess: { data: [] },
  limitConfigUpdateFailure: { error: null },

  setCancelLimitChanges: {},
  addLimitLine: { data: {} },
  deleteLimitLine: { data: {} },
  updateLimitLine: { data: {}, affected: '' },
  deleteAllLimits: {},

  /* GENERAL */
  initPage: null,
  destroyPage: null,
  getHourTypesRequest: { domainType: '' },
  getHourTypesSuccess: { data: [] },
  getHourTypesFailure: { error: null },

  getDayTypesRequest: { domainType: '' },
  getDayTypesSuccess: { data: [] },
  getDayTypesFailure: { error: null },

  logUpdatesRequest: {
    domainType: '',
    userName: '',
    userId: '',
    userMail: '',
    tableType: '',
    changeReason: '',
    error: null,
    params: {},
  },
  logUpdatesSuccess: { data: null },
  logUpdatesFailure: { error: null },

  getChangeReasonsRequest: {},
  getChangeReasonsSuccess: { data: [] },
  getChangeReasonsFailure: { error: null },

  exportRequest: { data: {} },
  exportSuccess: {},
  exportFailure: { error: null },

  importTargetsCSVRequest: { domainType: '', year: '', month: '', updateData: [], selectedReason: '', warehouseType: '' },
  importTargetsCSVSuccess: { data: {} },
  importTargetsCSVFailure: { error: null },

  exportTargetsCSVRequest: { domainType: '', year: '', month: '' },

}, { prefix: `${REDUX_KEY.MARKET_GROWTH_OPERATIONS_TOOL_SETTINGS}_` });
