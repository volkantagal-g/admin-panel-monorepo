import * as Yup from 'yup';

export function validationSchema() {
  return Yup.object()
    .shape({
      statuses: Yup.number(),
      priority: Yup.number(),
      createdAtRange: Yup.array().of(Yup.date()),
      alertCondition: Yup.string(),
    });
}
