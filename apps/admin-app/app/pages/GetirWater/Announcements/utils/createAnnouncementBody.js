import _ from 'lodash';
import moment from 'moment-timezone';

import { createPromoContentHTML } from '@app/pages/GetirWater/Campaigns/utils/createPromoContentHTML';
import createValidTimes from './createValidTimes';

const createAnnouncementBody = (values, componentName, isEdit = true) => {
  const validTimes = createValidTimes(values);

  const data = { id: _.get(values, 'id', undefined) };

  const areas = {
    button: {
      active: _.get(values, 'isButtonEnabled', false),
      textTr: _.get(values, 'buttonTextTr', undefined),
      textEn: _.get(values, 'buttonTextEn', undefined),
      actionType: _.get(values, 'buttonActionType', undefined),
      redirectTo: _.get(values, 'buttonRedirectTo', undefined),

    },
    banner: {
      banner: {
        priority: _.get(values, 'priority', undefined),
        picURLTr: _.get(values, 'pictureUrlTr') ? values.pictureUrlTr[0]?.response?.payload || values.pictureUrlTr[0].url : undefined,
        picURLEn: _.get(values, 'pictureUrlEn') ? values.pictureUrlEn[0]?.response?.payload || values.pictureUrlEn[0].url : undefined,
        action: {
          actionType: _.get(values, 'type', null),
          redirectType: _.get(values, 'redirectTo', null),
        },
      },
      isBannerEnabled: _.get(values, 'isBannerEnabled', undefined),
    },
    generalInfo: {
      target: _.get(values, 'target', undefined),
      priority: _.get(values, 'announcementPriority', undefined),
      titleTr: _.get(values, 'titleTr', undefined),
      titleEn: _.get(values, 'titleEn', undefined),
      descriptionTr: _.get(values, 'descriptionTr', undefined),
      descriptionEn: _.get(values, 'descriptionEn', undefined),
      accessibilityLabelTr: _.get(values, 'accessibilityLabelTr', undefined),
      accessibilityLabelEn: _.get(values, 'accessibilityLabelEn', undefined),
      promoContentHTMLEn: createPromoContentHTML(
        _.get(values, 'promoContentHTMLEn', undefined),
        _.get(values, 'promoContentSectionTitleEn', ''),
      ),
      promoContentHTMLTr: createPromoContentHTML(
        _.get(values, 'promoContentHTMLTr', undefined),
        _.get(values, 'promoContentSectionTitleTr', ''),
      ),
      promoContentSectionTitleEn: _.get(values, 'promoContentSectionTitleEn', undefined),
      promoContentSectionTitleTr: _.get(values, 'promoContentSectionTitleTr', undefined),
      promoContentURLEn: _.get(values, 'promoContentUrlEn', undefined),
      promoContentURLTr: _.get(values, 'promoContentUrlTr', undefined),
      promoPageTitleEn: _.get(values, 'promoPageTitleEn', undefined),
      promoPageTitleTr: _.get(values, 'promoPageTitleTr', undefined),
    },
    filter: {
      maxNumberOfPreviousG10Order: _.get(values, 'g10CountMax', undefined),
      minNumberOfPreviousG10Order: _.get(values, 'g10CountMin', undefined),
      maxNumberOfPreviousGWaterMPOrder: _.get(values, 'gsuCountMax', undefined),
      minNumberOfPreviousGWaterMPOrder: _.get(values, 'gsuCountMin', undefined),
      platforms: _.get(values, 'platformType', undefined),
      brandIds: _.get(values, 'brandIdList', undefined),
      vendorIds: _.get(values, 'vendorIds', undefined),
      cityIds: _.get(values, 'cityIdList', undefined),
      isExceptForField: _.get(values, 'excludeFieldStaff', undefined),
      isExceptForWhiteColors: _.get(values, 'excludeWhiteCollar', undefined),
    },
    dateInfo: {
      validFrom: moment(_.get(values, 'startDate', moment())).format(),
      validUntil: moment(_.get(values, 'endDate', moment())).format(),
    },
    picPreview: {
      picURLTr: _.get(values, 'picturePreviewURLTr')
        ? values.picturePreviewURLTr[0]?.response?.payload || values.picturePreviewURLTr[0].url
        : undefined,
      picURLEn: _.get(values, 'picturePreviewURLEn')
        ? values.picturePreviewURLEn[0]?.response?.payload || values.picturePreviewURLEn[0].url
        : undefined,
    },
    validTimes,
  };

  if (isEdit) {
    return { ...data, ...areas[componentName] };
  }

  return {
    ...data,
    button: areas.button,
    banner: areas.banner.banner,
    isBannerEnabled: areas.banner.isBannerEnabled,
    ...areas.picPreview,
    ...areas.generalInfo,
    ...areas.filter,
    ...areas.dateInfo,
    validTimeList: areas.validTimes,
  };
};

export default createAnnouncementBody;
