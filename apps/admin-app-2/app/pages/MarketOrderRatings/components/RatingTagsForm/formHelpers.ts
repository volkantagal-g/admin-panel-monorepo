import * as Yup from 'yup';

import { getLangDataOfItem } from '@shared/utils/multiLanguage';
import { YupMultiLanguage } from '@shared/yup/commonSchemas';
import { TagPayload } from '@shared/api/marketOrderRatings';

export const validationSchema = () => {
  return Yup.object().shape({
    title: YupMultiLanguage.string({ isRequired: true, max: 30 }),
    reason: Yup.string().required(),
  });
};

export const getInitialValues = (selectedRatingTag: TagPayload) => ({
  title: getLangDataOfItem(selectedRatingTag, ['title'], ''),
  reason: selectedRatingTag?.reason,
});
