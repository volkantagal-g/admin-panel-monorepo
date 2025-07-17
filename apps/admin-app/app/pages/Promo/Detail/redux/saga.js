import { all, call, cancel, delay, fork, put, select, take, takeLatest } from 'redux-saga/effects';
import moment from 'moment';
import { get } from 'lodash';

import {
  getChildPromos,
  getFilteredBadges,
  getMarketProducts,
  getMarketProductsByIds,
  getPromoById,
  getResponsibleDepartments,
  getSegmentClientCounts,
  getUploadSignedUrl,
  updateBenefitSAPBulk,
  updateBenefitType,
  updateBulkPromos,
  updateClassification,
  updateClientSegment,
  updateConditionProducts,
  updateExcludedProducts,
  updateFinancialCondition,
  updateGeneralInfo,
  updateP3Status,
  updatePromoBadge,
  updatePromoButtonAction,
  updatePromoContent,
  updatePromoHTML,
  updatePromoImage,
  updatePromoSegmentTypes,
  updateUserFiltering,
  updateWorkingHours,
} from '@shared/api/promo';

import {
  deleteP3,
  downloadP3SegmentClients,
  generateP3Segment,
  getP3SegmentCounts,
  getP3SegmentGenerationDetails,
} from '@shared/api/aiContentGeneration';

import { Creators, Types } from './actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { uploadToS3 } from '@shared/api/upload';
import {
  CLIENT_SEGMENT_EVERYONE,
  CLIENT_SEGMENT_SUCCESSFUL_ORDER,
  UPDATE_SIGNED_URL_PARAMS,
} from '@app/pages/Promo/constantValues';
import { getPromoHTML } from '../components/PromoUrlForm/formHelper';
import { getSignedUploadUrl as getSignedUploadUrlToSegmentApi } from '@shared/api/segments';
import { getArtisanVerticals } from '@shared/api/marketing';
import { downloadDataAsCSV } from '@shared/utils/common';
import { getBenefitItemsSAPData, SAP_CSV_COLUMNS } from '@app/pages/Promo/Detail/components/BenefitTypeSAP/formHelper';
import { t } from '@shared/i18n';
import { PromoDetailSlice } from '@app/pages/Promo/Detail/redux/slice';
import { getSelectedCountryV2, selectSelectedCountryLanguages } from '@shared/redux/selectors/countrySelection';
import { isArraysEqual } from '@app/pages/Promo/Detail/utils';

function* getPromoByIdRequest({ id }) {
  try {
    const data = yield call(getPromoById, { id });
    yield put(Creators.getPromoByIdSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getPromoByIdFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* getMarketProductsByIdsRequest({ productIds, fields }) {
  try {
    const data = yield call(getMarketProductsByIds, { productIds, fields });
    yield put(Creators.getMarketProductsByIdsSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getMarketProductsByIdsFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* getPromoBadgesRequest({ promoMechanic }) {
  try {
    const data = yield call(getFilteredBadges, { promoMechanic });
    yield put(Creators.getPromoBadgesSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getPromoBadgesFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* updateGeneralInfoRequest({ body }) {
  try {
    const id = yield select(PromoDetailSlice.selectors.promoId);
    const domainTypes = yield select(PromoDetailSlice.selectors.domainTypes);
    const warehouses = yield select(PromoDetailSlice.selectors.warehouses);
    const isP3Enabled = yield select(PromoDetailSlice.selectors.p3Enabled);
    const { timezones: [{ timezone }] } = yield select(getSelectedCountryV2);
    const validFrom = moment.tz(body.validFrom, timezone).valueOf();
    const validUntil = moment.tz(body.validUntil, timezone).valueOf();
    const payload = {
      ...body,
      promoCode: body.promoCode?.trim(),
      validFrom,
      validUntil,
    };
    yield call(updateGeneralInfo, { id, body: payload });
    yield put(Creators.updateGeneralInfoSuccess());
    yield put(PromoDetailSlice.actions.updatePromoPartial(payload));
    if ((!isArraysEqual(domainTypes, body.domainTypes) || !isArraysEqual(warehouses, body.warehouses)) && isP3Enabled) {
      yield put(ToastCreators.pending({
        message: t('SEGMENT.REGENERATE_MANUALLY'),
        toastOptions: { autoClose: false },
      }));
    }
    yield put(ToastCreators.success());
  }
  catch (error) {
    const errorTranslationKey = error?.response?.data?.message;
    const errorMessage = errorTranslationKey ? t(`promoPage:MESSAGE.${errorTranslationKey}`) : null;
    yield put(Creators.updateGeneralInfoFailure());
    yield put(ToastCreators.error({ message: errorMessage, ...(!errorMessage && { error }) }));
  }
}

function* updateClientSegmentRequest({ id, body }) {
  const {
    isP3Enabled, p3Objective, regenerate, isFirstTime, shouldDelete,
    ownProducts, targetedProducts, ownBrands, targetedBrands, subcategories, ...restBody
  } = body;
  try {
    const data = yield call(updateClientSegment, { id, body: restBody });
    yield put(Creators.updateClientSegmentSuccess({ data }));
    yield put(Creators.updateP3StatusRequest({ id, body: { isP3Enabled } }));

    const isInitialGeneration = isP3Enabled && isFirstTime;
    const isRegeneration = isP3Enabled && regenerate;
    if (isInitialGeneration || isRegeneration) {
      yield put(Creators.generateP3SegmentRequest({
        id,
        p3Objective,
        regenerate,
        ownProducts,
        targetedProducts,
        ownBrands,
        targetedBrands,
        subcategories,
      }));
    }
    if (shouldDelete) {
      yield put(Creators.deleteP3Request({ id }));
    }
    yield put(PromoDetailSlice.actions.getPromoByIdRequest({ id }));
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(Creators.updateClientSegmentFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* updateP3StatusRequest({ id, body }) {
  try {
    const data = yield call(updateP3Status, { id, body });
    yield put(Creators.updateP3StatusSuccess({ data }));
    yield put(PromoDetailSlice.actions.getPromoByIdRequest({ id }));
  }
  catch (error) {
    yield put(Creators.updateP3StatusFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* getP3DetailsRequest({ id }) {
  try {
    const data = yield call(getP3SegmentGenerationDetails, { id });
    yield put(Creators.getP3DetailsSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getP3DetailsFailure());
    yield put(ToastCreators.error({ error }));
  }
}

function* downloadP3SegmentClientsRequest({ id }) {
  try {
    const { data } = yield call(downloadP3SegmentClients, { id });
    yield put(Creators.downloadP3SegmentClientsSuccess({ data }));
    if (data.message) {
      return;
    }
    const link = document.createElement('a');
    link.href = data.fileLink;
    link.setAttribute('download', 'CSV export');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  catch (error) {
    yield put(Creators.downloadP3SegmentClientsFailure());
    yield put(ToastCreators.error({ error }));
  }
}

function* generateP3SegmentRequest({
  id,
  p3Objective,
  regenerate,
  ownProducts,
  targetedProducts,
  ownBrands,
  targetedBrands,
  subcategories,
}) {
  try {
    const data = yield call(generateP3Segment, {
      id,
      p3Objective,
      regenerate,
      ownProducts,
      targetedProducts,
      ownBrands,
      targetedBrands,
      subcategories,
    });
    yield put(Creators.generateP3SegmentSuccess({ data }));
    yield put(Creators.getP3DetailsRequest({ id }));
  }
  catch (error) {
    yield put(Creators.generateP3SegmentFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* deleteP3Request({ id }) {
  try {
    const data = yield call(deleteP3, { id });
    yield put(Creators.deleteP3Success({ data }));
    yield put(Creators.getP3DetailsRequest({ id }));
  }
  catch (error) {
    yield put(Creators.deleteP3Failure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* updateFinancialConditionRequest({ body }) {
  try {
    const id = yield select(PromoDetailSlice.selectors.promoId);
    const data = yield call(updateFinancialCondition, { id, body });
    yield put(Creators.updateFinancialConditionSuccess({ data }));
    yield put(PromoDetailSlice.actions.getPromoByIdRequest({ id }));
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(Creators.updateFinancialConditionFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* updateBenefitTypeRequest({ body }) {
  try {
    const { _id: id, isP3Enabled } = yield select(PromoDetailSlice.selectors.promo);
    const data = yield call(updateBenefitType, { id, body });
    yield put(Creators.updateBenefitTypeSuccess({ data }));
    yield put(PromoDetailSlice.actions.getPromoByIdRequest({ id }));
    if (isP3Enabled) {
      yield put(ToastCreators.pending({
        message: t('SEGMENT.REGENERATE_MANUALLY'),
        toastOptions: { autoClose: false },
      }));
    }
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(Creators.updateBenefitTypeFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* updateBenefitSAPBulkRequest({ body }) {
  try {
    const id = yield select(PromoDetailSlice.selectors.promoId);
    const data = yield call(updateBenefitSAPBulk, { id, body });
    yield put(Creators.updateBenefitSAPBulkSuccess({ data }));
    yield put(PromoDetailSlice.actions.getPromoByIdRequest({ id }));
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(Creators.updateBenefitSAPBulkFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* updatePromoSegmentTypesRequest({ id, body }) {
  try {
    const { loadedFile, loadedBase64File, segmentTypes } = body;
    const { url: signedUrl, fileKey } = yield call(getSignedUploadUrlToSegmentApi, {
      fileName: `${id}_${moment().valueOf()}`,
      contentType: loadedFile.type,
      folderPath: 'clientLists',
    });
    yield call(uploadToS3, { signedUrl, data: loadedBase64File });
    const segmentBody = {
      awsPath: fileKey.replace('clientList/', ''),
      segmentTypes,
    };
    const data = yield call(updatePromoSegmentTypes, {
      id,
      body: segmentBody,
    });
    // adding a delay of 1000 to get updated value from backend after completing the async process using rabbitMQ
    yield delay(1000);
    yield put(PromoDetailSlice.actions.getPromoByIdRequest({ id }));
    yield put(Creators.updatePromoSegmentTypesSuccess({ data }));
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(Creators.updatePromoSegmentTypesFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* updateWorkingHoursRequest({ id, body }) {
  try {
    const data = yield call(updateWorkingHours, { id, body });
    yield put(Creators.updateWorkingHoursSuccess({ data }));
    yield put(PromoDetailSlice.actions.getPromoByIdRequest({ id }));
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(Creators.updateWorkingHoursFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* updatePromoButtonActionRequest({ body }) {
  try {
    const id = yield select(PromoDetailSlice.selectors.promoId);
    const data = yield call(updatePromoButtonAction, { id, body });
    yield put(Creators.updatePromoButtonActionSuccess({ data }));
    yield put(PromoDetailSlice.actions.getPromoByIdRequest({ id }));
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(Creators.updatePromoButtonActionFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* updateConditionProductsRequest({ body }) {
  try {
    const id = yield select(PromoDetailSlice.selectors.promoId);
    const data = yield call(updateConditionProducts, { id, body });
    yield put(Creators.updateConditionProductsSuccess({ data }));
    yield put(PromoDetailSlice.actions.getPromoByIdRequest({ id }));
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(Creators.updateConditionProductsFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* updateExcludedProductsRequest({ body }) {
  try {
    const id = yield select(PromoDetailSlice.selectors.promoId);
    const data = yield call(updateExcludedProducts, { id, body });
    yield put(Creators.updateExcludedProductsSuccess({ data }));
    yield put(PromoDetailSlice.actions.getPromoByIdRequest({ id }));
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(Creators.updateExcludedProductsFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* updateUserFilteringRequest({ id, body }) {
  try {
    const data = yield call(updateUserFiltering, { id, body });
    yield put(Creators.updateUserFilteringSuccess({ data }));
    yield put(PromoDetailSlice.actions.getPromoByIdRequest({ id }));
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(Creators.updateUserFilteringFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* updateClassificationRequest({ body }) {
  try {
    const id = yield select(PromoDetailSlice.selectors.promoId);
    const data = yield call(updateClassification, { id, body });
    yield put(Creators.updateClassificationSuccess({ data }));
    yield put(PromoDetailSlice.actions.getPromoByIdRequest({ id }));
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(Creators.updateClassificationFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* generatePromoHTML({
  promo,
  contentHTML,
  isBodyContentURL,
  contentType,
  folderPath,
  bucketName,
  fieldName,
  id,
  fetchPromo,
}) {
  let promoContentURLs = {};
  let promoContentHTMLs = {};
  let promoBodyContentHTMLs = {};
  let promoBodyContentURLs = {};
  let promoURLs = promo?.promoURL || {};

  // eslint-disable-next-line no-restricted-syntax
  for (const [langKey, html] of Object.entries(contentHTML)) {
    const fileName = `${id}_${langKey}`;
    let promoHTML = getPromoHTML(html, langKey);
    if (isBodyContentURL) {
      promoHTML = getPromoHTML(html, langKey);
    }
    const { url: signedUrl, cdnUrl } = yield call(getUploadSignedUrl, {
      contentType,
      fileName,
      folderPath,
      bucketName,
    });
    let promoBody = {};
    yield call(uploadToS3, { signedUrl, data: promoHTML?.data });
    switch (fieldName) {
      case 'promoContentHTML':
        if (isBodyContentURL) {
          promoBodyContentURLs = { ...promoBodyContentURLs, [langKey]: cdnUrl };
          promoBody = { promoBodyContentURL: promoBodyContentURLs };
        }
        else {
          promoContentURLs = { ...promoContentURLs, [langKey]: cdnUrl };
          promoContentHTMLs = { ...promoContentHTMLs, [langKey]: promoHTML?.htmlContent };
          promoBodyContentHTMLs = { ...promoBodyContentHTMLs, [langKey]: html };
          promoBody = {
            promoContentHTML: promoContentHTMLs,
            promoContentURL: promoContentURLs,
            promoBodyContentHTML: promoBodyContentHTMLs,
          };
        }
        break;
      case 'promoHTML':
        promoURLs = { ...promoURLs, [langKey]: cdnUrl };
        promoBody = { promoURL: promoURLs };
        break;
      default:
        break;
    }
    yield call(updatePromoHTML, {
      id,
      body: promoBody,
    });
  }
  if (fetchPromo) {
    yield put(Creators.updatePromoHTMLSuccess());
    yield put(PromoDetailSlice.actions.getPromoByIdRequest({ id }));
    yield put(ToastCreators.success());
  }
}

function* updatePromoHTMLRequest({ id, body }) {
  try {
    const {
      field,
      folderPath,
      contentType,
      bucketName,
      values,
      promo,
      isBodyContentURL = false,
    } = body;

    const { applyToV2 } = values;
    const contentHTML = values[field];

    yield* generatePromoHTML({
      promo,
      contentHTML,
      isBodyContentURL,
      contentType,
      folderPath,
      bucketName,
      fieldName: field,
      id,
      fetchPromo: !applyToV2,
    });

    if (applyToV2) {
      yield* generatePromoHTML({
        promo,
        contentHTML,
        isBodyContentURL,
        contentType,
        folderPath,
        bucketName,
        fieldName: 'promoContentHTML',
        id,
        fetchPromo: applyToV2,
      });
    }
  }
  catch (error) {
    yield put(Creators.updatePromoHTMLFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* getResponsibleDepartmentsRequest({ id }) {
  try {
    const data = yield call(getResponsibleDepartments, { id });
    yield put(Creators.getResponsibleDepartmentsSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getResponsibleDepartmentsFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* updatePromoContentRequest({ id, body }) {
  try {
    const data = yield call(updatePromoContent, { id, body });
    yield put(Creators.updatePromoContentSuccess({ data }));
    yield put(PromoDetailSlice.actions.getPromoByIdRequest({ id }));
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(Creators.updatePromoContentFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* updatePromoBadgeRequest({ id, body }) {
  try {
    const data = yield call(updatePromoBadge, { id, body });
    yield put(Creators.updatePromoBadgeSuccess({ data }));
    yield put(PromoDetailSlice.actions.getPromoByIdRequest({ id }));
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(Creators.updatePromoBadgeFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* getSegmentClientCountsRequest({ body }) {
  try {
    const { included, excluded, isP3Enabled } = body;
    let includedSegments;
    let excludedSegments;

    if (included.includes(CLIENT_SEGMENT_EVERYONE)) {
      includedSegments = { count: 'ALL' };
    }
    else if (included.includes(CLIENT_SEGMENT_SUCCESSFUL_ORDER)) {
      includedSegments = { count: 'SUC_CLIENTS' };
    }
    else if (isP3Enabled) {
      includedSegments = yield call(getP3SegmentCounts, { id: body.id });
    }
    else {
      includedSegments = yield call(getSegmentClientCounts, { segments: included });
    }

    if (excluded.includes(CLIENT_SEGMENT_EVERYONE)) {
      excludedSegments = { count: 'ALL' };
    }
    else if (excluded.includes(CLIENT_SEGMENT_SUCCESSFUL_ORDER)) {
      excludedSegments = { count: 'SUC_CLIENTS' };
    }
    else {
      excludedSegments = yield call(getSegmentClientCounts, { segments: excluded });
    }
    yield put(Creators.getSegmentClientCountsSuccess({ data: { includedSegments, excludedSegments } }));
  }
  catch (error) {
    yield put(Creators.getSegmentClientCountsFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* getArtisanVerticalsRequest() {
  try {
    const data = yield call(getArtisanVerticals);
    yield put(Creators.getArtisanVerticalsSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getArtisanVerticalsFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* getChildPromosRequest({
  limit,
  page,
  isBenefitSAP,
}) {
  try {
    const parentId = yield select(PromoDetailSlice.selectors.promoId);
    const data = yield call(getChildPromos, {
      parentId,
      limit,
      page,
    });
    if (isBenefitSAP) {
      yield put(Creators.getBenefitSAPPromosSuccess({ data }));
      yield call(downloadDataAsCSV, { data: getBenefitItemsSAPData(data), columns: SAP_CSV_COLUMNS });
    }
    else {
      yield put(Creators.getChildPromosSuccess({ data }));
    }
  }
  catch (error) {
    yield put(Creators.getChildPromosFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* updateBulkPromosRequest({ body }) {
  try {
    const data = yield call(updateBulkPromos, { body });
    yield put(Creators.updateBulkPromosSuccess({ data }));
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(Creators.updateBulkPromosFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* getMarketProductsRequest({ body }) {
  try {
    const data = yield call(getMarketProducts, { body });
    yield put(Creators.getMarketProductsSuccess({ data }));
  }
  catch (error) {
    yield put(Creators.getMarketProductsFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* uploadPromoImageRequest({
  loadedImage,
  contentType,
  imagePath,
  isAppliedToOtherLanguages,
}) {
  try {
    const promo = yield select(PromoDetailSlice.selectors.promo);
    const { _id: id } = promo;
    const fileName = `${id}_${imagePath.join('_')}`;
    const { url: signedUrl, cdnUrl } = yield call(
      getUploadSignedUrl,
      {
        contentType,
        fileName,
        folderPath: UPDATE_SIGNED_URL_PARAMS.folder,
        bucketName: UPDATE_SIGNED_URL_PARAMS.bucket,
      },
    );
    yield call(uploadToS3, { signedUrl, data: loadedImage });
    const path = imagePath.slice(0, -1).join('.');
    const language = imagePath[imagePath.length - 1];
    const countryLanguages = yield select(selectSelectedCountryLanguages);
    const languagePayload = Object.fromEntries(countryLanguages.map(lang => {
      const shouldUseNewUrl = lang === language || isAppliedToOtherLanguages;
      return [lang, shouldUseNewUrl ? cdnUrl : get(promo, [path, lang])];
    }));
    const body = { [imagePath.at(0)]: languagePayload };
    yield call(updatePromoImage, { id, body });
    yield put(PromoDetailSlice.actions.updatePromoPartial({ [path]: languagePayload }));
    yield put(Creators.uploadPromoImageSuccess());
    yield put(ToastCreators.success());
  }
  catch (error) {
    yield put(Creators.uploadPromoImageFailure({ error }));
    yield put(ToastCreators.error({ error }));
  }
}

function* watchGetPromoByIdRequest() {
  yield takeLatest(Types.GET_PROMO_BY_ID_REQUEST, getPromoByIdRequest);
}

function* watchGetPromoBadgesRequest() {
  yield takeLatest(Types.GET_PROMO_BADGES_REQUEST, getPromoBadgesRequest);
}

function* watchUpdateGeneralInfoRequest() {
  yield takeLatest(Types.UPDATE_GENERAL_INFO_REQUEST, updateGeneralInfoRequest);
}

function* watchUpdateClientSegmentRequest() {
  yield takeLatest(Types.UPDATE_CLIENT_SEGMENT_REQUEST, updateClientSegmentRequest);
}

function* watchUpdateP3StatusRequest() {
  yield takeLatest(Types.UPDATE_P3_STATUS_REQUEST, updateP3StatusRequest);
}

function* watchGetP3DetailsRequest() {
  yield takeLatest(Types.GET_P3_DETAILS_REQUEST, getP3DetailsRequest);
}

function* watchDownloadP3SegmentClientsRequest() {
  yield takeLatest(Types.DOWNLOAD_P3_SEGMENT_CLIENTS_REQUEST, downloadP3SegmentClientsRequest);
}

function* watchGenerateP3SegmentRequest() {
  yield takeLatest(Types.GENERATE_P3_SEGMENT_REQUEST, generateP3SegmentRequest);
}

function* watchDeleteP3Request() {
  yield takeLatest(Types.DELETE_P3_REQUEST, deleteP3Request);
}

function* watchUpdateFinancialConditionRequest() {
  yield takeLatest(Types.UPDATE_FINANCIAL_CONDITION_REQUEST, updateFinancialConditionRequest);
}

function* watchUpdateBenefitTypeRequest() {
  yield takeLatest(Types.UPDATE_BENEFIT_TYPE_REQUEST, updateBenefitTypeRequest);
}

function* watchUpdateBenefitSAPBulkRequest() {
  yield takeLatest(Types.UPDATE_BENEFIT_SAP_BULK_REQUEST, updateBenefitSAPBulkRequest);
}

function* watchUpdatePromoButtonActionRequest() {
  yield takeLatest(Types.UPDATE_PROMO_BUTTON_ACTION_REQUEST, updatePromoButtonActionRequest);
}

function* watchUpdatePromoSegmentTypesRequest() {
  yield takeLatest(Types.UPDATE_PROMO_SEGMENT_TYPES_REQUEST, updatePromoSegmentTypesRequest);
}

function* watchUpdateWorkingHoursRequest() {
  yield takeLatest(Types.UPDATE_WORKING_HOURS_REQUEST, updateWorkingHoursRequest);
}

function* watchUpdatePromoHTMLRequest() {
  yield takeLatest(Types.UPDATE_PROMO_HTML_REQUEST, updatePromoHTMLRequest);
}

function* watchUpdateUserFilteringRequest() {
  yield takeLatest(Types.UPDATE_USER_FILTERING_REQUEST, updateUserFilteringRequest);
}

function* watchGetResponsibleDepartmentsRequest() {
  yield takeLatest(Types.GET_RESPONSIBLE_DEPARTMENTS_REQUEST, getResponsibleDepartmentsRequest);
}

function* watchUpdateClassificationRequest() {
  yield takeLatest(
    Types.UPDATE_CLASSIFICATION_REQUEST,
    updateClassificationRequest,
  );
}

function* watchGetArtisanVerticalsRequest() {
  yield takeLatest(Types.GET_ARTISAN_VERTICALS_REQUEST, getArtisanVerticalsRequest);
}

function* watchGetChildPromosRequest() {
  yield takeLatest(Types.GET_CHILD_PROMOS_REQUEST, getChildPromosRequest);
}

function* watchGetMarketProductsRequest() {
  yield takeLatest(Types.GET_MARKET_PRODUCTS_REQUEST, getMarketProductsRequest);
}

function* watchUpdatePromoContentRequest() {
  yield takeLatest(Types.UPDATE_PROMO_CONTENT_REQUEST, updatePromoContentRequest);
}

function* watchUpdatePromoBadgeRequest() {
  yield takeLatest(Types.UPDATE_PROMO_BADGE_REQUEST, updatePromoBadgeRequest);
}

function* watchGetSegmentClientCountsRequest() {
  yield takeLatest(Types.GET_SEGMENT_CLIENT_COUNTS_REQUEST, getSegmentClientCountsRequest);
}

function* watchUpdateConditionProductsRequest() {
  yield takeLatest(Types.UPDATE_CONDITION_PRODUCTS_REQUEST, updateConditionProductsRequest);
}

function* watchUpdateExcludedProductsRequest() {
  yield takeLatest(Types.UPDATE_EXCLUDED_PRODUCTS_REQUEST, updateExcludedProductsRequest);
}

function* watchUpdateBulkPromosRequest() {
  yield takeLatest(Types.UPDATE_BULK_PROMOS_REQUEST, updateBulkPromosRequest);
}

function* watchGetMarketProductsByIdsRequest() {
  yield takeLatest(Types.GET_MARKET_PRODUCTS_BY_IDS_REQUEST, getMarketProductsByIdsRequest);
}

function* watchUploadPromoImageRequest() {
  yield takeLatest(Types.UPLOAD_PROMO_IMAGE_REQUEST, uploadPromoImageRequest);
}

export default function* promoDetailRoot() {
  while (yield take(Types.INIT_PAGE)) {
    const backgroundTasks = yield all([
      fork(watchGetPromoByIdRequest),
      fork(watchUpdateGeneralInfoRequest),
      fork(watchUpdateClassificationRequest),
      fork(watchGetResponsibleDepartmentsRequest),
      fork(watchUpdatePromoContentRequest),
      fork(watchUpdatePromoBadgeRequest),
      fork(watchGetArtisanVerticalsRequest),
      fork(watchGetChildPromosRequest),
      fork(watchUpdatePromoHTMLRequest),
      fork(watchGetMarketProductsRequest),
      fork(watchUpdateBulkPromosRequest),
      fork(watchGetMarketProductsByIdsRequest),
      fork(watchUploadPromoImageRequest),
      fork(watchGetPromoBadgesRequest),
      fork(watchUpdateUserFilteringRequest),
      fork(watchUpdateConditionProductsRequest),
      fork(watchUpdateExcludedProductsRequest),
      fork(watchUpdateBenefitTypeRequest),
      fork(watchUpdateBenefitSAPBulkRequest),
      fork(watchUpdateFinancialConditionRequest),
      fork(watchUpdateWorkingHoursRequest),
      fork(watchUpdateClientSegmentRequest),
      fork(watchUpdateP3StatusRequest),
      fork(watchGetP3DetailsRequest),
      fork(watchDownloadP3SegmentClientsRequest),
      fork(watchGenerateP3SegmentRequest),
      fork(watchDeleteP3Request),
      fork(watchGetSegmentClientCountsRequest),
      fork(watchUpdatePromoSegmentTypesRequest),
      fork(watchUpdatePromoButtonActionRequest),
    ]);

    yield take(Types.DESTROY_PAGE);
    yield cancel(backgroundTasks);
  }
}
