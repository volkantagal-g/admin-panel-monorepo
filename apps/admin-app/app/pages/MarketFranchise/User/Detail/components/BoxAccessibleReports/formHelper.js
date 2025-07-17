import * as Yup from 'yup';

export const validationSchema = () => Yup.object().shape({ _id: Yup.string().trim().required(), reports: Yup.array().nullable() });
