import { REDUX_STORE_KEYS } from '@app/pages/CommerceIntelligence/constants';

const getConfidenceVeryHighState = state => state?.[REDUX_STORE_KEYS.CONFIDENCE_VERY_HIGH];

export const selectFilters = state => getConfidenceVeryHighState(state)?.filters || {};
export const selectLoading = state => getConfidenceVeryHighState(state)?.loading || {};
export const selectError = state => getConfidenceVeryHighState(state)?.error;
export const selectLevel3Categories = state => getConfidenceVeryHighState(state)?.level3Categories || [];
export const selectLevel4Categories = state => getConfidenceVeryHighState(state)?.level4Categories || [];
