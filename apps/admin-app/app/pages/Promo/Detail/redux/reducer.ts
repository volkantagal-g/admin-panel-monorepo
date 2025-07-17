import { createReducer } from 'reduxsauce';

import { AxiosError } from 'axios';

import { Types } from './actions';

export const INITIAL_STATE = {
  getPromoBadges: {
    isPending: false,
    data: {},
    error: null as AxiosError | null,
  },
  updateGeneralInfo: { isPending: false },
  updateClientSegment: {
    isPending: false,
    data: {},
    error: null as AxiosError | null,
  },
  updateP3Status: {
    isPending: false,
    data: {},
    error: null as AxiosError | null,
  },
  getP3Details: {
    isPending: false,
    data: {},
    error: null as AxiosError | null,
  },
  generateP3Segment: {
    isPending: false,
    data: {},
    error: null as AxiosError | null,
  },
  deleteP3: {
    isPending: false,
    data: {},
    error: null as AxiosError | null,
  },
  updateUserFiltering: {
    isPending: false,
    data: {},
    error: null as AxiosError | null,
  },
  updateClassification: {
    isPending: false,
    data: {},
    error: null as AxiosError | null,
  },
  getResponsibleDepartments: {
    isPending: false,
    data: {},
    error: null as AxiosError | null,
  },
  updatePromoContent: {
    isPending: false,
    data: {},
    error: null as AxiosError | null,
  },
  updatePromoBadge: {
    isPending: false,
    data: {},
    error: null as AxiosError | null,
  },
  updateFinancialCondition: {
    isPending: false,
    data: {},
    error: null as AxiosError | null,
  },
  getArtisanVerticals: {
    isPending: false,
    data: {},
    error: null as AxiosError | null,
  },
  getChildPromos: {
    isPending: false,
    data: [],
    error: null as AxiosError | null,
  },
  getBenefitSAPPromos: {
    isPending: false,
    data: [],
    error: null as AxiosError | null,
  },
  updatePromoHTML: {
    isPending: false,
    data: {},
    error: null as AxiosError | null,
  },
  getMarketProducts: {
    isPending: false,
    data: {},
    error: null as AxiosError | null,
  },
  updateBulkPromos: {
    isPending: false,
    data: {},
    error: null as AxiosError | null,
  },
  getMarketProductsByIds: {
    isPending: false,
    data: {},
    error: null as AxiosError | null,
  },
  uploadPromoImage: {
    isPending: false,
    data: {},
    error: null as AxiosError | null,
  },
  updateCopyPromo: {
    isPending: false,
    data: {},
    error: null as AxiosError | null,
  },
  updateConditionProducts: {
    isPending: false,
    data: {},
    error: null as AxiosError | null,
  },
  updateExcludedProducts: {
    isPending: false,
    data: {},
    error: null as AxiosError | null,
  },
  updateBenefitType: {
    isPending: false,
    data: {},
    error: null as AxiosError | null,
  },
  updateBenefitSAPBulk: {
    isPending: false,
    data: {},
    error: null as AxiosError | null,
  },
  updateWorkingHours: {
    isPending: false,
    data: {},
    error: null as AxiosError | null,
  },
  getSegmentClientCounts: {
    isPending: false,
    data: {},
    error: null as AxiosError | null,
  },
  updatePromoSegmentTypes: {
    isPending: false,
    data: {},
    error: null as AxiosError | null,
  },
  updatePromoButtonAction: {
    isPending: false,
    data: {},
    error: null as AxiosError | null,
  },
  getConditionalProducts: { data: [] as Product[] },
  getBenefitProducts: { data: [] as Product[] },
  downloadP3SegmentClients: {
    isPending: false,
    data: {},
    error: null as AxiosError | null,
  },
};

type Product = { id: MongoIDType}
type StateType = typeof INITIAL_STATE;

export const getMarketProductsByIdsRequest = (state: StateType) => {
  return {
    ...state,
    getMarketProductsByIds: {
      ...INITIAL_STATE.getMarketProductsByIds,
      isPending: true,
    },
  };
};

export const getMarketProductsByIdsSuccess = (state: StateType, { data }: { data: any }) => {
  return {
    ...state,
    getMarketProductsByIds: {
      ...INITIAL_STATE.getMarketProductsByIds,
      data,
      isPending: false,
    },
  };
};

export const getMarketProductsByIdsFailure = (state: StateType, { error }: { error: AxiosError }) => {
  return {
    ...state,
    getMarketProductsByIds: {
      ...INITIAL_STATE.getMarketProductsByIds,
      isPending: false,
      error,
    },
  };
};

export const getPromoBadgesRequest = (state: StateType) => {
  return {
    ...state,
    getPromoBadges: {
      ...INITIAL_STATE.getPromoBadges,
      isPending: true,
    },
  };
};

export const getPromoBadgesSuccess = (state: StateType, { data }: { data: any }) => {
  return {
    ...state,
    getPromoBadges: {
      ...INITIAL_STATE.getPromoBadges,
      data,
      isPending: false,
    },
  };
};

export const getPromoBadgesFailure = (state: StateType, { error }: { error: AxiosError }) => {
  return {
    ...state,
    getPromoBadges: {
      ...INITIAL_STATE.getPromoBadges,
      isPending: false,
      error,
    },
  };
};

export const updateClassificationRequest = (state: StateType) => {
  return {
    ...state,
    updateClassification: {
      ...INITIAL_STATE.updateClassification,
      isPending: true,
    },
  };
};

export const updateClassificationSuccess = (
  state: StateType,
  { data }: { data: any },
) => {
  return {
    ...state,
    updateClassification: {
      ...INITIAL_STATE.updateClassification,
      data,
      isPending: false,
    },
  };
};

export const updateClassificationFailure = (
  state: StateType,
  { error }: { error: AxiosError },
) => {
  return {
    ...state,
    updateClassification: {
      ...INITIAL_STATE.updateClassification,
      isPending: false,
      error,
    },
  };
};

export const updatePromoSegmentTypesRequest = (state: StateType) => {
  return {
    ...state,
    updatePromoSegmentTypes: {
      ...INITIAL_STATE.updatePromoSegmentTypes,
      isPending: true,
    },
  };
};

export const updatePromoSegmentTypesSuccess = (
  state: StateType,
  { data }: { data: any },
) => {
  return {
    ...state,
    updatePromoSegmentTypes: {
      ...INITIAL_STATE.updatePromoSegmentTypes,
      data,
      isPending: false,
    },
  };
};

export const updatePromoSegmentTypesFailure = (
  state: StateType,
  { error }: { error: AxiosError },
) => {
  return {
    ...state,
    updatePromoSegmentTypes: {
      ...INITIAL_STATE.updatePromoSegmentTypes,
      isPending: false,
      error,
    },
  };
};

export const updatePromoBadgeRequest = (state: StateType) => {
  return {
    ...state,
    updatePromoBadge: {
      ...INITIAL_STATE.updatePromoBadge,
      isPending: true,
    },
  };
};

export const updatePromoBadgeSuccess = (
  state: StateType,
  { data }: { data: any },
) => {
  return {
    ...state,
    updatePromoBadge: {
      ...INITIAL_STATE.updatePromoBadge,
      data,
      isPending: false,
    },
  };
};

export const updatePromoBadgeFailure = (
  state: StateType,
  { error }: { error: AxiosError },
) => {
  return {
    ...state,
    updatePromoBadge: {
      ...INITIAL_STATE.updatePromoBadge,
      isPending: false,
      error,
    },
  };
};

export const updatePromoButtonActionRequest = (state: StateType) => {
  return {
    ...state,
    updatePromoButtonAction: {
      ...INITIAL_STATE.updatePromoButtonAction,
      isPending: true,
    },
  };
};

export const updatePromoButtonActionSuccess = (
  state: StateType,
  { data }: { data: any },
) => {
  return {
    ...state,
    updatePromoButtonAction: {
      ...INITIAL_STATE.updatePromoButtonAction,
      data,
      isPending: false,
    },
  };
};

export const updatePromoButtonActionFailure = (
  state: StateType,
  { error }: { error: AxiosError },
) => {
  return {
    ...state,
    updatePromoButtonAction: {
      ...INITIAL_STATE.updatePromoButtonAction,
      isPending: false,
      error,
    },
  };
};

export const updateBenefitTypeRequest = (state: StateType) => {
  return {
    ...state,
    updateBenefitType: {
      ...INITIAL_STATE.updateBenefitType,
      isPending: true,
    },
  };
};

export const updateBenefitTypeSuccess = (
  state: StateType,
  { data }: { data: any },
) => {
  return {
    ...state,
    updateBenefitType: {
      ...INITIAL_STATE.updateBenefitType,
      data,
      isPending: false,
    },
  };
};

export const updateBenefitTypeFailure = (
  state: StateType,
  { error }: { error: AxiosError },
) => {
  return {
    ...state,
    updateBenefitType: {
      ...INITIAL_STATE.updateBenefitType,
      isPending: false,
      error,
    },
  };
};

export const updateBenefitSAPBulkRequest = (state: StateType) => {
  return {
    ...state,
    updateBenefitSAPBulk: {
      ...INITIAL_STATE.updateBenefitSAPBulk,
      isPending: true,
    },
  };
};

export const updateBenefitSAPBulkSuccess = (
  state: StateType,
  { data }: { data: any },
) => {
  return {
    ...state,
    updateBenefitSAPBulk: {
      ...INITIAL_STATE.updateBenefitSAPBulk,
      data,
      isPending: false,
    },
  };
};

export const updateBenefitSAPBulkFailure = (
  state: StateType,
  { error }: { error: AxiosError },
) => {
  return {
    ...state,
    updateBenefitSAPBulk: {
      ...INITIAL_STATE.updateBenefitSAPBulk,
      isPending: false,
      error,
    },
  };
};

export const updateWorkingHoursRequest = (state: StateType) => {
  return {
    ...state,
    updateWorkingHours: {
      ...INITIAL_STATE.updateWorkingHours,
      isPending: true,
    },
  };
};

export const updateWorkingHoursSuccess = (
  state: StateType,
  { data }: { data: any },
) => {
  return {
    ...state,
    updateWorkingHours: {
      ...INITIAL_STATE.updateWorkingHours,
      data,
      isPending: false,
    },
  };
};

export const updateWorkingHoursFailure = (
  state: StateType,
  { error }: { error: AxiosError },
) => {
  return {
    ...state,
    updateWorkingHours: {
      ...INITIAL_STATE.updateWorkingHours,
      isPending: false,
      error,
    },
  };
};

export const updateConditionProductsRequest = (state: StateType) => {
  return {
    ...state,
    updateConditionProducts: {
      ...INITIAL_STATE.updateConditionProducts,
      isPending: true,
    },
  };
};

export const updateConditionProductsSuccess = (
  state: StateType,
  { data }: { data: any },
) => {
  return {
    ...state,
    updateConditionProducts: {
      ...INITIAL_STATE.updateConditionProducts,
      data,
      isPending: false,
    },
  };
};

export const updateConditionProductsFailure = (
  state: StateType,
  { error }: { error: AxiosError },
) => {
  return {
    ...state,
    updateConditionProducts: {
      ...INITIAL_STATE.updateConditionProducts,
      isPending: false,
      error,
    },
  };
};

export const updateExcludedProductsRequest = (state: StateType) => {
  return {
    ...state,
    updateExcludedProducts: {
      ...INITIAL_STATE.updateExcludedProducts,
      isPending: true,
    },
  };
};

export const updateExcludedProductsSuccess = (
  state: StateType,
  { data }: { data: any },
) => {
  return {
    ...state,
    updateExcludedProducts: {
      ...INITIAL_STATE.updateExcludedProducts,
      data,
      isPending: false,
    },
  };
};

export const updateExcludedProductsFailure = (
  state: StateType,
  { error }: { error: AxiosError },
) => {
  return {
    ...state,
    updateExcludedProducts: {
      ...INITIAL_STATE.updateExcludedProducts,
      isPending: false,
      error,
    },
  };
};

export const updatePromoHTMLRequest = (state: StateType) => {
  return {
    ...state,
    updatePromoHTML: {
      ...INITIAL_STATE.updatePromoHTML,
      isPending: true,
    },
  };
};

export const updatePromoHTMLSuccess = (state: StateType) => {
  return {
    ...state,
    updatePromoHTML: {
      ...INITIAL_STATE.updatePromoHTML,
      isPending: false,
    },
  };
};

export const updatePromoHTMLFailure = (
  state: StateType,
  { error }: { error: AxiosError },
) => {
  return {
    ...state,
    updatePromoHTML: {
      ...INITIAL_STATE.updatePromoHTML,
      isPending: false,
      error,
    },
  };
};

export const updateUserFilteringRequest = (state: StateType) => {
  return {
    ...state,
    updateUserFiltering: {
      ...INITIAL_STATE.updateUserFiltering,
      isPending: true,
    },
  };
};

export const updateUserFilteringSuccess = (
  state: StateType,
  { data }: { data: any },
) => {
  return {
    ...state,
    updateUserFiltering: {
      ...INITIAL_STATE.updateUserFiltering,
      data,
      isPending: false,
    },
  };
};

export const updateUserFilteringFailure = (
  state: StateType,
  { error }: { error: AxiosError },
) => {
  return {
    ...state,
    updateUserFiltering: {
      ...INITIAL_STATE.updateUserFiltering,
      isPending: false,
      error,
    },
  };
};

export const getResponsibleDepartmentsRequest = (state: StateType) => {
  return {
    ...state,
    getResponsibleDepartments: {
      ...INITIAL_STATE.getResponsibleDepartments,
      isPending: true,
    },
  };
};

export const getResponsibleDepartmentsSuccess = (state: StateType, { data }: { data: any }) => {
  return {
    ...state,
    getResponsibleDepartments: {
      ...INITIAL_STATE.getResponsibleDepartments,
      data,
      isPending: false,
    },
  };
};

export const getResponsibleDepartmentsFailure = (state: StateType, { error }: { error: AxiosError }) => {
  return {
    ...state,
    getResponsibleDepartments: {
      ...INITIAL_STATE.getResponsibleDepartments,
      isPending: false,
      error,
    },
  };
};

export const updateGeneralInfoRequest = (state: StateType) => {
  return {
    ...state,
    updateGeneralInfo: { isPending: true },
  };
};

export const updateGeneralInfoSuccess = (state: StateType) => {
  return {
    ...state,
    updateGeneralInfo: { isPending: false },
  };
};

export const updateGeneralInfoFailure = (state: StateType) => {
  return {
    ...state,
    updateGeneralInfo: { isPending: false },
  };
};

export const updateClientSegmentRequest = (state: StateType) => {
  return {
    ...state,
    updateClientSegment: {
      ...INITIAL_STATE.updateClientSegment,
      isPending: true,
    },
  };
};

export const updateClientSegmentSuccess = (state: StateType, { data }: { data: any }) => {
  return {
    ...state,
    updateClientSegment: {
      ...INITIAL_STATE.updateClientSegment,
      data,
      isPending: false,
    },
  };
};

export const updateClientSegmentFailure = (state: StateType, { error }: { error: AxiosError }) => {
  return {
    ...state,
    updateClientSegment: {
      ...INITIAL_STATE.updateClientSegment,
      isPending: false,
      error,
    },
  };
};
export const updateP3StatusRequest = (state: StateType) => {
  return {
    ...state,
    updateP3Status: {
      ...INITIAL_STATE.updateP3Status,
      isPending: true,
    },
  };
};

export const updateP3StatusSuccess = (state: StateType, { data }: { data: any }) => {
  return {
    ...state,
    updateP3Status: {
      ...INITIAL_STATE.updateP3Status,
      data,
      isPending: false,
    },
  };
};

export const updateP3StatusFailure = (state: StateType, { error }: { error: AxiosError }) => {
  return {
    ...state,
    updateP3Status: {
      ...INITIAL_STATE.updateP3Status,
      isPending: false,
      error,
    },
  };
};
export const getP3DetailsRequest = (state: StateType) => {
  return {
    ...state,
    getP3Details: {
      ...INITIAL_STATE.getP3Details,
      isPending: true,
    },
  };
};

export const getP3DetailsSuccess = (state: StateType, { data }: { data: any }) => {
  return {
    ...state,
    getP3Details: {
      ...INITIAL_STATE.getP3Details,
      data,
      isPending: false,
    },
  };
};

export const getP3DetailsFailure = (state: StateType, { error }: { error: AxiosError }) => {
  return {
    ...state,
    getP3Details: {
      ...INITIAL_STATE.getP3Details,
      isPending: false,
      error,
    },
  };
};

export const downloadP3SegmentClientsRequest = (state: StateType) => {
  return {
    ...state,
    downloadP3SegmentClients: {
      ...INITIAL_STATE.downloadP3SegmentClients,
      isPending: true,
    },
  };
};

export const downloadP3SegmentClientsSuccess = (state: StateType, { data }: { data: any }) => {
  return {
    ...state,
    downloadP3SegmentClients: {
      ...INITIAL_STATE.downloadP3SegmentClients,
      data,
      isPending: false,
    },
  };
};

export const downloadP3SegmentClientsFailure = (state: StateType, { error }: { error: AxiosError }) => {
  return {
    ...state,
    downloadP3SegmentClients: {
      ...INITIAL_STATE.downloadP3SegmentClients,
      isPending: false,
      error,
    },
  };
};

export const generateP3SegmentRequest = (state: StateType) => {
  return {
    ...state,
    generateP3Segment: {
      ...INITIAL_STATE.generateP3Segment,
      isPending: true,
    },
  };
};

export const generateP3SegmentSuccess = (state: StateType, { data }: { data: any }) => {
  return {
    ...state,
    generateP3Segment: {
      ...INITIAL_STATE.generateP3Segment,
      data,
      isPending: false,
    },
  };
};

export const generateP3SegmentFailure = (state: StateType, { error }: { error: AxiosError }) => {
  return {
    ...state,
    generateP3Segment: {
      ...INITIAL_STATE.generateP3Segment,
      isPending: false,
      error,
    },
  };
};

export const deleteP3Request = (state: StateType) => {
  return {
    ...state,
    deleteP3: {
      ...INITIAL_STATE.deleteP3,
      isPending: true,
    },
  };
};

export const deleteP3Success = (state: StateType, { data }: { data: any }) => {
  return {
    ...state,
    deleteP3: {
      ...INITIAL_STATE.deleteP3,
      data,
      isPending: false,
    },
  };
};

export const deleteP3Failure = (state: StateType, { error }: { error: AxiosError }) => {
  return {
    ...state,
    deleteP3: {
      ...INITIAL_STATE.deleteP3,
      isPending: false,
      error,
    },
  };
};

export const uploadPromoImageRequest = (state: StateType) => {
  return {
    ...state,
    uploadPromoImage: {
      ...INITIAL_STATE.uploadPromoImage,
      isPending: true,
    },
  };
};

export const uploadPromoImageSuccess = (state: StateType, { data }: { data: any }) => {
  return {
    ...state,
    uploadPromoImage: {
      ...INITIAL_STATE.uploadPromoImage,
      data,
      isPending: false,
    },
  };
};

export const uploadPromoImageFailure = (state: StateType, { error }: { error: AxiosError }) => {
  return {
    ...state,
    uploadPromoImage: {
      ...INITIAL_STATE.uploadPromoImage,
      isPending: false,
      error,
    },
  };
};

export const updatePromoContentRequest = (state: StateType) => {
  return {
    ...state,
    updatePromoContent: {
      ...INITIAL_STATE.updatePromoContent,
      isPending: true,
    },
  };
};

export const updatePromoContentSuccess = (state: StateType, { data }: { data: any }) => {
  return {
    ...state,
    updatePromoContent: {
      ...INITIAL_STATE.updatePromoContent,
      data,
      isPending: false,
    },
  };
};

export const updatePromoContentFailure = (state: StateType, { error }: { error: AxiosError }) => {
  return {
    ...state,
    updatePromoContent: {
      ...INITIAL_STATE.updatePromoContent,
      isPending: false,
      error,
    },
  };
};

export const getSegmentClientCountsRequest = (state: StateType) => {
  return {
    ...state,
    getSegmentClientCounts: {
      ...INITIAL_STATE.getSegmentClientCounts,
      isPending: true,
    },
  };
};

export const getSegmentClientCountsSuccess = (state: StateType, { data }: { data: any }) => {
  return {
    ...state,
    getSegmentClientCounts: {
      ...INITIAL_STATE.getSegmentClientCounts,
      data,
      isPending: false,
    },
  };
};

export const getSegmentClientCountsFailure = (state: StateType, { error }: { error: AxiosError }) => {
  return {
    ...state,
    getSegmentClientCounts: {
      ...INITIAL_STATE.getSegmentClientCounts,
      isPending: false,
      error,
    },
  };
};

export const updateFinancialConditionRequest = (state: StateType) => {
  return {
    ...state,
    updateFinancialCondition: {
      ...INITIAL_STATE.updateFinancialCondition,
      isPending: true,
    },
  };
};

export const updateFinancialConditionSuccess = (state: StateType, { data }: { data: any }) => {
  return {
    ...state,
    updateFinancialCondition: {
      ...INITIAL_STATE.updateFinancialCondition,
      data,
      isPending: false,
    },
  };
};

export const updateFinancialConditionFailure = (state: StateType, { error }: { error: AxiosError }) => {
  return {
    ...state,
    updateFinancialCondition: {
      ...INITIAL_STATE.updateFinancialCondition,
      isPending: false,
      error,
    },
  };
};

export const getArtisanVerticalsRequest = (state: StateType) => {
  return {
    ...state,
    getArtisanVerticals: {
      ...INITIAL_STATE.getArtisanVerticals,
      isPending: true,
    },
  };
};

export const getArtisanVerticalsSuccess = (state: StateType, { data }: { data: any }) => {
  return {
    ...state,
    getArtisanVerticals: {
      ...INITIAL_STATE.getArtisanVerticals,
      data,
      isPending: false,
    },
  };
};

export const getArtisanVerticalsFailure = (state: StateType, { error }: { error: AxiosError }) => {
  return {
    ...state,
    getArtisanVerticals: {
      ...INITIAL_STATE.getArtisanVerticals,
      isPending: false,
      error,
    },
  };
};

export const getChildPromosRequest = (state: StateType) => {
  return {
    ...state,
    getChildPromos: {
      ...INITIAL_STATE.getChildPromos,
      isPending: true,
    },
  };
};

export const resetBenefitItemsSAPDataRequest = (state: StateType) => {
  return {
    ...state,
    getBenefitSAPPromos: {
      ...INITIAL_STATE.getBenefitSAPPromos,
      data: [],
    },
  };
};

export const getChildPromosSuccess = (state: StateType, { data }: { data: any }) => {
  return {
    ...state,
    getChildPromos: {
      ...INITIAL_STATE.getChildPromos,
      data,
      isPending: false,
    },
  };
};

export const getBenefitSAPPromosSuccess = (state: StateType, { data }: { data: any }) => {
  return {
    ...state,
    getBenefitSAPPromos: {
      ...INITIAL_STATE.getBenefitSAPPromos,
      data,
      isPending: false,
    },
    getChildPromos: {
      ...state.getChildPromos,
      isPending: false,
    },
  };
};

export const getChildPromosFailure = (state: StateType, { error }: { error: AxiosError }) => {
  return {
    ...state,
    getChildPromos: {
      ...INITIAL_STATE.getChildPromos,
      isPending: false,
      error,
    },
  };
};

export const updateBulkPromosRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    updateBulkPromos: {
      ...INITIAL_STATE.updateBulkPromos,
      isPending: true,
    },
  };
};

export const updateBulkPromosSuccess = (
  state: StateType,
  { data }: { data: any },
) => {
  return {
    ...state,
    updateBulkPromos: {
      ...INITIAL_STATE.updateBulkPromos,
      data,
      isPending: false,
    },
  };
};

export const updateBulkPromosFailure = (
  state: StateType,
  { error }: { error: AxiosError },
) => {
  return {
    ...state,
    updateBulkPromos: {
      ...INITIAL_STATE.updateBulkPromos,
      isPending: false,
      error,
    },
  };
};

export const getMarketProductsRequest = (state: StateType) => {
  return {
    ...state,
    getMarketProducts: {
      ...INITIAL_STATE.getMarketProducts,
      isPending: true,
    },
  };
};

export const getMarketProductsSuccess = (state: StateType, { data }: { data: any }) => {
  return {
    ...state,
    getMarketProducts: {
      ...INITIAL_STATE.getMarketProducts,
      data,
      isPending: false,
    },
  };
};

export const getMarketProductsFailure = (state: StateType, { error }: { error: AxiosError }) => {
  return {
    ...state,
    getMarketProducts: {
      ...INITIAL_STATE.getMarketProducts,
      isPending: false,
      error,
    },
  };
};

export const getConditionalProducts = (
  state: StateType,
  { data }: { data: any },
) => {
  return {
    ...state,
    getConditionalProducts: {
      ...INITIAL_STATE.getConditionalProducts,
      data,
    },
  };
};
export const getBenefitProducts = (
  state: StateType,
  { data }: { data: any },
) => {
  return {
    ...state,
    getBenefitProducts: {
      ...INITIAL_STATE.getBenefitProducts,
      data,
    },
  };
};

export const updateConditionalProduct = (
  state: StateType,
  { data }: { data: any },
) => {
  const { updatedProduct } = data;
  const newData = state.getConditionalProducts.data.map(product => {
    if (product.id === updatedProduct.id) {
      return { ...updatedProduct };
    }
    return product;
  });
  return {
    ...state,
    getConditionalProducts: { data: newData },
  };
};

export const updateBenefitProduct = (
  state: StateType,
  { data }: { data: any },
) => {
  const { updatedProduct } = data;
  const newData = state.getBenefitProducts.data.map(product => {
    if (product.id === updatedProduct.id) {
      return { ...updatedProduct };
    }
    return product;
  });
  return {
    ...state,
    getBenefitProducts: { data: newData },
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.GET_PROMO_BADGES_REQUEST]: getPromoBadgesRequest,
  [Types.GET_PROMO_BADGES_SUCCESS]: getPromoBadgesSuccess,
  [Types.GET_PROMO_BADGES_FAILURE]: getPromoBadgesFailure,
  [Types.UPDATE_CLASSIFICATION_REQUEST]: updateClassificationRequest,
  [Types.UPDATE_CLASSIFICATION_SUCCESS]: updateClassificationSuccess,
  [Types.UPDATE_CLASSIFICATION_FAILURE]: updateClassificationFailure,
  [Types.UPDATE_PROMO_SEGMENT_TYPES_REQUEST]: updatePromoSegmentTypesRequest,
  [Types.UPDATE_PROMO_SEGMENT_TYPES_SUCCESS]: updatePromoSegmentTypesSuccess,
  [Types.UPDATE_PROMO_SEGMENT_TYPES_FAILURE]: updatePromoSegmentTypesFailure,
  [Types.UPDATE_PROMO_BUTTON_ACTION_REQUEST]: updatePromoButtonActionRequest,
  [Types.UPDATE_PROMO_BUTTON_ACTION_SUCCESS]: updatePromoButtonActionSuccess,
  [Types.UPDATE_PROMO_BUTTON_ACTION_FAILURE]: updatePromoButtonActionFailure,
  [Types.UPDATE_CONDITION_PRODUCTS_REQUEST]: updateConditionProductsRequest,
  [Types.UPDATE_CONDITION_PRODUCTS_SUCCESS]: updateConditionProductsSuccess,
  [Types.UPDATE_CONDITION_PRODUCTS_FAILURE]: updateConditionProductsFailure,
  [Types.UPDATE_EXCLUDED_PRODUCTS_REQUEST]: updateExcludedProductsRequest,
  [Types.UPDATE_EXCLUDED_PRODUCTS_SUCCESS]: updateExcludedProductsSuccess,
  [Types.UPDATE_EXCLUDED_PRODUCTS_FAILURE]: updateExcludedProductsFailure,
  [Types.UPDATE_BENEFIT_TYPE_REQUEST]: updateBenefitTypeRequest,
  [Types.UPDATE_BENEFIT_TYPE_SUCCESS]: updateBenefitTypeSuccess,
  [Types.UPDATE_BENEFIT_TYPE_FAILURE]: updateBenefitTypeFailure,
  [Types.UPDATE_BENEFIT_SAP_BULK_REQUEST]: updateBenefitSAPBulkRequest,
  [Types.UPDATE_BENEFIT_SAP_BULK_SUCCESS]: updateBenefitSAPBulkSuccess,
  [Types.UPDATE_BENEFIT_SAP_BULK_FAILURE]: updateBenefitSAPBulkFailure,
  [Types.UPDATE_WORKING_HOURS_REQUEST]: updateWorkingHoursRequest,
  [Types.UPDATE_WORKING_HOURS_SUCCESS]: updateWorkingHoursSuccess,
  [Types.UPDATE_WORKING_HOURS_FAILURE]: updateWorkingHoursFailure,
  [Types.UPDATE_GENERAL_INFO_REQUEST]: updateGeneralInfoRequest,
  [Types.UPDATE_GENERAL_INFO_SUCCESS]: updateGeneralInfoSuccess,
  [Types.UPDATE_GENERAL_INFO_FAILURE]: updateGeneralInfoFailure,
  [Types.UPDATE_CLIENT_SEGMENT_REQUEST]: updateClientSegmentRequest,
  [Types.UPDATE_CLIENT_SEGMENT_SUCCESS]: updateClientSegmentSuccess,
  [Types.UPDATE_CLIENT_SEGMENT_FAILURE]: updateClientSegmentFailure,
  [Types.UPDATE_P3_STATUS_REQUEST]: updateP3StatusRequest,
  [Types.UPDATE_P3_STATUS_SUCCESS]: updateP3StatusSuccess,
  [Types.UPDATE_P3_STATUS_FAILURE]: updateP3StatusFailure,
  [Types.GET_P3_DETAILS_REQUEST]: getP3DetailsRequest,
  [Types.GET_P3_DETAILS_SUCCESS]: getP3DetailsSuccess,
  [Types.GET_P3_DETAILS_FAILURE]: getP3DetailsFailure,
  [Types.DOWNLOAD_P3_SEGMENT_CLIENTS_REQUEST]: downloadP3SegmentClientsRequest,
  [Types.DOWNLOAD_P3_SEGMENT_CLIENTS_SUCCESS]: downloadP3SegmentClientsSuccess,
  [Types.DOWNLOAD_P3_SEGMENT_CLIENTS_FAILURE]: downloadP3SegmentClientsFailure,
  [Types.GENERATE_P3_SEGMENT_REQUEST]: generateP3SegmentRequest,
  [Types.GENERATE_P3_SEGMENT_SUCCESS]: generateP3SegmentSuccess,
  [Types.GENERATE_P3_SEGMENT_FAILURE]: generateP3SegmentFailure,
  [Types.DELETE_P3_REQUEST]: deleteP3Request,
  [Types.DELETE_P3_SUCCESS]: deleteP3Success,
  [Types.DELETE_P3_FAILURE]: deleteP3Failure,
  [Types.GET_RESPONSIBLE_DEPARTMENTS_REQUEST]: getResponsibleDepartmentsRequest,
  [Types.GET_RESPONSIBLE_DEPARTMENTS_SUCCESS]: getResponsibleDepartmentsSuccess,
  [Types.GET_RESPONSIBLE_DEPARTMENTS_FAILURE]: getResponsibleDepartmentsFailure,
  [Types.UPDATE_PROMO_CONTENT_REQUEST]: updatePromoContentRequest,
  [Types.UPDATE_PROMO_CONTENT_SUCCESS]: updatePromoContentSuccess,
  [Types.UPDATE_PROMO_CONTENT_FAILURE]: updatePromoContentFailure,
  [Types.GET_SEGMENT_CLIENT_COUNTS_REQUEST]: getSegmentClientCountsRequest,
  [Types.GET_SEGMENT_CLIENT_COUNTS_SUCCESS]: getSegmentClientCountsSuccess,
  [Types.GET_SEGMENT_CLIENT_COUNTS_FAILURE]: getSegmentClientCountsFailure,
  [Types.UPDATE_FINANCIAL_CONDITION_REQUEST]: updateFinancialConditionRequest,
  [Types.UPDATE_FINANCIAL_CONDITION_SUCCESS]: updateFinancialConditionSuccess,
  [Types.UPDATE_FINANCIAL_CONDITION_FAILURE]: updateFinancialConditionFailure,
  [Types.GET_ARTISAN_VERTICALS_REQUEST]: getArtisanVerticalsRequest,
  [Types.GET_ARTISAN_VERTICALS_SUCCESS]: getArtisanVerticalsSuccess,
  [Types.GET_ARTISAN_VERTICALS_FAILURE]: getArtisanVerticalsFailure,
  [Types.GET_CHILD_PROMOS_REQUEST]: getChildPromosRequest,
  [Types.GET_CHILD_PROMOS_SUCCESS]: getChildPromosSuccess,
  [Types.GET_BENEFIT_SAP_PROMOS_SUCCESS]: getBenefitSAPPromosSuccess,
  [Types.RESET_BENEFIT_ITEMS_SAP_DATA_REQUEST]: resetBenefitItemsSAPDataRequest,
  [Types.GET_CHILD_PROMOS_FAILURE]: getChildPromosFailure,
  [Types.UPDATE_BULK_PROMOS_REQUEST]: updateBulkPromosRequest,
  [Types.UPDATE_BULK_PROMOS_SUCCESS]: updateBulkPromosSuccess,
  [Types.UPDATE_BULK_PROMOS_FAILURE]: updateBulkPromosFailure,
  [Types.UPDATE_USER_FILTERING_REQUEST]: updateUserFilteringRequest,
  [Types.UPDATE_USER_FILTERING_SUCCESS]: updateUserFilteringSuccess,
  [Types.UPDATE_USER_FILTERING_FAILURE]: updateUserFilteringFailure,
  [Types.UPDATE_PROMO_BADGE_REQUEST]: updatePromoBadgeRequest,
  [Types.UPDATE_PROMO_BADGE_SUCCESS]: updatePromoBadgeSuccess,
  [Types.UPDATE_PROMO_BADGE_FAILURE]: updatePromoBadgeFailure,
  [Types.UPDATE_PROMO_HTML_REQUEST]: updatePromoHTMLRequest,
  [Types.UPDATE_PROMO_HTML_SUCCESS]: updatePromoHTMLSuccess,
  [Types.UPDATE_PROMO_HTML_FAILURE]: updatePromoHTMLFailure,
  [Types.GET_MARKET_PRODUCTS_REQUEST]: getMarketProductsRequest,
  [Types.GET_MARKET_PRODUCTS_SUCCESS]: getMarketProductsSuccess,
  [Types.GET_MARKET_PRODUCTS_FAILURE]: getMarketProductsFailure,
  [Types.GET_MARKET_PRODUCTS_BY_IDS_REQUEST]: getMarketProductsByIdsRequest,
  [Types.GET_MARKET_PRODUCTS_BY_IDS_SUCCESS]: getMarketProductsByIdsSuccess,
  [Types.GET_MARKET_PRODUCTS_BY_IDS_FAILURE]: getMarketProductsByIdsFailure,
  [Types.UPLOAD_PROMO_IMAGE_REQUEST]: uploadPromoImageRequest,
  [Types.UPLOAD_PROMO_IMAGE_SUCCESS]: uploadPromoImageSuccess,
  [Types.UPLOAD_PROMO_IMAGE_FAILURE]: uploadPromoImageFailure,
  [Types.GET_CONDITIONAL_PRODUCTS_REQUEST]: getConditionalProducts,
  [Types.UPDATE_CONDITIONAL_PRODUCT_REQUEST]: updateConditionalProduct,
  [Types.GET_BENEFIT_PRODUCTS_REQUEST]: getBenefitProducts,
  [Types.UPDATE_BENEFIT_PRODUCT_REQUEST]: updateBenefitProduct,
  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
