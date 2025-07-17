import * as Yup from 'yup';

export const defaultAnalysisForm = {
  polygonIds: [],
  dateStart: undefined,
  dateEnd: undefined,
  statTypes: [],
  isGeoJson: true,
};

export const analysisFormValidationSchema = () => {
  return Yup.object().shape({
    polygonIds: Yup.array()
      .of(Yup.string()),
    dateStart: Yup.date().required(),
    dateEnd: Yup.date().required(),
    statTypes: Yup.array().of(Yup.string()).min(1),
    isGeoJson: Yup.boolean(),
  });
};
