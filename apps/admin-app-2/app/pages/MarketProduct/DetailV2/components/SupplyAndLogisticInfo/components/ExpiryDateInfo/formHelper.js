import * as Yup from 'yup';

import { getDiffObj, setNullToEmptyStringDeep } from '@shared/utils/common';

export const getInitialValues = values => ({
  expActive: values?.expActive || false,
  expDays: {
    lifetime: values?.expDays?.lifetime,
    allowed: values?.expDays?.allowed,
    warning: values?.expDays?.warning,
    dead: values?.expDays?.dead,
  },
  isCreated: !!values?.productId,
});

export const validationSchema = ({ expActive }) => Yup.object()
  .shape({
    expActive: Yup.boolean(),
    expDays: Yup.object()
      .shape({
        lifetime: expActive ? Yup.number().min(0).required() : Yup.number().min(0).nullable(true),
        allowed: expActive ? Yup.number().min(0).required() : Yup.number().min(0).nullable(true),
        warning: expActive ? Yup.number().min(0).required() : Yup.number().min(0).nullable(true),
        dead: expActive ? Yup.number().min(0).required() : Yup.number().min(0).nullable(true),
      }),
  });

export const getOnlyModifiedValuesBeforeSubmit = ({
  initialValues,
  values,
}) => {
  const { newValues: changedValues } = getDiffObj(initialValues, values);
  setNullToEmptyStringDeep(changedValues);
  return { ...changedValues, isCreated: initialValues?.isCreated };
};
