import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';
import moment from 'moment';

import { createSegmentedCodeByBulk as createSegmentedCodeByBulkApi } from '@shared/api/discountCode';
import { exportExcel } from '@shared/utils/common';
import { DEFAULT_DATE_FORMAT } from '@shared/shared/constants';

import { Creators, Types } from './actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { t } from '@shared/i18n';

function* createSegmentedCodeByBulk({ params }) {
  try {
    const data = yield call(createSegmentedCodeByBulkApi, params);
    const dataToExport = data?.discountCodes?.map(code => ({ code }));
    yield put(Creators.createSegmentedCodeByBulkSuccess({ data }));
    const date = moment();
    exportExcel(
      dataToExport,
      `generated_codes_${date.format(DEFAULT_DATE_FORMAT)}`,
      [
        {
          title: 'code',
          key: 'code',
        },
      ],
    );
    yield put(ToastCreators.success());
  }
  catch (error) {
    if (error?.response?.data?.message === 'SegmentNotFound') {
      yield put(ToastCreators.error({ message: t('segmentedCodeGeneratorPage:SEGMENT_NOT_FOUND') }));
    }
    else {
      yield put(ToastCreators.error(error));
    }
    yield put(Creators.createSegmentedCodeByBulkFailure({ error }));
  }
}

function* watchCreateSegmentedCodeByBulkRequest() {
  yield takeLatest(Types.CREATE_SEGMENTED_CODE_BY_BULK_REQUEST, createSegmentedCodeByBulk);
}

export default function* segmentedDiscountCodeGeneratorPageRootSaga() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchCreateSegmentedCodeByBulkRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
