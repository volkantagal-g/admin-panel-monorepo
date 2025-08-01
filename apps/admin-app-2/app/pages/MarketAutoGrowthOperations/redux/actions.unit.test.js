import { Creators, Types } from '@app/pages/MarketAutoGrowthOperations/redux/actions';

describe('AutoGrowth', () => {
  describe('action-creator #getPromoSetRequest', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.getPromoSetRequest();
      const expectedAction = {
        type: Types.GET_PROMO_SET_REQUEST,
        promoObjectiveType: '',
        warehouseType: '',
        domainType: '',
      };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #getPromoSetSuccess', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.getPromoSetSuccess();
      const expectedAction = { type: Types.GET_PROMO_SET_SUCCESS, data: [] };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #getPromoSetFailure', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.getPromoSetFailure();
      const expectedAction = { type: Types.GET_PROMO_SET_FAILURE, error: null };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #getPromoWarehouseTypeListRequest', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.getPromoWarehouseTypeListRequest();
      const expectedAction = { type: Types.GET_PROMO_WAREHOUSE_TYPE_LIST_REQUEST, domainType: '' };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #getPromoWarehouseTypeListSuccess', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.getPromoWarehouseTypeListSuccess();
      const expectedAction = { type: Types.GET_PROMO_WAREHOUSE_TYPE_LIST_SUCCESS, data: [] };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #getPromoWarehouseTypeListFailure', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.getPromoWarehouseTypeListFailure();
      const expectedAction = { type: Types.GET_PROMO_WAREHOUSE_TYPE_LIST_FAILURE, error: null };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #getDomainTypeListRequest', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.getDomainTypeListRequest();
      const expectedAction = { type: Types.GET_DOMAIN_TYPE_LIST_REQUEST, data: {} };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #getDomainTypeListSuccess', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.getDomainTypeListSuccess();
      const expectedAction = { type: Types.GET_DOMAIN_TYPE_LIST_SUCCESS, data: [], defaultDomainType: null };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #getDomainTypeListFailure', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.getDomainTypeListFailure();
      const expectedAction = { type: Types.GET_DOMAIN_TYPE_LIST_FAILURE, error: null };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #getAggListRequest', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.getAggListRequest();
      const expectedAction = {
        type: Types.GET_AGG_LIST_REQUEST,
        domainType: '',
        warehouseType: '',
        promoObjectiveType: '',
      };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #getAggListSuccess', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.getAggListSuccess();
      const expectedAction = { type: Types.GET_AGG_LIST_SUCCESS, data: [] };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #getAggListFailure', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.getAggListFailure();
      const expectedAction = { type: Types.GET_AGG_LIST_FAILURE, error: null };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #insertPackageConfigSuccess', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.insertPackageConfigSuccess();
      const expectedAction = { type: Types.INSERT_PACKAGE_CONFIG_SUCCESS, data: null };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #insertPackageConfigFailure', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.insertPackageConfigFailure();
      const expectedAction = { type: Types.INSERT_PACKAGE_CONFIG_FAILURE, error: null };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #promosetConfigUpdateRequest', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.promosetConfigUpdateRequest();
      const expectedAction = {
        type: Types.PROMOSET_CONFIG_UPDATE_REQUEST,
        promoObjectiveType: '',
        warehouseType: '',
        domainType: '',
        updateData: {},
        changeReason: '',
      };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #promosetConfigUpdateSuccess', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.promosetConfigUpdateSuccess();
      const expectedAction = { type: Types.PROMOSET_CONFIG_UPDATE_SUCCESS, data: [] };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #promosetConfigUpdateFailure', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.promosetConfigUpdateFailure();
      const expectedAction = { type: Types.PROMOSET_CONFIG_UPDATE_FAILURE, error: null };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #deleteBucketLine', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.deleteBucketLine();
      const expectedAction = { type: Types.DELETE_BUCKET_LINE, data: {} };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #deleteBucket', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.deleteBucket();
      const expectedAction = { type: Types.DELETE_BUCKET, data: [] };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #setUpdateList', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.setUpdateList();
      const expectedAction = { type: Types.SET_UPDATE_LIST };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #setCancelChanges', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.setCancelChanges();
      const expectedAction = { type: Types.SET_CANCEL_CHANGES };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #setSelectedPromoWarehouse', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.setSelectedPromoWarehouse();
      const expectedAction = { type: Types.SET_SELECTED_PROMO_WAREHOUSE, selectedPromo: '', selectedWarehouse: '' };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #setSelectedDomain', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.setSelectedDomain();
      const expectedAction = { type: Types.SET_SELECTED_DOMAIN, selectedDomain: '' };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #updatePromoSetTableData', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.updatePromoSetTableData();
      const expectedAction = { type: Types.UPDATE_PROMO_SET_TABLE_DATA, data: [], affected: '' };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #addBucketLine', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.addBucketLine();
      const expectedAction = { type: Types.ADD_BUCKET_LINE, data: {} };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #setCancelTargetChanges', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.setCancelTargetChanges();
      const expectedAction = { type: Types.SET_CANCEL_TARGET_CHANGES };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #updateTargetData', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.updateTargetData();
      const expectedAction = { type: Types.UPDATE_TARGET_DATA, data: {}, affected: '' };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #getTargetRequest', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.getTargetRequest();
      const expectedAction = {
        type: Types.GET_TARGET_REQUEST,
        year: '',
        month: '',
        domainType: '',
        endOfMonth: 0,
        countryCode: '',
        warehouseType: '',
      };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #getTargetSuccess', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.getTargetSuccess();
      const expectedAction = { type: Types.GET_TARGET_SUCCESS, data: [] };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #getTargetFailure', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.getTargetFailure();
      const expectedAction = { type: Types.GET_TARGET_FAILURE, error: null };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #insertTargetConfigRequest', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.insertTargetConfigRequest();
      const expectedAction = {
        type: Types.INSERT_TARGET_CONFIG_REQUEST,
        year: '',
        month: '',
        domainType: '',
        updateData: {},
        changeReason: '',
        warehouseType: '',
      };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #insertTargetConfigSuccess', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.insertTargetConfigSuccess();
      const expectedAction = { type: Types.INSERT_TARGET_CONFIG_SUCCESS, data: null };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #insertTargetConfigFailure', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.insertTargetConfigFailure();
      const expectedAction = { type: Types.INSERT_TARGET_CONFIG_FAILURE, error: null };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #destroyPage', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.destroyPage();
      const expectedAction = { type: Types.DESTROY_PAGE };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #getPacketRequest', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.getPacketRequest();
      const expectedAction = { type: Types.GET_PACKET_REQUEST, domainType: '' };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #getPacketSuccess', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.getPacketSuccess();
      const expectedAction = { type: Types.GET_PACKET_SUCCESS, data: [] };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #getPacketFailure', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.getPacketFailure();
      const expectedAction = { type: Types.GET_PACKET_FAILURE, error: null };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #setCancelPacketChanges', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.setCancelPacketChanges();
      const expectedAction = { type: Types.SET_CANCEL_PACKET_CHANGES };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #updatePacketData', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.updatePacketData();
      const expectedAction = { type: Types.UPDATE_PACKET_DATA, data: {}, affected: '' };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #updatePacketConfigRequest', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.updatePacketConfigRequest();
      const expectedAction = {
        type: Types.UPDATE_PACKET_CONFIG_REQUEST,
        domainType: '',
        updateData: {},
        changeReason: '',
      };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #updatePacketConfigSuccess', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.updatePacketConfigSuccess();
      const expectedAction = { type: Types.UPDATE_PACKET_CONFIG_SUCCESS, data: [] };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #updatePacketConfigFailure', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.updatePacketConfigFailure();
      const expectedAction = { type: Types.UPDATE_PACKET_CONFIG_FAILURE, error: null };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #getActionRequest', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.getActionRequest();
      const expectedAction = { type: Types.GET_ACTION_REQUEST, domainType: '' };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #getActionSuccess', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.getActionSuccess();
      const expectedAction = { type: Types.GET_ACTION_SUCCESS, data: [] };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #getActionFailure', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.getActionFailure();
      const expectedAction = { type: Types.GET_ACTION_FAILURE, error: null };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #getPacketListRequest', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.getPacketListRequest();
      const expectedAction = { type: Types.GET_PACKET_LIST_REQUEST, domainType: '' };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #getPacketListSuccess', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.getPacketListSuccess();
      const expectedAction = { type: Types.GET_PACKET_LIST_SUCCESS, data: [] };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #getPacketListFailure', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.getPacketListFailure();
      const expectedAction = { type: Types.GET_PACKET_LIST_FAILURE, error: null };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #getWarehouseListRequest', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.getWarehouseListRequest();
      const expectedAction = { type: Types.GET_WAREHOUSE_LIST_REQUEST, domainType: '' };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #getWarehouseListSuccess', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.getWarehouseListSuccess();
      const expectedAction = { type: Types.GET_WAREHOUSE_LIST_SUCCESS, data: [] };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #getWarehouseListFailure', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.getWarehouseListFailure();
      const expectedAction = { type: Types.GET_WAREHOUSE_LIST_FAILURE, error: null };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #actionConfigUpdateRequest', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.actionConfigUpdateRequest();
      const expectedAction = {
        type: Types.ACTION_CONFIG_UPDATE_REQUEST,
        domainType: '',
        updateData: {},
        changeReason: '',
      };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #actionConfigUpdateSuccess', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.actionConfigUpdateSuccess();
      const expectedAction = { type: Types.ACTION_CONFIG_UPDATE_SUCCESS, data: [] };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #actionConfigUpdateFailure', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.actionConfigUpdateFailure();
      const expectedAction = { type: Types.ACTION_CONFIG_UPDATE_FAILURE, error: null };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #setCancelActionChanges', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.setCancelActionChanges();
      const expectedAction = { type: Types.SET_CANCEL_ACTION_CHANGES };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #addActionLine', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.addActionLine();
      const expectedAction = { type: Types.ADD_ACTION_LINE, data: {} };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #deleteActionLine', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.deleteActionLine();
      const expectedAction = { type: Types.DELETE_ACTION_LINE, data: {} };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #updateActionLine', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.updateActionLine();
      const expectedAction = { type: Types.UPDATE_ACTION_LINE, data: {} };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #getLimitsRequest', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.getLimitsRequest();
      const expectedAction = { type: Types.GET_LIMITS_REQUEST, domainType: '' };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #getLimitsSuccess', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.getLimitsSuccess();
      const expectedAction = { type: Types.GET_LIMITS_SUCCESS, data: [] };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #getLimitsFailure', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.getLimitsFailure();
      const expectedAction = { type: Types.GET_LIMITS_FAILURE, error: null };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #getLimitDayTypesRequest', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.getLimitDayTypesRequest();
      const expectedAction = { type: Types.GET_LIMIT_DAY_TYPES_REQUEST, domainType: '' };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #getLimitDayTypesSuccess', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.getLimitDayTypesSuccess();
      const expectedAction = { type: Types.GET_LIMIT_DAY_TYPES_SUCCESS, data: [] };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #getLimitDayTypesFailure', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.getLimitDayTypesFailure();
      const expectedAction = { type: Types.GET_LIMIT_DAY_TYPES_FAILURE, error: null };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #getLimitMetricsRequest', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.getLimitMetricsRequest();
      const expectedAction = { type: Types.GET_LIMIT_METRICS_REQUEST, domainType: '' };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #getLimitMetricsSuccess', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.getLimitMetricsSuccess();
      const expectedAction = { type: Types.GET_LIMIT_METRICS_SUCCESS, data: [] };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #getLimitMetricsFailure', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.getLimitMetricsFailure();
      const expectedAction = { type: Types.GET_LIMIT_METRICS_FAILURE, error: null };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #getLimitPromoTypesRequest', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.getLimitPromoTypesRequest();
      const expectedAction = { type: Types.GET_LIMIT_PROMO_TYPES_REQUEST, domainType: '' };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #getLimitPromoTypesSuccess', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.getLimitPromoTypesSuccess();
      const expectedAction = { type: Types.GET_LIMIT_PROMO_TYPES_SUCCESS, data: [] };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #getLimitPromoTypesFailure', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.getLimitPromoTypesFailure();
      const expectedAction = { type: Types.GET_LIMIT_PROMO_TYPES_FAILURE, error: null };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #getTresholdTypesRequest', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.getTresholdTypesRequest();
      const expectedAction = { type: Types.GET_TRESHOLD_TYPES_REQUEST, domainType: '' };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #getTresholdTypesSuccess', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.getTresholdTypesSuccess();
      const expectedAction = { type: Types.GET_TRESHOLD_TYPES_SUCCESS, data: [] };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #getTresholdTypesFailure', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.getTresholdTypesFailure();
      const expectedAction = { type: Types.GET_TRESHOLD_TYPES_FAILURE, error: null };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #getLimitWarehouseListRequest', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.getLimitWarehouseListRequest();
      const expectedAction = { type: Types.GET_LIMIT_WAREHOUSE_LIST_REQUEST, domainType: '' };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #getLimitWarehouseListSuccess', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.getLimitWarehouseListSuccess();
      const expectedAction = { type: Types.GET_LIMIT_WAREHOUSE_LIST_SUCCESS, data: [] };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #getLimitWarehouseListFailure', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.getLimitWarehouseListFailure();
      const expectedAction = { type: Types.GET_LIMIT_WAREHOUSE_LIST_FAILURE, error: null };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #getLimitEffectListRequest', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.getLimitEffectListRequest();
      const expectedAction = { type: Types.GET_LIMIT_EFFECT_LIST_REQUEST, domainType: '' };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #getLimitEffectListSuccess', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.getLimitEffectListSuccess();
      const expectedAction = { type: Types.GET_LIMIT_EFFECT_LIST_SUCCESS, data: [] };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #getLimitEffectListFailure', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.getLimitEffectListFailure();
      const expectedAction = { type: Types.GET_LIMIT_EFFECT_LIST_FAILURE, error: null };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #limitConfigUpdateRequest', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.limitConfigUpdateRequest();
      const expectedAction = {
        type: Types.LIMIT_CONFIG_UPDATE_REQUEST,
        domainType: '',
        updateData: {},
        changeReason: '',
      };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #limitConfigUpdateSuccess', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.limitConfigUpdateSuccess();
      const expectedAction = { type: Types.LIMIT_CONFIG_UPDATE_SUCCESS, data: [] };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #limitConfigUpdateFailure', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.limitConfigUpdateFailure();
      const expectedAction = { type: Types.LIMIT_CONFIG_UPDATE_FAILURE, error: null };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #setCancelLimitChanges', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.setCancelLimitChanges();
      const expectedAction = { type: Types.SET_CANCEL_LIMIT_CHANGES };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #addLimitLine', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.addLimitLine();
      const expectedAction = { type: Types.ADD_LIMIT_LINE, data: {} };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #deleteLimitLine', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.deleteLimitLine();
      const expectedAction = { type: Types.DELETE_LIMIT_LINE, data: {} };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #updateLimitLine', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.updateLimitLine();
      const expectedAction = { type: Types.UPDATE_LIMIT_LINE, data: {}, affected: '' };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #deleteAllLimits', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.deleteAllLimits();
      const expectedAction = { type: Types.DELETE_ALL_LIMITS };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #initPage', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.initPage();
      const expectedAction = { type: Types.INIT_PAGE };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #getHourTypesRequest', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.getHourTypesRequest();
      const expectedAction = { type: Types.GET_HOUR_TYPES_REQUEST, domainType: '' };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #getHourTypesSuccess', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.getHourTypesSuccess();
      const expectedAction = { type: Types.GET_HOUR_TYPES_SUCCESS, data: [] };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #getHourTypesFailure', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.getHourTypesFailure();
      const expectedAction = { type: Types.GET_HOUR_TYPES_FAILURE, error: null };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #getDayTypesRequest', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.getDayTypesRequest();
      const expectedAction = { type: Types.GET_DAY_TYPES_REQUEST, domainType: '' };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #getDayTypesSuccess', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.getDayTypesSuccess();
      const expectedAction = { type: Types.GET_DAY_TYPES_SUCCESS, data: [] };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #getDayTypesFailure', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.getDayTypesFailure();
      const expectedAction = { type: Types.GET_DAY_TYPES_FAILURE, error: null };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #logUpdatesRequest', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.logUpdatesRequest();
      const expectedAction = {
        type: Types.LOG_UPDATES_REQUEST,
        domainType: '',
        userName: '',
        userId: '',
        userMail: '',
        tableType: '',
        changeReason: '',
        error: null,
        params: {},
      };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #logUpdatesSuccess', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.logUpdatesSuccess();
      const expectedAction = { type: Types.LOG_UPDATES_SUCCESS, data: null };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #logUpdatesFailure', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.logUpdatesFailure();
      const expectedAction = { type: Types.LOG_UPDATES_FAILURE, error: null };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #getChangeReasonsRequest', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.getChangeReasonsRequest();
      const expectedAction = { type: Types.GET_CHANGE_REASONS_REQUEST };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #getChangeReasonsSuccess', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.getChangeReasonsSuccess();
      const expectedAction = { type: Types.GET_CHANGE_REASONS_SUCCESS, data: [] };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #getChangeReasonsFailure', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.getChangeReasonsFailure();
      const expectedAction = { type: Types.GET_CHANGE_REASONS_FAILURE, error: null };
      expect(receivedAction).toEqual(expectedAction);
    });
  });
});
