import { all, call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';

import { createLocationWriteOff } from '@shared/api/locationWriteOff';

import { Types, Creators } from './actions';
import { t as translation } from '@shared/i18n';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { getMarketProductsByIds } from '@shared/api/marketProduct';
import { filterWarehouseLocations, getWarehouseStocksByProductIdAndLocationTypes } from '@shared/api/warehouseLocation';
import history from '@shared/utils/history';
import { ROUTE } from '@app/routes';
import { MARKET_PRODUCT_STATUS } from '@shared/shared/constants';

function* createLocationWriteOffRequest({ requestBody: locationWriteOff }) {
  try {
    yield call(createLocationWriteOff, locationWriteOff);
    yield put(ToastCreators.success());
    history.push(ROUTE.LOCATION_WRITE_OFF_LIST.path);
  }
  catch (error) {
    yield put(ToastCreators.error({ error }));
  }
}

function* getLocationsRequest({ warehouseId, states }) {
  try {
    const locationsData = yield call(filterWarehouseLocations, { warehouseId, isAllowedForWriteOff: true, states });
    yield put(Creators.getLocationsSuccess({ data: locationsData }));
  }
  catch (error) {
    yield put(Creators.getLocationsFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* getProductsRequest({ productIds, warehouseId, locationBarcodes }) {
  try {
    const productData = yield call(getMarketProductsByIds, { productIds });
    const stockData = yield call(
      getWarehouseStocksByProductIdAndLocationTypes,
      { warehouseId, locationBarcodes, productIds, onlyPositiveQuantity: false },
    );
    if (productData.length < productIds.length) {
      const productDataIds = productData.map(data => data._id);
      const invalidProductIds = productIds.filter(id => !productDataIds.includes(id));
      yield put(ToastCreators.error({
        message: `${translation('writeOffPage:INVALID_PRODUCT_IDS')} 
      ${invalidProductIds.join('\n')}`,
      }));
    }

    const archivedProductIds = [];
    const bundleProductIds = [];

    const validProductData = productData.filter(product => {
      if (product.status === MARKET_PRODUCT_STATUS.ARCHIVED) {
        archivedProductIds.push(product._id);
        return false;
      }
      if (product.isBundle) {
        bundleProductIds.push(product._id);
        return false;
      }
      return true;
    });

    if (archivedProductIds.length) {
      yield put(ToastCreators.error({
        message: `${translation('writeOffPage:ARCHIVED_PRODUCT_IDS')} 
      ${archivedProductIds.join('\n')}`,
      }));
    }

    if (bundleProductIds.length) {
      yield put(ToastCreators.error({
        message: `${translation('writeOffPage:BUNDLE_PRODUCT_IDS')} 
      ${bundleProductIds.join('\n')}`,
      }));
    }

    const formattedStock = stockData.reduce((acc, curr) => {
      if (acc[curr.product]?.quantity) {
        acc[curr.product].quantity += curr.quantity;
      }
      else {
        acc[curr.product] = { quantity: curr.quantity };
      }
      return acc;
    }, {});

    const data = validProductData.map(product => {
      return {
        ...product,
        available: formattedStock[product._id]?.quantity || 0,
      };
    });
    yield put(Creators.getProductsSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getProductsFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchLocationWriteOffRequest() {
  yield takeLatest(Types.CREATE_LOCATION_WRITE_OFF_REQUEST, createLocationWriteOffRequest);
}

function* watchGetLocationsRequest() {
  yield takeLatest(Types.GET_LOCATIONS_REQUEST, getLocationsRequest);
}

function* watchGetProductsRequest() {
  yield takeLatest(Types.GET_PRODUCTS_REQUEST, getProductsRequest);
}

export default function* locationWriteOffRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchLocationWriteOffRequest),
      fork(watchGetLocationsRequest),
      fork(watchGetProductsRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
