import { get } from 'lodash';
import moment from 'moment-timezone';

import { ALL_OPTION, distributionRates, distributionTypes } from '../constants';
import { createPromoContentHTML } from './createPromoContentHTML';

const createCampaignBody = (values, availableTimes, componentName, isEdit = true) => {
  const data = { id: get(values, 'id', undefined) };
  const distributionType = get(values, 'distributionTypes', '');
  const areas = {
    banner: {
      banner: {
        priority: get(values, 'bannerPriority', undefined),
        picURLTr: get(values, 'bannerPictureUrlTr')
          ? values.bannerPictureUrlTr[0]?.response?.payload || values.bannerPictureUrlTr[0].url
          : undefined,
        picURLEn: get(values, 'bannerPictureUrlEn')
          ? values.bannerPictureUrlEn[0]?.response?.payload || values.bannerPictureUrlEn[0].url
          : undefined,
        action: {
          actionType: get(values, 'bannerActionType', undefined),
          redirectType: get(values, 'bannerRedirectTo', undefined),
        },
      },
      bannerEnabled: get(values, 'isBannerEnabled', undefined),
    },
    button: {
      button: {
        actionType: get(values, 'buttonActionType', undefined),
        active: get(values, 'isButtonEnabled', undefined),
        redirectTo: get(values, 'buttonActionRedirectTo', undefined),
        textEn: get(values, 'buttonActionTextEn', undefined),
        textTr: get(values, 'buttonActionTextTr', undefined),
      },
    },
    promoDetail: {
      products: get(values, 'products')
        ? values.products.map(product => ({ productId: product.value, productName: product.label }))
        : undefined,
      excludeProducts: get(values, 'excludeProducts')
        ? values.excludeProducts.map(product => ({ productId: product.value, productName: product.label }))
        : undefined,
      maxItemCount: get(values, 'maxItemCount', undefined),
      discountTotalAmount: get(values, 'discountTotalAmount', undefined),
      maxOrderAmount: get(values, 'maxOrderAmount', undefined),
      minOrderAmount: get(values, 'minOrderAmount', undefined),
      totalUsageLimit: get(values, 'totalUsageLimit', undefined),
      dailyUsageLimit: get(values, 'dailyUsageLimit', undefined),
    },
    generalInfo: {
      promoTarget: get(values, 'target', undefined),
      costDistribution: {
        GETIR_WATER: distributionType === distributionTypes.GETIR_WATER.value ? distributionRates.MAX_VALUE :
          +get(values, 'getirWaterPercentage', distributionRates.MIN_VALUE),
        VENDOR: distributionType === distributionTypes.VENDOR.value ? distributionRates.MAX_VALUE :
          +get(values, 'vendorPercentage', distributionRates.MIN_VALUE),
        FIRM: distributionType === distributionTypes.FIRM.value ? distributionRates.MAX_VALUE :
          +get(values, 'firmPercentage', distributionRates.MIN_VALUE),
      },
      promoType: get(values, 'promoType', undefined),
      promoCode: get(values, 'code', undefined),
      maxOrderCount: get(values, 'maxOrderCount', undefined),
      priority: get(values, 'campaignPriority', undefined),
      color: get(values, 'color', undefined),
      titleTr: get(values, 'titleTr', undefined),
      titleEn: get(values, 'titleEn', undefined),
      descriptionTr: get(values, 'descriptionTr', undefined),
      descriptionEn: get(values, 'descriptionEn', undefined),
      accessibilityLabelTr: get(values, 'accessibilityLabelTr', undefined),
      accessibilityLabelEn: get(values, 'accessibilityLabelEn', undefined),
      picURLTr: get(values, 'pictureUrlTR') ? values.pictureUrlTR[0]?.response?.payload || values.pictureUrlTR[0].url : undefined,
      picURLEn: get(values, 'pictureUrlEN') ? values.pictureUrlEN[0]?.response?.payload || values.pictureUrlEN[0].url : undefined,
      thumbnailURLTr: get(values, 'thumbnailUrlTR')
        ? values.thumbnailUrlTR[0]?.response?.payload || values.thumbnailUrlTR[0].url
        : undefined,
      thumbnailURLEn: get(values, 'thumbnailUrlEN')
        ? values.thumbnailUrlEN[0]?.response?.payload || values.thumbnailUrlEN[0].url
        : undefined,
      promoURLEn: get(values, 'promoUrlEn', undefined),
      promoURLTr: get(values, 'promoUrlTr', undefined),

      promoContentHTMLEn: createPromoContentHTML(
        get(values, 'promoContentHTMLEn', undefined),
        get(values, 'promoContentSectionTitleEn', ''),
      ),
      promoContentHTMLTr: createPromoContentHTML(
        get(values, 'promoContentHTMLTr', undefined),
        get(values, 'promoContentSectionTitleTr', ''),
      ),
      promoContentSectionTitleEn: get(values, 'promoContentSectionTitleEn', undefined),
      promoContentSectionTitleTr: get(values, 'promoContentSectionTitleTr', undefined),
      promoContentURLEn: get(values, 'promoContentUrlEn', undefined),
      promoContentURLTr: get(values, 'promoContentUrlTr', undefined),
      promoPageTitleEn: get(values, 'promoPageTitleEn', undefined),
      promoPageTitleTr: get(values, 'promoPageTitleTr', undefined),
      affectedSegments: get(values, 'affectedSegments') ? values.affectedSegments.map(segment => Number(segment)) : undefined,
    },
    filter: {
      brandIds: get(values, 'brandIds', undefined),
      cityIds: get(values, 'cityIds', undefined),
      vendorIds: get(values, 'vendorIds', undefined),
      minNumberOfPreviousGWaterMPOrder: get(values, 'minNumberOfPreviousGWaterMPOrder', undefined),
      maxNumberOfPreviousGWaterMPOrder: get(values, 'maxNumberOfPreviousGWaterMPOrder', undefined),
      paymentMethods: get(values, 'paymentMethods', undefined),
      exceptForPromotionAbuses: get(values, 'exceptForPromotionAbusives', null),
      includedSegments: get(values, 'includeSegments') ? values.includeSegments.map(segment => Number(segment)) : undefined,
      excludedSegments: get(values, 'excludeSegments') ? values.excludeSegments.map(segment => Number(segment)) : undefined,
      platforms: get(values, 'platforms', undefined),
      showOnlyLocalNumbers: get(values, 'isShowOnlyLocalNumbers', undefined),
      isForAllBrands: get(values, 'brandIds', []).some(value => value === ALL_OPTION),
    },
    dateInfo: {
      validFrom: moment(get(values, 'startDate', moment())).format(),
      validUntil: moment(get(values, 'endDate', moment())).format(),
    },
    availableTimes,
  };

  if (isEdit) {
    return { ...data, ...areas[componentName] };
  }

  return {
    ...data,
    banner: areas.banner.banner,
    button: areas.button.button,
    isBannerEnabled: areas.banner.bannerEnabled,
    isShowOnlyLocalNumbers: areas.filter.showOnlyLocalNumbers,
    exceptForPromotionAbusives: areas.filter.exceptForPromotionAbuses,
    ...areas.promoDetail,
    ...areas.generalInfo,
    ...areas.filter,
    ...areas.dateInfo,
    availableTimes: areas.availableTimes,
  };
};

export default createCampaignBody;
