import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.PROMO.DETAIL;

export const getSegmentClientCountsSelector = {
  getData: state => state?.[reducerKey]?.getSegmentClientCounts?.data || null,
  getIsPending: state => state?.[reducerKey]?.getSegmentClientCounts?.isPending,
};

export const getResponsibleDepartmentsSelector = {
  getData: state => {
    return state?.[reducerKey]?.getResponsibleDepartments?.data?.departmentFilter?.departments || [];
  },
};

export const updateGeneralInfoSelector = { getIsPending: state => state?.[reducerKey]?.updateGeneralInfo?.isPending };

export const updatePromoContentSelector = {
  getError: state => state?.[reducerKey]?.updatePromoContent?.error,
  getIsPending: state => state?.[reducerKey]?.updatePromoContent?.isPending,
};

export const updateFinancialConditionSelector = {
  getError: state => state?.[reducerKey]?.updateFinancialCondition?.error,
  getIsPending: state => state?.[reducerKey]?.updateFinancialCondition?.isPending,
};

export const updateClientSegmentSelector = {
  getError: state => state?.[reducerKey]?.updateClientSegment?.error,
  getIsPending: state => state?.[reducerKey]?.updateClientSegment?.isPending,
};

export const getP3DetailsSelector = {
  getData: state => state?.[reducerKey]?.getP3Details?.data,
  getError: state => state?.[reducerKey]?.getP3Details?.error,
  getIsPending: state => state?.[reducerKey]?.getP3Details?.isPending,
};

export const downloadP3SegmentClientsSelector = {
  getData: state => state?.[reducerKey]?.downloadP3SegmentClients?.data,
  getError: state => state?.[reducerKey]?.downloadP3SegmentClients?.error,
  getIsPending: state => state?.[reducerKey]?.downloadP3SegmentClients?.isPending,
};

export const generateP3SegmentSelector = {
  getData: state => state?.[reducerKey]?.generateP3Segment?.data,
  getError: state => state?.[reducerKey]?.generateP3Segment?.error,
  getIsPending: state => state?.[reducerKey]?.generateP3Segment?.isPending,
};

export const updatePromoSegmentTypesSelector = {
  getError: state => state?.[reducerKey]?.updatePromoSegmentTypes?.error,
  getIsPending: state => state?.[reducerKey]?.updatePromoSegmentTypes?.isPending,
};

export const updateClassificationSelector = {
  getError: state => state?.[reducerKey]?.updateClassification?.error,
  getIsPending: state => state?.[reducerKey]?.updateClassification?.isPending,
};

export const updatePromoHTMLSelector = { getIsPending: state => state?.[reducerKey]?.updatePromoHTML?.isPending };

export const updateExcludedProductsSelector = {
  getError: state => state?.[reducerKey]?.updateExcludedProducts?.error,
  getIsPending: state => state?.[reducerKey]?.updateExcludedProducts?.isPending,
};

export const updateConditionProductsSelector = {
  getError: state => state?.[reducerKey]?.updateConditionProducts?.error,
  getIsPending: state => state?.[reducerKey]?.updateConditionProducts?.isPending,
};

export const updateBenefitTypeSelector = {
  getError: state => state?.[reducerKey]?.updateBenefitType?.error,
  getIsPending: state => state?.[reducerKey]?.updateBenefitType?.isPending,
};

export const getMarketProductsByIdsSelector = {
  getData: state => state?.[reducerKey]?.getMarketProductsByIds?.data || [],
  getIsPending: state => state?.[reducerKey]?.getMarketProductsByIds?.isPending,
};

export const updateUserFilteringSelector = {
  getIsPending: state => state?.[reducerKey]?.updateUserFiltering?.isPending,
  getError: state => state?.[reducerKey]?.updateUserFiltering?.error,
};

export const getPromoBadgesSelector = {
  getData: state => state?.[reducerKey]?.getPromoBadges?.data?.promoBadges,
  getIsPending: state => state?.[reducerKey]?.getPromoBadges?.isPending,
};

export const updatePromoBadgeSelector = {
  getIsPending: state => state?.[reducerKey]?.updatePromoBadge?.isPending,
  getError: state => state?.[reducerKey]?.updatePromoBadge?.error,
};
export const getConditionalProductsSelector = { getData: state => state?.[reducerKey]?.getConditionalProducts?.data };

export const getChildPromosSelector = {
  getData: state => state?.[reducerKey]?.getChildPromos?.data?.promos || [],
  getIsPending: state => state?.[reducerKey]?.getChildPromos?.isPending,
};

export const updatePromoButtonAction = { getIsPending: state => state?.[reducerKey]?.updatePromoButtonAction?.isPending };

export const getBenefitProductsSelector = { getData: state => state?.[reducerKey]?.getBenefitProducts?.data };

export const selectUploadPromoImage = { getIsPending: state => state?.[reducerKey]?.uploadPromoImage?.isPending };
