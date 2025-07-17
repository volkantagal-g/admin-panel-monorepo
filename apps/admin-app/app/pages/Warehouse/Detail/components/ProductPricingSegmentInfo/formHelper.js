import * as Yup from 'yup';

export const defaultValues = { productPricingSegmentId: "" };

export const validationSchema = () => {
  return Yup.object()
    .shape({ productPricingSegmentId: Yup.string() });
};
