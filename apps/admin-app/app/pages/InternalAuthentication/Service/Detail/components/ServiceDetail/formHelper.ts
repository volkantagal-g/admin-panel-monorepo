import * as Yup from 'yup';

import { InternalService } from '../../../../types';

export const serviceSchema =
    Yup.object()
      .shape({
        name: Yup.string().required(),
        description: Yup.string().required(),
      });

export const getInitialValues = (service: InternalService) => {
  const initialValues = {
    name: service?.name ?? '',
    description: service?.description ?? '',
  };
  return initialValues;
};
