import * as Yup from 'yup';

import { t } from '@shared/i18n';

export const defaultAvailableStatsForm = { geoBoundaryType: '' };

export const availableStatsFormValidationSchema = () => {
  return Yup.object().shape({
    geoBoundaryType: Yup.string().trim().min(1)
      .required(t('error:REQUIRED')),
  });
};
