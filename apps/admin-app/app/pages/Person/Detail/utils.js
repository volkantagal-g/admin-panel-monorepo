import { get } from 'lodash';
import { Tag, message } from 'antd';
import Resizer from 'react-image-file-resizer';

import { getLangKey } from '@shared/i18n';
import { EMPLOYMENT_TYPES, YES_NO_OPTIONS } from '@shared/shared/constantValues';
import { convertConstantValuesToSelectOptions, convertSelectOptions } from '@shared/utils/common';
import { DEFAULT_MAP_COORDINATES, DEFAULT_MAP_ZOOM } from '@shared/shared/constants';
import {
  ACTIVENESS_TAG_PROPERTY,
  DEFAULT_RESIZER_VALUS,
  COURIER_DISABLE_LOGIN_REASONS,
  UPLOADABLE_AVATAR_FORMATS,
  COURIER_LOGIN_REASON,
  PERSON_TRAINING_TYPES,
} from './constants';

export const convertedYesOrNoOptions = convertSelectOptions(YES_NO_OPTIONS, {
  labelKey: 'label',
  valueKey: 'value',
  hasTranslationKey: true,
});

export const convertCountryOptions = ({ countryList }) => {
  return countryList.map(({ dialingCode, name }) => ({ data: { code: dialingCode, name }, value: name[getLangKey()] }));
};

export const convertedEmploymentOptions = convertConstantValuesToSelectOptions(EMPLOYMENT_TYPES);

export const getCountryById = (countryId, countries) => countries.find(country => country._id === countryId);

export const updatePersonalInfoRequestParams = ({ formValues }) => {
  const { personalGsm, uniqueIdentifier } = formValues;
  return {
    ...formValues,
    personalGsm: personalGsm.replace(/\D/g, ''),
    tc: uniqueIdentifier,
  };
};

export const getDefaultMapState = ({ values }) => {
  const tempCoordinates = get(values, 'location.coordinates', DEFAULT_MAP_COORDINATES);
  return {
    center: [tempCoordinates[1], tempCoordinates[0]],
    zoom: DEFAULT_MAP_ZOOM,
    controls: [],
  };
};

export const updateRelativeInfoRequestParams = ({ formValues }) => {
  const { fullGsm = '-', ...restFormValues } = formValues;
  const [countryGsmCode, gsm] = fullGsm.split('-');
  const relative = {
    ...restFormValues,
    countryGsmCode,
    gsm: gsm.replace(/\D/g, ''),
  };
  return { relative };
};

export const convertedTrainingOptions = convertConstantValuesToSelectOptions(PERSON_TRAINING_TYPES);

export const convertedCourierDisableLoginReasonOptions = convertConstantValuesToSelectOptions(COURIER_DISABLE_LOGIN_REASONS);

export const disableLoginOfCouriersRequestParams = ({ formValues }) => {
  const { isLoginDisabled, reason, explanation } = formValues;
  return {
    isLoginDisabled,
    courierDisableReason: {
      explanation,
      reason: !isLoginDisabled ? COURIER_LOGIN_REASON : COURIER_DISABLE_LOGIN_REASONS[reason],
    },
  };
};

export const showActivenessTag = ({ isActivated, t }) => {
  const { color, label } = ACTIVENESS_TAG_PROPERTY[isActivated];

  return <Tag color={color}>{t(label)}</Tag>;
};

export const useImageProps = ({ handleFileChange, t }) => {
  return {
    onChange(info) {
      if (!UPLOADABLE_AVATAR_FORMATS.includes(info.file.type)) {
        message.error(t('error:VALID_FILE_TYPE', { types: UPLOADABLE_AVATAR_FORMATS }));
      }
      else if (info.file.status === 'error') {
        message.error(t('error:UNKNOWN_ERROR'));
      }
    },

    async customRequest(options) {
      const { onSuccess, onError, file } = options;
      try {
        Resizer.imageFileResizer(
          file,
          DEFAULT_RESIZER_VALUS.maxWidth,
          DEFAULT_RESIZER_VALUS.maxHeight,
          DEFAULT_RESIZER_VALUS.compressFormat,
          DEFAULT_RESIZER_VALUS.quality,
          DEFAULT_RESIZER_VALUS.rotation,
          uri => {
            onSuccess();
            handleFileChange(uri);
          },
          DEFAULT_RESIZER_VALUS.outputType,
          DEFAULT_RESIZER_VALUS.minWidth,
          DEFAULT_RESIZER_VALUS.minHeight,
        );
      }
      catch (err) {
        onError(err);
      }
    },
  };
};

export const removeRegionSubstringInUrl = ({ url }) => {
  return url.substring(0, url.indexOf('s3') + 3) + url.substring(url.indexOf('amazonaws'));
};
