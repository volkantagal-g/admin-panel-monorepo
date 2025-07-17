import * as Yup from 'yup';

import { t } from '@shared/i18n';
import { YupMultiLanguage } from '@shared/yup/commonSchemas';
import { QuestionTypes } from '@app/pages/Kds/constant';

export const defaultValues = {
  questionGroupId: '',
  name: {
    tr: '',
    en: '',
  },
  tooltip: {
    tr: '',
    en: '',
  },
  questionType: '',
  answerOptions: [],
  isPhotoForced: null,
  scoreMapping: {},
  domainType: [],
  askForStoreConversion: null,
  askForMainWarehouse: null,
  notApplicableOptionAvailable: null,
  status: null,
  auditFormType: [],
};

export const validationSchema = () => {
  return Yup.object().shape({
    questionGroupId: Yup.string().required(t('baseYupError:MIXED.REQUIRED')),
    questionType: Yup.string().required(t('baseYupError:MIXED.REQUIRED')),
    auditFormType: Yup.array().min(1).required(t('baseYupError:MIXED.REQUIRED')),
    name: YupMultiLanguage.string({ isRequired: true, max: null }),
    tooltip: YupMultiLanguage.string({ min: null, max: null }),
    answerOptions: Yup.array()
      .when('questionType', (questionType, schema) => {
        if (questionType === QuestionTypes.MULTIPLE_CHOICE) {
          return Yup.array().of(YupMultiLanguage.string({ isRequired: true, max: null }), Yup.bool());
        }
        return schema;
      })
      .when('questionType', (questionType, schema) => {
        if (questionType === QuestionTypes.NUMBER_INPUT) {
          return Yup.string().required(t('baseYupError:MIXED.REQUIRED'));
        }
        return schema;
      }),
    scoreMapping: Yup.object().when('domainType', {
      is: domainType => domainType.includes('GETIR10'),
      then: Yup.object({ GETIR10: Yup.string().required(t('baseYupError:MIXED.REQUIRED')) }),
    }).when('domainType', {
      is: domainType => domainType.includes('MARKET'),
      then: Yup.object({ MARKET: Yup.string().required(t('baseYupError:MIXED.REQUIRED')) }),
    }).when('domainType', {
      is: domainType => domainType.includes('WATER'),
      then: Yup.object({ WATER: Yup.string().required(t('baseYupError:MIXED.REQUIRED')) }),
    })
      .when('askForStoreConversion', {
        is: true,
        then: Yup.object({ STORE_CONVERSION: Yup.string().required(t('baseYupError:MIXED.REQUIRED')) }),
      })
      .when('askForMainWarehouse', {
        is: true,
        then: Yup.object({ MAIN_WAREHOUSE: Yup.string().required(t('baseYupError:MIXED.REQUIRED')) }),
      }),
    isPhotoForced: Yup.bool(),
    askForStoreConversion: Yup.bool(),
    askForMainWarehouse: Yup.bool(),
    notApplicableOptionAvailable: Yup.bool(),
    status: Yup.string().trim().required(t('baseYupError:MIXED.REQUIRED')),
    domainType: Yup.array().when('askForStoreConversion', {
      is: false,
      then: Yup.array().required(t('baseYupError:MIXED.REQUIRED')),
    }),
  });
};
