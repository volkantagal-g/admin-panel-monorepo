import { MARKET_FRANCHISE_USER_TYPE } from '@shared/shared/constants';

export const getCreateMarketFranchiseUserRequestParams = values => {
  return {
    ...values,
    groupType: MARKET_FRANCHISE_USER_TYPE.USER,
    gsm: values.gsm.toString(),
  };
};
