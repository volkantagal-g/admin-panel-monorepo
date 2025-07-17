import { all, call, cancel, fork, put, select, take, takeLatest } from 'redux-saga/effects';

import _ from 'lodash';

import moment from 'moment';

import { getFinanceOrderFilter as getFinanceOrderFilterApi } from '@shared/api/finance';

import { ALL_OPTION_KEY, FILTER_DOMAINS, FILTER_STATUSES } from '../constants';
import { handleAllOptionSelect } from '../utils';
import { Creators, Types } from './actions';
import { financeOrderFilterSelector } from './selectors';

function* getFinanceOrderFilter() {
  try {
    const values = yield select(financeOrderFilterSelector.getFilters);
    const pagination = yield select(financeOrderFilterSelector.getPagination);

    const body = {
      ...values.orderId && { orderId: values.orderId },
      ...values.domainTypes !== ALL_OPTION_KEY && { domainTypes: handleAllOptionSelect(values.domainTypes, FILTER_DOMAINS) },
      ...values.fullName && { fullName: values.fullName },
      status: _.find(FILTER_STATUSES, { name: values.status })?.codes,
      startCheckoutDate: moment(values.startCheckoutDate).startOf('day').format(),
      endCheckoutDate: moment(values.endCheckoutDate).endOf('day').format(),
      ...values.warehouseId && { warehouseId: values.warehouseId },
      ...values.barcode && { barcode: values.barcode },
      ...values.phoneNumber && { phoneNumber: values.phoneNumber },
    };

    const { data } = yield call(getFinanceOrderFilterApi, { ...body, ...pagination });
    yield put(Creators.getFinanceOrderFilterSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getFinanceOrderFilterFailure({ error }));
  }
}

function* watchGetFinanceOrderFilterRequest() {
  yield takeLatest([
    Types.GET_FINANCE_ORDER_FILTER_REQUEST,
    Types.UPDATE_FINANCE_ORDER_FILTER_VALUES,
    Types.UPDATE_FINANCE_ORDER_FILTER_PAGINATION,
  ], getFinanceOrderFilter);
}

export default function* financeOrderFilterPageRootSaga() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchGetFinanceOrderFilterRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
