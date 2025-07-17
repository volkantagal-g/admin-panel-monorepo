import * as Yup from 'yup';

import { CODE_ACTION_TYPES } from './utils';

export const validationSchema = t => Yup.object().shape({
  _selectedTimeZone: Yup.string().trim().required(t('error:REQUIRED')),
  title: Yup.string().trim().min(5).required(t('error:REQUIRED')),
  description: Yup.string().trim().required(t('error:REQUIRED')),
  validRanges: Yup.array().of(
    Yup.date().required(t('error:REQUIRED')),
  ).required(t('error:REQUIRED')),
  count: Yup.number().required(t('error:REQUIRED')).min(1, t('baseYupError:NUMBER.MIN', { min: 1 }))
    .when('syllableCount', syllableCount => {
      if (syllableCount === 0) {
        return Yup.number().oneOf([1], t('segmentedCodeGeneratorPage:ERRORS.IF_SYLLABLE_COUNT_0_THEN_COUNT_MUST_BE_1'));
      }
      return undefined;
    }),
  prefix: Yup.string().trim().required(t('error:REQUIRED')),
  syllableCount: Yup.number().required(t('error:REQUIRED')).min(0, t('baseYupError:NUMBER.MIN', { min: 0 })),
  useLimit: Yup.number().required(t('error:REQUIRED')).min(0, t('baseYupError:NUMBER.MIN', { min: 0 })),
  actionType: Yup.number().required(t('error:REQUIRED')),
  promo: Yup.string()
    .when('actionType', {
      is: CODE_ACTION_TYPES.DEFINE_PROMOTION,
      then: Yup.string().trim().required(t('error:REQUIRED')),
    }),
  announcement: Yup.string()
    .when('actionType', {
      is: CODE_ACTION_TYPES.SHOW_ANNOUNCEMENT,
      then: Yup.string().trim().required(t('error:REQUIRED')),
    }),
  segment: Yup.number()
    .when('actionType', {
      is: CODE_ACTION_TYPES.ASSIGN_SEGMENT,
      then: Yup.number().required(t('error:REQUIRED')).min(0, t('baseYupError:NUMBER.MIN', { min: 0 })),
    }),
  isAlreadySold: Yup.boolean().required(t('error:REQUIRED')),
});
