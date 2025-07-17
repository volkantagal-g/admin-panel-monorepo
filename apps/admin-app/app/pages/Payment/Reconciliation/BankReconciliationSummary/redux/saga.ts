import {
  all,
  call,
  cancel,
  fork,
  put,
  take,
  takeLatest,
} from 'redux-saga/effects';

import { SagaIterator } from 'redux-saga';

import { Types, Creators } from './actions';
import { getBankReconciliationSummary as getBankReconciliationSummaryApi } from '@shared/api/reconciliation';
import { InitFiltersTypes } from '../components/constants';
import { DEFAULT_DATE_FORMAT } from '@shared/shared/constants';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { DataType } from './reducer';

function* getBankReconciliationSummary({
  date,
  sourceOfStatement,
  domainType,
}: InitFiltersTypes) {
  try {
    const startDate = date && date[0] && date[0].format(DEFAULT_DATE_FORMAT);
    const endDate = date && date[1] && date[1].format(DEFAULT_DATE_FORMAT);

    const response: DataType = yield call(getBankReconciliationSummaryApi, {
      startDate,
      endDate,
      sourceOfStatement,
      domainType,
    });

    const data = {
      currency: response?.currency,
      domainSummary: response?.domainSummary,
      posSummary: response?.posSummary,
    };
    yield put(Creators.getBankReconciliationSummarySuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getBankReconciliationSummaryFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchGetBankReconciliationSummaryRequest(): SagaIterator {
  yield takeLatest(
    Types.GET_BANK_RECONCILIATION_SUMMARY_REQUEST as any,
    getBankReconciliationSummary,
  );
}

export default function* root(): SagaIterator {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchGetBankReconciliationSummaryRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
