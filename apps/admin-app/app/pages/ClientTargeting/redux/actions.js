import { createActions } from 'reduxsauce';

import { GETIR_10_DOMAIN_TYPE, REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions(
  {
    getFoodPromosBySearchCodeRequest: { params: {} },
    getFoodPromosBySearchCodeSuccess: { data: [] },
    getFoodPromosBySearchCodeFailure: { error: null },

    getLocalsPromosBySearchCodeRequest: { params: {} },
    getLocalsPromosBySearchCodeSuccess: { data: [] },
    getLocalsPromosBySearchCodeFailure: { error: null },

    getMarketPromosBySearchCodeRequest: { params: {} },
    getMarketPromosBySearchCodeSuccess: { data: [] },
    getMarketPromosBySearchCodeFailure: { error: null },

    getFilteredGetirDriveVouchersRequest: { params: {} },
    getFilteredGetirDriveVouchersSuccess: { data: [] },
    getFilteredGetirDriveVouchersFailure: { error: null },

    getCuisinesRequest: {},
    getCuisinesSuccess: { data: [] },
    getCuisinesFailure: { error: null },

    getAllGwmpBrandsRequest: {},
    getAllGwmpBrandsSuccess: { data: [] },
    getAllGwmpBrandsFailure: { error: null },

    getAllGwmpVendorsRequest: {},
    getAllGwmpVendorsSuccess: { data: [] },
    getAllGwmpVendorsFailure: { error: null },

    getFilteredBrandsRequest: { params: {} },
    getFilteredBrandsSuccess: { data: [] },
    getFilteredBrandsFailure: { error: null },

    searchArtisanShopsRequest: { name: '', artisanType: '', chainId: '', activeKey: '' },
    searchArtisanShopsSuccess: { data: [], activeKey: '' },
    searchArtisanShopsFailure: { error: null, activeKey: '' },

    getRestaurantsByNameRequest: { searchString: '', activeKey: '' },
    getRestaurantsByNameSuccess: { data: [], activeKey: '' },
    getRestaurantsByNameFailure: { error: null, activeKey: '' },

    searchChainRestaurantsRequest: { searchString: '', activeKey: '' },
    searchChainRestaurantsSuccess: { data: [], activeKey: '' },
    searchChainRestaurantsFailure: { error: null, activeKey: '' },

    getChainRestaurantBranchesRequest: { chainRestaurantId: '', activeKey: '' },
    getChainRestaurantBranchesSuccess: { data: [], activeKey: '' },
    getChainRestaurantBranchesFailure: { error: null, activeKey: '' },

    getChainRestaurantProductsRequest: { chainRestaurantId: '', activeKey: '' },
    getChainRestaurantProductsSuccess: { data: [], activeKey: '' },
    getChainRestaurantProductsFailure: { error: null, activeKey: '' },

    getRestaurantProductsRequest: { restaurantId: '', activeKey: '' },
    getRestaurantProductsSuccess: { data: [], activeKey: '' },
    getRestaurantProductsFailure: { error: null, activeKey: '' },

    getRFMSegmentsRequest: {},
    getRFMSegmentsSuccess: { data: [] },
    getRFMSegmentsFailure: { error: null },

    getPersonaClientFlagsRequest: {},
    getPersonaClientFlagsSuccess: { data: [] },
    getPersonaClientFlagsFailure: { error: null },

    getArtisanTypesRequest: {},
    getArtisanTypesSuccess: { data: [] },
    getArtisanTypesFailure: { error: null },

    getArtisanChainShopsRequest: {},
    getArtisanChainShopsSuccess: { data: [] },
    getArtisanChainShopsFailure: { error: null },

    getDataScienceModelsRequest: { section: null, domainType: null },
    getDataScienceModelsSuccess: { section: null, data: [] },
    getDataScienceModelsFailure: { section: null, error: null },

    getPersonaDomainTypesRequest: { section: null },
    getPersonaDomainTypesSuccess: { section: null, data: [] },
    getPersonaDomainTypesFailure: { section: null, error: null },

    getGetirJobsJobTitlesByFiltersRequest: { searchString: '', activeKey: '' },
    getGetirJobsJobTitlesByFiltersSuccess: { data: [], activeKey: '' },
    getGetirJobsJobTitlesByFiltersFailure: { error: null, activeKey: '' },

    getGetirJobsPostTypesRequest: {},
    getGetirJobsPostTypesSuccess: { data: [] },
    getGetirJobsPostTypesFailure: { error: null },

    getGetirJobsCategoryRequest: {},
    getGetirJobsCategorySuccess: { data: [] },
    getGetirJobsCategoryFailure: { error: null },

    getGetirJobsDrivingLicensesRequest: {},
    getGetirJobsDrivingLicensesSuccess: { data: [] },
    getGetirJobsDrivingLicensesFailure: { error: null },

    searchABTestCodeRequest: { testCode: '', activeKey: '' },
    searchABTestCodeSuccess: { data: [], activeKey: '' },
    searchABTestCodeFailure: { error: null, activeKey: '' },

    getABTestCodesFromDataRequest: { activeKey: '' },
    getABTestCodesFromDataSuccess: { data: [], activeKey: '' },
    getABTestCodesFromDataFailure: { error: null, activeKey: '' },

    getGetirMarketOrderCancelReasonsRequest: { domainType: null },
    getGetirMarketOrderCancelReasonsSuccess: { data: [] },
    getGetirMarketOrderCancelReasonsFailure: { error: null },

    createClientListTemplateRequest: { data: {} },

    createClientListRequest: { data: {} },
    createClientListSuccess: { data: {} },
    // not used right now, every request timesout
    createClientListFailure: { error: null },

    resetFoodPromosRequest: null,
    resetLocalsPromosRequest: null,
    resetMarketPromosRequest: null,
    resetFilteredGetirDriveVouchersRequest: null,
    resetFilteredBrandsRequest: null,
    setEnabledType: { activeKey: '', isEnabled: false },
    setMergeType: { activeKey: '', mergeType: 'and' },
    addNewParam: { activeKey: '' },
    removeParam: { activeKey: '' },
    setActiveParamIndex: { activeKey: '', activeIndex: 1 },
    setGeoJson: { activeKey: '', geoJson: {} },
    setDateTime: {
      activeKey: '',
      startDate: null,
      endDate: null,
    },
    setDateType: {
      activeKey: '',
      startDateType: null,
      endDateType: null,
    },
    setSelectedCountType: {
      activeKey: '',
      selectedCountType: '',
    },
    setInput: { activeKey: '', clientListKey: '', value: '', filterableData: {} },
    setCollapseTriggeredKey: { activeKey: '' },
    setDataScienceFields: { data: null, section: null, activeKey: '', validationSchema: null },
    initDataScienceField: { section: null },

    initPage: null,
    destroyPage: null,
    getOrderFeedbackReasonsRequest: { domainType: GETIR_10_DOMAIN_TYPE },
    getOrderFeedbackReasonsSuccess: { data: {} },
    getOrderFeedbackReasonsFailure: { error: null },
  },
  { prefix: `${REDUX_KEY.CLIENT_TARGETING}_` },
);
