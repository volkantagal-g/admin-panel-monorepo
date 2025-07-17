import * as Yup from 'yup';

export const getInitialValues = values => ({
  isStruckPriceEnabled: !!values?.price,
  specialOffers: !!values?.financials?.isShownUnderSpecialOffers,
});

export const validationSchema = () => (Yup.object()
  .shape({
    isStruckPriceEnabled: Yup.boolean(),
    specialOffers: Yup.boolean(),
  })
);
