import { getLangKey, t } from '@shared/i18n';
import { promoSegmentTypes } from '@app/pages/Promo/constantValues';

export const getInitialValues = () => {
  const initialValues = { segmentTypes: [] };
  return initialValues;
};

export const getOnlyModifiedValuesBeforeSubmit = ({ values, loadedFile, loadedBase64File }) => {
  const segmentTypes = values?.segmentTypes?.map(segmentType => {
    return segmentType.value || segmentType;
  });
  return { segmentTypes, loadedFile, loadedBase64File };
};

export const validate = ({ values, clientIds }) => {
  const { segmentTypes } = values;
  if (!segmentTypes.length) {
    throw new Error(t('promoPage:SEGMENT_TYPES.ERRORS.ERR_EMPTY_SEGMENT_TYPES'));
  }
  if (!clientIds.length) {
    throw new Error(t('promoPage:SEGMENT_TYPES.ERRORS.ERR_EMPTY_CSV_FILE'));
  }
};

export const getSegmentTypesOptions = () => {
  return Object.entries(promoSegmentTypes).map(([key, value]) => {
    return {
      value: +key,
      label: value[getLangKey()],
    };
  });
};
