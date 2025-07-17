/* eslint-disable func-names */
import * as Yup from 'yup';

import { t } from '@shared/i18n';

export const defaultValues = { mainStore: '', mainWarehouses: [] };

Yup.addMethod(Yup.array, 'mainStoreIncluded', function (args) {
  const { mainStore, message } = args;

  return Yup.array().test(`mainStoreIncluded`, message, function (value) {
    const { createError } = this;

    if (!value.includes(mainStore)) {
      return createError({
        message: value.length ? t('error:SHOULD_BE_INCLUDED_WITH_WORD', { word: t('MAIN_STORE') }) : t('error:REQUIRED'),
        path: 'mainWarehouses',
      });
    }
    return true;
  });
});

export const validationSchema = () => {
  return Yup.object().shape({
    mainStore: Yup.string().required(t('error:REQUIRED')),
    mainWarehouses: Yup.array().when('mainStore', (mainStore, schema) => {
      return schema.mainStoreIncluded({ mainStore });
    }),
  });
};
