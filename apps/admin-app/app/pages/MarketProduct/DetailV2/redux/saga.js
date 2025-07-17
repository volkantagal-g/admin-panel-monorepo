import { all, takeLatest, call, cancel, fork, put, take, select, actionChannel } from 'redux-saga/effects';
import { get, set, isFinite, reject, uniqBy, map, uniq } from 'lodash';

import { t } from '@shared/i18n';

import {
  createMarketProduct,
  updateMarketProduct,
  getMarketProductWithCategoryPositions,
  createMarketProductImageUrl,
  getProductsOfSubCategory,
  updateMarketCategoryPosition,
  updateMainCategory,
  getMarketProductFeedData,
  getProductActivationValidationErrors,
  assignFamilyToProduct,
} from '@shared/api/marketProduct';
import { getMarketProductSlugs } from '@shared/api/marketProductSlug';
import {
  deleteDiscountedPrice,
  createBuyingPriceFinancials,
  getMarketProductAllPrice,
  updateMarketProductPricing,
  updateBuyingPriceFinancials,
  createSellingPriceFinancials,
  createSellingPriceDiscountedFinancials,
  getMarketProductsPriceList,
  updateBundleSubProductPrices,
  updateBundleSubProductStruckPrice,
  deleteBundleStruckPrice,
  updateMarketProductPrice,
  updateMarketProductDiscounted,
  deleteBuyingPriceFinancials,
} from '@shared/api/marketProductPrice';
import { Types, Creators } from './actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { getTransferGroups, getProductTransferGroupsByProduct, updateTransferGroupsOfProduct } from '@shared/api/transferGroup';
import { createMap } from '@shared/utils/common';
import {
  createMarketProductTag,
  createMarketProductTagImageUrl,
  deleteMarketProductTag,
  getMarketProductTags,
  updateMarketProductTag,
} from '@shared/api/marketProductTag';
import { getMarketProductMasterCategoriesOld } from '@shared/api/marketProductMasterCategory';
import { uploadToS3SignedUrl } from '@shared/api/public';
import { POPULATE_FIELDS_ON_GET_MARKET_PRODUCT } from '@app/pages/MarketProduct/constants';
import { MARKET_PRODUCT_STATUS, PRODUCT_CATEGORY_TYPE } from '@shared/shared/constants';
import {
  getMarketProductByIdSelector,
  getProductActivationValidationErrorsSelector, getProductsOfSubCategorySelector,
} from '@app/pages/MarketProduct/DetailV2/redux/selectors';
import { getWarehouseSegments } from '@shared/api/warehouse';
import { getBadges } from '@shared/api/marketProductBadge';
import { createSupplyLogisticInfo, getSupplyLogisticInfo, updateSupplyLogisticInfo, getSupplyBrands, getMasterCategoryV2 } from '@shared/api/supplyLogistic';
import { getMarketProductCategoriesSelector } from '@shared/redux/selectors/common';
import { Creators as CommonCreators } from '@shared/redux/actions/common';
import { DOMAIN_TYPES } from '@app/pages/MarketProduct/DetailV2/components/PricingInfo/components/BundleRules/formHelper';
import { SELLING_PRICE_TYPES } from '@app/pages/MarketProduct/DetailV2/components/PricingInfo/constants';
import { handleErrorMessages } from '@app/pages/MarketProduct/Pricing/utils';
import { getPricingServiceError } from '@app/pages/MarketProduct/utils';
import { getMarketProductBundles } from '@shared/api/marketProductBundles';

const setIsImperialUnitUsedToLocalStorage = (isImperialUnitUsed = false) => {
  localStorage.setItem('isImperialUnitUsed', isImperialUnitUsed);
};

const prepareBodyToRemoveProductFromCategoryPosition = ({
  marketProduct,
  marketProductCategoriesMap,
  subCategoryProductPositions,
  positions,
  categoryId,
  subCategoryId,
  version,
}) => {
  const items = subCategoryProductPositions
    .filter(product => product.item?._id !== marketProduct._id && product?.item && isFinite(product?.position))
    .sort((a, b) => a.position > b.position)
    .map(({ item }, index) => ({
      item: item._id,
      position: index + 1,
    }));

  const newPositions = positions.map(item => {
    return {
      category: get(item, 'category._id'),
      subCategory: get(item, 'subCategory._id'),
      position: get(item, 'position'),
    };
  });

  const currentPositions = reject([...newPositions], { subCategory: subCategoryId });

  let body = {
    items: uniqBy(items, item => item?.item),
    category: categoryId,
    subCategory: subCategoryId,
    categories: uniqBy(map(currentPositions, 'category')),
    subCategories: uniqBy(map(currentPositions, 'subCategory')),
    removal: true,
    version,
    productId: marketProduct._id,
  };
  const categoryIdsToSend = body?.categories?.filter(catId => {
    const category = marketProductCategoriesMap?.[catId];
    return category?.type !== PRODUCT_CATEGORY_TYPE.DISCOUNTED;
  });
  const subCategoryIdsToSend = body?.subCategories?.filter(subCatId => {
    const subCategory = marketProductCategoriesMap?.[subCatId];
    return subCategory?.isSubCategory;
  });

  body = {
    ...body,
    categories: categoryIdsToSend || [],
    subCategories: subCategoryIdsToSend || [],
  };

  return body;
};

const prepareBodyToAddProductToCategoryPosition = ({
  marketProduct,
  marketProductCategoriesMap,
  subCategoryProductPositions,
  positions,
  categoryId,
  subCategoryId,
  version,
  enteredPosition,
}) => {
  const validPositions = subCategoryProductPositions
    .filter(({ item, position }) => item._id !== marketProduct._id && item && isFinite(position))
    .sort((a, b) => a.position > b.position);

  const insertIndex = isFinite(enteredPosition) ? enteredPosition - 1 : validPositions.length;

  // shift positions of products above our product
  const newSubCategoryProductPositions = validPositions
    .toSpliced(insertIndex, 0, { item: { _id: marketProduct._id } })
    .map(({ item }, index) => ({
      item: item._id,
      // For some reason we also use a position number in these arrays,
      // which is already ordered natively holds position value
      position: index + 1,
    }));

  const newPositions = [
    ...positions.map(item => ({
      category: item.category?._id,
      subCategory: item.subCategory?._id,
      position: item.position,
    })),
    {
      category: categoryId,
      subCategory: subCategoryId,
    },
  ];

  let body = {
    items: uniqBy(newSubCategoryProductPositions, item => item?.item),
    category: categoryId,
    subCategory: subCategoryId,
    categories: uniqBy(map(newPositions, 'category')),
    subCategories: uniqBy(map(newPositions, 'subCategory')),
    removal: false,
    productId: marketProduct._id,
  };
  if (version >= 0) {
    body.version = version;
  }
  const categoryIdsToSend = body?.categories?.filter(catId => {
    const category = marketProductCategoriesMap?.[catId];
    return category?.type !== PRODUCT_CATEGORY_TYPE.DISCOUNTED;
  });
  const subCategoryIdsToSend = body?.subCategories?.filter(subCatId => {
    const subCategory = marketProductCategoriesMap?.[subCatId];
    return subCategory?.isSubCategory;
  });

  body = {
    ...body,
    categories: categoryIdsToSend || [],
    subCategories: subCategoryIdsToSend || [],
  };

  return body;
};

function* getMarketProductByIdRequest({ id, populate }) {
  try {
    const data = yield call(getMarketProductWithCategoryPositions, { id, populate });
    yield put(Creators.getMarketProductByIdSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getMarketProductByIdFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* createMarketProductRequest({ body }) {
  try {
    const data = yield call(createMarketProduct, { body });
    yield put(ToastCreators.success());
    yield put(Creators.createMarketProductSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.createMarketProductFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* updateMarketProductRequest({ id, body }) {
  try {
    const data = yield call(updateMarketProduct, { id, body });
    yield put(Creators.updateMarketProductSuccess({ data }));
    if (data.isValid === false) {
      yield put(Creators.getProductActivationValidationErrorsSuccess({ data }));
      yield put(ToastCreators.error({ message: t('marketProductPageV2:PRODUCT_ENABLE_ERROR_DESC') }));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    else {
      yield put(
        Creators.getMarketProductByIdRequest({
          id,
          populate: POPULATE_FIELDS_ON_GET_MARKET_PRODUCT,
        }),
      );
      yield put(ToastCreators.success());
    }
  }
  catch (error) {
    yield put(Creators.updateMarketProductFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* getTransferGroupsRequest({ status }) {
  try {
    const { transferGroups: data } = yield call(getTransferGroups, { status });
    yield put(Creators.getTransferGroupsSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getTransferGroupsFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* getProductTransferGroupsByProductRequest({ productId }) {
  try {
    const { productTransferGroups: data } = yield call(getProductTransferGroupsByProduct, { productId });
    yield put(Creators.getProductTransferGroupsByProductSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getProductTransferGroupsByProductFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* updateTransferGroupsOfProductRequest({ productId, transferGroups }) {
  try {
    const data = yield call(updateTransferGroupsOfProduct, { productId, transferGroups });
    yield put(Creators.updateTransferGroupsOfProductSuccess({ data }));
    yield getProductTransferGroupsByProductRequest({ productId });
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(Creators.updateTransferGroupsOfProductFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* createMarketProductImageUrlRequest({ key, loadedImage, extension }) {
  try {
    const { signedUrl, cdnUrl } = yield call(createMarketProductImageUrl, { extension });
    yield call(uploadToS3SignedUrl, { signedUrl, data: loadedImage });
    yield put(Creators.createMarketProductImageUrlSuccess({ data: { key, signedUrl, cdnUrl } }));
  }
  catch (error) {
    yield put(Creators.createMarketProductImageUrlFailure({ key, error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* getProductsOfSubCategoryRequest({ categoryId, subCategoryId }) {
  try {
    const data = yield call(getProductsOfSubCategory, { categoryId, subCategoryId });
    yield put(Creators.getProductsOfSubCategorySuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getProductsOfSubCategoryFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}
function* resetProductsOfSubCategory() {
  try {
    yield put(Creators.resetProductsOfSubCategorySuccess({ data: {} }));
  }
  catch (error) {
    yield put(Creators.resetProductsOfSubCategoryFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* updateMarketCategoryPositionRequest({ id, body }) {
  try {
    yield call(updateMarketCategoryPosition, { body });
    yield put(
      Creators.getMarketProductByIdRequest({
        id,
        populate: POPULATE_FIELDS_ON_GET_MARKET_PRODUCT,
      }),
    );
    yield put(Creators.updateMarketCategoryPositionSuccess());
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(Creators.updateMarketCategoryPositionFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* deleteMarketCategoryPositionRequest({ id, categoryId, subCategoryId }) {
  try {
    const marketProduct = yield select(getMarketProductByIdSelector.getData);
    const marketProductCategories = yield select(getMarketProductCategoriesSelector.getData);
    const positions = yield select(getMarketProductByIdSelector.getPositions);
    const productsOfSubCategoryObject = yield call(getProductsOfSubCategory, { categoryId, subCategoryId });
    const subCategoryProductPositions = productsOfSubCategoryObject?.items?.filter(subCategoryProductPosition => !!subCategoryProductPosition.item);
    const version = productsOfSubCategoryObject?.version;
    const marketProductCategoriesMap = createMap(marketProductCategories);
    const body = prepareBodyToRemoveProductFromCategoryPosition({
      marketProduct,
      marketProductCategoriesMap,
      subCategoryProductPositions,
      positions,
      categoryId,
      subCategoryId,
      version,
    });
    yield call(updateMarketCategoryPosition, { body });
    yield put(Creators.getMarketProductByIdRequest({
      id,
      populate: POPULATE_FIELDS_ON_GET_MARKET_PRODUCT,
    }));
    yield put(Creators.deleteMarketCategoryPositionSuccess());
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(Creators.deleteMarketCategoryPositionFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* addMarketCategoryPositionRequest({ id, categoryId, subCategoryId, enteredPosition }) {
  try {
    const marketProduct = yield select(getMarketProductByIdSelector.getData);
    const marketProductCategories = yield select(getMarketProductCategoriesSelector.getData);
    const positions = yield select(getMarketProductByIdSelector.getPositions);
    const productsOfSubCategoryObject = yield select(getProductsOfSubCategorySelector.getData);
    const subCategoryProductPositions = yield select(getProductsOfSubCategorySelector.getSubCategoryProductPositions);
    const version = productsOfSubCategoryObject?.version;
    const marketProductCategoriesMap = createMap(marketProductCategories);
    const body = prepareBodyToAddProductToCategoryPosition({
      marketProduct,
      marketProductCategoriesMap,
      subCategoryProductPositions,
      positions,
      categoryId,
      subCategoryId,
      version,
      enteredPosition,
    });
    yield call(updateMarketCategoryPosition, { body });
    yield put(Creators.getMarketProductByIdRequest({
      id,
      populate: POPULATE_FIELDS_ON_GET_MARKET_PRODUCT,
    }));
    yield put(Creators.addMarketCategoryPositionSuccess());
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(Creators.addMarketCategoryPositionFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* updateMainCategoryRequest({ id, body }) {
  try {
    const productsOfSubCategoryObject = yield call(getProductsOfSubCategory, { categoryId: body?.category, subCategoryId: body?.subCategory });
    const marketProductCategories = yield select(getMarketProductCategoriesSelector.getData);
    const positions = yield select(getMarketProductByIdSelector.getPositions);
    const marketProductCategoriesMap = createMap(marketProductCategories);
    const category = marketProductCategoriesMap?.[productsOfSubCategoryObject.category];
    if (category?.type === PRODUCT_CATEGORY_TYPE.DISCOUNTED) {
      yield put(ToastCreators.error({ message: t('marketProductV2:POSITION_INFO.DISCOUNTED_CATEGORY_CAN_NOT_BE_MAIN_CATEGORY_ERROR') }));
    }
    const isProductAddedToAnyDiscountedCategory = positions.some(position => {
      const categoryId = position?.category?._id;
      const categoryType = marketProductCategoriesMap?.[categoryId]?.type;
      return categoryType === PRODUCT_CATEGORY_TYPE.DISCOUNTED;
    });
    if (isProductAddedToAnyDiscountedCategory) {
      yield put(ToastCreators.error({
        message: t('marketProductV2:POSITION_INFO.MAIN_CATEGORY_CAN_NOT_BE_CHANGED_ERROR'),
        toastOptions: { autoClose: 5000 },
      }));
    }
    yield call(updateMainCategory, { body });
    yield put(
      Creators.getMarketProductByIdRequest({
        id,
        populate: POPULATE_FIELDS_ON_GET_MARKET_PRODUCT,
      }),
    );
    yield put(Creators.updateMainCategorySuccess());
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(Creators.updateMainCategoryFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* getMarketProductTagsRequest() {
  try {
    const data = yield call(getMarketProductTags);
    yield put(Creators.getMarketProductTagsSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getMarketProductTagsFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* createMarketProductTagRequest({ marketProductTagData = {}, loadedImage, extension }) {
  try {
    const { signedUrl, cdnUrl } = yield call(createMarketProductTagImageUrl, { extension });
    yield call(uploadToS3SignedUrl, { signedUrl, data: loadedImage });
    set(marketProductTagData, 'image', cdnUrl);
    const data = yield call(createMarketProductTag, { marketProductTagData });
    yield put(Creators.createMarketProductTagSuccess({ data }));
    yield put(Creators.getMarketProductTagsRequest());
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(Creators.createMarketProductTagFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* updateMarketProductTagRequest({ id, marketProductTagData = {}, loadedImage, extension }) {
  try {
    if (extension && loadedImage) {
      const { signedUrl, cdnUrl } = yield call(createMarketProductTagImageUrl, { extension });
      yield call(uploadToS3SignedUrl, { signedUrl, data: loadedImage });
      set(marketProductTagData, 'image', cdnUrl);
    }
    const data = yield call(updateMarketProductTag, { id, marketProductTagData });
    yield put(Creators.updateMarketProductTagSuccess({ data }));
    yield put(Creators.getMarketProductTagsRequest());
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(Creators.updateMarketProductTagFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* deleteMarketProductTagRequest({ tagId }) {
  try {
    const data = yield call(deleteMarketProductTag, { tagId });

    if (!data.deletedTagCount) {
      throw new Error();
    }

    yield put(Creators.deleteMarketProductTagSuccess({ data }));
    yield put(Creators.getMarketProductTagsRequest());
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(Creators.deleteMarketProductTagFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* getMarketProductFeedDataRequest({ productId }) {
  try {
    const data = yield call(getMarketProductFeedData, { productId });
    yield put(Creators.getMarketProductFeedDataSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getMarketProductFeedDataFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* getMarketProductSlugsRequest({ id }) {
  try {
    const data = yield call(getMarketProductSlugs, { id });
    yield put(Creators.getMarketProductSlugsSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getMarketProductSlugsFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* getMarketProductBundlesDataRequest({ id, fields }) {
  try {
    const data = yield call(getMarketProductBundles, { id, fields });
    yield put(Creators.getMarketProductBundlesDataSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getMarketProductBundlesDataFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* getMarketProductMasterCategoriesOldRequest({ isSubCategory, limit, offset }) {
  try {
    const data = yield call(getMarketProductMasterCategoriesOld, { isSubCategory, limit, offset });
    yield put(Creators.getMarketProductMasterCategoriesOldSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getMarketProductMasterCategoriesOldFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* getProductActivationValidationErrorsRequest({ ids }) {
  try {
    const data = yield call(getProductActivationValidationErrors, { ids });
    yield put(Creators.getProductActivationValidationErrorsSuccess({ data }));
    const { isValid } = yield select(getProductActivationValidationErrorsSelector.getData);
    if (!isValid) {
      yield put(ToastCreators.error({ message: t('marketProductPageV2:PRODUCT_ACTIVATION_ERROR_DESC') }));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
  catch (error) {
    yield put(Creators.getProductActivationValidationErrorsFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* activateProductsRequest({ ids }) {
  try {
    yield call(getProductActivationValidationErrorsRequest, { ids });
    const isValid = yield select(getProductActivationValidationErrorsSelector.getIsProductValid);
    if (isValid) {
      yield put(Creators.updateMarketProductRequest({
        id: ids?.[0],
        body: { status: MARKET_PRODUCT_STATUS.ACTIVE },
      }));
    }

    yield put(Creators.activateProductsSuccess());
  }
  catch (error) {
    yield put(Creators.activateProductsFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* setIsImperialUnitUsed() {
  while (true) {
    const { isImperialUnitUsed } = yield take(Types.SET_IS_IMPERIAL_UNIT_USED);
    setIsImperialUnitUsedToLocalStorage(JSON.stringify(isImperialUnitUsed));
    yield put({ type: Types.SET_IS_IMPERIAL_UNIT_USED, isImperialUnitUsed });
  }
}

function* createBuyingPriceFinancialsRequest({ body, errors }) {
  try {
    const data = yield call(createBuyingPriceFinancials, { body });
    yield put(Creators.getMarketProductAllPriceRequest({ id: body?.productId }));
    yield put(Creators.createBuyingPriceFinancialsSuccess({ data }));
    yield put(ToastCreators.success());
    if (errors?.length) {
      yield put(Creators.getProductActivationValidationErrorsRequest({ ids: [body?.productId] }));
    }
  }
  catch (error) {
    yield put(Creators.createBuyingPriceFinancialsFailure({ error }));
    yield put(ToastCreators.error({ message: getPricingServiceError(error) }));
  }
}
export function* getMarketProductAllPriceRequest({ id, warehouseId }) {
  try {
    const data = yield call(getMarketProductAllPrice, { id, warehouseId });
    if (data?.subProductPrices?.length) {
      const productIds = uniq(data?.subProductPrices?.map(price => price?.productId));
      yield put(CommonCreators.getMarketProductsRequest({ ids: productIds, fields: ['name fullName picURL'] }));
    }
    yield put(Creators.getMarketProductAllPriceSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getMarketProductAllPriceFailure({ error }));
    yield put(ToastCreators.error({ message: getPricingServiceError(error) }));
  }
}
export function* updateMarketProductPricingRequest({ id, body, errors }) {
  try {
    const data = yield call(updateMarketProductPricing, { id, body });
    yield put(Creators.getMarketProductAllPriceRequest({ id }));
    yield put(Creators.updateMarketProductPricingSuccess({ data }));
    yield put(ToastCreators.success());
    if (errors?.length) {
      yield put(Creators.getProductActivationValidationErrorsRequest({ ids: [id] }));
    }
  }
  catch (error) {
    yield put(Creators.updateMarketProductPricingFailure({ error }));
    yield put(ToastCreators.error({ message: getPricingServiceError(error) }));
  }
}
function* getWarehouseSegmentsRequest() {
  try {
    const data = yield call(getWarehouseSegments, {});
    yield put(Creators.getWarehouseSegmentsSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getWarehouseSegmentsFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}
function* watchGetWarehouseSegmentsRequest() {
  yield takeLatest(Types.GET_WAREHOUSE_SEGMENTS_REQUEST, getWarehouseSegmentsRequest);
}

export function* getBadgesRequest({ limit, offset }) {
  try {
    const data = yield call(getBadges, { limit, offset });
    yield put(Creators.getBadgesSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getBadgesFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* watchGetBadgesRequest() {
  yield takeLatest(Types.GET_BADGES_REQUEST, getBadgesRequest);
}

function* updateBuyingPriceFinancialsRequest({ body, errors }) {
  try {
    const data = yield call(updateBuyingPriceFinancials, { body });
    yield put(Creators.getMarketProductAllPriceRequest({ id: body?.productId }));
    yield put(Creators.updateBuyingPriceFinancialsSuccess({ data }));
    yield put(ToastCreators.success());
    if (errors?.length) {
      yield put(Creators.getProductActivationValidationErrorsRequest({ ids: [body?.productId] }));
    }
  }
  catch (error) {
    yield put(Creators.updateBuyingPriceFinancialsFailure({ error }));
    yield put(ToastCreators.error({ message: getPricingServiceError(error) }));
  }
}

function* watchUpdateBuyingPriceFinancialsRequest() {
  yield takeLatest(Types.UPDATE_BUYING_PRICE_FINANCIALS_REQUEST, updateBuyingPriceFinancialsRequest);
}

export function* getSupplyLogisticInfoRequest({ id }) {
  try {
    const data = yield call(getSupplyLogisticInfo, { id });
    yield put(Creators.getSupplyLogisticInfoSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getSupplyLogisticInfoFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

export function* watchGetSupplyLogisticInfoRequest() {
  yield takeLatest(Types.GET_SUPPLY_LOGISTIC_INFO_REQUEST, getSupplyLogisticInfoRequest);
}

function* updateSupplyLogisticInfoRequest({ id, body, errors }) {
  try {
    const data = yield call(updateSupplyLogisticInfo, { id, body });
    yield put(Creators.getSupplyLogisticInfoRequest({ id }));
    yield put(Creators.updateSupplyLogisticInfoSuccess({ data }));
    yield put(ToastCreators.success());
    if (errors?.length) {
      yield put(Creators.getProductActivationValidationErrorsRequest({ ids: [id] }));
    }
  }
  catch (error) {
    yield put(Creators.updateSupplyLogisticInfoFailure({ error }));
    yield put(ToastCreators.error({ message: error?.response?.data?.message?.message }));
  }
}

function* watchUpdateSupplyLogisticInfoRequest() {
  yield takeLatest(Types.UPDATE_SUPPLY_LOGISTIC_INFO_REQUEST, updateSupplyLogisticInfoRequest);
}
function* createSupplyLogisticInfoRequest({ body }) {
  try {
    const data = yield call(createSupplyLogisticInfo, { body });
    yield put(Creators.getSupplyLogisticInfoRequest({ id: body?.productId }));
    yield put(Creators.createSupplyLogisticInfoSuccess({ data }));
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(Creators.createSupplyLogisticInfoFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchCreateSupplyLogisticInfoRequest() {
  yield takeLatest(Types.CREATE_SUPPLY_LOGISTIC_INFO_REQUEST, createSupplyLogisticInfoRequest);
}
function* createOrUpdateSupplyLogisticInfoRequest({ id, body, isCreated, hasTransferGroup, errors }) {
  const { transferGroups, ...newBody } = body;
  try {
    if (isCreated) {
      yield put(Creators.updateSupplyLogisticInfoRequest({ id, body: { ...newBody }, errors }));
    }
    else {
      yield put(Creators.createSupplyLogisticInfoRequest({ body: { ...newBody, productId: id } }));
    }
    if (hasTransferGroup) {
      yield put(Creators.updateTransferGroupsOfProductRequest({ productId: id, transferGroups }));
    }
  }
  catch (error) {
    yield put(ToastCreators.error({ error }));
  }
}
function* getMasterCategoriesV2Request({ queryText, level, limit, offset, fields, status }) {
  try {
    const data = yield call(getMasterCategoryV2, { queryText, level, limit, offset, fields, status });
    yield put(Creators.getMasterCategoriesV2Success({ data }));
  }
  catch (error) {
    yield put(Creators.getMasterCategoriesV2Failure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}
function* watchGetMasterCategoriesV2Request() {
  yield takeLatest(Types.GET_MASTER_CATEGORIES_V2_REQUEST, getMasterCategoriesV2Request);
}

function* getSupplyBrandsRequest({ limit, offset, name }) {
  try {
    const data = yield call(getSupplyBrands, { limit, offset, name });
    yield put(Creators.getSupplyBrandsSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getSupplyBrandsFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}
function* createSellingPriceFinancialsRequest({ body, errors }) {
  try {
    const data = yield call(createSellingPriceFinancials, { body });
    yield put(Creators.getSellingPriceListRequest({ productIds: [body?.productId] }));
    yield put(Creators.getMarketProductAllPriceRequest({ id: body?.productId }));
    yield put(Creators.getMarketProductsPriceListRequest({ productIds: [body?.productId] }));
    yield put(Creators.createSellingPriceFinancialsSuccess({ data }));
    yield put(ToastCreators.success());
    if (errors?.length) {
      yield put(Creators.getProductActivationValidationErrorsRequest({ ids: [body?.productId] }));
    }
  }
  catch (error) {
    yield put(Creators.createSellingPriceFinancialsFailure({ error }));
    yield put(ToastCreators.error({ message: getPricingServiceError(error) }));
  }
}
function* createSellingPriceDiscountedFinancialsRequest({ body, errors }) {
  try {
    const data = yield call(createSellingPriceDiscountedFinancials, { body });
    yield put(Creators.getSellingPriceListRequest({ productIds: [body?.productId] }));
    yield put(Creators.getMarketProductsPriceListRequest({ productIds: [body?.productId] }));
    yield put(Creators.createSellingPriceDiscountedFinancialsSuccess({ data }));
    yield put(ToastCreators.success());
    if (errors?.length) {
      yield put(Creators.getProductActivationValidationErrorsRequest({ ids: [body?.productId] }));
    }
  }
  catch (error) {
    yield put(Creators.createSellingPriceDiscountedFinancialsFailure({ error }));
    yield put(ToastCreators.error({ message: getPricingServiceError(error) }));
  }
}
function* getSellingPriceListRequest({ limit, offset, productIds, domainTypes, warehouseIds, startDate, endDate, pricingTypes }) {
  try {
    const data = yield call(
      getMarketProductsPriceList,
      { limit, offset, productIds, domainTypes, warehouseIds, startDate, endDate, pricingTypes },
    );
    yield put(Creators.getSellingPriceListSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getSellingPriceListFailure({ error }));
    yield put(ToastCreators.error({ message: getPricingServiceError(error) }));
  }
}

function* watchGetSellingPriceListRequest() {
  yield takeLatest(Types.GET_SELLING_PRICE_LIST_REQUEST, getSellingPriceListRequest);
}

function* getMarketProductsPriceListRequest({ limit, offset, productIds, domainTypes, warehouseIds, startDate, endDate, pricingTypes, callbackForProducts }) {
  try {
    const data = yield call(
      getMarketProductsPriceList,
      { limit, offset, productIds, domainTypes, warehouseIds, startDate, endDate, pricingTypes },
    );
    if (callbackForProducts) {
      const products = data?.data?.map(price => price?.productId);
      yield put(CommonCreators.getMarketProductsRequest({ ids: products, populate: [], fields: ['_id name'] }));
    }
    yield put(Creators.getMarketProductsPriceListSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getMarketProductsPriceListFailure({ error }));
    yield put(ToastCreators.error({ message: getPricingServiceError(error) }));
  }
}
function* watchGetMarketProductsPriceListRequest() {
  yield takeLatest(Types.GET_MARKET_PRODUCTS_PRICE_LIST_REQUEST, getMarketProductsPriceListRequest);
}

function* updateBundleSubProductPricesRequest({ body }) {
  try {
    const { productId } = body;
    const data = yield call(updateBundleSubProductPrices, { body });
    yield put(Creators.getSellingPriceListRequest({ productIds: [productId] }));
    yield put(Creators.getMarketProductsPriceListRequest({
      productIds: [productId],
      domainTypes: [DOMAIN_TYPES.g10, DOMAIN_TYPES.g30, DOMAIN_TYPES.getirwater],
      pricingTypes: [SELLING_PRICE_TYPES.DOMAIN],
      startDate: new Date(),
      endDate: new Date(),
    }));
    yield put(Creators.getMarketProductAllPriceRequest({ id: productId }));
    yield put(Creators.updateBundleSubProductPricesSuccess({ data }));
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(Creators.updateBundleSubProductPricesFailure({ error }));
    yield put(ToastCreators.error({ message: getPricingServiceError(error) }));
  }
}

function* watchUpdateBundleSubProductPricesRequest() {
  yield takeLatest(Types.UPDATE_BUNDLE_SUB_PRODUCT_PRICES_REQUEST, updateBundleSubProductPricesRequest);
}

function* updateBundleSubProductStruckPriceRequest({ body }) {
  try {
    const { productId } = body;
    const data = yield call(updateBundleSubProductStruckPrice, { body });
    yield put(Creators.getSellingPriceListRequest({ productIds: [productId] }));
    yield put(Creators.getMarketProductsPriceListRequest({
      productIds: [productId],
      domainTypes: [DOMAIN_TYPES.g10, DOMAIN_TYPES.g30, DOMAIN_TYPES.getirwater],
      pricingTypes: [SELLING_PRICE_TYPES.DOMAIN],
      startDate: new Date(),
      endDate: new Date(),
    }));
    yield put(Creators.updateBundleSubProductStruckPriceSuccess({ data }));
    yield put(ToastCreators.success());
    yield put(Creators.getSellingPriceListRequest({ productIds: [productId] }));
  }
  catch (error) {
    yield put(Creators.updateBundleSubProductStruckPriceFailure({ error }));
    yield put(ToastCreators.error({ message: getPricingServiceError(error) }));
  }
}

function* watchUpdateBundleSubProductStruckPriceRequest() {
  yield takeLatest(Types.UPDATE_BUNDLE_SUB_PRODUCT_STRUCK_PRICE_REQUEST, updateBundleSubProductStruckPriceRequest);
}

function* deleteBundleStruckPriceRequest({ body }) {
  try {
    const { productId } = body;
    const data = yield call(deleteBundleStruckPrice, { body });
    yield put(Creators.getSellingPriceListRequest({ productIds: [productId] }));
    yield put(Creators.getMarketProductsPriceListRequest({
      productIds: [productId],
      domainTypes: [DOMAIN_TYPES.g10, DOMAIN_TYPES.g30, DOMAIN_TYPES.getirwater],
      pricingTypes: [SELLING_PRICE_TYPES.DOMAIN],
      startDate: new Date(),
      endDate: new Date(),
    }));
    yield put(Creators.deleteBundleStruckPriceSuccess({ data }));
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(Creators.deleteBundleStruckPriceFailure({ error }));
    yield put(ToastCreators.error({ message: getPricingServiceError(error) }));
  }
}

function* updateMarketProductPriceRequest({ body, productId, errors }) {
  try {
    const data = yield call(updateMarketProductPrice, { body });
    yield put(Creators.getSellingPriceListRequest({ productIds: [productId] }));
    yield put(Creators.getMarketProductsPriceListRequest({
      productIds: [productId],
      domainTypes: [DOMAIN_TYPES.g10, DOMAIN_TYPES.g30, DOMAIN_TYPES.getirwater],
      pricingTypes: [SELLING_PRICE_TYPES.DOMAIN],
      startDate: new Date(),
      endDate: new Date(),
    }));
    yield put(Creators.updateMarketProductPriceSuccess({ data }));
    yield put(ToastCreators.success());
    if (errors?.length) {
      yield put(Creators.getProductActivationValidationErrorsRequest({ ids: [productId] }));
    }
  }
  catch (error) {
    yield put(Creators.updateMarketProductPriceFailure({ error }));
    yield put(ToastCreators.error({ message: getPricingServiceError(error) }));
  }
}
function* watchUpdateMarketProductPriceRequest() {
  yield takeLatest(Types.UPDATE_MARKET_PRODUCT_PRICE_REQUEST, updateMarketProductPriceRequest);
}
function* assignFamilyToProductRequest({ productId, familyId }) {
  try {
    const data = yield call(assignFamilyToProduct, { productId, familyId });
    yield put(Creators.getMarketProductAllPriceRequest({ id: productId }));
    yield put(Creators.assignFamilyToProductSuccess({ data }));
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(Creators.assignFamilyToProductFailure({ error }));
    yield put(ToastCreators.error({ message: getPricingServiceError(error) }));
  }
}
function* watchAssignFamilyToProductRequest() {
  yield takeLatest(Types.ASSIGN_FAMILY_TO_PRODUCT_REQUEST, assignFamilyToProductRequest);
}

function* updateMarketProductDiscountedPriceRequest({ body, productId, errors }) {
  try {
    const data = yield call(updateMarketProductDiscounted, { body });
    yield put(Creators.getSellingPriceListRequest({ productIds: [productId] }));
    yield put(Creators.getMarketProductsPriceListRequest({
      productIds: [productId],
      domainTypes: [DOMAIN_TYPES.g10, DOMAIN_TYPES.g30, DOMAIN_TYPES.getirwater],
      pricingTypes: [SELLING_PRICE_TYPES.DOMAIN],
      startDate: new Date(),
      endDate: new Date(),
    }));
    yield put(Creators.updateMarketProductDiscountedPriceSuccess({ data }));
    yield put(ToastCreators.success());
    if (errors?.length) {
      yield put(Creators.getProductActivationValidationErrorsRequest({ ids: [productId] }));
    }
  }
  catch (error) {
    yield put(Creators.updateMarketProductDiscountedPriceFailure({ error }));
    const errorMessage = handleErrorMessages(error);
    yield put(ToastCreators.error({ message: errorMessage }));
  }
}
function* watchUpdateMarketProductDiscountedPriceRequest() {
  yield takeLatest(Types.UPDATE_MARKET_PRODUCT_DISCOUNTED_PRICE_REQUEST, updateMarketProductDiscountedPriceRequest);
}

function* deleteBuyingPriceFinancialsRequest({ body }) {
  try {
    const { productId } = body;
    const data = yield call(deleteBuyingPriceFinancials, body);
    yield put(Creators.getMarketProductAllPriceRequest({ id: productId }));
    yield put(Creators.deleteBuyingPriceFinancialsSuccess({ data }));
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(Creators.deleteBuyingPriceFinancialsFailure({ error }));
    yield put(ToastCreators.error({ message: getPricingServiceError(error) }));
  }
}

function* deleteDiscountedPriceRequest({ discountedPriceId, productId }) {
  try {
    const data = yield call(deleteDiscountedPrice, { discountedPriceId });
    yield put(Creators.getSellingPriceListRequest({ productIds: [productId] }));
    yield put(Creators.getMarketProductsPriceListRequest({ productIds: [productId] }));
    yield put(Creators.deleteDiscountedPriceSuccess({ data }));
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(Creators.deleteDiscountedPriceFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}
function* watchDeleteDiscountedPriceRequest() {
  yield takeLatest(Types.DELETE_DISCOUNTED_PRICE_REQUEST, deleteDiscountedPriceRequest);
}

function* watchDeleteBuyingPriceFinancialsRequest() {
  yield takeLatest(Types.DELETE_BUYING_PRICE_FINANCIALS_REQUEST, deleteBuyingPriceFinancialsRequest);
}

function* watchDeleteBundleStruckPriceRequest() {
  yield takeLatest(Types.DELETE_BUNDLE_STRUCK_PRICE_REQUEST, deleteBundleStruckPriceRequest);
}

function* watchCreateSellingPriceDiscountedFinancialsRequest() {
  yield takeLatest(Types.CREATE_SELLING_PRICE_DISCOUNTED_FINANCIALS_REQUEST, createSellingPriceDiscountedFinancialsRequest);
}
function* watchCreateSellingPriceFinancialsRequest() {
  yield takeLatest(Types.CREATE_SELLING_PRICE_FINANCIALS_REQUEST, createSellingPriceFinancialsRequest);
}
function* watchGetSupplyBrandsRequest() {
  yield takeLatest(Types.GET_SUPPLY_BRANDS_REQUEST, getSupplyBrandsRequest);
}
function* watchCreateOrUpdateSupplyLogisticInfoRequest() {
  yield takeLatest(Types.CREATE_OR_UPDATE_SUPPLY_LOGISTIC_INFO_REQUEST, createOrUpdateSupplyLogisticInfoRequest);
}
export function* watchUpdateMarketProductPricingRequest() {
  yield takeLatest(Types.UPDATE_MARKET_PRODUCT_PRICING_REQUEST, updateMarketProductPricingRequest);
}
export function* watchGetMarketProductAllPriceRequest() {
  yield takeLatest(Types.GET_MARKET_PRODUCT_ALL_PRICE_REQUEST, getMarketProductAllPriceRequest);
}
function* watchCreateBuyingPriceFinancialsRequest() {
  yield takeLatest(Types.CREATE_BUYING_PRICE_FINANCIALS_REQUEST, createBuyingPriceFinancialsRequest);
}

function* watchCreateMarketProductRequest() {
  yield takeLatest(Types.CREATE_MARKET_PRODUCT_REQUEST, createMarketProductRequest);
}

function* watchGetMarketProductByIdRequest() {
  yield takeLatest(Types.GET_MARKET_PRODUCT_BY_ID_REQUEST, getMarketProductByIdRequest);
}

function* watchUpdateMarketProductRequest() {
  yield takeLatest(Types.UPDATE_MARKET_PRODUCT_REQUEST, updateMarketProductRequest);
}

function* watchGetTransferGroupsRequest() {
  yield takeLatest(Types.GET_TRANSFER_GROUPS_REQUEST, getTransferGroupsRequest);
}

function* watchGetProductTransferGroupsByProductRequest() {
  yield takeLatest(Types.GET_PRODUCT_TRANSFER_GROUPS_BY_PRODUCT_REQUEST, getProductTransferGroupsByProductRequest);
}

function* watchUpdateTransferGroupsOfProductRequest() {
  yield takeLatest(Types.UPDATE_TRANSFER_GROUPS_OF_PRODUCT_REQUEST, updateTransferGroupsOfProductRequest);
}

function* watchCreateMarketProductImageUrlRequest() {
  const channel = yield actionChannel(Types.CREATE_MARKET_PRODUCT_IMAGE_URL_REQUEST);

  while (true) {
    const payload = yield take(channel);
    yield call(createMarketProductImageUrlRequest, payload);
  }
}

function* watchGetProductsOfSubCategoryRequest() {
  yield takeLatest(Types.GET_PRODUCTS_OF_SUB_CATEGORY_REQUEST, getProductsOfSubCategoryRequest);
}
function* watchResetProductsOfSubCategory() {
  yield takeLatest(Types.RESET_PRODUCTS_OF_SUB_CATEGORY, resetProductsOfSubCategory);
}

function* watchDeleteMarketCategoryPositionRequest() {
  yield takeLatest(Types.DELETE_MARKET_CATEGORY_POSITION_REQUEST, deleteMarketCategoryPositionRequest);
}

function* watchAddMarketCategoryPositionRequest() {
  yield takeLatest(Types.ADD_MARKET_CATEGORY_POSITION_REQUEST, addMarketCategoryPositionRequest);
}

function* watchUpdateMarketCategoryPositionRequest() {
  yield takeLatest(Types.UPDATE_MARKET_CATEGORY_POSITION_REQUEST, updateMarketCategoryPositionRequest);
}

function* watchUpdateMainCategoryRequest() {
  yield takeLatest(Types.UPDATE_MAIN_CATEGORY_REQUEST, updateMainCategoryRequest);
}

function* watchCreateMarketProductTagRequest() {
  yield takeLatest(Types.CREATE_MARKET_PRODUCT_TAG_REQUEST, createMarketProductTagRequest);
}

function* watchUpdateMarketProductTagRequest() {
  yield takeLatest(Types.UPDATE_MARKET_PRODUCT_TAG_REQUEST, updateMarketProductTagRequest);
}

function* watchDeleteMarketProductTagRequest() {
  yield takeLatest(Types.DELETE_MARKET_PRODUCT_TAG_REQUEST, deleteMarketProductTagRequest);
}

function* watchGetMarketProductTagsRequest() {
  yield takeLatest(Types.GET_MARKET_PRODUCT_TAGS_REQUEST, getMarketProductTagsRequest);
}

function* watchGetMarketProductFeedDataRequest() {
  yield takeLatest(Types.GET_MARKET_PRODUCT_FEED_DATA_REQUEST, getMarketProductFeedDataRequest);
}

function* watchGetMarketProductSlugsRequest() {
  yield takeLatest(Types.GET_MARKET_PRODUCT_SLUGS_REQUEST, getMarketProductSlugsRequest);
}

function* watchGetMarketProductBundlesDataRequest() {
  yield takeLatest(Types.GET_MARKET_PRODUCT_BUNDLES_DATA_REQUEST, getMarketProductBundlesDataRequest);
}

function* watchGetMarketProductMasterCategoriesOldRequest() {
  yield takeLatest(Types.GET_MARKET_PRODUCT_MASTER_CATEGORIES_OLD_REQUEST, getMarketProductMasterCategoriesOldRequest);
}

function* watchGetProductActivationValidationErrorsRequest() {
  yield takeLatest(Types.GET_PRODUCT_ACTIVATION_VALIDATION_ERRORS_REQUEST, getProductActivationValidationErrorsRequest);
}

function* watchActiveProductsRequest() {
  yield takeLatest(Types.ACTIVATE_PRODUCTS_REQUEST, activateProductsRequest);
}

export default function* marketProductDetailRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchCreateMarketProductRequest),
      fork(watchGetMarketProductByIdRequest),
      fork(watchUpdateMarketProductRequest),
      fork(watchGetTransferGroupsRequest),
      fork(watchGetProductTransferGroupsByProductRequest),
      fork(watchUpdateTransferGroupsOfProductRequest),
      fork(watchCreateMarketProductImageUrlRequest),
      fork(watchGetProductsOfSubCategoryRequest),
      fork(watchUpdateMarketCategoryPositionRequest),
      fork(watchDeleteMarketCategoryPositionRequest),
      fork(watchAddMarketCategoryPositionRequest),
      fork(watchUpdateMainCategoryRequest),
      fork(watchCreateMarketProductTagRequest),
      fork(watchUpdateMarketProductTagRequest),
      fork(watchDeleteMarketProductTagRequest),
      fork(watchGetMarketProductTagsRequest),
      fork(watchResetProductsOfSubCategory),
      fork(watchGetMarketProductFeedDataRequest),
      fork(watchGetMarketProductSlugsRequest),
      fork(watchGetMarketProductBundlesDataRequest),
      fork(watchGetMarketProductMasterCategoriesOldRequest),
      fork(watchGetProductActivationValidationErrorsRequest),
      fork(watchActiveProductsRequest),
      fork(setIsImperialUnitUsed),
      fork(watchCreateBuyingPriceFinancialsRequest),
      fork(watchGetMarketProductAllPriceRequest),
      fork(watchUpdateMarketProductPricingRequest),
      fork(watchGetWarehouseSegmentsRequest),
      fork(watchGetBadgesRequest),
      fork(watchUpdateBuyingPriceFinancialsRequest),
      fork(watchGetSupplyLogisticInfoRequest),
      fork(watchUpdateSupplyLogisticInfoRequest),
      fork(watchCreateSupplyLogisticInfoRequest),
      fork(watchCreateOrUpdateSupplyLogisticInfoRequest),
      fork(watchGetMasterCategoriesV2Request),
      fork(watchGetSupplyBrandsRequest),
      fork(watchCreateSellingPriceFinancialsRequest),
      fork(watchCreateSellingPriceDiscountedFinancialsRequest),
      fork(watchGetSellingPriceListRequest),
      fork(watchGetMarketProductsPriceListRequest),
      fork(watchUpdateBundleSubProductPricesRequest),
      fork(watchUpdateBundleSubProductStruckPriceRequest),
      fork(watchDeleteBundleStruckPriceRequest),
      fork(watchUpdateMarketProductPriceRequest),
      fork(watchUpdateMarketProductDiscountedPriceRequest),
      fork(watchDeleteBuyingPriceFinancialsRequest),
      fork(watchAssignFamilyToProductRequest),
      fork(watchDeleteDiscountedPriceRequest),
    ]);
    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
