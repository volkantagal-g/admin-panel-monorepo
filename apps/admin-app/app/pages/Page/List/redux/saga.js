import { all, call, cancel, fork, put, select, take, takeLatest } from 'redux-saga/effects';

import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { countriesSelector } from '@shared/redux/selectors/common';
import Excel from '@shared/utils/excel';
import { getSelectedLanguage } from '@shared/redux/selectors/languageSelection';
import { Creators, Types } from './actions';
import { PAGES_EXPORT_COLUMNS, formatPagesForExcelExport } from '@shared/utils/pagesExcelExport';
import { indexedDb } from '@shared/indexedDb';
import { Creators as CommonCreators } from '@shared/redux/actions/common';

export function* exportPagesExcel({ t }) {
  try {
    const pages = yield call([indexedDb.pages, indexedDb.pages.toArray]);
    const language = yield select(getSelectedLanguage);
    const countries = yield select(countriesSelector.getData);

    const dataToExport = formatPagesForExcelExport({ t, pages, countries, language });

    new Excel({
      name: 'AllPagesList',
      data: dataToExport,
      fields: PAGES_EXPORT_COLUMNS(t),
    }).export();
  }
  catch (error) {
    yield put(Creators.exportPagesExcelFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchExportPagesExcel() {
  yield takeLatest(Types.EXPORT_PAGES_EXCEL, exportPagesExcel);
}

export default function* pageRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchExportPagesExcel),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);

    yield put(CommonCreators.getUserOwnedPagesReset());
  }
}
