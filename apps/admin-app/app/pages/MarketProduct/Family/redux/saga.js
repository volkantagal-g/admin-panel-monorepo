import { all, cancel, take, call, put, takeLatest, fork } from 'redux-saga/effects';

import { getMarketProductFamilyList, getMarketProductFamilyDetail, createMarketProductFamily } from '@shared/api/marketProductFamily';
import { Creators, Types } from './actions';

import { Creators as ToastCreators } from '@shared/redux/actions/toast';

export function* createMarketProductFamilyRequest({ body }) {
  try {
    const data = yield call(createMarketProductFamily, { body });
    yield put(ToastCreators.success());
    yield put(Creators.getMarketProductFamilyListRequest({ limit: 100, offset: 0 }));
    yield put(Creators.createMarketProductFamilySuccess({ data }));
  }
  catch (error) {
    yield put(Creators.createMarketProductFamilyFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* getMarketProductFamilyListRequest({ limit, offset, ...rest }) {
  try {
    const data = yield call(getMarketProductFamilyList, { limit, offset, ...rest });
    yield put(Creators.getMarketProductFamilyListSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getMarketProductFamilyListFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* getMarketProductFamilyDetailRequest({ id }) {
  try {
    const data = yield call(getMarketProductFamilyDetail, { id });
    // const data = {
    //   "id": 3,
    //   "uid": "88eaf461-634b-4268-b1fd-4c1a07b8df40",
    //   "createdAt": "2024-02-02T08:44:39.592Z",
    //   "createdBy": "644e5bbea2464c601365b0a7",
    //   "updatedAt": "2024-02-02T08:47:21.169Z",
    //   "updatedBy": "644e5bbea2464c601365b0a7",
    //   "deletedAt": null,
    //   "deletedBy": null,
    //   "name": "Soup Family",
    //   "leadProductId": "5cf00cd48ebae600018b9407",
    //   "isActive": true,
    //   "prices": {
    //     "5cf00cd48ebae600018b9407": {
    //       "price": {
    //         "id": 154399,
    //         "uid": "5b40a9f6-5de6-4d72-a8a6-308d4b8c39db",
    //         "createdAt": "2024-02-02T08:49:57.084Z",
    //         "createdBy": "6234729a13cddcab93d7d1d0",
    //         "updatedAt": "2024-02-02T08:49:57.084Z",
    //         "updatedBy": null,
    //         "deletedAt": null,
    //         "deletedBy": null,
    //         "price": 8,
    //         "domainType": 1,
    //         "startDate": "2024-02-02T08:49:57.082Z",
    //         "endDate": "2098-12-31T21:00:00.000Z",
    //         "warehouseId": null,
    //         "erpReferenceKey": null,
    //         "erpCreateDate": null,
    //         "isActive": true,
    //         "priceMetadataId": 2129,
    //         "priceTypeId": 3
    //       },
    //       "discountedPrice": {
    //         "id": 5735,
    //         "uid": "a5c0a94c-fce8-484a-be47-96213b8be984",
    //         "createdAt": "2024-02-02T08:51:10.057Z",
    //         "createdBy": "6234729a13cddcab93d7d1d0",
    //         "updatedAt": "2024-02-02T08:51:10.057Z",
    //         "updatedBy": null,
    //         "deletedAt": null,
    //         "deletedBy": null,
    //         "price": 6.7,
    //         "domainType": 1,
    //         "financials": {
    //           "isAmount": false,
    //           "isFreeProduct": false,
    //           "supplierSupportRate": 0,
    //           "supplierSupportAmount": null,
    //           "thirdPartySupportRate": 0,
    //           "thirdPartySupportAmount": null,
    //           "isShownUnderSpecialOffers": false
    //         },
    //         "startDate": "2024-02-02T08:51:55.700Z",
    //         "endDate": "2024-02-17T08:51:03.700Z",
    //         "warehouseId": null,
    //         "erpReferenceKey": null,
    //         "erpCreateDate": null,
    //         "isActive": true,
    //         "badgeId": null,
    //         "limit": null,
    //         "priceMetadataId": 2129,
    //         "priceTypeId": 3
    //       },
    //       "kviLabel": "FOREGROUND",
    //       "kviScore": 92.2
    //     },
    //     "5cf00cd48ebae600018b940a": {
    //       "price": {
    //         "id": 80361,
    //         "uid": "e7c17936-7aef-47a7-b215-250e75d88395",
    //         "createdAt": "2023-09-07T18:42:53.713Z",
    //         "createdBy": "MANUAL",
    //         "updatedAt": "2023-09-07T18:42:53.713Z",
    //         "updatedBy": null,
    //         "deletedAt": null,
    //         "deletedBy": null,
    //         "price": 4,
    //         "domainType": 1,
    //         "startDate": "2023-09-07T21:41:53.070Z",
    //         "endDate": "2099-01-01T00:00:00.000Z",
    //         "warehouseId": null,
    //         "erpReferenceKey": null,
    //         "erpCreateDate": null,
    //         "isActive": true,
    //         "priceMetadataId": 2176,
    //         "priceTypeId": 3
    //       },
    //       "kviLabel": "FOREGROUND",
    //       "kviScore": 72.2
    //     }
    //   }
    // };
    yield put(Creators.getMarketProductFamilyDetailSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getMarketProductFamilyDetailFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* watchCreateMarketProductFamilyRequest() {
  yield takeLatest(Types.CREATE_MARKET_PRODUCT_FAMILY_REQUEST, createMarketProductFamilyRequest);
}

export function* watchGetMarketProductFamilyListRequest() {
  yield takeLatest(Types.GET_MARKET_PRODUCT_FAMILY_LIST_REQUEST, getMarketProductFamilyListRequest);
}

export function* watchGetMarketProductFamilyDetailRequest() {
  yield takeLatest(Types.GET_MARKET_PRODUCT_FAMILY_DETAIL_REQUEST, getMarketProductFamilyDetailRequest);
}

export default function* marketProductFamilyListRoot() {
  yield fork(watchGetMarketProductFamilyListRequest);
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchCreateMarketProductFamilyRequest),
      fork(watchGetMarketProductFamilyDetailRequest),
    ]);
    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
