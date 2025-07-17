import * as Yup from 'yup';

import { topicsSelectOptionMapper } from '../../../Select/Topic';

export const defaultValues = {
  topic: undefined,
  yearsOfExperience: undefined,
  languages: undefined,
  detailsOfExperience: undefined,
};

export const validationSchema = () => {
  return Yup.object()
    .shape({
      topic: Yup.string().required(),
      yearsOfExperience: Yup.number().positive().required(),
      languages: Yup.array().required(),
      detailsOfExperience: Yup.string(),
    });
};

export const getInitialValues = ({ topic, ...rest } = defaultValues) => {
  return {
    topic: topic && topicsSelectOptionMapper(topic),
    ...rest,
  };
};
