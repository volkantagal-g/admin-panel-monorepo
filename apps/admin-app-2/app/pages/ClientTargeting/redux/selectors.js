import { createSelector } from 'reselect';

import { getStateObject } from '@shared/utils/common';
import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.CLIENT_TARGETING;

export const clientListSelector = {
  getData: state => state?.[reducerKey]?.createClientList?.data,
  getIsPending: state => state?.[reducerKey]?.createClientList?.isPending,
};

export const getClientListData = activeKey => createSelector(
  state => {
    if (!activeKey) {
      return state[reducerKey];
    }

    const [domainType, key] = activeKey.split('.');
    if (!key) {
      return getStateObject(state, reducerKey, domainType);
    }
    return getStateObject(state, reducerKey, domainType)[key];
  },
  data => {
    return data;
  },
);

export const getFoodPromosBySearchCodeSelector = {
  getData: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'getFoodPromosBySearchCode');
    },
    ({ data }) => {
      return data;
    },
  ),
  getIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'getFoodPromosBySearchCode');
    },
    ({ isPending }) => {
      return isPending;
    },
  ),
};

export const getLocalsPromosBySearchCodeSelector = {
  getData: state => state?.[reducerKey]?.getLocalsPromosBySearchCode.data,
  getIsPending: state => state?.[reducerKey]?.getLocalsPromosBySearchCode.isPending,
};

export const getMarketPromosBySearchCodeSelector = {
  getData: state => state?.[reducerKey]?.getMarketPromosBySearchCode.data,
  getIsPending: state => state?.[reducerKey]?.getMarketPromosBySearchCode.isPending,
};

export const getFilteredGetirDriveVouchersSelector = {
  getData: state => state?.[reducerKey]?.getFilteredGetirDriveVouchers?.data,
  getIsPending: state => state?.[reducerKey]?.getFilteredGetirDriveVouchers?.isPending,
};

export const getFilteredBrandsSelector = {
  getData: state => state?.[reducerKey]?.getFilteredBrands?.data,
  getIsPending: state => state?.[reducerKey]?.getFilteredBrands?.isPending,
};

export const getCuisinesSelector = {
  getData: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'getCuisines', 'data');
    },
    ({ data }) => {
      return data;
    },
  ),
  getIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'getCuisines', 'isPending');
    },
    ({ isPending }) => {
      return isPending;
    },
  ),
};

export const getRFMSegmentsSelector = {
  getData: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'getRFMSegments', 'data');
    },
    ({ data }) => {
      return data;
    },
  ),
  getIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'getRFMSegments', 'isPending');
    },
    ({ isPending }) => {
      return isPending;
    },
  ),
};

export const getGwmpBrandsSelector = {
  getData: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'getGwmpBrands', 'data');
    },
    ({ data }) => {
      return data;
    },
  ),
  getIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'getGwmpBrands', 'isPending');
    },
    ({ isPending }) => {
      return isPending;
    },
  ),
};

export const getGwmpVendorsSelector = {
  getData: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'getGwmpVendors', 'data');
    },
    ({ data }) => {
      return data;
    },
  ),
  getIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'getGwmpVendors', 'isPending');
    },
    ({ isPending }) => {
      return isPending;
    },
  ),
};

export const getPersonaClientFlagsSelector = {
  getData: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'getPersonaClientFlags', 'data');
    },
    ({ data }) => {
      return data;
    },
  ),
  getIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'getPersonaClientFlags', 'isPending');
    },
    ({ isPending }) => {
      return isPending;
    },
  ),
};

export const getDataScienceModelsSelector = {
  getData: ({ section }) => createSelector(
    state => getStateObject(state, reducerKey, 'dataScienceModels'),
    state => {
      if (!section) {
        throw new Error('section is required on getDataScienceModelsSelector.getData');
      }
      return state[section]?.data;
    },
  ),
  getIsPending: ({ section }) => createSelector(
    state => getStateObject(state, reducerKey, 'dataScienceModels'),
    state => {
      if (!section) {
        throw new Error('section is required on getDataScienceModelsSelector.getIsPending');
      }
      return state[section]?.isPending;
    },
  ),
};

export const getPersonaDomainTypesSelector = {
  getData: ({ section }) => createSelector(
    state => getStateObject(state, reducerKey, 'personaDomainTypes'),
    state => {
      if (!section) {
        throw new Error('section is required on getPersonaDomainTypesSelector.getData');
      }

      return state[section]?.data;
    },
  ),
  getIsPending: ({ section }) => createSelector(
    state => getStateObject(state, reducerKey, 'personaDomainTypes'),
    state => {
      if (!section) {
        throw new Error('section is required on getPersonaDomainTypesSelector.getIsPending');
      }
      return state[section]?.isPending;
    },
  ),
};

export const getCollapseTriggeredKey = activeKey => createSelector(
  state => state[reducerKey].lastCollapseTriggeredKey,
  data => {
    // search inside the key for parent collapses
    // example: activeKey = "getir.visitor" => getir and its children visitor both should trigger
    return data.includes(activeKey);
  },
);

export const getArtisanTypesSelector = {
  getData: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'getArtisanTypes');
    },
    ({ data }) => {
      return data;
    },
  ),
  getIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'getArtisanTypes');
    },
    ({ isPending }) => {
      return isPending;
    },
  ),
};

export const getArtisanChainShopsSelector = {
  getData: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'getArtisanChainShops');
    },
    ({ data }) => {
      return data;
    },
  ),
  getIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'getArtisanChainShops');
    },
    ({ isPending }) => {
      return isPending;
    },
  ),
};

export const getGetirJobsPostTypesSelector = {
  getData: state => state?.[reducerKey]?.getGetirJobsPostTypes?.data,
  getIsPending: state => state?.[reducerKey]?.getGetirJobsPostTypes?.isPending,
};

export const getGetirJobsDrivingLicensesSelector = {
  getData: state => state?.[reducerKey]?.getGetirJobsDrivingLicenses?.data,
  getIsPending: state => state?.[reducerKey]?.getGetirJobsDrivingLicenses?.isPending,
};

export const getGetirJobsCategoriesSelector = {
  getData: state => state?.[reducerKey]?.getGetirJobsCategories?.data,
  getIsPending: state => state?.[reducerKey]?.getGetirJobsCategories?.isPending,
};

export const getSelectedDataScienceModel = activeKey => {
  const [dataScienceSectionKey, dataScienceStateKey] = activeKey.split('.');
  return createSelector(
    state => getStateObject(state, reducerKey, dataScienceSectionKey),
    state => getStateObject(state, reducerKey, 'dataScienceModels'),
    ({ [dataScienceStateKey]: dataScience }, dataScienceModels) => {
      const selectedModelId = dataScience?.params?.[dataScience?.activeIndex]?.modelId;
      const selectedModel = dataScienceModels?.[dataScienceSectionKey]?.data?.find(model => model?._id === selectedModelId);

      return selectedModel;
    },
  );
};

export const getGetirMarketOrderCancelReasonsSelector = {
  getData: state => state?.[reducerKey]?.getirMarketOrderCancelReasons.data,
  getIsPending: state => state?.[reducerKey]?.getirMarketOrderCancelReasons.isPending,
};

export const getOrderFeedbackReasonsSelector = { getData: state => state?.[reducerKey]?.orderFeedbackReasons?.data };
