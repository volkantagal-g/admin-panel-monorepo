import * as Yup from 'yup';

import { t } from '@shared/i18n';
import { excludedCharacters, excludedCharactersRegex } from '@app/pages/Warehouse/New/components/Form/formHelper';

export const defaultValues = {
  name: '',
  shortName: '',
  fieldManagers: [],
  warehouseGLN: null,
  SAPReferenceCode: '',
};

export const validationSchema = () => {
  return Yup.object()
    .shape({
      name: Yup.string().trim().min(2)
        .max(64)
        .matches(excludedCharactersRegex, t('error:SPECIAL_CHARACTERS', { chars: excludedCharacters }))
        .required(t('error:REQUIRED')),
      shortName: Yup.string().trim().min(2).max(64)
        .matches(excludedCharactersRegex, t('error:SPECIAL_CHARACTERS', { chars: excludedCharacters }))
        .required(t('error:REQUIRED')),
      fieldManagers: Yup.array().of(Yup.string()),
      warehouseGLN: Yup.string().matches(/^[0-9]{13}$/, t('error:GLN_SIZE')),
      SAPReferenceCode: Yup.string()
        .matches(/^\d{4,}$/, t('error:SAP_WAREHOUSE_ID_SIZE'))
        .nullable()
        .transform(value => (value || null)),
    });
};
