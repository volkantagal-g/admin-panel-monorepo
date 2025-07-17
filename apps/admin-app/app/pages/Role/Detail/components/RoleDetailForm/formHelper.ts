import * as Yup from 'yup';
import { get, map } from 'lodash';

export const validationSchema = () => {
  return Yup.object()
    .shape({
      name: Yup.string()
        .required(),
      description: Yup.object().shape({
        tr: Yup.string()
          .trim()
          .min(2)
          .required(),
        en: Yup.string()
          .trim()
          .min(2)
          .required(),
      }),
      isActive: Yup.boolean(),
      roleOwners: Yup.array().of(Yup.object()),
    });
};

const manipulateValuesBeforeSubmit = (values: RoleType) => {
  const roleOwners = map((values.roleOwners as RoleOwner[]), roleOwner => {
    return {
      value: roleOwner?._id,
      label: roleOwner?.name || 'N/A',
    };
  });

  return {
    ...values,
    roleOwners,
  };
};

export const getInitialValues = (role: RoleType) => {
  const initialValues = {
    name: get(role, 'name', ''),
    description: get(role, 'description', { en: '', tr: '' }),
    roleOwners: get(role, 'roleOwners', []),
    isActive: get(role, 'isActive', false),
  };

  return manipulateValuesBeforeSubmit(initialValues as RoleType);
};
