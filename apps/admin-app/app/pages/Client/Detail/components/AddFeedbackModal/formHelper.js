import * as Yup from 'yup';

export const validationSchema = () => {
  return Yup.object()
    .shape({
      discountAmount: Yup.number(),
      deliveryFee: Yup.object().shape({
        amount: Yup.number(),
        doNotCharge: Yup.boolean(),
      }),
    });
};
