import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.FRANCHISE_CONFIG.DETAIL;

export const getFranchiseConfigDetailSelector = {
  getData: state => state?.[reducerKey]?.franchiseConfigDetail?.data,
  getError: state => state?.[reducerKey]?.franchiseConfigDetail?.fetchingError,
  getIsPending: state => state?.[reducerKey]?.franchiseConfigDetail?.isPending,
  getFields: state => state?.[reducerKey]?.franchiseConfigDetail?.configTypeData?.fields,
  getFieldName: state => state?.[reducerKey]?.franchiseConfigDetail?.configTypeData?.name,
};
