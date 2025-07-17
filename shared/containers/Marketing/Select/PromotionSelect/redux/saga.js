import { all, call, cancel, fork, put, take, takeEvery, takeLatest } from 'redux-saga/effects';

import { Creators, Types } from './actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { getFilteredPromos as getFilteredMarketPromos } from '@shared/api/promo';
import {
  getFoodPromoById,
  getFoodPromosBySearchCode,
  getLocalPromoById,
  getLocalPromosBySearchCode,
} from '@shared/api/marketing';
import {
  filterFoodPromoData,
  filterLocalsPromoData,
  filterMarketPromoData,
} from '@shared/containers/Marketing/Select/PromotionSelect/utils';
import { PROMO_STATUS, PROMO_TYPE } from '@shared/containers/Marketing/Select/PromotionSelect/constants';
import { PromoUsageType } from '@app/pages/Promo/constantValues';

function* getPromosByTargetDomainRequest({ promoType, filterParams }) {
  try {
    let promoList = [];
    switch (promoType) {
      case PROMO_TYPE.FOOD_PROMO: {
        promoList = yield call(getFoodPromosBySearchCode, { params: filterParams });
        promoList = filterFoodPromoData(promoList);

        break;
      }
      case PROMO_TYPE.LOCALS_PROMO: {
        promoList = yield call(getLocalPromosBySearchCode, { params: filterParams });
        promoList = filterLocalsPromoData(promoList);
        break;
      }
      default: {
        const params = {
          ...filterParams,
          status: PROMO_STATUS.ACTIVE,
          promoUsageType: PromoUsageType.GENERAL,
          limit: 10,
          page: 0,
        };
        promoList = yield call(getFilteredMarketPromos, { ...params });
        promoList = filterMarketPromoData(promoList?.promos || []);
      }
    }
    yield put(Creators.getPromosByTargetDomainSuccess({ data: promoList, promoType }));
  }
  catch (error) {
    yield put(Creators.getPromosByTargetDomainFailure({ error, promoType }));
    yield put(ToastCreators.error({ error }));
  }
}

function* getPromoDetailsByTargetDomainRequest({ promoType, promoId }) {
  try {
    const promoDetail = {};
    switch (promoType) {
      case PROMO_TYPE.FOOD_PROMO: {
        const data = yield call(getFoodPromoById, { promoId });
        promoDetail.value = data?.result?.id;
        promoDetail.label = data?.result?.metadata?.code;
        break;
      }
      case PROMO_TYPE.LOCALS_PROMO: {
        const { data } = yield call(getLocalPromoById, { promoId });
        promoDetail.value = data?.id;
        promoDetail.label = data?.promoCode;
        break;
      }
      default: {
        break;
      }
    }
    yield put(Creators.getPromoDetailsByTargetDomainSuccess({ promoDetail, promoType }));
  }
  catch (error) {
    yield put(Creators.getPromoDetailsByTargetDomainFailure({ error, promoType }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchGetPromosByTargetDomainRequest() {
  yield takeLatest(Types.GET_PROMOS_BY_TARGET_DOMAIN_REQUEST, getPromosByTargetDomainRequest);
}

function* watchGetPromoDetailsByTargetDomainRequest() {
  yield takeEvery(Types.GET_PROMO_DETAILS_BY_TARGET_DOMAIN_REQUEST, getPromoDetailsByTargetDomainRequest);
}

export default function* root() {
  while (yield take(Types.INIT_CONTAINER)) {
    const backgroundTasks = yield all([
      fork(watchGetPromosByTargetDomainRequest),
      fork(watchGetPromoDetailsByTargetDomainRequest),

    ]);
    yield take(Types.DESTROY_CONTAINER);
    yield cancel(backgroundTasks);
  }
}
