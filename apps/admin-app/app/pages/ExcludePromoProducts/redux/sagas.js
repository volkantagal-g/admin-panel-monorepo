import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';

import { getFilteredPromos, getResponsibleDepartments, excludePromoProducts } from '@shared/api/promo';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { Types, Creators } from './actions';

function* getPromosByFiltersRequest({
  domainTypes,
  isFreeProduct,
  promoMechanic,
  responsibleDepartment,
  status,
  promoUsageType,
  limit,
  page,
}) {
  try {
    const filtersData = {
      domainTypes,
      isFreeProduct,
      promoMechanic,
      responsibleDepartment,
      promoUsageType,
      status,
      limit,
      page,
    };
    const { promos, totalCount } = yield call(getFilteredPromos, filtersData);
    yield put(Creators.getPromosByFiltersSuccess({ promos, totalCount }));
  }
  catch (error) {
    yield put(Creators.getPromosByFiltersFailure({ error }));
  }
}

function* getResponsibleDepartmentsRequest() {
  try {
    const data = yield call(getResponsibleDepartments);
    yield put(Creators.getResponsibleDepartmentsSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getResponsibleDepartmentsFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* excludePromoProductsRequest({ body, message }) {
  try {
    const data = yield call(excludePromoProducts, { body });
    yield put(Creators.excludePromoProductsSuccess({ data }));
    yield put(ToastCreators.success({ message: message.replace('{PROMOS_COUNT}', data?.updateExcludeItems?.modifiedCount) }));
  }
  catch (error) {
    yield put(Creators.excludePromoProductsFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchGetResponsibleDepartmentsRequest() {
  yield takeLatest(Types.GET_RESPONSIBLE_DEPARTMENTS_REQUEST, getResponsibleDepartmentsRequest);
}

function* watchExcludePromoProductsRequest() {
  yield takeLatest(Types.EXCLUDE_PROMO_PRODUCTS_REQUEST, excludePromoProductsRequest);
}

function* watchPromosByFiltersRequest() {
  yield takeLatest(Types.GET_PROMOS_BY_FILTERS_REQUEST, getPromosByFiltersRequest);
}

export default function* promosRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchPromosByFiltersRequest),
      fork(watchGetResponsibleDepartmentsRequest),
      fork(watchExcludePromoProductsRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
