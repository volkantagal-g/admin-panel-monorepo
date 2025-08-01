import { all, call, put, select, takeLatest, debounce, fork, take, cancel } from 'redux-saga/effects';

import { marketProductChainManagementAPI } from '@shared/api/marketProductChainManagement';
import { uploadToS3SignedUrl } from '@shared/api/public';
import { t } from '@shared/i18n';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { REDUX_STORE_KEYS } from '@app/pages/MarketProductChainManagement/constants';

import { Creators, Types } from './actions';
import { selectProductsFilters, selectProductsPagination, selectProductsSort } from './reducer';
import { CATEGORIES_STORAGE } from '../constants';

function* importProducts({ loadedFile }) {
  try {
    const { signedUrl, fileName } = yield call(marketProductChainManagementAPI.products.getPlanogramProductsImportUrl);
    yield call(uploadToS3SignedUrl, { signedUrl, data: loadedFile });
    yield call(marketProductChainManagementAPI.products.importPlanogramProducts, { fileName });
    yield put(Creators.importProductsSuccess());
    yield put(ToastCreators.success({ message: t('YOUR_REQUEST_HAS_BEEN_CREATED') }));
  }
  catch (error) {
    yield put(Creators.importProductsFailure(error));
    yield put(ToastCreators.error({ error }));
  }
}

function* exportProducts() {
  try {
    yield call(marketProductChainManagementAPI.products.exportPlanogramProduct);
    yield put(Creators.exportProductsSuccess());
    yield put(ToastCreators.success({
      message: t('FILE_WILL_BE_SENT'),
      toastOptions: { autoClose: 3000 },
    }));
  }
  catch (error) {
    yield put(Creators.exportProductsFailure(error));
    yield put(ToastCreators.error({ error }));
  }
}

function* fetchProducts() {
  try {
    const filters = yield select(selectProductsFilters);
    const pagination = yield select(selectProductsPagination);
    const sort = yield select(selectProductsSort);

    // Ant Design'ın "ascend" ve "descend" değerlerini API'nin beklediği "asc" ve "desc" değerlerine dönüştür
    let apiSortOrder;
    if (sort.order === 'ascend') {
      apiSortOrder = 'asc';
    }
    else if (sort.order === 'descend') {
      apiSortOrder = 'desc';
    }
    else {
      apiSortOrder = sort.order;
    }

    const response = yield call(marketProductChainManagementAPI.products.getProducts, {
      filters,
      pagination: {
        page: pagination.page,
        pageSize: pagination.pageSize,
      },
      sort: {
        field: sort.field,
        order: apiSortOrder,
      },
    });

    if (response.success && response.data) {
      const { productList, totalCount } = response.data;

      yield put(Creators.fetchProductsSuccess(productList, totalCount));

      // Sadece toplam kayıt sayısı değiştiyse pagination'ı güncelle
      // Sayfa numarasını frontend'de yönetiyoruz, API'den değil
      if (totalCount !== pagination.total) {
        yield put(Creators.updatePagination({ total: totalCount }));
      }
    }
    else {
      throw new Error('Invalid response format');
    }
  }
  catch (error) {
    yield put(Creators.fetchProductsFailure(error.message || 'Failed to fetch products'));
  }
}

function* handleFormValuesChange() {
  try {
    // Yükleme durumunu kontrol edip, zaten yükleme varsa yeni istek oluşturma
    const productsState = yield select(state => state[REDUX_STORE_KEYS.PRODUCTS]);
    const isLoading = productsState?.loading?.fetch;

    if (!isLoading) {
      // Sadece ürün verilerini getir, diğer verileri tekrar getirme
      yield put(Creators.fetchProductsRequest());
    }
  }
  catch (error) {
    yield put(Creators.fetchProductsFailure(error.message || 'Failed to handle form values change'));
  }
}

function* fetchDemographies() {
  try {
    const response = yield call(marketProductChainManagementAPI.common.getDemographyLookup);

    if (response && response.success && response.data && response.data.demographies) {
      const { demographies } = response.data;

      const formattedDemographies = demographies.map(item => ({
        value: item.demography,
        label: item.name,
        id: item.id,
      }));

      yield put(Creators.fetchDemographiesSuccess(formattedDemographies));
    }
    else {
      throw new Error('Invalid response format for demographies');
    }
  }
  catch (error) {
    yield put(Creators.fetchDemographiesFailure(error.message || 'Failed to fetch demographies'));
    yield put(ToastCreators.error({ message: t('FAILED_TO_FETCH_DEMOGRAPHIES') }));
  }
}

function* fetchSizes() {
  try {
    const response = yield call(marketProductChainManagementAPI.common.getSizeLookup);

    if (response && response.success && response.data && response.data.sizes) {
      const { sizes } = response.data;

      const formattedSizes = sizes.map(item => ({
        value: item.size,
        label: item.name,
        id: item.id,
      }));

      yield put(Creators.fetchSizesSuccess(formattedSizes));
    }
    else {
      throw new Error('Invalid response format for sizes');
    }
  }
  catch (error) {
    yield put(Creators.fetchSizesFailure(error.message || 'Failed to fetch sizes'));
    yield put(ToastCreators.error({ message: t('FAILED_TO_FETCH_SIZES') }));
  }
}

function* fetchDomainTypes() {
  try {
    const response = yield call(marketProductChainManagementAPI.common.getDomainTypeLookup);

    if (response && response.success && response.data && response.data.domainTypes) {
      const { domainTypes } = response.data;

      const formattedDomainTypes = domainTypes.map(item => ({
        value: item.domainType,
        label: item.name,
        id: item.id,
      }));

      yield put(Creators.fetchDomainTypesSuccess(formattedDomainTypes));
    }
    else {
      throw new Error('Invalid response format for domain types');
    }
  }
  catch (error) {
    yield put(Creators.fetchDomainTypesFailure(error.message || 'Failed to fetch domain types'));
    yield put(ToastCreators.error({ message: t('FAILED_TO_FETCH_DOMAIN_TYPES') }));
  }
}

function* fetchCategories() {
  try {
    // console.log('Fetching categories...');

    // Önce localStorage'dan kontrol et
    const localStorageKey = CATEGORIES_STORAGE.LOCAL_STORAGE_KEY;
    const cachedCategories = localStorage.getItem(localStorageKey);

    if (cachedCategories) {
      // console.log('Categories loaded from localStorage');
      const parsedCategories = JSON.parse(cachedCategories);
      yield put(Creators.fetchCategoriesSuccess(parsedCategories));
      return;
    }

    // API'den kategorileri getir
    // console.log('Categories not found in localStorage, fetching from API...');
    try {
      const response = yield call(marketProductChainManagementAPI.chain.L4Lookup);

      if (response && response.success && response.data) {
        // console.log('Categories fetched successfully from L4Lookup API');
        const formattedCategories = response.data.map(category => ({
          value: category.id,
          label: category.name?.tr || category.name?.en || category.name,
        }));

        // localStorage'a kaydet
        localStorage.setItem(localStorageKey, JSON.stringify(formattedCategories));

        yield put(Creators.fetchCategoriesSuccess(formattedCategories));
      }
      else {
        throw new Error('Invalid response from L4Lookup API');
      }
    }
    catch (apiError) {
      // console.error('Error fetching from L4Lookup API, trying getMasterCategoryV2:', apiError);

      // Alternatif API çağrısı
      try {
        const alternativeResponse = yield call(marketProductChainManagementAPI.categories.getMasterCategoryV2, {
          level: 40, // L4 kategorileri için
          limit: 1000,
          offset: 0,
        });

        if (alternativeResponse && alternativeResponse.success && alternativeResponse.data) {
          // console.log('Categories fetched successfully from getMasterCategoryV2 API');
          const formattedCategories = alternativeResponse.data.map(category => ({
            value: category._id,
            label: category.name?.tr || category.name?.en || category.name,
          }));

          // localStorage'a kaydet
          localStorage.setItem(localStorageKey, JSON.stringify(formattedCategories));

          yield put(Creators.fetchCategoriesSuccess(formattedCategories));
        }
        else {
          throw new Error('Invalid response from getMasterCategoryV2 API');
        }
      }
      catch (alternativeError) {
        // console.error('Error fetching from getMasterCategoryV2 API:', alternativeError);
        yield put(Creators.fetchCategoriesFailure(alternativeError.message || 'Failed to fetch categories'));
      }
    }
  }
  catch (error) {
    // console.error('Error in fetchCategories saga:', error);
    yield put(Creators.fetchCategoriesFailure(error.message || 'Failed to fetch categories'));
  }
}

export function* productSagas() {
  // Bir fork ID'si oluştur, bu sayede uygulama kapandığında tüm effect'leri iptal edebiliriz
  const sagaTaskId = yield fork(function* watchProductSagas() {
    yield all([
      takeLatest(Types.FETCH_PRODUCTS_REQUEST, fetchProducts),

      // Tüm form değişikliklerini tek bir işlevde birleştir ve debounce uygula
      debounce(300, [
        Types.UPDATE_FORM_VALUES,
        Types.RESET_FILTERS,
      ], handleFormValuesChange),

      takeLatest(Types.IMPORT_PRODUCTS_REQUEST, importProducts),
      takeLatest(Types.EXPORT_PRODUCTS_REQUEST, exportProducts),

      // İlk yükleme için çağrılacak API'ler
      takeLatest(Types.FETCH_DEMOGRAPHIES_REQUEST, fetchDemographies),
      takeLatest(Types.FETCH_SIZES_REQUEST, fetchSizes),
      takeLatest(Types.FETCH_DOMAIN_TYPES_REQUEST, fetchDomainTypes),
      takeLatest(Types.FETCH_CATEGORIES_REQUEST, fetchCategories),
    ]);
  });

  // Temizleme işlemi
  yield take(Types.CLEAR_PRODUCTS_STATE);
  yield cancel(sagaTaskId);
}
