import { TFunction } from 'react-i18next';
import * as Yup from 'yup';

export const validationSchema = (t: TFunction<'global | error '>): Yup.ObjectSchema<any> => Yup.object().shape({
  penaltyDate: Yup.date().nullable().required(t('error:REQUIRED')),
  documentFileKey: Yup.string().nullable().required(t('error:REQUIRED')),
});
