import * as Yup from 'yup';

import { getLangDataOfItem } from '@shared/utils/multiLanguage';
import { Option } from '.';
import { YupMultiLanguage } from '@shared/yup/commonSchemas';

export const placeHolderValidationSchema = () => Yup.object().shape({
  placeholder: YupMultiLanguage.string({ isRequired: true }),
  id: Yup.string(),
});

export const getInitialValues = (selectedRatingPlaceholder: Option) => ({
  ...selectedRatingPlaceholder,
  placeholder: getLangDataOfItem(
    selectedRatingPlaceholder,
    ['placeholder'],
    '',
  ),
  id: selectedRatingPlaceholder?.placeholder?._id,
});
