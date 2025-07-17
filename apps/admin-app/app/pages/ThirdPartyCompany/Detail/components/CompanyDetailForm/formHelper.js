import * as Yup from 'yup';
import { get } from 'lodash';

export const validationSchema = () => {
  return Yup.object()
    .shape({
      name: Yup.string()
        .min(5)
        .max(50)
        .required(),
      description: Yup.string()
        .min(5)
        .max(200)
        .required(),
      allowedRoutes: Yup.array()
        .min(1)
        .of(Yup.string())
        .required(),
    });
};

export const manipulateValuesAfterSubmit = values => {
  const allowedRoutes = values.allowedRoutes.map(allowedRoute => {
    return allowedRoute.value;
  });

  const newValues = { ...values, allowedRoutes };
  return newValues;
};

export const manipulateValuesBeforeSubmit = values => {
  const allowedRoutes = values.allowedRoutes.map(allowedRoute => {
    const value = get(allowedRoute, 'value');
    const label = get(allowedRoute, 'label');
    return {
      value,
      label,
    };
  });

  const newValues = { ...values, allowedRoutes };
  return newValues;
};

export const getInitialValues = thirdPartyCompany => {
  const allowedRoutesInCompany = get(thirdPartyCompany, 'allowRoutes', []);
  const setOfAllowedRoutesInCompany = new Set(allowedRoutesInCompany);
  const initialValues = {
    name: get(thirdPartyCompany, 'name', ''),
    description: get(thirdPartyCompany, 'description', ''),
    allowedRoutes: [...setOfAllowedRoutesInCompany],
  };

  return initialValues;
};
