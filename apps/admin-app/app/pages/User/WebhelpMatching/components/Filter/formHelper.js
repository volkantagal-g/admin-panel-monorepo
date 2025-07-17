import * as Yup from 'yup';
import { isEmpty } from 'lodash';

import { t } from '@shared/i18n';
import { convertEmptyStringToUndefined } from '@shared/utils/formHelper';

export const validationSchema = () => {
  return (
    Yup.object()
      .shape({
        searchTerm: Yup.string().when('webhelpId', {
          is: val => isEmpty(val),
          then: Yup.string().required().trim().min(3, ({ min }) => (
            `${t('baseYupError:STRING.MIN', { min })} ${t('OR')} ${t('userPage:WEBHELP_ID_MUST_BE_FILLED')}`
          )),
          otherwise: Yup.string().notRequired().trim().min(0),
        }),
        webhelpId: Yup.string().transform(convertEmptyStringToUndefined)
          .notRequired().trim()
          .min(3),
      })
  );
};
