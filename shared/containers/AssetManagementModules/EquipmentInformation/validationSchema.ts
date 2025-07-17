import { TFunction } from 'react-i18next';
import * as Yup from 'yup';

export const validationSchema = (t: TFunction<'global | error '>): Yup.ObjectSchema<any> => Yup.object().shape({
  trackingDeviceStatus: Yup.string().trim().required(t('error:REQUIRED')),
  tireType: Yup.string().trim().required(t('error:REQUIRED')),
  equipments: Yup.array(),
});
