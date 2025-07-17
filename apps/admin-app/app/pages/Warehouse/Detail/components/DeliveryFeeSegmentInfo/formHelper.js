import * as Yup from 'yup';

export const defaultValues = { deliveryFeeSegmentId: "" };

export const validationSchema = () => {
  return Yup.object()
    .shape({ deliveryFeeSegmentId: Yup.string() });
};
