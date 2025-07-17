import * as Yup from 'yup';

export const defaultValues = {
  indexValue: 1,
  rentAmount: 0,
  stoppage: 0,
  dues: 0,
  carPark: 0,

  // Optional GetirWater Fields
  fuelCoefficient: 0,
  kmCoefficient: 0,
};

export const validationSchema = () => {
  return Yup.object()
    .shape({
      indexValue: Yup.number().moreThan(0).required(),
      rentAmount: Yup.number().moreThan(-1).required(),
      stoppage: Yup.number().moreThan(-1).required(),
      dues: Yup.number().moreThan(-1).required(),
      carPark: Yup.number().moreThan(-1).required(),
      rentStartDate: Yup.date().required(),
      // Optional GetirWater Fields
      fuelCoefficient: Yup.number(),
      kmCoefficient: Yup.number(),
    });
};
