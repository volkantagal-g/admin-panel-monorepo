import { all, call, cancel, fork, put, take, takeLatest, select } from 'redux-saga/effects';

import moment from 'moment/moment';

import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { Types, Creators } from './actions';
import {
  getAssetTypeById as getAssetTypeByIdApi,
  getFilteredLogs,
} from '@shared/api/employeeAssetManagement/asset';
import { filtersSelector } from './selectors';
import { getLimitAndOffset } from '@shared/utils/common';
import { defaultFilters } from '@app/pages/Employee/AssetManagement/Logs/redux/reducer';

function* getAssetLogComponentsRequest({ assetId }: { assetId: MongoIDType }): any {
  try {
    const assetLogComponents = yield call(getAssetTypeByIdApi, { assetId });
    yield put(Creators.getAssetLogComponentsSuccess({ assetLogComponents }));
  }
  catch (error: any) {
    yield put(Creators.getAssetLogComponentsFailure());
    yield put(ToastCreators.error({ error }));
  }
}

function* watchGetAssetLogComponentsRequest(): any {
  yield takeLatest(Types.GET_ASSET_LOG_COMPONENTS_REQUEST as any, getAssetLogComponentsRequest);
}

function* updateFilters({ filters, resetSelectedFilters }: { filters: FilterData, resetSelectedFilters: boolean }): any {
  try {
    if (resetSelectedFilters) {
      yield put(Creators.getFilteredLogsRequest({ resetSelectedFilters }));
    }
    else {
      yield put(Creators.getFilteredLogsRequest());
    }
  }
  catch (error: any) {
    yield put(ToastCreators.error({ error }));
  }
}

function* getFilteredLogsRequest({ resetSelectedFilters }: { resetSelectedFilters: boolean }): any {
  try {
    const filters = yield select(filtersSelector.getData);
    const pagination = yield select(filtersSelector.getPagination);
    const model = filters?.effectedField?.[1]?.split('_')?.[0];
    const fieldPath = filters?.effectedField?.[1]?.split('_')?.[1];
    const modelType = filters?.effectedField?.[1]?.split('_')?.[2];
    const updatedPayload = resetSelectedFilters ? { filterData: { ...getLimitAndOffset(defaultFilters.pagination) } } : {
      filterData: {
        ...filters,
        ...(pagination && { ...getLimitAndOffset(pagination) }),
        startDate: filters?.dateRange?.[0] && moment(filters?.dateRange[0]).startOf('day').toISOString(),
        endDate: filters?.dateRange?.[1] && moment(filters?.dateRange[1]).endOf('day').toISOString(),
        modelType,
        model,
        fieldPath,
      },
    };

    delete updatedPayload.filterData.dateRange;
    delete updatedPayload.filterData.pagination;
    // @ts-ignore
    const { logs, count } = yield call(getFilteredLogs, { updatedPayload });
    yield put(Creators.getFilteredLogsSuccess({ data: logs, totalCount: count }));
  }
  catch (error: any) {
    yield put(Creators.getFilteredLogsFailure());
    yield put(ToastCreators.error({ error }));
  }
}

function* watchGetFilteredLogsRequest(): any {
  yield takeLatest(Types.GET_FILTERED_LOGS_REQUEST as any, getFilteredLogsRequest);
}

function* watchUpdateFilters(): any {
  yield takeLatest(Types.UPDATE_FILTERS as any, updateFilters);
}

export default function* companyCardDetailRootSaga(): any {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchGetAssetLogComponentsRequest),
      fork(watchUpdateFilters),
      fork(watchGetFilteredLogsRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
