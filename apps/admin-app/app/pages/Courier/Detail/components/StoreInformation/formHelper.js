import * as Yup from 'yup';

export const validationSchema = () => Yup.object().shape({
  _id: Yup.string().trim().required(),
  warehouse: Yup.string().trim().required(),
  workStatus: Yup.number().required(),
  currentMarketEmployer: Yup.object().shape({ franchise: Yup.string().trim().required() }),
});
