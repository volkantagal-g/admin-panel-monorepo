import { REDUX_KEY } from '@shared/shared/constants';
import { promotionStateKey } from '@shared/containers/Marketing/Select/PromotionSelect/constantValues';

const reducerKey = REDUX_KEY.MARKETING.SELECT.PROMO;

export const promoSelector = promoType => {
  return {
    getData: state => state?.[reducerKey]?.[promotionStateKey[promoType]]?.data,
    getIsPending: state => state?.[reducerKey]?.[promotionStateKey[promoType]]?.isPending,
    getError: state => state?.[reducerKey]?.[promotionStateKey[promoType]]?.error,
  };
};
