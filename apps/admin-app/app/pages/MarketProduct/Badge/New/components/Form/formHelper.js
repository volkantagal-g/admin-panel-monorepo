import * as Yup from 'yup';

export const defaultValues = {
  name: '',
  description: '',
  position: '',
  domainTypes: [],
};

export const validationSchema = () => {
  return Yup.object()
    .shape({
      name: Yup.string().trim().required(),
      description: Yup.string().trim().required(),
      position: Yup.string().trim().required(),
      domainTypes: Yup.array().min(1).required(),
    });
};

export const getModifiedValues = values => {
  const domainTypes = values.domainTypes.map(domainType => {
    return Number(domainType);
  });
  const newValues = {
    ...values,
    domainTypes,
  };

  return newValues;
};
