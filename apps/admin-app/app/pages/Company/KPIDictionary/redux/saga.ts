import { all, call, cancel, fork, put, take, takeLatest, select } from 'redux-saga/effects';

import { Types, Creators } from './actions';
import { filterSelector } from './selectors';
import { getLimitAndOffset } from '@shared/utils/common';
import { getFilterOptionsAPI, getFilteredKPIDictionaryAPI, getFilteredKPIAcronymDictionaryAPI } from '@shared/api/companyKPIDictionary';

function* getFilterOptions() {
  try {
    const { categories, acronyms, domains } = yield call(getFilterOptionsAPI);
    yield put(Creators.getFilterOptionsSuccess({ data: { categories, acronyms, domains } }));
  }
  catch (error) {
    yield put(Creators.getFilterOptionsFailure({ error }));
  }
}

function* getKPIDictionary() {
  try {
    // @ts-ignore
    const filtersState = (yield select(filterSelector.getFilters)) as any;
    const filters = {
      ...(filtersState.search && filtersState.search.length >= 1 && { searchTerm: filtersState.search }),
      ...(filtersState.categories && { categories: filtersState.categories }),
      ...(filtersState.acronyms && { acronyms: filtersState.acronyms }),
      ...(filtersState.domains && { domains: filtersState.domains }),
      ...(filtersState.pagination && { ...getLimitAndOffset(filtersState.pagination) }),
    };
    const { data, totalCount } = yield call(getFilteredKPIDictionaryAPI, filters);
    yield put(Creators.getKPIDictionarySuccess({ data, totalCount }));
  }
  catch (error) {
    yield put(Creators.getKPIDictionaryFailure({ error }));
  }
}

function* getKPIAcronymDictionary() {
  try {
    // @ts-ignore
    const data = yield call(getFilteredKPIAcronymDictionaryAPI);
    yield put(Creators.getKPIAcronymDictionarySuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getKPIAcronymDictionaryFailure({ error }));
  }
}

function* watchGetFilterOptionsRequest() {
  yield takeLatest(Types.GET_FILTER_OPTIONS_REQUEST, getFilterOptions);
}

function* watchGetKpiDictionaryRequest() {
  yield takeLatest(Types.GET_KPI_DICTIONARY_REQUEST, getKPIDictionary);
}

function* watchGetKpiAcronymDictionaryRequest() {
  yield takeLatest(Types.GET_KPI_ACRONYM_DICTIONARY_REQUEST, getKPIAcronymDictionary);
}

export default function* companyKPIDictionaryPageRootSaga(): Generator {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchGetFilterOptionsRequest),
      fork(watchGetKpiDictionaryRequest),
      fork(watchGetKpiAcronymDictionaryRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    // @ts-ignore
    yield all(backgroundTasks.map(task => cancel(task)));
  }
}
