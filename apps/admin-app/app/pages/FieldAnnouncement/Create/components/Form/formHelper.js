import * as Yup from 'yup';

import { t } from '@shared/i18n';

export const defaultValues = {
  announcementType: '',
  franchiseIds: [],
  warehouseIds: [],
  titleNative: '',
  titleEn: '',
  descriptionNative: '',
  descriptionEn: '',
  active: true,
  isNotification: false,
  startEndDate: [],
  files: [],
};

export const validationSchema = () => {
  return Yup.object().shape({
    warehouseIds: Yup.array().of(Yup.string())
      .when('announcementType', (announcementType, schema) => {
        if (announcementType === 'warehouse') {
          return schema.required(t('error:REQUIRED')).min(1);
        }
        return schema;
      }),
    franchiseIds: Yup.array().of(Yup.string())
      .when('announcementType', (announcementType, schema) => {
        if (announcementType === 'franchise') {
          return schema.required(t('error:REQUIRED')).min(1);
        }
        return schema;
      }),
    titleNative: Yup.string().required(t('error:REQUIRED')),
    titleEn: Yup.string()
      .when('announcementType', (announcementType, schema) => {
        if (announcementType === 'warehouse') {
          return schema.required(t('error:REQUIRED'));
        }
        return schema;
      }),
    descriptionNative: Yup.string().required(t('error:REQUIRED')),
    descriptionEn: Yup.string()
      .when('announcementType', (announcementType, schema) => {
        if (announcementType === 'warehouse') {
          return schema.required(t('error:REQUIRED'));
        }
        return schema;
      }),
    active: Yup.boolean().required(t('error:REQUIRED')),
    startEndDate: Yup.array().of(Yup.date()).when('announcementType', (announcementType, schema) => {
      if (announcementType === 'franchise') {
        return schema.required(t('error:REQUIRED')).min(2, t('error:REQUIRED_START_END_DATE'));
      }
      return schema;
    }),
    files: Yup.array().of(Yup.object()),
  });
};
