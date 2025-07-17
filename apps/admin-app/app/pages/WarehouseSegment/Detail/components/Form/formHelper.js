import * as Yup from 'yup';
import { get } from 'lodash';

import { SEGMENT_TYPE_NAMES } from '../../../constants';

export const validationSchema = () => {
  return Yup.object()
    .shape({
      name: Yup.string()
        .trim()
        .required(),
      isDefault: Yup.boolean(),
    });
};

export const getInitialValues = segment => {
  const initialValues = {
    name: get(segment, 'name', ''),
    isDefault: get(segment, 'isDefault', false),
    type: SEGMENT_TYPE_NAMES[get(segment, 'type', '')],
  };
  return initialValues;
};
