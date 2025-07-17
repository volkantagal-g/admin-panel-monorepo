import * as Yup from 'yup';

import { t } from '@shared/i18n';
import { InternalTeam } from '@app/pages/InternalAuthentication/types';

export const teamSchema =
    Yup.object()
      .shape({
        name: Yup.string()
          .min(10, t('baseYupError:STRING.MIN', { min: 10 }))
          .required(),
        description: Yup.string()
          .min(10, t('baseYupError:STRING.MIN', { min: 10 }))
          .required(),
      });

export const getInitialValues = (team: InternalTeam) => {
  const initialValues = {
    name: team?.name ?? '',
    description: team?.description ?? '',
  };
  return initialValues;
};
