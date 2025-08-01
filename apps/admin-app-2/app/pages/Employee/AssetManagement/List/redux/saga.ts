import { all, call, cancel, fork, put, select, take, takeLatest } from 'redux-saga/effects';

import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { VEHICLE_TABLE_TABS } from '@app/pages/Employee/AssetManagement/constants';
import { Types, Creators } from './actions';
import {
  getAssetTypeById as getAssetTypeByIdApi,
  getControlNeededVehicles,
  getFilteredVehicleAssets as getFilteredVehicleAssetsApi,
  filterAndExportAsExcel as filterAndExportAsExcelApi,
} from '@shared/api/employeeAssetManagement/asset';
import { filtersSelector } from '@app/pages/Employee/AssetManagement/List/redux/selectors';
import { getLimitAndOffset, removeNullOrUndefinedDeep } from '@shared/utils/common';
import { getLangKey } from '@shared/i18n';

function* getAssetFilterComponentsRequest({ assetId }: { assetId: MongoIDType }): any {
  try {
    const assetFilterComponents = yield call(getAssetTypeByIdApi, { assetId });
    yield put(Creators.getAssetFilterComponentsSuccess({ assetFilterComponents }));
  }
  catch (error: any) {
    yield put(Creators.getAssetFilterComponentsFailure());
    yield put(ToastCreators.error({ error }));
  }
}

function* watchGetAssetFilterComponentsRequest(): any {
  yield takeLatest(Types.GET_ASSET_FILTER_COMPONENTS_REQUEST as any, getAssetFilterComponentsRequest);
}

function* getFilteredAssetsRequest({ resetSelectedFilters }: { resetSelectedFilters: boolean }): any {
  try {
    const filters = yield select(filtersSelector.getData);
    const pagination = yield select(filtersSelector.getPagination);
    const updatedPayload = resetSelectedFilters ? {} : removeNullOrUndefinedDeep({
      filterData: {
        ...filters,
        uniqueIdentifier: filters?.uniqueIdentifier?.trim() || undefined,
        ...(pagination && { ...getLimitAndOffset(pagination) }),
        activeTabKey: undefined,
        pagination: undefined,
      },
    });

    // @ts-ignore
    const { assets, count } = yield call(getFilteredVehicleAssetsApi, { updatedPayload });
    yield put(Creators.getFilteredAssetsSuccess({ data: assets, totalCount: count }));
  }
  catch (error: any) {
    yield put(Creators.getFilteredAssetsFailure());
    yield put(ToastCreators.error({ error }));
  }
}

function* watchGetFilteredAssetsRequest(): any {
  yield takeLatest(Types.GET_FILTERED_ASSETS_REQUEST as any, getFilteredAssetsRequest);
}

function* filterAndExportAsExcelRequest(): any {
  try {
    const { url } = yield call(filterAndExportAsExcelApi, { langKey: getLangKey() });

    if (url) {
      // @ts-ignore
      window.open(url, '_blank').focus();
    }
  }
  catch (error: any) {
    yield put(ToastCreators.error({ error }));
  }
}

function* watchFilterAndExportAsExcelRequest(): any {
  yield takeLatest(Types.FILTER_AND_EXPORT_AS_EXCEL_REQUEST as any, filterAndExportAsExcelRequest);
}

function* getControlNeededVehiclesRequest(): any {
  const filters = yield select(filtersSelector.getData);
  const updatedPayload = { ...getLimitAndOffset(filters?.pagination) };

  try {
    // @ts-ignore
    const { assets, count } = yield call(getControlNeededVehicles, { filters: updatedPayload });
    yield put(Creators.getControlNeededVehiclesSuccess({ data: assets, totalCount: count }));
  }
  catch (error: any) {
    yield put(Creators.getControlNeededVehiclesFailure());
    yield put(ToastCreators.error({ error }));
  }
}

function* watchGetControlNeededVehiclesRequest(): any {
  yield takeLatest(Types.GET_CONTROL_NEEDED_VEHICLES_REQUEST as any, getControlNeededVehiclesRequest);
}

function* updateFilters({ filters, resetSelectedFilters }: { filters: FilterData, resetSelectedFilters: boolean }): any {
  try {
    if (!resetSelectedFilters && filters?.activeTabKey !== VEHICLE_TABLE_TABS.CONTROL_NEEDED_VEHICLES) {
      yield put(Creators.getFilteredAssetsRequest());
    }
    if (resetSelectedFilters && filters?.activeTabKey !== VEHICLE_TABLE_TABS.CONTROL_NEEDED_VEHICLES) {
      yield put(Creators.getFilteredAssetsRequest({ resetSelectedFilters }));
    }
    if (filters?.activeTabKey === VEHICLE_TABLE_TABS.CONTROL_NEEDED_VEHICLES) {
      yield put(Creators.getControlNeededVehiclesRequest());
    }
  }
  catch (error: any) {
    yield put(ToastCreators.error({ error }));
  }
}

function* watchUpdateFilters(): any {
  yield takeLatest(Types.UPDATE_FILTERS as any, updateFilters);
}

export default function* companyCardDetailRootSaga(): any {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchGetAssetFilterComponentsRequest),
      fork(watchGetFilteredAssetsRequest),
      fork(watchGetControlNeededVehiclesRequest),
      fork(watchUpdateFilters),
      fork(watchFilterAndExportAsExcelRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
